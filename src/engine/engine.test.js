import { describe, it, expect } from 'vitest';
import {
  ANY,
  NONE,
  covers,
  isMoreGeneralOrEqual,
  isStrictlyMoreGeneral,
  formatHypothesis,
  generateHypothesisSpace,
} from './hypothesis.js';
import {
  initializeBoundaries,
  minimalGeneralization,
  minimalSpecializations,
  stepCandidateElimination,
  pruneS,
  pruneG,
} from './candidateElimination.js';
import { computeVersionSpaceState } from './versionSpace.js';
import { predictInstance } from './prediction.js';
import { SCENARIOS } from '../data/scenarios.js';

describe('Hypothesis Representation and Ordering', () => {
  it('correctly handles coverage of instances', () => {
    const h1 = ['Sunny', 'Warm', ANY];
    expect(covers(h1, ['Sunny', 'Warm', 'Weak'])).toBe(true);
    expect(covers(h1, ['Sunny', 'Warm', 'Strong'])).toBe(true);
    expect(covers(h1, ['Rainy', 'Warm', 'Weak'])).toBe(false);

    // Null hypothesis covers nothing
    const hNull = [NONE, NONE, NONE];
    expect(covers(hNull, ['Sunny', 'Warm', 'Weak'])).toBe(false);

    // Most general hypothesis covers everything
    const hGen = [ANY, ANY, ANY];
    expect(covers(hGen, ['Sunny', 'Warm', 'Weak'])).toBe(true);
    expect(covers(hGen, ['Rainy', 'Cold', 'Strong'])).toBe(true);
  });

  it('correctly evaluates generality ordering (>=g)', () => {
    const hGen = [ANY, ANY, ANY];
    const hMid = ['Sunny', ANY, ANY];
    const hSpec = ['Sunny', 'Warm', 'Weak'];
    const hNull = [NONE, NONE, NONE];

    expect(isMoreGeneralOrEqual(hGen, hMid)).toBe(true);
    expect(isMoreGeneralOrEqual(hMid, hGen)).toBe(false);
    expect(isMoreGeneralOrEqual(hMid, hSpec)).toBe(true);
    expect(isMoreGeneralOrEqual(hSpec, hMid)).toBe(false);
    expect(isMoreGeneralOrEqual(hSpec, hNull)).toBe(true);
    expect(isMoreGeneralOrEqual(hNull, hSpec)).toBe(false);

    expect(isStrictlyMoreGeneral(hGen, hMid)).toBe(true);
    expect(isStrictlyMoreGeneral(hGen, hGen)).toBe(false);
  });

  it('generates the complete hypothesis space', () => {
    const attrs = [
      { name: 'Sky', values: ['Sunny', 'Rainy'] },
      { name: 'Wind', values: ['Weak', 'Strong'] },
    ];
    // (2 + 1) * (2 + 1) = 9 + 1 (null) = 10 hypotheses
    const space = generateHypothesisSpace(attrs);
    expect(space.length).toBe(10);
  });
});

