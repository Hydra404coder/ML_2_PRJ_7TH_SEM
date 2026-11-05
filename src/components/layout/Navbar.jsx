import React from 'react';
import {
  Compass,
  BookOpen,
  Layers,
  FlaskConical,
  Award,
  HelpCircle,
} from 'lucide-react';
import { ThemeSelector } from '../common/ThemeSelector.jsx';

export function Navbar({ activeTab, onNavigate, onOpenGlossary }) {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: Compass },
    { id: 'fundamentals', label: 'Theory Notes', icon: BookOpen },
    { id: 'scenarios', label: 'Lab Scenarios', icon: Layers },
    { id: 'experiment', label: 'Workbench', icon: FlaskConical },
    { id: 'quiz', label: 'Knowledge Check', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b theme-border theme-surface backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Institutional / Academic Brand Header */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight theme-text-primary">
                Hypothesis Lab
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold">
                CS-ML1
              </span>
            </div>
            <p className="text-[11px] theme-text-muted hidden sm:block">
              Interactive Concept Learning & Version Space Explorer
            </p>
          </div>
        </button>

        {/* Clean Center Navigation Tabs */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'scenarios' && activeTab === 'scenario-detail');
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 shadow-sm'
                    : 'theme-text-secondary hover:theme-surface-subtle border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'theme-text-muted'}`} />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Tooling: Theme Toggle & Glossary */}
        <div className="flex items-center gap-2">
          <ThemeSelector />

          <button
            onClick={onOpenGlossary}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border theme-border hover:theme-surface-subtle theme-text-secondary text-xs font-medium transition-colors"
            title="Open Terminology Glossary"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline">Glossary</span>
          </button>
        </div>
      </div>
    </header>
  );
}
