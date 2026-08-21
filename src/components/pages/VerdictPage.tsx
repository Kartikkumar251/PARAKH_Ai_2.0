import React from 'react';
import { Share2, Printer, ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../../store/appState';

const VerdictPage: React.FC = () => {
  const { currentCase, setCurrentPage } = useAppContext();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full pt-20 pb-16 relative">
      <div className="max-w-4xl mx-auto px-4">
        
        <button onClick={() => setCurrentPage('analysis')} className="flex items-center gap-2 text-[10px] font-mono-cyber text-white/40 hover:text-cyan-400 transition-colors mb-6 uppercase tracking-widest">
          <ArrowLeft size={14} /> Back to Analysis
        </button>

        <div className="glass-card overflow-hidden">
          {/* Header */}
          <div className={`p-8 border-b border-white/10 ${currentCase.verdictClass === 'verified' ? 'bg-emerald-900/20' : 'bg-red-900/20'}`}>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded bg-black/40 flex items-center justify-center text-2xl border border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                    {currentCase.thumb}
                  </div>
                  <span className={`text-xs font-mono-cyber uppercase px-3 py-1 rounded border ${currentCase.verdictClass === 'verified' ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' : 'text-red-400 border-red-400/30 bg-red-400/10'}`}>
                    {currentCase.verdictBadge}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-display font-black text-white leading-tight">
                  {currentCase.verdictHeading}
                </h1>
              </div>
              <div className="flex-shrink-0 text-center bg-black/40 border border-white/10 rounded-lg p-4 min-w-[120px]">
                <div className="text-[10px] font-mono-cyber text-white/40 uppercase mb-1">Confidence</div>
                <div className={`text-3xl font-black font-display ${currentCase.verdictClass === 'verified' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {currentCase.verdictScore}
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-8">
            <h3 className="text-[10px] font-mono-cyber text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ShieldAlert size={14} /> Executive Summary
            </h3>
            <p className="text-white/70 font-mono text-sm leading-relaxed mb-8">
              {currentCase.verdictSummary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-white/5 border border-white/10 rounded">
                <div className="text-[9px] font-mono-cyber text-white/40 uppercase mb-1">Target Context</div>
                <div className="text-sm font-display text-white">{currentCase.title}</div>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded">
                <div className="text-[9px] font-mono-cyber text-white/40 uppercase mb-1">Cryptographic Fingerprint</div>
                <div className="text-[10px] font-mono text-white/60 truncate">{currentCase.meta}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs font-mono-cyber text-white uppercase transition-colors">
                <Printer size={16} /> Export PDF Report
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded text-xs font-mono-cyber text-cyan-400 uppercase transition-colors ml-auto">
                <Share2 size={16} /> Share Briefing
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VerdictPage;
