import React, { useState, useMemo, useRef } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Filter,
  Check,
  X,
  ShieldCheck,
  Eye,
  Sliders,
  Layers,
} from 'lucide-react';
import { HypothesisNodeModal } from './HypothesisNodeModal.jsx';
import { formatHypothesis, isImmediateGeneralization } from '../../engine/hypothesis.js';

export function HypothesisSpaceLattice({
  hypothesisStatusList,
  attributes,
  S,
  G,
  currentStep,
}) {
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'consistent' | 'boundaries'
  const [zoomScale, setZoomScale] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showEdges, setShowEdges] = useState(true);

  // Group hypotheses by level: 3, 2, 1, 0, -1
  const levels = useMemo(() => {
    const map = new Map();
    for (let l = 3; l >= -1; l--) {
      map.set(l, []);
    }

    for (const h of hypothesisStatusList) {
      const lvl = h.level;
      if (!map.has(lvl)) {
        map.set(lvl, []);
      }
      map.get(lvl).push(h);
    }
    return map;
  }, [hypothesisStatusList]);

  const levelInfo = {
    3: { label: 'Level 3: Top Boundary (3 Wildcards)', desc: 'Maximally General (G₀)' },
    2: { label: 'Level 2: High (2 Wildcards)', desc: 'Single Attribute Constrained' },
    1: { label: 'Level 1: Mid (1 Wildcard)', desc: 'Two Attributes Constrained' },
    0: { label: 'Level 0: Ground (0 Wildcards)', desc: 'Fully Specific Instances' },
    [-1]: { label: 'Level -1: Bottom (Null Ø)', desc: 'Maximally Specific (S₀)' },
  };

  const handleZoomIn = () => setZoomScale(prev => Math.min(prev + 0.15, 1.4));
  const handleZoomOut = () => setZoomScale(prev => Math.max(prev - 0.15, 0.7));
  const handleZoomReset = () => setZoomScale(1);

  return (
    <div className="rounded-xl border theme-border theme-surface shadow-subtle overflow-hidden">
      {/* Workbench Header Toolbar */}
      <div className="px-5 py-3.5 border-b theme-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 theme-surface-subtle">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold theme-text-primary">
              Hypothesis-Space Lattice Workbench
            </h3>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border theme-border bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
              Poset Graph
            </span>
          </div>
          <p className="text-xs theme-text-muted mt-0.5">
            General-to-Specific partial order. Click any hypothesis node to inspect constraints and elimination reason.
          </p>
        </div>

        {/* Toolbar controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter options */}
          <div className="flex items-center rounded-lg border theme-border theme-surface p-0.5 text-xs">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filterMode === 'all'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'theme-text-secondary hover:theme-surface-subtle'
              }`}
            >
              All ({hypothesisStatusList.length})
            </button>
            <button
              onClick={() => setFilterMode('consistent')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filterMode === 'consistent'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'theme-text-secondary hover:theme-surface-subtle'
              }`}
            >
              Surviving ({hypothesisStatusList.filter(h => h.isConsistent).length})
            </button>
            <button
              onClick={() => setFilterMode('boundaries')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filterMode === 'boundaries'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'theme-text-secondary hover:theme-surface-subtle'
              }`}
            >
              S & G ({S.length + G.length})
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center rounded-lg border theme-border theme-surface p-0.5 text-xs">
            <button
              onClick={handleZoomOut}
              className="p-1 rounded-md theme-text-secondary hover:theme-surface-subtle"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-2 theme-text-muted">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1 rounded-md theme-text-secondary hover:theme-surface-subtle"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomReset}
              className="p-1 rounded-md theme-text-secondary hover:theme-surface-subtle ml-0.5"
              title="Reset Zoom"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Legend Bar */}
      <div className="px-5 py-2 border-b theme-border bg-slate-50/60 dark:bg-slate-900/40 flex flex-wrap items-center gap-4 text-[11px] theme-text-muted">
        <span className="font-semibold theme-text-secondary">Visual Key:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border-2 border-blue-500 bg-blue-100 dark:bg-blue-950" />
          <span className="theme-text-primary font-medium">G Boundary (General)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border-2 border-emerald-500 bg-emerald-100 dark:bg-emerald-950" />
          <span className="theme-text-primary font-medium">S Boundary (Specific)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800" />
          <span>Consistent (In VS)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 line-through opacity-50" />
          <span>Eliminated</span>
        </div>
      </div>

      {/* Lattice Canvas with Graph Background */}
      <div className="engineering-grid relative overflow-x-auto overflow-y-auto p-6 min-h-[420px] max-h-[580px] bg-slate-50/30 dark:bg-slate-950/40">
        <div
          className="flex flex-col items-center gap-6 min-w-[620px] transition-transform duration-150 origin-top"
          style={{ transform: `scale(${zoomScale})` }}
        >
          {[3, 2, 1, 0, -1].map((levelKey) => {
            const rawNodes = levels.get(levelKey) || [];
            const filteredNodes = rawNodes.filter((node) => {
              if (filterMode === 'consistent') return node.isConsistent;
              if (filterMode === 'boundaries') return node.inS || node.inG;
              return true;
            });

            if (filteredNodes.length === 0 && filterMode !== 'all') return null;
            const info = levelInfo[levelKey] || { label: `Level ${levelKey}`, desc: '' };

            return (
              <div key={levelKey} className="w-full flex flex-col items-center">
                {/* Level Title Tag */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono font-bold theme-text-muted uppercase tracking-wider">
                    {info.label}
                  </span>
                  <span className="text-[10px] theme-text-muted">
                    ({filteredNodes.length} nodes)
                  </span>
                </div>

                {/* Nodes Row */}
                <div className="flex flex-wrap items-center justify-center gap-2 max-w-5xl">
                  {filteredNodes.map((node) => {
                    const isConsistent = node.isConsistent;
                    const inS = node.inS;
                    const inG = node.inG;
                    const isBoth = inS && inG;

                    let nodeStyle =
                      'theme-surface border theme-border opacity-40 line-through text-slate-400 dark:text-slate-600 hover:opacity-90';

                    if (isBoth) {
                      nodeStyle =
                        'bg-purple-50 dark:bg-purple-950/80 border-2 border-purple-500 text-purple-900 dark:text-purple-200 font-bold shadow-md scale-105';
                    } else if (inG) {
                      nodeStyle =
                        'bg-blue-50 dark:bg-blue-950/80 border-2 border-blue-500 text-blue-900 dark:text-blue-200 font-bold shadow-sm';
                    } else if (inS) {
                      nodeStyle =
                        'bg-emerald-50 dark:bg-emerald-950/80 border-2 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold shadow-sm';
                    } else if (isConsistent) {
                      nodeStyle =
                        'theme-surface border border-slate-300 dark:border-slate-700 theme-text-primary hover:border-blue-400 shadow-subtle';
                    }

                    return (
                      <button
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        className={`group px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${nodeStyle}`}
                        title={`Inspect hypothesis ${node.label || node.id}`}
                      >
                        <span>{node.label || formatHypothesis(node.values)}</span>

                        {isBoth ? (
                          <span className="text-[9px] font-sans px-1 rounded bg-purple-600 text-white font-bold">
                            S=G
                          </span>
                        ) : inG ? (
                          <span className="text-[9px] font-sans px-1 rounded bg-blue-600 text-white font-bold">
                            G
                          </span>
                        ) : inS ? (
                          <span className="text-[9px] font-sans px-1 rounded bg-emerald-600 text-white font-bold">
                            S
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Node Inspector Modal */}
      {selectedNode && (
        <HypothesisNodeModal
          node={selectedNode}
          attributes={attributes}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
}
