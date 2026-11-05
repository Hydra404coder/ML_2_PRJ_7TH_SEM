/**
 * Predefined Scenarios and Datasets for Hypothesis Lab
 * Each scenario contains rich metadata, attribute domains, target concept,
 * base dataset, and educational disclaimers.
 */

export const SCENARIOS = [
  {
    id: 'outdoor-sports',
    title: 'Outdoor Sports Suitability',
    shortTitle: 'Outdoor Sports',
    category: 'Weather & Environment',
    icon: 'Sun',
    accentColor: 'indigo',
    description: 'Learn the conditions that make a day suitable for holding outdoor sports activities based on sky, temperature, and wind.',
    targetConceptQuestion: 'Suitable for outdoor sports?',
    targetConceptHypothesis: '⟨Sunny, Warm, ?⟩',
    targetExplanation: 'A day is suitable if the Sky is Sunny and Temperature is Warm, regardless of Wind strength.',
    disclaimer: 'This is a standard classroom concept learning task (adapted from Tom Mitchell\'s Machine Learning). Real-world sporting decisions account for air quality, precipitation probability, humidity, UV index, and specific sport guidelines.',
    attributes: [
      {
        name: 'Sky',
        icon: 'CloudSun',
        values: ['Sunny', 'Cloudy', 'Rainy'],
        description: 'Atmospheric conditions and cloud cover'
      },
      {
        name: 'Temperature',
        icon: 'Thermometer',
        values: ['Warm', 'Cold'],
        description: 'Ambient temperature level'
      },
      {
        name: 'Wind',
        icon: 'Wind',
        values: ['Weak', 'Strong'],
        description: 'Observed surface wind intensity'
      },
    ],
    baseDataset: [
      { id: 1, values: { Sky: 'Sunny', Temperature: 'Warm', Wind: 'Weak' }, label: 'YES', note: 'Calm sunny warm day: clearly positive' },
      { id: 2, values: { Sky: 'Sunny', Temperature: 'Warm', Wind: 'Strong' }, label: 'YES', note: 'Sunny & warm despite wind: generalizes Wind to ?' },
      { id: 3, values: { Sky: 'Rainy', Temperature: 'Cold', Wind: 'Strong' }, label: 'NO', note: 'Rainy cold day: negative counterexample' },
      { id: 4, values: { Sky: 'Sunny', Temperature: 'Cold', Wind: 'Weak' }, label: 'NO', note: 'Cold day despite sun: constrains Temperature to Warm' },
      { id: 5, values: { Sky: 'Cloudy', Temperature: 'Warm', Wind: 'Weak' }, label: 'NO', note: 'Cloudy warm day: constrains Sky to Sunny' },
      { id: 6, values: { Sky: 'Rainy', Temperature: 'Warm', Wind: 'Strong' }, label: 'NO', note: 'Confirms rainy days are unsuitable' },
    ],
  },
  {
    id: 'fruit-juice',
    title: 'Fruit / Food Classification',
    shortTitle: 'Fruit Classification',
    category: 'Food Science & Botany',
    icon: 'Apple',
    accentColor: 'amber',
    description: 'Learn an educational concept classifying whether a fruit specimen is suitable for fresh juice extraction.',
    targetConceptQuestion: 'Suitable for making juice?',
    targetConceptHypothesis: '⟨?, Juicy, ?⟩',
    targetExplanation: 'Any fruit with a Juicy texture is suitable for juicing, regardless of its Colour or Size.',
    disclaimer: 'This is a simplified educational binary concept learning model. Culinary juicing viability depends on sweetness, acidity, pectin content, seed density, and edible peel properties.',
    attributes: [
      {
        name: 'Colour',
        icon: 'Palette',
        values: ['Orange', 'Yellow', 'Red', 'Green'],
        description: 'External fruit skin coloration'
      },
      {
        name: 'Texture',
        icon: 'Droplets',
        values: ['Juicy', 'Dry'],
        description: 'Internal moisture and pulp texture'
      },
      {
        name: 'Size',
        icon: 'Maximize2',
        values: ['Large', 'Small'],
        description: 'Physical dimension of fruit'
      },
    ],
    baseDataset: [
      { id: 1, values: { Colour: 'Orange', Texture: 'Juicy', Size: 'Small' }, label: 'YES', note: 'Juicy small citrus: positive example' },
      { id: 2, values: { Colour: 'Yellow', Texture: 'Juicy', Size: 'Large' }, label: 'YES', note: 'Juicy large melon/lemon: generalizes Colour and Size' },
      { id: 3, values: { Colour: 'Green', Texture: 'Dry', Size: 'Small' }, label: 'NO', note: 'Dry fruit: negative counterexample' },
      { id: 4, values: { Colour: 'Red', Texture: 'Juicy', Size: 'Large' }, label: 'YES', note: 'Juicy red fruit: reinforces Texture=Juicy' },
      { id: 5, values: { Colour: 'Red', Texture: 'Dry', Size: 'Large' }, label: 'NO', note: 'Red dry fruit: confirms Colour cannot replace Texture' },
      { id: 6, values: { Colour: 'Orange', Texture: 'Dry', Size: 'Small' }, label: 'NO', note: 'Orange dry fruit: ensures G eliminates ? in Texture' },
    ],
  },
  {
    id: 'college-admission',
    title: 'College Admission Eligibility',
    shortTitle: 'College Admission',
    category: 'Academic Administration',
    icon: 'GraduationCap',
    accentColor: 'sky',
    description: 'Explore how a machine determines simplified prerequisite eligibility for a course based on scores, exam qualification, and attendance.',
    targetConceptQuestion: 'Meets simplified eligibility criteria?',
    targetConceptHypothesis: '⟨?, Qualified, Good⟩',
    targetExplanation: 'An applicant meets eligibility if they Qualified in the Entrance Exam and maintained Good Attendance, regardless of raw Academic Score tier.',
    disclaimer: 'Strictly a classroom pedagogical simulation. Actual university admissions rely on holistic review, essays, personal interviews, recommendations, quotas, and contextual socioeconomic factors.',
    attributes: [
      {
        name: 'Academic Score',
        icon: 'Award',
        values: ['High', 'Medium', 'Low'],
        description: 'Past qualifying examination grade level'
      },
      {
        name: 'Entrance Exam',
        icon: 'CheckCircle2',
        values: ['Qualified', 'Not Qualified'],
        description: 'Standardized entrance test status'
      },
      {
        name: 'Attendance',
        icon: 'CalendarCheck',
        values: ['Good', 'Poor'],
        description: 'Prerequisite session attendance history'
      },
    ],
    baseDataset: [
      { id: 1, values: { 'Academic Score': 'High', 'Entrance Exam': 'Qualified', Attendance: 'Good' }, label: 'YES', note: 'Top student: baseline positive' },
      { id: 2, values: { 'Academic Score': 'Medium', 'Entrance Exam': 'Qualified', Attendance: 'Good' }, label: 'YES', note: 'Medium score eligible: generalizes Academic Score to ?' },
      { id: 3, values: { 'Academic Score': 'Low', 'Entrance Exam': 'Not Qualified', Attendance: 'Good' }, label: 'NO', note: 'Exam failed: negative counterexample' },
      { id: 4, values: { 'Academic Score': 'High', 'Entrance Exam': 'Qualified', Attendance: 'Poor' }, label: 'NO', note: 'Poor attendance: constrains Attendance to Good' },
      { id: 5, values: { 'Academic Score': 'Medium', 'Entrance Exam': 'Not Qualified', Attendance: 'Poor' }, label: 'NO', note: 'Both criteria failed: reinforces boundaries' },
      { id: 6, values: { 'Academic Score': 'Low', 'Entrance Exam': 'Qualified', Attendance: 'Good' }, label: 'YES', note: 'Confirms Academic Score is unconstrained (? wild card)' },
    ],
  },
  {
    id: 'plant-watering',
    title: 'Smart Plant Watering',
    shortTitle: 'Smart Plant Care',
    category: 'Agritech & IoT',
    icon: 'Sprout',
    accentColor: 'emerald',
    description: 'Learn when an automated IoT soil monitoring system triggers an irrigation cycle based on soil moisture, temperature, and sunlight.',
    targetConceptQuestion: 'Needs watering?',
    targetConceptHypothesis: '⟨Dry, ?, High⟩',
    targetExplanation: 'Irrigation is required when Soil is Dry and Sunlight intensity is High, regardless of Ambient Temperature.',
    disclaimer: 'Educational demonstration only. Horticultural irrigation algorithms account for plant species, root depth, transpiration rates, soil electrical conductivity, and rain forecast.',
    attributes: [
      {
        name: 'Soil',
        icon: 'Layers',
        values: ['Dry', 'Moist'],
        description: 'Direct soil moisture probe sensor readout'
      },
      {
        name: 'Temperature',
        icon: 'ThermometerSun',
        values: ['Hot', 'Cool'],
        description: 'Greenhouse ambient air temperature'
      },
      {
        name: 'Sunlight',
        icon: 'SunMedium',
        values: ['High', 'Low'],
        description: 'Solar irradiance / photo-sensor level'
      },
    ],
    baseDataset: [
      { id: 1, values: { Soil: 'Dry', Temperature: 'Hot', Sunlight: 'High' }, label: 'YES', note: 'Dry soil in hot direct sun: urgently needs water' },
      { id: 2, values: { Soil: 'Dry', Temperature: 'Cool', Sunlight: 'High' }, label: 'YES', note: 'Dry soil under high light: generalizes Temperature to ?' },
      { id: 3, values: { Soil: 'Moist', Temperature: 'Hot', Sunlight: 'High' }, label: 'NO', note: 'Moist soil: no watering required' },
      { id: 4, values: { Soil: 'Dry', Temperature: 'Hot', Sunlight: 'Low' }, label: 'NO', note: 'Dry but low light: constrains Sunlight to High' },
      { id: 5, values: { Soil: 'Moist', Temperature: 'Cool', Sunlight: 'Low' }, label: 'NO', note: 'Moist and cool: negative example' },
      { id: 6, values: { Soil: 'Moist', Temperature: 'Hot', Sunlight: 'Low' }, label: 'NO', note: 'Reinforces Soil=Dry constraint' },
    ],
  },
];

