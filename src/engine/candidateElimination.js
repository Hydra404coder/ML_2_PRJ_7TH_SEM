/**
 * Deterministic Candidate Elimination Algorithm Implementation
 * with step-by-step history and educational explanations.
 */

import {
  ANY,
  NONE,
  isNone,
  areEqual,
  covers,
  isMoreGeneralOrEqual,
  isStrictlyMoreGeneral,
  formatHypothesis,
} from './hypothesis.js';

/**
 * Initializes the Candidate Elimination boundaries.
 * @param {number} numAttributes
 * @returns {{S: string[][], G: string[][]}}
 */
export function initializeBoundaries(numAttributes) {
  return {
    S: [new Array(numAttributes).fill(NONE)],
    G: [new Array(numAttributes).fill(ANY)],
  };
}

/**
 * Computes the minimal generalizations of s that cover x.
 * In conjunctive concept learning:
 * - If s is null (Ø), the minimal generalization covering x is x itself.
 * - If s is non-null, for each attribute: if s[i] === x[i] keep s[i], else '?'.
 * @param {string[]} s
 * @param {string[]} x
 * @returns {string[]}
 */
export function minimalGeneralization(s, x) {
  if (isNone(s)) {
    return [...x];
  }
  const generalized = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === x[i]) {
      generalized.push(s[i]);
    } else {
      generalized.push(ANY);
    }
  }
  return generalized;
}

/**
 * Computes all minimal specializations of g that do NOT cover x.
 * For each attribute position where g[i] is '?', replacing it with any
 * allowed value other than x[i] yields a minimal specialization.
 * @param {string[]} g
 * @param {string[]} x
 * @param {Array<{name: string, values: string[]}>} attributes
 * @returns {string[][]}
 */
export function minimalSpecializations(g, x, attributes) {
  const specializations = [];

  for (let i = 0; i < g.length; i++) {
    if (g[i] === ANY) {
      const allowedValues = attributes[i].values;
      for (const val of allowedValues) {
        if (val !== x[i]) {
          const spec = [...g];
          spec[i] = val;
          specializations.push(spec);
        }
      }
    }
  }

  return specializations;
}

/**
 * Prunes non-maximal hypotheses from G:
 * Remove any hypothesis in G that is strictly MORE SPECIFIC than another hypothesis in G.
 * @param {string[][]} G
 * @returns {string[][]}
 */
