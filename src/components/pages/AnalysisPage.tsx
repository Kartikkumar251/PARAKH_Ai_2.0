import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, ShieldAlert, Fingerprint, Microscope, Globe, FileText, MessageSquare } from 'lucide-react';
import { useAppContext } from '../../store/appState';

const STAGES = [
  { id: 0, title: 'Identity Scan', icon: Fingerprint, desc: 'Facial matches & ID' },
  { id: 1, title: 'Forensic Check', icon: Microscope, desc: 'Metadata & ELA' },
  { id: 2, title: 'Origin Tracker', icon: Globe, desc: 'Recycled timelines' },
  { id: 3, title: 'Claim Investigator', icon: FileText, desc: 'Cross-source proof' },
  { id: 4, title: 'Comment Intel', icon: MessageSquare, desc: 'Public reaction signal' },
];

const AnalysisPage: React.FC = () => {
  const { currentCase, setCurrentPage, elaOpacity, setElaOpacity } = useAppContext();
  const [expandedCard, setExpandedCard] = useState<number | null>(0);

  return (
    <div className="w-full pt-20 pb-16 relative">
      {/* Sticky Progress Header */}
      <div className="sticky top-14 z-40 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 py-4 mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
              {currentCase.thumb}
            </div>
            <div>
              <h3 className="text-white font-display font-bold truncate max-w-md">{currentCase.title}</h3>
              <p className="text-white/40 font-mono-cyber text-[10px] truncate max-w-md mt-1">{currentCase.meta}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-cyan-400 font-mono-cyber text-[10px] bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">⚡ Verification Complete in 1.4s</span>
            <span className={`text-[10px] font-mono-cyber px-2 py-0.5 rounded border ${currentCase.verdictClass === 'verified' ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' : 'text-red-400 border-red-400/30 bg-red-400/10'}`}>
              {currentCase.verdictBadge}
            </span>
          </div>
        </div>

        {/* Stepper */}
        <div className="max-w-5xl mx-auto flex items-center justify-between mt-4 overflow-x-auto pb-2 scrollbar-hide">
          {STAGES.map((stage) => (
            <div key={stage.id} onClick={() => setExpandedCard(stage.id)} className="flex items-center gap-2 cursor-pointer group flex-shrink-0 mr-6">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] transition-colors ${expandedCard === stage.id ? 'bg-cyan-500 text-black' : 'bg-white/10 text-white/50 group-hover:bg-cyan-500/20 group-hover:text-cyan-400'}`}>
                <CheckCircle2 size={12} />
              </div>
              <span className={`font-mono-cyber text-[10px] uppercase transition-colors ${expandedCard === stage.id ? 'text-cyan-400' : 'text-white/40 group-hover:text-white/80'}`}>
                {stage.id + 1}. {stage.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 space-y-4">
        
        {/* Banner Link to Verdict */}
        <div 
          onClick={() => setCurrentPage('verdict')}
          className="w-full bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:from-cyan-900/60 hover:to-blue-900/60 transition-all mb-8 shadow-[0_0_20px_rgba(0,245,255,0.1)]"
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl">⚖️</span>
            <div>
              <strong className="text-white font-display text-sm tracking-wide">All 5 Forensics Checks Completed with High Confidence</strong>
              <p className="text-white/50 font-mono-cyber text-[10px] mt-1">Synthesized verdict is ready for executive briefing and public dispatch.</p>
            </div>
          </div>
          <button className="text-cyan-400 font-mono-cyber text-[10px] uppercase flex items-center gap-1">
            View Final Verdict <ChevronDown className="-rotate-90" size={14} />
          </button>
        </div>

        {/* Card 1: Identity */}
        <div className="glass-card overflow-hidden">
          <div onClick={() => setExpandedCard(expandedCard === 0 ? null : 0)} className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                <Fingerprint size={16} />
              </div>
              <div>
                <h3 className="text-white font-display text-sm font-bold">Identity Scan</h3>
                <p className="text-white/40 font-mono-cyber text-[9px] uppercase">Who/what is really in this content</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-[9px] font-mono-cyber px-2 py-0.5 rounded border ${currentCase.verdictClass === 'verified' ? 'text-emerald-400 border-emerald-400/20' : 'text-red-400 border-red-400/20'}`}>{currentCase.identityBadge}</span>
              <ChevronDown size={16} className={`text-white/40 transition-transform ${expandedCard === 0 ? 'rotate-180' : ''}`} />
            </div>
          </div>
          <AnimatePresence>
            {expandedCard === 0 && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="border-t border-white/10">
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-black/40 rounded-lg p-6 flex flex-col items-center border border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,245,255,0.1)_0%,transparent_70%)] pointer-events-none" />
                    <div className="w-32 h-32 rounded-full border border-cyan-500/30 flex items-center justify-center relative mb-6">
                      <div className="absolute inset-0 rounded-full border border-cyan-500/10 animate-ping" />
                      <Fingerprint size={48} className="text-cyan-400" />
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between text-[10px] font-mono-cyber mb-2">
                        <span className="text-white/60">Match Confidence</span>
                        <span className="text-cyan-400">{currentCase.verdictScore}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: currentCase.verdictScore }} className="h-full bg-cyan-400" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded border border-white/5">
                      <h4 className="text-white text-xs font-bold mb-1">Target Entity Verified</h4>
                      <p className="text-white/50 text-[10px] font-mono-cyber">Biometric match against official public figures database.</p>
                    </div>
                    {currentCase.verdictClass === 'manipulated' && (
                      <div className="p-4 bg-red-500/10 rounded border border-red-500/20">
                        <h4 className="text-red-400 text-xs font-bold mb-1">Donor Source Match</h4>
                        <p className="text-red-400/70 text-[10px] font-mono-cyber">Base mouth movements spliced from unrelated donor footage.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Card 2: Forensic */}
        <div className="glass-card overflow-hidden">
          <div onClick={() => setExpandedCard(expandedCard === 1 ? null : 1)} className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                <Microscope size={16} />
              </div>
              <div>
                <h3 className="text-white font-display text-sm font-bold">Forensic Check</h3>
                <p className="text-white/40 font-mono-cyber text-[9px] uppercase">Metadata & ELA manipulation artifacts</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-mono-cyber text-amber-400 border border-amber-400/20 px-2 py-0.5 rounded">{currentCase.forensicBadge}</span>
              <ChevronDown size={16} className={`text-white/40 transition-transform ${expandedCard === 1 ? 'rotate-180' : ''}`} />
            </div>
          </div>
          <AnimatePresence>
            {expandedCard === 1 && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="border-t border-white/10">
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-black/60 rounded border border-white/10 p-2 relative">
                    <div className="aspect-video bg-[#0a0f18] rounded flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 to-transparent mix-blend-overlay" style={{ opacity: elaOpacity }} />
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #fff 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                      <div className="text-center z-10">
                        <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(0,245,255,0.5)]">🖼️</span>
                        <p className="text-[9px] font-mono-cyber text-cyan-400 mt-2">ELA Visualization</p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center px-2">
                      <span className="text-[9px] text-white/40 font-mono-cyber">Highlighting compression variance</span>
                      <button onClick={() => setElaOpacity(elaOpacity > 0.1 ? 0 : 0.65)} className="text-[9px] text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded hover:bg-cyan-400/20">Toggle Overlay</button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="py-2 text-[10px] font-mono-cyber text-white/40 font-normal">Metric</th>
                          <th className="py-2 text-[10px] font-mono-cyber text-white/40 font-normal">Status</th>
                          <th className="py-2 text-[10px] font-mono-cyber text-white/40 font-normal">Risk</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs font-mono-cyber text-white/70">
                        <tr className="border-b border-white/5">
                          <td className="py-3">EXIF Data</td>
                          <td className="py-3">Stripped</td>
                          <td className="py-3"><span className="text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20 text-[9px]">ANOMALY</span></td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3">Software Tag</td>
                          <td className="py-3">Unknown</td>
                          <td className="py-3"><span className="text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded border border-red-400/20 text-[9px]">FLAGGED</span></td>
                        </tr>
                        <tr>
                          <td className="py-3">Frame Rate</td>
                          <td className="py-3">29.97 fps</td>
                          <td className="py-3"><span className="text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20 text-[9px]">NORMAL</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dummy Cards for 3,4,5 to save space but keep layout */}
        {[
          { id: 2, icon: Globe, title: 'Origin Tracker', desc: 'First appearance & recycled-content timeline', badge: currentCase.originBadge, color: 'text-amber-400 border-amber-400/20' },
          { id: 3, icon: FileText, title: 'Claim Investigator', desc: 'Fact-checks beyond headline & cross-source proof', badge: currentCase.claimsBadge, color: 'text-emerald-400 border-emerald-400/20' },
          { id: 4, icon: MessageSquare, title: 'Comment Intel', desc: 'Public reaction & recurring claims', badge: currentCase.commentBadge, color: 'text-cyan-400 border-cyan-400/20' }
        ].map((card) => (
          <div key={card.id} className="glass-card overflow-hidden">
            <div onClick={() => setExpandedCard(expandedCard === card.id ? null : card.id)} className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                  <card.icon size={16} />
                </div>
                <div>
                  <h3 className="text-white font-display text-sm font-bold">{card.title}</h3>
                  <p className="text-white/40 font-mono-cyber text-[9px] uppercase">{card.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-[9px] font-mono-cyber px-2 py-0.5 rounded border ${card.color}`}>{card.badge}</span>
                <ChevronDown size={16} className={`text-white/40 transition-transform ${expandedCard === card.id ? 'rotate-180' : ''}`} />
              </div>
            </div>
            <AnimatePresence>
              {expandedCard === card.id && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="border-t border-white/10">
                  <div className="p-6 text-center text-white/40 font-mono-cyber text-xs">
                    <ShieldAlert size={24} className="mx-auto mb-2 text-white/20" />
                    Deep analysis modules active. No critical anomalies beyond threshold detected in this phase.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisPage;
