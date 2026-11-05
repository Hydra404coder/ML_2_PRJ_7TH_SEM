/**
 * Version Space Prediction Engine
 * Evaluates unseen instances against surviving hypotheses.
 */

import { covers, formatHypothesis, isNone } from './hypothesis.js';

/**
 * Predicts the classification of an unseen instance using the active version space.
 *
 * @param {Object|string[]} instance - Instance attribute values
 * @param {string[]} attrNames - Attribute keys
 * @param {Array<Object>} consistentHypotheses - Hypotheses surviving in Version Space
 * @returns {Object} Comprehensive prediction result
 */
export function predictInstance(instance, attrNames, consistentHypotheses) {
  const x = Array.isArray(instance)
    ? instance
    : attrNames.map(name => instance[name]);

  // Filter out null hypothesis if present
  const activeHypotheses = consistentHypotheses.filter(h => !isNone(h.values));

  if (activeHypotheses.length === 0) {
    return {
      prediction: 'EMPTY',
      label: 'Empty Version Space',
      badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      summary: 'Cannot predict: The version space contains zero valid hypotheses.',
      explanation: 'Because the version space is empty, the learner cannot make any valid prediction under this hypothesis space.',
      yesCount: 0,
      noCount: 0,
      totalCount: 0,
      details: [],
    };
  }

  const details = [];
  let yesCount = 0;
  let noCount = 0;

  for (const item of activeHypotheses) {
    const doesCover = covers(item.values, x);
    const vote = doesCover ? 'YES' : 'NO';
    if (doesCover) {
      yesCount++;
    } else {
      noCount++;
    }

    details.push({
      id: item.id,
      hypothesis: item.label || formatHypothesis(item.values),
      vote,
      boundaryRole: item.boundaryRole,
    });
  }

  let prediction = 'UNCERTAIN';
  let label = 'UNCERTAIN';
  let badgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  let summary = '';
  let explanation = '';

  if (yesCount === activeHypotheses.length) {
    prediction = 'YES';
    label = 'YES (Positive)';
    badgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    summary = `YES — Unanimous agreement (${yesCount}/${activeHypotheses.length} hypotheses).`;
    explanation = 'Every surviving hypothesis in the version space covers this instance. Regardless of which consistent rule is the true concept, the classification is guaranteed to be YES.';
  } else if (noCount === activeHypotheses.length) {
    prediction = 'NO';
    label = 'NO (Negative)';
    badgeClass = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    summary = `NO — Unanimous agreement (${noCount}/${activeHypotheses.length} hypotheses).`;
    explanation = 'No surviving hypothesis in the version space covers this instance. Regardless of which consistent rule is the true concept, the classification is guaranteed to be NO.';
  } else {
    prediction = 'UNCERTAIN';
    label = 'UNCERTAIN (Conflicting)';
    badgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    summary = `UNCERTAIN — Conflict detected (${yesCount} predict YES, ${noCount} predict NO).`;
    explanation = 'The surviving hypotheses disagree on this instance. More training examples are required to further shrink the version space before a definitive prediction can be made.';
  }

  return {
    prediction,
    label,
    badgeClass,
    summary,
    explanation,
    yesCount,
    noCount,
    totalCount: activeHypotheses.length,
    percentageYes: Math.round((yesCount / activeHypotheses.length) * 100),
    instanceValues: x,
    formattedInstance: formatHypothesis(x),
    details,
  };
}