export function pruneG(G) {
  const uniqueG = [];
  for (const g of G) {
    if (!uniqueG.some(u => areEqual(u, g))) {
      uniqueG.push(g);
    }
  }

  return uniqueG.filter(g1 => {
    // If g1 is strictly more specific than some other g2 in G, remove g1
    for (const g2 of uniqueG) {
      if (!areEqual(g1, g2) && isStrictlyMoreGeneral(g2, g1)) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Prunes non-minimal hypotheses from S:
 * Remove any hypothesis in S that is strictly MORE GENERAL than another hypothesis in S.
 * @param {string[][]} S
 * @returns {string[][]}
 */
export function pruneS(S) {
  const uniqueS = [];
  for (const s of S) {
    if (!uniqueS.some(u => areEqual(u, s))) {
      uniqueS.push(s);
    }
  }

  // If S contains non-null hypotheses, filter out null
  const nonNull = uniqueS.filter(s => !isNone(s));
  const pool = nonNull.length > 0 ? nonNull : uniqueS;

  return pool.filter(s1 => {
    // If s1 is strictly more general than some other s2 in S, remove s1
    for (const s2 of pool) {
      if (!areEqual(s1, s2) && isStrictlyMoreGeneral(s1, s2)) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Checks whether version space is still consistent between S and G:
 * Each s in S must be covered by at least one g in G,
 * and each g in G must be at least as general as at least one s in S.
 * @param {string[][]} S
 * @param {string[][]} G
 * @returns {boolean}
 */
export function areBoundariesConsistent(S, G) {
  if (S.length === 0 || G.length === 0) return false;
  // If S is still null, G can contain any non-empty hypothesis
  if (S.every(s => isNone(s))) return G.length > 0;

  for (const s of S) {
    const hasGeneralG = G.some(g => isMoreGeneralOrEqual(g, s));
    if (!hasGeneralG) return false;
  }
  for (const g of G) {
    const hasSpecificS = S.some(s => isMoreGeneralOrEqual(g, s));
    if (!hasSpecificS) return false;
  }
  return true;
}

/**
 * Performs one single step of Candidate Elimination with full explanation generation.
 * @param {{S: string[][], G: string[][]}} boundaries
 * @param {Object} example - e.g. { id: 1, values: ['Sunny', 'Warm', 'Weak'], label: 'YES' }
 * @param {Array<{name: string, values: string[]}>} attributes
 * @param {string[]} attrNames
 * @returns {Object} { S, G, explanation, details }
 */
export function stepCandidateElimination(boundaries, example, attributes, attrNames) {
  const x = attrNames.map(name => example.values[name] || example[name]);
  const isPositive = (example.label === 'YES' || example.label === '+' || example.label === true);

  let S = boundaries.S.map(h => [...h]);
  let G = boundaries.G.map(h => [...h]);

  const explanationPoints = [];
  const actionLog = [];

  if (isPositive) {
    // POSITIVE EXAMPLE
    explanationPoints.push(`Received positive example ${example.id || ''}: ${formatHypothesis(x)}.`);

    // 1. Remove from G any hypothesis that does NOT cover x
    const initialGCount = G.length;
    const removedFromG = [];
    G = G.filter(g => {
      const coversX = covers(g, x);
      if (!coversX) removedFromG.push(g);
      return coversX;
    });

    if (removedFromG.length > 0) {
      actionLog.push(`Removed ${removedFromG.length} general hypothesis(es) from G that failed to cover the positive example: ${removedFromG.map(formatHypothesis).join(', ')}.`);
    }

    // 2. For each s in S that does not cover x
    const nextS = [];
    let generalizedCount = 0;

    for (const s of S) {
      if (covers(s, x)) {
        nextS.push(s);
      } else {
        // Find minimal generalization
        const gen = minimalGeneralization(s, x);
        generalizedCount++;

        // Keep gen only if some member of G is more general than gen
        const consistentWithG = G.some(g => isMoreGeneralOrEqual(g, gen));
        if (consistentWithG) {
          nextS.push(gen);
          actionLog.push(`Generalizing specific boundary hypothesis from ${formatHypothesis(s)} to ${formatHypothesis(gen)} to cover the example.`);
        } else {
          actionLog.push(`Generalization ${formatHypothesis(gen)} was pruned because no hypothesis in G is more general than it.`);
        }
      }
    }

    // 3. Prune S
    S = pruneS(nextS);

    if (generalizedCount === 0 && removedFromG.length === 0) {
      explanationPoints.push('All existing boundaries already cover this positive example. No boundary adjustments needed.');
    } else {
      explanationPoints.push('Positive examples force S to generalize upwards to cover new positive instances, and prune any G hypotheses that fail to cover them.');
    }

  } else {
    // NEGATIVE EXAMPLE
    explanationPoints.push(`Received negative example ${example.id || ''}: ${formatHypothesis(x)}.`);

    // 1. Remove from S any hypothesis that covers x (negative example must NOT be covered!)
    const removedFromS = [];
    S = S.filter(s => {
      const coversX = covers(s, x);
      if (coversX) removedFromS.push(s);
      return !coversX;
    });

    if (removedFromS.length > 0) {
      actionLog.push(`Removed ${removedFromS.length} specific hypothesis(es) from S because they incorrectly covered the negative example: ${removedFromS.map(formatHypothesis).join(', ')}.`);
    }

    // 2. For each g in G that covers x, replace with minimal specializations
    const nextG = [];
    let specializedCount = 0;

    for (const g of G) {
      if (!covers(g, x)) {
        nextG.push(g);
      } else {
        specializedCount++;
        const specs = minimalSpecializations(g, x, attributes);
        const validSpecs = specs.filter(h => {
          // Keep only if h is more general than some member of S
          return S.some(s => isMoreGeneralOrEqual(h, s));
        });

        if (validSpecs.length > 0) {
          nextG.push(...validSpecs);
          actionLog.push(`Specializing general boundary hypothesis ${formatHypothesis(g)} into: ${validSpecs.map(formatHypothesis).join(', ')}.`);
        } else {
          actionLog.push(`Hypothesis ${formatHypothesis(g)} covered the negative example, but its specializations were not consistent with any hypothesis in S and were eliminated.`);
        }
      }
    }

    // 3. Prune G
    G = pruneG(nextG);

    if (specializedCount === 0 && removedFromS.length === 0) {
      explanationPoints.push('Existing general hypotheses already exclude this negative example. No boundary updates required.');
    } else {
      explanationPoints.push('Negative examples force G to specialize downwards to exclude the negative example, and prune any overly general hypotheses.');
    }
  }

  // Check boundary consistency
  const isConsistent = areBoundariesConsistent(S, G);
  let statusSummary = '';

  if (!isConsistent || S.length === 0 || G.length === 0) {
    statusSummary = 'Version space is empty! The observations are inconsistent with a single conjunctive concept in this hypothesis space.';
  } else if (S.length === 1 && G.length === 1 && areEqual(S[0], G[0])) {
    statusSummary = `Version space has converged to a single unique target concept: ${formatHypothesis(S[0])}!`;
  } else {
    statusSummary = `Version space contains ${S.length} specific boundary hypothesis(es) and ${G.length} general boundary hypothesis(es).`;
  }

  return {
    S,
    G,
    isConsistent,
    summary: statusSummary,
    explanation: explanationPoints.join(' '),
    actions: actionLog,
  };
}

