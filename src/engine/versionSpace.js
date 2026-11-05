/**
 * Version Space computation, verification, and lattice relationship tracking.
 */

import {
  isNone,
  areEqual,
  covers,
  isMoreGeneralOrEqual,
  formatHypothesis,
} from './hypothesis.js';

/**
 * Evaluates the full hypothesis space against all observed examples.
 * Computes surviving hypotheses, boundary membership, and elimination reasons.
 *
 * @param {Array<Object>} fullHypothesisSpace - Array of hypotheses from generateHypothesisSpace
 * @param {Array<Object>} examples - Processed examples so far
 * @param {string[]} attrNames - Attribute keys
 * @param {string[][]} currentS - Current S boundary hypotheses
 * @param {string[][]} currentG - Current G boundary hypotheses
 * @returns {Object} Comprehensive version space state
 */
export function computeVersionSpaceState(fullHypothesisSpace, examples, attrNames, currentS, currentG) {
  const consistentHypotheses = [];
  const eliminatedHypotheses = [];
  const hypothesisStatusList = [];

  for (const item of fullHypothesisSpace) {
    const h = item.values;
    let isConsistent = true;
    let eliminatedReason = null;
    let eliminatedByStep = null;
    let eliminatedExample = null;

    // The null hypothesis is by definition eliminated as soon as at least 1 positive example exists
    if (isNone(h)) {
      const firstPosIdx = examples.findIndex(ex => ex.label === 'YES' || ex.label === '+');
      if (firstPosIdx !== -1) {
        isConsistent = false;
        eliminatedReason = 'Null hypothesis (Ø) cannot cover positive examples.';
        eliminatedByStep = firstPosIdx + 1;
        eliminatedExample = examples[firstPosIdx];
      } else {
        // Before any positive examples, null is technically consistent only if no examples or only negative
        // but typically null is considered the lower bound rather than an active hypothesis.
        isConsistent = true;
      }
    } else {
      // Check consistency against all observed training examples
      for (let i = 0; i < examples.length; i++) {
        const ex = examples[i];
        const isPos = (ex.label === 'YES' || ex.label === '+');
        const x = attrNames.map(name => ex.values[name] || ex[name]);
        const doesCover = covers(h, x);

        if (isPos && !doesCover) {
          // Positive example must be covered
          isConsistent = false;
          eliminatedReason = `Too specific: fails to cover positive example #${ex.id || i + 1} (${formatHypothesis(x)}).`;
          eliminatedByStep = i + 1;
          eliminatedExample = ex;
          break;
        } else if (!isPos && doesCover) {
          // Negative example must NOT be covered
          isConsistent = false;
          eliminatedReason = `Too general: incorrectly covers negative example #${ex.id || i + 1} (${formatHypothesis(x)}).`;
          eliminatedByStep = i + 1;
          eliminatedExample = ex;
          break;
        }
      }
    }

    // Check boundary membership
    const inS = currentS.some(s => areEqual(s, h));
    const inG = currentG.some(g => areEqual(g, h));

    let boundaryRole = 'neither';
    if (inS && inG) boundaryRole = 'both';
    else if (inS) boundaryRole = 'S';
    else if (inG) boundaryRole = 'G';

    const statusObj = {
      ...item,
      isConsistent,
      inS,
      inG,
      boundaryRole,
      eliminatedReason,
      eliminatedByStep,
      eliminatedExample,
    };

    hypothesisStatusList.push(statusObj);

    if (isConsistent) {
      consistentHypotheses.push(statusObj);
    } else {
      eliminatedHypotheses.push(statusObj);
    }
  }

  // Dual verification: Hypotheses between S and G
  const betweenSAndG = fullHypothesisSpace.filter(item => {
    const h = item.values;
    if (isNone(h)) return false;
    const hasMoreGeneralG = currentG.some(g => isMoreGeneralOrEqual(g, h));
    const hasMoreSpecificS = currentS.some(s => isMoreGeneralOrEqual(h, s));
    return hasMoreGeneralG && hasMoreSpecificS;
  });

  return {
    allHypotheses: hypothesisStatusList,
    consistentHypotheses,
    eliminatedHypotheses,
    count: consistentHypotheses.length,
    totalCount: fullHypothesisSpace.length,
    eliminatedCount: eliminatedHypotheses.length,
    betweenSAndGCount: betweenSAndG.length,
    isLatticeVerified: (currentS.length > 0 && currentG.length > 0)
      ? Math.abs(consistentHypotheses.filter(h => !h.isNone).length - betweenSAndG.length) <= 1
      : true,
  };
}

/**
 * Builds the graph lattice nodes and edges for rendering.
 * Edges represent immediate generalization relations between consistent and nearby hypotheses.
 *
 * @param {Array<Object>} hypothesisStatusList
 * @returns {{nodes: Array, edges: Array}}
 */
export function buildLatticeGraph(hypothesisStatusList) {
  // To keep rendering performant and readable, we construct lattice nodes
  // grouped by generality level (0 to maxAttributes, plus null at -1).
  const nodes = hypothesisStatusList.map(h => ({
    id: h.id,
    label: h.label,
    values: h.values,
    level: h.level,
    isConsistent: h.isConsistent,
    boundaryRole: h.boundaryRole,
    inS: h.inS,
    inG: h.inG,
    eliminatedReason: h.eliminatedReason,
  }));

  const edges = [];
  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  // Connect adjacent levels: from level L to level L+1
  for (let i = 0; i < nodes.length; i++) {
    const n1 = nodes[i];
    for (let j = 0; j < nodes.length; j++) {
      const n2 = nodes[j];
      // Check if n2 is strictly one level above n1 and is an immediate generalization of n1
      if (n2.level === n1.level + 1) {
        if (isImmediateGeneralizationSimple(n2.values, n1.values)) {
          edges.push({
            id: `${n1.id}->${n2.id}`,
            source: n1.id,
            target: n2.id,
            isConsistent: n1.isConsistent && n2.isConsistent,
          });
        }
      }
    }
  }

  return { nodes, edges };
}

function isImmediateGeneralizationSimple(hGen, hSpec) {
  if (isNone(hSpec)) {
    return !isNone(hGen) && hGen.every(c => c !== '?');
  }
  if (isNone(hGen)) return false;
  if (hGen.length !== hSpec.length) return false;

  let wildcardDiff = 0;
  for (let i = 0; i < hGen.length; i++) {
    if (hGen[i] === '?' && hSpec[i] !== '?') {
      wildcardDiff++;
    } else if (hGen[i] !== hSpec[i]) {
      return false;
    }
  }
  return wildcardDiff === 1;
}

