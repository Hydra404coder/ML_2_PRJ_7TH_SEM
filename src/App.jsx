import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar.jsx';
import { Breadcrumbs } from './components/layout/Breadcrumbs.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { GlossaryModal } from './components/common/GlossaryModal.jsx';

import { DashboardHero } from './components/dashboard/DashboardHero.jsx';
import { JourneySteps } from './components/dashboard/JourneySteps.jsx';
import { ScenarioGrid } from './components/dashboard/ScenarioGrid.jsx';
import { DiscoverySection } from './components/dashboard/DiscoverySection.jsx';

import { FundamentalsView } from './components/learning/FundamentalsView.jsx';
import { ScenarioDetailPage } from './components/scenarios/ScenarioDetailPage.jsx';
import { ExperimentWorkspace } from './components/experiment/ExperimentWorkspace.jsx';
import { KnowledgeCheck } from './components/quiz/KnowledgeCheck.jsx';

import { SCENARIOS } from './data/scenarios.js';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'fundamentals' | 'scenarios' | 'scenario-detail' | 'experiment' | 'quiz'
  const [activeScenarioId, setActiveScenarioId] = useState('outdoor-sports');
  const [activeModeId, setActiveModeId] = useState('guided');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  const currentScenario = SCENARIOS.find(s => s.id === activeScenarioId) || SCENARIOS[0];

  const handleNavigate = (tab, params = {}) => {
    if (params.scenarioId) {
      setActiveScenarioId(params.scenarioId);
    }
    if (params.modeId) {
      setActiveModeId(params.modeId);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectScenario = (scenarioId) => {
    setActiveScenarioId(scenarioId);
    setActiveTab('scenario-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartExperiment = (scenarioId, modeId) => {
    setActiveScenarioId(scenarioId);
    setActiveModeId(modeId);
    setActiveTab('experiment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compute breadcrumb trail
  const getBreadcrumbItems = () => {
    if (activeTab === 'dashboard') return [];
    if (activeTab === 'fundamentals') return [{ label: 'Fundamentals' }];
    if (activeTab === 'scenarios') return [{ label: 'Explore Scenarios' }];
    if (activeTab === 'scenario-detail') {
      return [
        { label: 'Scenarios', tab: 'scenarios' },
        { label: currentScenario.shortTitle },
      ];
    }
    if (activeTab === 'experiment') {
      return [
        { label: 'Scenarios', tab: 'scenarios' },
        { label: currentScenario.shortTitle, tab: 'scenario-detail' },
        { label: 'Experiment Workspace' },
      ];
    }
    if (activeTab === 'quiz') return [{ label: 'Knowledge Check' }];
    return [];
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
      />

      {/* Breadcrumb Trail */}
      {activeTab !== 'dashboard' && (
        <Breadcrumbs items={getBreadcrumbItems()} onNavigate={handleNavigate} />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-0">
            <DashboardHero
              onStartLearning={() => handleNavigate('fundamentals')}
              onExploreScenarios={() => handleNavigate('scenarios')}
            />
            <JourneySteps onSelectStep={handleNavigate} />
            <ScenarioGrid onSelectScenario={handleSelectScenario} />
            <DiscoverySection onOpenFundamentals={() => handleNavigate('fundamentals')} />
          </div>
        )}

        {/* FUNDAMENTALS */}
        {activeTab === 'fundamentals' && (
          <FundamentalsView onExploreScenarios={() => handleNavigate('scenarios')} />
        )}

        {/* SCENARIOS GRID */}
        {activeTab === 'scenarios' && (
          <div className="py-6">
            <ScenarioGrid onSelectScenario={handleSelectScenario} />
          </div>
        )}

        {/* SCENARIO DETAIL PAGE */}
        {activeTab === 'scenario-detail' && (
          <ScenarioDetailPage
            scenario={currentScenario}
            onStartExperiment={handleStartExperiment}
            onBack={() => handleNavigate('scenarios')}
          />
        )}

        {/* EXPERIMENT WORKSPACE */}
        {activeTab === 'experiment' && (
          <ExperimentWorkspace
            scenario={currentScenario}
            modeId={activeModeId}
            onBackToScenarios={() => handleNavigate('scenarios')}
            onNavigateToQuiz={() => handleNavigate('quiz')}
          />
        )}

        {/* KNOWLEDGE CHECK / QUIZ */}
        {activeTab === 'quiz' && (
          <KnowledgeCheck
            onBackToDashboard={() => handleNavigate('dashboard')}
            onOpenFundamentals={() => handleNavigate('fundamentals')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Concept Learning Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
}

export default App;