describe('Candidate Elimination Boundary Updates', () => {
  const attributes = [
    { name: 'Sky', values: ['Sunny', 'Cloudy', 'Rainy'] },
    { name: 'Temperature', values: ['Warm', 'Cold'] },
    { name: 'Wind', values: ['Weak', 'Strong'] },
  ];
  const attrNames = ['Sky', 'Temperature', 'Wind'];

  it('initializes boundaries properly', () => {
    const { S, G } = initializeBoundaries(3);
    expect(S).toEqual([[NONE, NONE, NONE]]);
    expect(G).toEqual([[ANY, ANY, ANY]]);
  });

  it('generalizes S on positive example', () => {
    let state = initializeBoundaries(3);
    const ex1 = { id: 1, values: { Sky: 'Sunny', Temperature: 'Warm', Wind: 'Weak' }, label: 'YES' };

    state = stepCandidateElimination(state, ex1, attributes, attrNames);
    expect(state.S).toEqual([['Sunny', 'Warm', 'Weak']]);
    expect(state.G).toEqual([[ANY, ANY, ANY]]);

    const ex2 = { id: 2, values: { Sky: 'Sunny', Temperature: 'Warm', Wind: 'Strong' }, label: 'YES' };
    state = stepCandidateElimination(state, ex2, attributes, attrNames);
    expect(state.S).toEqual([['Sunny', 'Warm', ANY]]);
    expect(state.G).toEqual([[ANY, ANY, ANY]]);
  });

  it('specializes G on negative example', () => {
    let state = initializeBoundaries(3);
    const ex1 = { id: 1, values: { Sky: 'Sunny', Temperature: 'Warm', Wind: 'Weak' }, label: 'YES' };
    state = stepCandidateElimination(state, ex1, attributes, attrNames);

    const ex2 = { id: 2, values: { Sky: 'Rainy', Temperature: 'Cold', Wind: 'Strong' }, label: 'NO' };
    state = stepCandidateElimination(state, ex2, attributes, attrNames);

    expect(state.G.length).toBe(3);
    expect(state.G).toContainEqual(['Sunny', ANY, ANY]);
    expect(state.G).toContainEqual([ANY, 'Warm', ANY]);
    expect(state.G).toContainEqual([ANY, ANY, 'Weak']);
  });

  it('converges to a single hypothesis when consistent data is provided', () => {
    let state = initializeBoundaries(3);
    const dataset = [
      { id: 1, values: { Sky: 'Sunny', Temperature: 'Warm', Wind: 'Weak' }, label: 'YES' },
      { id: 2, values: { Sky: 'Sunny', Temperature: 'Warm', Wind: 'Strong' }, label: 'YES' },
      { id: 3, values: { Sky: 'Rainy', Temperature: 'Cold', Wind: 'Strong' }, label: 'NO' },
      { id: 4, values: { Sky: 'Sunny', Temperature: 'Cold', Wind: 'Weak' }, label: 'NO' },
      { id: 5, values: { Sky: 'Cloudy', Temperature: 'Warm', Wind: 'Weak' }, label: 'NO' },
    ];

    for (const ex of dataset) {
      state = stepCandidateElimination(state, ex, attributes, attrNames);
    }

    expect(state.S).toEqual([['Sunny', 'Warm', ANY]]);
    expect(state.G).toEqual([['Sunny', 'Warm', ANY]]);
    expect(state.isConsistent).toBe(true);
  });

  it('detects contradictory examples resulting in an empty version space', () => {
    let state = initializeBoundaries(3);
    const dataset = [
      { id: 1, values: { Sky: 'Sunny', Temperature: 'Warm', Wind: 'Weak' }, label: 'YES' },
      { id: 2, values: { Sky: 'Sunny', Temperature: 'Warm', Wind: 'Weak' }, label: 'NO' },
    ];

    for (const ex of dataset) {
      state = stepCandidateElimination(state, ex, attributes, attrNames);
    }

    expect(state.isConsistent).toBe(false);
  });
});

describe('Verification Across All 4 Real Predefined Scenarios', () => {
  SCENARIOS.forEach((scenario) => {
    it(`runs without errors on scenario: ${scenario.title}`, () => {
      const attrNames = scenario.attributes.map(a => a.name);
      let state = initializeBoundaries(scenario.attributes.length);
      const fullSpace = generateHypothesisSpace(scenario.attributes);

      expect(fullSpace.length).toBeGreaterThan(10);

      const processed = [];
      for (const ex of scenario.baseDataset) {
        processed.push(ex);
        state = stepCandidateElimination(state, ex, scenario.attributes, attrNames);
        expect(state).toBeDefined();

        const vs = computeVersionSpaceState(fullSpace, processed, attrNames, state.S, state.G);
        expect(vs.count).toBeGreaterThanOrEqual(1);
      }
    });
  });
});

describe('Version Space & Prediction', () => {
  const attributes = [
    { name: 'Sky', values: ['Sunny', 'Rainy'] },
    { name: 'Wind', values: ['Weak', 'Strong'] },
  ];
  const attrNames = ['Sky', 'Wind'];
  const fullSpace = generateHypothesisSpace(attributes);

  it('computes version space matching candidate elimination boundaries', () => {
    const examples = [
      { id: 1, values: { Sky: 'Sunny', Wind: 'Weak' }, label: 'YES' },
    ];
    const S = [['Sunny', 'Weak']];
    const G = [[ANY, ANY]];

    const vs = computeVersionSpaceState(fullSpace, examples, attrNames, S, G);
    expect(vs.count).toBe(4);
    expect(vs.isLatticeVerified).toBe(true);
  });

  it('predicts YES, NO, and UNCERTAIN correctly', () => {
    const surviving = [
      { id: '1', values: ['Sunny', ANY], label: '⟨Sunny, ?⟩' },
      { id: '2', values: ['Sunny', 'Weak'], label: '⟨Sunny, Weak⟩' },
    ];

    const res1 = predictInstance({ Sky: 'Sunny', Wind: 'Weak' }, attrNames, surviving);
    expect(res1.prediction).toBe('YES');

    const res2 = predictInstance({ Sky: 'Rainy', Wind: 'Weak' }, attrNames, surviving);
    expect(res2.prediction).toBe('NO');

    const res3 = predictInstance({ Sky: 'Sunny', Wind: 'Strong' }, attrNames, surviving);
    expect(res3.prediction).toBe('UNCERTAIN');
    expect(res3.yesCount).toBe(1);
    expect(res3.noCount).toBe(1);
  });

  it('handles empty version space prediction gracefully', () => {
    const res = predictInstance({ Sky: 'Sunny', Wind: 'Weak' }, attrNames, []);
    expect(res.prediction).toBe('EMPTY');
  });
});
