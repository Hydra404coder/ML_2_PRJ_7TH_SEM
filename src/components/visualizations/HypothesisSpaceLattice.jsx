import React, { useState, useMemo } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Filter,
  Check,
  X,
  ShieldCheck,
  Info,
  Sparkles,
} from 'lucide-react';
import { HypothesisNodeModal } from './HypothesisNodeModal.jsx';
import { formatHypothesis } from '../../engine/hypothesis.js';

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

  // Group hypotheses by generality level: 3, 2, 1, 0, -1
  const levels = useMemo(() => {
    const map = new Map();
    // Initialize standard levels
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

  const levelLabels = {
    3: { title: 'Level 3: Top (3 Wildcards)', desc: 'Maximally General', color: 'text-indigo-400' },
    2: { title: 'Level 2: High (2 Wildcards)', desc: 'Partially General', color: 'text-sky-400' },
    1: { title: 'Level 1: Mid (1 Wildcard)', desc: 'More Specific', color: 'text-teal-400' },
    0: { title: 'Level 0: Ground (0 Wildcards)', desc: 'Fully Specific Instances', color: 'text-emerald-400' },
    [-1]: { title: 'Level -1: Bottom (Null Ø)', desc: 'Maximally Specific Starting State', color: 'text-slate-500' },
  };

  const handleZoomIn = () => setZoomScale(prev => Math.min(prev + 0.15, 1.5));
  const handleZoomOut = () => setZoomScale(prev => Math.max(prev - 0.15, 0.7));
  const handleZoomReset = () => setZoomScale(1);

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">Hypothesis-Space Lattice Explorer</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              Poset Graph
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Hierarchical general-to-specific layout. Click any hypothesis to inspect its status.
          </p>
        </div>

        {/* Filters and Zoom Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter tabs */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterMode === 'all'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({hypothesisStatusList.length})
            </button>
            <button
              onClick={() => setFilterMode('consistent')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterMode === 'consistent'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Surviving ({hypothesisStatusList.filter(h => h.isConsistent).length})
            </button>
            <button
              onClick={() => setFilterMode('boundaries')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterMode === 'boundaries'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              S & G Only ({S.length + G.length})
            </button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-2 text-slate-400">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomReset}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              title="Reset Zoom"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Legend */}
      <div className="flex flex-wrap items-center gap-3 py-3 border-b border-slate-800/80 text-[11px] text-slate-400">
        <span className="font-semibold text-slate-300">Legend:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border-2 border-indigo-500 bg-indigo-950/80" />
          <span>G Boundary</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border-2 border-emerald-500 bg-emerald-950/80" />
          <span>S Boundary</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border border-cyan-500/50 bg-slate-800" />
          <span>Consistent (In VS)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border border-slate-800 bg-slate-950 line-through opacity-50" />
          <span>Eliminated</span>
        </div>
      </div>

      {/* Lattice Container */}
      <div className="relative overflow-x-auto overflow-y-auto py-6 min-h-[380px] max-h-[560px] bg-slate-950/40 rounded-xl mt-3 p-4">
        <div
          className="flex flex-col items-center gap-6 min-w-[650px] transition-transform duration-200 origin-top"
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

            const info = levelLabels[levelKey] || { title: `Level ${levelKey}`, color: 'text-slate-400' };

            return (
              <div key={levelKey} className="w-full flex flex-col items-center">
                {/* Level Title */}
                <div className="flex items-center gap-2 mb-2 text-center">
                  <span className={`text-[11px] font-mono font-bold tracking-wider ${info.color}`}>
                    {info.title}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    ({filteredNodes.length} node{filteredNodes.length !== 1 ? 's' : ''})
                  </span>
                </div>

                {/* Nodes row */}
                <div className="flex flex-wrap items-center justify-center gap-2 max-w-5xl">
                  {filteredNodes.map((node) => {
                    const isConsistent = node.isConsistent;
                    const inS = node.inS;
                    const inG = node.inG;
                    const isBoth = inS && inG;

                    let nodeStyle =
                      'bg-slate-950/80 border-slate-800/80 text-slate-600 line-through opacity-45 hover:opacity-90';

                    if (isBoth) {
                      nodeStyle =
                        'bg-gradient-to-r from-emerald-950 to-indigo-950 border-2 border-purple-400 text-purple-200 shadow-lg shadow-purple-500/20 scale-105';
                    } else if (inG) {
                      nodeStyle =
                        'bg-indigo-950/80 border-2 border-indigo-400 text-indigo-100 shadow-md shadow-indigo-500/20 font-bold';
                    } else if (inS) {
                      nodeStyle =
                        'bg-emerald-950/80 border-2 border-emerald-400 text-emerald-100 shadow-md shadow-emerald-500/20 font-bold';
                    } else if (isConsistent) {
                      nodeStyle =
                        'bg-slate-800/90 border border-slate-600 text-slate-200 hover:border-slate-400 shadow-sm';
                    }

                    return (
                      <button
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        className={`relative group px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${nodeStyle}`}
                        title={`Click to inspect ${node.label || node.id}`}
                      >
                        <span>{node.label || formatHypothesis(node.values)}</span>

                        {isBoth ? (
                          <span className="text-[9px] font-sans px-1 rounded bg-purple-500 text-white font-bold">
                            S=G
                          </span>
                        ) : inG ? (
                          <span className="text-[9px] font-sans px-1 rounded bg-indigo-500 text-white font-bold">
                            G
                          </span>
                        ) : inS ? (
                          <span className="text-[9px] font-sans px-1 rounded bg-emerald-500 text-white font-bold">
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

      {/* Hypothesis Detail Popover Modal */}
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
