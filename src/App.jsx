import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
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

function AppContent() {
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

  const getBreadcrumbItems = () => {
    if (activeTab === 'dashboard') return [];
    if (activeTab === 'fundamentals') return [{ label: 'Theory Notes' }];
    if (activeTab === 'scenarios') return [{ label: 'Lab Scenarios' }];
    if (activeTab === 'scenario-detail') {
      return [
        { label: 'Lab Scenarios', tab: 'scenarios' },
        { label: currentScenario.shortTitle },
      ];
    }
    if (activeTab === 'experiment') {
      return [
        { label: 'Lab Scenarios', tab: 'scenarios' },
        { label: currentScenario.shortTitle, tab: 'scenario-detail' },
        { label: 'Workbench' },
      ];
    }
    if (activeTab === 'quiz') return [{ label: 'Knowledge Check' }];
    return [];
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors">
      {/* Institutional Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
      />

      {/* Breadcrumb Navigation */}
      {activeTab !== 'dashboard' && (
        <Breadcrumbs items={getBreadcrumbItems()} onNavigate={handleNavigate} />
      )}

      {/* Main Content View */}
      <main className="flex-1">
        {activeTab === 'dashboard' && (
          <div>
            <DashboardHero
              onStartLearning={() => handleNavigate('fundamentals')}
              onExploreScenarios={() => handleNavigate('scenarios')}
            />
            <JourneySteps onSelectStep={handleNavigate} />
            <ScenarioGrid onSelectScenario={handleSelectScenario} />
            <DiscoverySection onOpenFundamentals={() => handleNavigate('fundamentals')} />
          </div>
        )}

        {activeTab === 'fundamentals' && (
          <FundamentalsView onExploreScenarios={() => handleNavigate('scenarios')} />
        )}

        {activeTab === 'scenarios' && (
          <div className="py-4">
            <ScenarioGrid onSelectScenario={handleSelectScenario} />
          </div>
        )}

        {activeTab === 'scenario-detail' && (
          <ScenarioDetailPage
            scenario={currentScenario}
            onStartExperiment={handleStartExperiment}
            onBack={() => handleNavigate('scenarios')}
          />
        )}

        {activeTab === 'experiment' && (
          <ExperimentWorkspace
            scenario={currentScenario}
            modeId={activeModeId}
            onBackToScenarios={() => handleNavigate('scenarios')}
            onNavigateToQuiz={() => handleNavigate('quiz')}
          />
        )}

        {activeTab === 'quiz' && (
          <KnowledgeCheck
            onBackToDashboard={() => handleNavigate('dashboard')}
            onOpenFundamentals={() => handleNavigate('fundamentals')}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Terminology Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
