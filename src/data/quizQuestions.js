/**
 * Interactive Knowledge Check Questions
 */

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'What is a "hypothesis space" (H) in concept learning?',
    options: [
      { text: 'The set of all possible candidate rules or hypotheses that the learner can consider', isCorrect: true },
      { text: 'The raw dataset of positive and negative examples collected from experiments', isCorrect: false },
      { text: 'The server memory allocated to store prediction probabilities', isCorrect: false },
      { text: 'A random collection of guesses generated during training', isCorrect: false },
    ],
    explanation: 'The hypothesis space H is the set of all candidate functions or conjunctive rules that the learning algorithm is capable of expressing and evaluating.',
  },
  {
    id: 2,
    question: 'In a conjunctive hypothesis like ⟨Sunny, ?, Weak⟩, what does the symbol "?" represent?',
    options: [
      { text: 'A wildcard that accepts ANY allowed value for that attribute', isCorrect: true },
      { text: 'An unknown or corrupted sensor measurement', isCorrect: false },
      { text: 'A value that must strictly be absent or rejected', isCorrect: false },
      { text: 'A probabilistic estimate with 50% confidence', isCorrect: false },
    ],
    explanation: 'A question mark "?" indicates that the hypothesis places no restriction on that attribute; any value in that attribute\'s domain will satisfy the constraint.',
  },
  {
    id: 3,
    question: 'What effect does a POSITIVE training example have on the boundaries in Candidate Elimination?',
    options: [
      { text: 'It forces S to generalize minimally to cover it, and removes any G hypotheses that fail to cover it', isCorrect: true },
      { text: 'It forces G to specialize, while keeping S unchanged', isCorrect: false },
      { text: 'It resets both S and G to the null hypothesis', isCorrect: false },
      { text: 'It eliminates all hypotheses that have wildcards', isCorrect: false },
    ],
    explanation: 'Positive examples must be covered by all consistent hypotheses. Therefore, S must generalize upwards to encompass the instance, and any hypothesis in G that fails to cover the positive instance is immediately eliminated.',
  },
  {
    id: 4,
    question: 'What effect does a NEGATIVE training example have on the boundaries in Candidate Elimination?',
    options: [
      { text: 'It forces G to specialize minimally to exclude it, and removes any S hypotheses that cover it', isCorrect: true },
      { text: 'It forces S to generalize to the wildcard hypothesis', isCorrect: false },
      { text: 'It causes the entire version space to double in size', isCorrect: false },
      { text: 'It has no effect on G because G only considers positive examples', isCorrect: false },
    ],
    explanation: 'Negative examples must NOT be covered by any consistent hypothesis. Any hypothesis in S that covers a negative example is inconsistent and removed, while G is specialized downward into minimal sub-hypotheses that exclude the negative instance.',
  },
  {
    id: 5,
    question: 'What is the "version space" with respect to a hypothesis space H and dataset D?',
    options: [
      { text: 'The subset of all hypotheses in H that are completely consistent with every observed training example in D', isCorrect: true },
      { text: 'The software version number of the machine learning model', isCorrect: false },
      { text: 'The list of all negative examples that were misclassified', isCorrect: false },
      { text: 'The difference between training accuracy and testing loss', isCorrect: false },
    ],
    explanation: 'The version space VS_{H,D} is defined as all candidate hypotheses in H that correctly classify every positive example as positive and every negative example as negative.',
  },
  {
    id: 6,
    question: 'If multiple hypotheses remain in the version space after training, what can we conclude?',
    options: [
      { text: 'The learner has not seen enough evidence to uniquely pinpoint a single concept; multiple rules remain plausible', isCorrect: true },
      { text: 'The learning algorithm has crashed or suffered an internal error', isCorrect: false },
      { text: 'The training data is definitely corrupted by noise', isCorrect: false },
      { text: 'The machine is certain that the target concept does not exist', isCorrect: false },
    ],
    explanation: 'Multiple surviving hypotheses simply mean that the observed data is compatible with several distinct rules. Additional, strategically chosen training examples are needed to disambiguate them.',
  },
  {
    id: 7,
    question: 'When the learner outputs "UNCERTAIN" on an unseen test example in Prediction Explorer, what does this mean?',
    options: [
      { text: 'Some surviving hypotheses in the version space predict YES, while others predict NO', isCorrect: true },
      { text: 'The computer lacks sufficient CPU power to compute the answer', isCorrect: false },
      { text: 'The test example contained invalid characters or empty fields', isCorrect: false },
      { text: 'The model has calculated a 0% probability of success', isCorrect: false },
    ],
    explanation: 'An UNCERTAIN prediction occurs when the version space is split: one or more consistent hypotheses cover the test instance (predicting positive), while others do not cover it (predicting negative). The current data is genuinely insufficient to decide.',
  },
  {
    id: 8,
    question: 'What does the symbol "Ø" in the initial specific boundary S₀ = ⟨Ø, Ø, ...⟩ signify?',
    options: [
      { text: 'The null constraint indicating that NO instance is accepted yet (the maximally specific state)', isCorrect: true },
      { text: 'That the attribute is optional and can be skipped during classification', isCorrect: false },
      { text: 'A zero numerical value in continuous data', isCorrect: false },
      { text: 'An infinite loop flag in the search algorithm', isCorrect: false },
    ],
    explanation: 'The symbol Ø represents the empty set of accepted instances. Initializing S to ⟨Ø, Ø, ...⟩ ensures that S starts at the maximally specific point in the lattice before generalizing upon receiving positive evidence.',
  },
];
