/**
 * Glossary of key Concept Learning and Version Space terms.
 */

export const GLOSSARY_TERMS = [
  {
    term: 'Concept Learning',
    symbol: 'c: X → {0, 1}',
    shortDef: 'Inferring a boolean-valued function from positive and negative training examples.',
    fullDef: 'Concept learning is the task of learning a general description of a category (the target concept) from a collection of labelled training instances. The learner searches through a predefined hypothesis space to find a hypothesis that matches the true concept.',
  },
  {
    term: 'Hypothesis Space',
    symbol: 'H',
    shortDef: 'The set of all possible candidate rules or concepts that the learner is capable of expressing.',
    fullDef: 'A hypothesis space H contains all candidate expressions the learning algorithm can consider. In conjunctive concept learning over n discrete attributes, H consists of all vectors where each attribute constraint is either a specific allowed value, a wildcard "?", or the empty constraint "Ø".',
  },
  {
    term: 'Wildcard Constraint',
    symbol: '?',
    shortDef: 'Matches ANY valid value for an attribute without constraint.',
    fullDef: 'In a hypothesis vector, a question mark "?" at attribute position i indicates that the concept accepts any allowed value for that attribute. For example, ⟨Sunny, Warm, ?⟩ accepts both Weak and Strong wind.',
  },
  {
    term: 'Null Constraint',
    symbol: 'Ø',
    shortDef: 'The empty hypothesis constraint that matches NO instances.',
    fullDef: 'In the specific boundary initialization S₀ = ⟨Ø, Ø, ...⟩, the symbol Ø signifies that no value is accepted. It represents the maximally specific starting point before any positive example has been observed.',
  },
  {
    term: 'General-to-Specific Ordering',
    symbol: '≥_g',
    shortDef: 'Hypothesis h₁ is more general than or equal to h₂ if every instance covered by h₂ is also covered by h₁.',
    fullDef: 'This ordering forms a partially ordered set (poset) or lattice over H. It allows learning algorithms to systematically navigate the space without having to explicitly test every single hypothesis against the training data.',
  },
  {
    term: 'Positive Example',
    symbol: '⟨x, +⟩ or YES',
    shortDef: 'A training instance that belongs to the target concept.',
    fullDef: 'Positive examples provide evidence of what MUST be included. They force the specific boundary S to generalize minimally upward, and eliminate any hypothesis in G that fails to cover the positive instance.',
  },
  {
    term: 'Negative Example',
    symbol: '⟨x, -⟩ or NO',
    shortDef: 'A training instance that does NOT belong to the target concept.',
    fullDef: 'Negative examples provide counterevidence of what MUST NOT be included. They force the general boundary G to specialize minimally downward, and eliminate any hypothesis in S that covers the negative instance.',
  },
  {
    term: 'Specific Boundary',
    symbol: 'S',
    shortDef: 'The set of maximally specific hypotheses in H consistent with all observed data.',
    fullDef: 'Hypotheses in S represent the tightest, most restrictive rules that still cover all positive examples without covering any negative examples. S summarizes the lower boundary of the version space.',
  },
  {
    term: 'General Boundary',
    symbol: 'G',
    shortDef: 'The set of maximally general hypotheses in H consistent with all observed data.',
    fullDef: 'Hypotheses in G represent the broadest, most inclusive rules that exclude all negative examples while still covering all positive examples. G summarizes the upper boundary of the version space.',
  },
  {
    term: 'Version Space',
    symbol: 'VS_{H,D}',
    shortDef: 'The subset of all hypotheses in H that are completely consistent with every training example observed so far.',
    fullDef: 'In Candidate Elimination, the entire version space is efficiently bounded between G and S: VS = { h ∈ H | ∃s ∈ S, g ∈ G such that g ≥_g h ≥_g s }. As more examples are provided, the version space shrinks until S and G converge.',
  },
  {
    term: 'Uncertain Prediction',
    symbol: 'Conflict / Ambiguity',
    shortDef: 'Occurs when surviving hypotheses in the version space disagree on how to classify an unseen instance.',
    fullDef: 'If some surviving hypotheses in the version space cover the test instance (predicting YES) while others do not (predicting NO), the available training data cannot logically distinguish the answer. The learner honestly reports UNCERTAIN.',
  },
];

