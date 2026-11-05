import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs({ items, onNavigate }) {
  return (
    <nav className="flex items-center text-xs theme-text-muted py-2.5 px-4 sm:px-6 max-w-7xl mx-auto border-b theme-border">
      <button
        onClick={() => onNavigate('dashboard')}
        className="flex items-center gap-1 hover:theme-text-primary transition-colors"
      >
        <Home className="w-3.5 h-3.5 opacity-60" />
        <span>Lab</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.label} className="flex items-center">
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 opacity-40 flex-shrink-0" />
            {isLast || !item.tab ? (
              <span className="font-semibold theme-text-primary truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => onNavigate(item.tab, item.params)}
                className="hover:theme-text-primary transition-colors truncate max-w-[150px] sm:max-w-none"
              >
                {item.label}
              </button>
            )}
          </div>
        );
      })}
    </nav>
  );
}