/**
 * Available learning modes with instructional guidance
 */
export const EXPERIMENT_MODES = [
  {
    id: 'guided',
    name: 'Guided Learning',
    badge: 'Recommended',
    tagline: 'Step-by-step walkthrough of positive and negative examples with in-depth commentary.',
    icon: 'Compass',
    description: 'The optimal first experience. Step through a carefully balanced dataset containing both positive and negative cases. Watch how S generalizes and G specializes until they meet.',
    filterExamples: (dataset) => dataset,
  },
  {
    id: 'positive-only',
    name: 'Positive Examples Only',
    badge: 'Boundary Study',
    tagline: 'Observe how positive examples generalize S while leaving G completely unspecialized.',
    icon: 'PlusCircle',
    description: 'Processes only positive training examples. Demonstrates Find-S behavior: the specific boundary S steadily expands, but because no counterexamples are provided, G stays at ⟨?, ?, ?⟩ and the version space remains broad.',
    filterExamples: (dataset) => dataset.filter(ex => ex.label === 'YES' || ex.label === '+'),
  },
  {
    id: 'negative-only',
    name: 'Negative Examples Only',
    badge: 'Counterexample Study',
    tagline: 'Observe how negative examples specialize G while S remains stuck at the null hypothesis.',
    icon: 'MinusCircle',
    description: 'Processes only negative training examples. Shows that negative instances force G to branch out into minimal specializations, but without positive examples to anchor S, the learner cannot discover what should be included.',
    filterExamples: (dataset) => dataset.filter(ex => ex.label === 'NO' || ex.label === '-'),
  },
  {
    id: 'mixed',
    name: 'Mixed Learning (Full Search)',
    badge: 'Candidate Elimination',
    tagline: 'Bidirectional search through the hypothesis space narrowing version space from both ends.',
    icon: 'Layers',
    description: 'The classic Candidate Elimination experience. Demonstrates how positive and negative examples work in tandem like a vise, squeezing the version space until it converges onto the true concept.',
    filterExamples: (dataset) => dataset,
  },
];

