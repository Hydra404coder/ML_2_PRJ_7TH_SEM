# Hypothesis Lab — Interactive Concept Learning & Hypothesis-Space Explorer

> **Module 1: General-to-Specific Ordering and Hypothesis-Space Search**  
> An educational web application demonstrating Tom Mitchell's **Candidate Elimination Algorithm**, S and G boundaries, Version Space lattices, and epistemic prediction uncertainty.

---

## 🔬 Project Overview

**Hypothesis Lab** is an interactive, student-facing machine learning learning laboratory. It provides undergraduate computer science and AI students with a deterministic, visual playground to step through concept learning problems.

Instead of treating concept learning as abstract mathematics or black-box code, students can:
1. Observe positive and negative training examples enter the learning engine one by one.
2. Watch the maximally specific boundary ($S$) generalize upwards ($\uparrow$) and the maximally general boundary ($G$) specialize downwards ($\downarrow$).
3. Explore the **full hypothesis-space lattice (Poset)** color-coded by boundary role, surviving status, and elimination step.
4. Inspect exactly why each hypothesis was eliminated (*"Too specific to cover positive example #k"* or *"Too general: incorrectly covers negative counterexample #k"*).
5. Query the surviving **Version Space** with unseen test instances to observe **YES**, **NO**, or **UNCERTAIN** predictions.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18+ recommended, v20+ or v22+ fully supported)
- **npm** (v9+ or v10+)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` to explore the application.

### 3. Run Automated Unit Tests
```bash
npm test
```
Runs 15 comprehensive unit tests verifying coverage, generality ordering, minimal generalization of $S$, minimal specialization of $G$, bidirectional Candidate Elimination convergence, contradiction detection, and prediction certainty.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory.

---

## 📚 4 Predefined Educational Scenarios

| Scenario | Attributes & Values | Target Concept | Base Dataset |
| :--- | :--- | :--- | :--- |
| **1. Outdoor Sports Suitability** | **Sky** (Sunny, Cloudy, Rainy)<br>**Temperature** (Warm, Cold)<br>**Wind** (Weak, Strong) | $\langle \text{Sunny}, \text{Warm}, ? \rangle$<br>*"Suitable if Sunny and Warm"* | 6 Examples (Calm sunny day, windy sunny day, rainy cold day, etc.) |
| **2. Fruit / Food Classification** | **Colour** (Orange, Yellow, Red, Green)<br>**Texture** (Juicy, Dry)<br>**Size** (Large, Small) | $\langle ?, \text{Juicy}, ? \rangle$<br>*"Suitable for making juice if Juicy"* | 6 Examples (Citrus, melon, dry berries, etc.) |
| **3. College Admission Eligibility** | **Academic Score** (High, Medium, Low)<br>**Entrance Exam** (Qualified, Not Qualified)<br>**Attendance** (Good, Poor) | $\langle ?, \text{Qualified}, \text{Good} \rangle$<br>*"Qualified exam and Good attendance"* | 6 Examples (High score, exam passed, attendance checks) |
| **4. Smart Plant Watering** | **Soil** (Dry, Moist)<br>**Temperature** (Hot, Cool)<br>**Sunlight** (High, Low) | $\langle \text{Dry}, ?, \text{High} \rangle$<br>*"Needs watering when Soil is Dry & Sun is High"* | 6 Examples (IoT soil sensor, greenhouse readings) |

*Disclaimer: All scenarios are simplified classroom educational models designed for demonstrating binary concept learning algorithms.*

---

## 🧪 4 Experiment Modes

1. **Guided Learning (Recommended)**: Step-by-step walkthrough of balanced positive and negative examples with detailed algorithmic commentary.
2. **Positive Examples Only**: Demonstrates Find-S behavior where $S$ steadily expands, but because no counterexamples are provided, $G$ remains at $\langle ?, ?, ... \rangle$ and the version space stays broad.
3. **Negative Examples Only**: Demonstrates how negative instances force $G$ to branch into minimal specializations, but without positive examples to anchor $S$, the learner cannot discover what must be included.
4. **Mixed Learning (Full Candidate Elimination)**: Bidirectional search demonstrating how positive and negative examples act in tandem like a vise, squeezing the version space until it converges.

---

## 🧩 Architectural Highlights & Code Organization

```
src/
├── App.jsx                     # Application shell, router, breadcrumbs, persistent state
├── main.jsx                    # React entrypoint
├── index.css                   # Tailwind styles, glassmorphism, lattice themes
├── engine/                     # Pure, deterministic algorithms (independent of UI)
│   ├── hypothesis.js           # Coverage, generality ordering (>=g), H generation
│   ├── candidateElimination.js # S & G boundaries, minimal gen/spec, pruning
│   ├── versionSpace.js         # Exact VS verification, elimination reason mapping
│   ├── prediction.js           # Query engine for unseen instances (YES/NO/UNCERTAIN)
│   └── engine.test.js          # Vitest suite (15 unit tests)
├── data/
│   ├── scenarios.js            # Scenario definitions, attributes, and datasets
│   ├── glossary.js             # 11 core concept learning terms with symbols
│   └── quizQuestions.js        # 8 interactive self-assessment quiz questions
└── components/
    ├── layout/                 # Navbar, Breadcrumbs, Footer
    ├── dashboard/              # Hero, 5-step journey, 4 scenario cards, discovery
    ├── learning/               # 13 Fundamentals, Hierarchy diagram, Generality comparator
    ├── scenarios/              # Scenario details, dataset table, mode selector
    ├── experiment/             # Workspace, playback bar, example card, boundary card, table
    ├── visualizations/         # Poset Lattice graph with zoom/pan and node inspection
    ├── prediction/             # Prediction Explorer with interactive queries & history
    ├── results/                # Synthesis, CAN/CANNOT conclude, inductive bias caveats
    └── quiz/                   # Knowledge Check with instant grading & confetti
```

---

## 🛠️ Tech Stack

- **React 18** with **Vite 6**
- **Tailwind CSS** (modern dark mode palette, custom typography, glows)
- **Recharts** (deterministic version space contraction curve)
- **Lucide React** (feather icons)
- **Canvas Confetti** (quiz celebration)
- **Vitest** (comprehensive unit test suite)

---

## 📜 Educational References

- Mitchell, Tom M. *Machine Learning*. McGraw-Hill, 1997. Chapter 2: Concept Learning and the General-to-Specific Ordering.
- Candidate Elimination Algorithm (Mitchell 1977, 1997).

