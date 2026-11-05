import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { Sun, Moon, BookOpen, ChevronDown, Check } from 'lucide-react';

export function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const iconMap = {
    Sun,
    Moon,
    BookOpen,
  };

  const currentTheme = themes.find(t => t.id === theme) || themes[0];
  const CurrentIcon = iconMap[currentTheme.icon] || Sun;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border theme-border hover:theme-surface-subtle text-xs font-medium transition-colors"
        title="Change application theme"
        aria-label="Theme selector"
      >
        <CurrentIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span className="hidden sm:inline theme-text-secondary">{currentTheme.name}</span>
        <ChevronDown className="w-3 h-3 theme-text-muted" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 rounded-xl border theme-border theme-surface shadow-lg z-50 p-1.5 animate-in fade-in duration-150">
          <div className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 theme-text-muted">
            Display Theme
          </div>
          {themes.map((t) => {
            const Icon = iconMap[t.icon] || Sun;
            const isSelected = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'theme-text-secondary hover:theme-surface-subtle'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{t.name}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
