/**
 * Hypothesis representation and ordering operations for Concept Learning.
 */

export const ANY = '?';
export const NONE = 'Ø';

/**
 * Checks if a hypothesis is the null/empty hypothesis (covers no instances).
 * @param {string[]|string} h
 * @returns {boolean}
 */
export function isNone(h) {
  if (h === NONE || h === null || h === undefined) return true;
  if (Array.isArray(h)) {
    return h.length === 0 || h.every(val => val === NONE);
  }
  return false;
}

/**
 * Checks if a hypothesis is the most general hypothesis ⟨?, ?, ..., ?⟩
 * @param {string[]} h
 * @returns {boolean}
 */
export function isMostGeneral(h) {
  if (isNone(h) || !Array.isArray(h)) return false;
  return h.every(val => val === ANY);
}

/**
 * Formats a hypothesis array into standard mathematical notation: ⟨c1, c2, ...⟩
 * @param {string[]|string} h
 * @returns {string}
 */
export function formatHypothesis(h) {
  if (isNone(h)) return '⟨Ø, Ø, ...⟩';
  if (typeof h === 'string') return h;
  return `⟨${h.join(', ')}⟩`;
}

/**
 * Checks if hypothesis h equals hypothesis target
 * @param {string[]} h1
 * @param {string[]} h2
 * @returns {boolean}
 */
export function areEqual(h1, h2) {
  const n1 = isNone(h1);
  const n2 = isNone(h2);
  if (n1 && n2) return true;
  if (n1 !== n2) return false;
  if (h1.length !== h2.length) return false;
  return h1.every((val, idx) => val === h2[idx]);
}

/**
 * Determines whether hypothesis h covers instance x.
 * An instance is covered if for every attribute constraint i,
 * h[i] === '?' OR h[i] === x[i].
 * The null hypothesis covers NO instances.
 * @param {string[]} h
 * @param {Object|string[]} instance - Object with attribute keys or array of values
 * @param {string[]} [attrNames] - Required if instance is an object
 * @returns {boolean}
 */
export function covers(h, instance, attrNames) {
  if (isNone(h)) return false;

  const instanceValues = Array.isArray(instance)
    ? instance
    : attrNames.map(name => instance[name]);

  for (let i = 0; i < h.length; i++) {
    const constraint = h[i];
    const value = instanceValues[i];
    if (constraint !== ANY && constraint !== value) {
      return false;
    }
  }
  return true;
}

/**
 * Generality test: Is h1 more general than or equal to h2? (h1 >=g h2)
 * Definition: h1 >=g h2 iff every instance covered by h2 is also covered by h1.
 * For conjunctive representations:
 * - If h2 is null, ANY hypothesis is >=g h2.
 * - If h1 is null and h2 is not, h1 is NOT >=g h2.
 * - Otherwise, for all attributes i, h1[i] === '?' or h1[i] === h2[i].
 * @param {string[]} h1
 * @param {string[]} h2
 * @returns {boolean}
 */
export function isMoreGeneralOrEqual(h1, h2) {
  const n1 = isNone(h1);
  const n2 = isNone(h2);

  if (n2) return true; // Null is covered by everything
  if (n1) return false; // Non-null cannot be covered by null

  if (h1.length !== h2.length) return false;

  for (let i = 0; i < h1.length; i++) {
    if (h1[i] !== ANY && h1[i] !== h2[i]) {
      return false;
    }
  }
  return true;
}

/**
 * Strictly more general: h1 >g h2
 * @param {string[]} h1
 * @param {string[]} h2
 * @returns {boolean}
 */
export function isStrictlyMoreGeneral(h1, h2) {
  return isMoreGeneralOrEqual(h1, h2) && !areEqual(h1, h2);
}

/**
 * Checks if h_gen is an immediate generalization of h_spec (covers h_spec in poset lattice).
 * In a conjunctive space:
 * - If h_spec is null, an immediate generalization is any fully specific hypothesis (0 wildcards).
 * - If h_spec is non-null, h_gen is an immediate generalization iff h_gen differs from h_spec
 *   in EXACTLY ONE position where h_gen has '?' and h_spec has a specific value.
 * @param {string[]} h_gen
 * @param {string[]} h_spec
 * @returns {boolean}
 */
export function isImmediateGeneralization(h_gen, h_spec) {
  if (isNone(h_spec)) {
    // Immediate generalization of null is a fully ground hypothesis (no '?')
    return !isNone(h_gen) && h_gen.every(c => c !== ANY);
  }
  if (isNone(h_gen)) return false;
  if (!isStrictlyMoreGeneral(h_gen, h_spec)) return false;

  let wildcardDiff = 0;
  for (let i = 0; i < h_gen.length; i++) {
    if (h_gen[i] === ANY && h_spec[i] !== ANY) {
      wildcardDiff++;
    } else if (h_gen[i] !== h_spec[i]) {
      return false;
    }
  }
  return wildcardDiff === 1;
}

/**
 * Returns the generality score/level:
 * - -1 for null hypothesis
 * - count of '?' wildcards (0 to numAttributes) for non-null hypotheses.
 * @param {string[]} h
 * @returns {number}
 */
export function getGeneralityLevel(h) {
  if (isNone(h)) return -1;
  return h.filter(c => c === ANY).length;
}

/**
 * Generates the complete finite hypothesis space for given attributes.
 * Each attribute can take any of its domain values, or '?'.
 * Also includes the initial null hypothesis ⟨Ø, Ø, ...⟩.
 * @param {Array<{name: string, values: string[]}>} attributes
 * @returns {Array<{id: string, values: string[], label: string, level: number}>}
 */
export function generateHypothesisSpace(attributes) {
  const numAttrs = attributes.length;
  const domainChoices = attributes.map(attr => [...attr.values, ANY]);

  const results = [];
  let idCounter = 1;

  // Add the null hypothesis
  const nullHyp = new Array(numAttrs).fill(NONE);
  results.push({
    id: 'H_null',
    values: nullHyp,
    label: formatHypothesis(nullHyp),
    level: -1,
    isNone: true,
  });

  // Cartesian product
  function backtrack(index, current) {
    if (index === numAttrs) {
      results.push({
        id: `H${idCounter++}`,
        values: [...current],
        label: formatHypothesis(current),
        level: current.filter(c => c === ANY).length,
        isNone: false,
      });
      return;
    }

    for (const val of domainChoices[index]) {
      current.push(val);
      backtrack(index + 1, current);
      current.pop();
    }
  }

  backtrack(0, []);
  return results;
}
