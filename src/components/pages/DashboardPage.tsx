import React, { useState, useRef } from 'react';
import { ShieldCheck, Link2, Image as ImageIcon, Video, Search, Activity, Globe } from 'lucide-react';
import { useAppContext } from '../../store/appState';
import { addDynamicCase } from '../../data/mockData';

const DashboardPage: React.FC = () => {
  const { activeInputMode, setActiveInputMode, setCurrentPage, setCurrentCaseKey } = useAppContext();
  const [analyzing, setAnalyzing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadPresetCase = (key: string) => {
    setCurrentCaseKey(key);
    if (key === 'deepfake_speech') setActiveInputMode('link');
    if (key === 'recycled_photo') setActiveInputMode('image');
    if (key === 'authentic_release') setActiveInputMode('link');
  };

  const runInvestigationScan = async () => {
    if ((activeInputMode === 'image' || activeInputMode === 'video') && file) {
      setAnalyzing(true);
      setErrorMsg(null);
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await fetch('http://127.0.0.1:8000/api/detect', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        
        if (data.success) {
          const isFake = data.prediction === 'AI_GENERATED';
          const newCase = {
            title: `Analyzed ${data.media_type}: ${file.name}`,
            meta: `Size: ${(file.size / 1024 / 1024).toFixed(2)}MB • Format: ${file.type}`,
            thumb: data.media_type === 'image' ? '🖼️' : '🎥',
            verdictBadge: isFake ? `⚠️ Likely Manipulated (${data.confidence}%)` : `✅ Verified Authentic (${data.confidence}%)`,
            verdictClass: isFake ? 'manipulated' as const : 'verified' as const,
            verdictHeading: isFake ? 'AI Generation Detected in Uploaded Media' : 'No Significant AI Manipulation Detected',
            verdictScore: `${data.confidence}%`,
            verdictSummary: isFake ? `PARAKH AI backend analysis detected strong indicators of AI synthesis or digital manipulation. The model reported a ${data.confidence}% confidence that the media is AI_GENERATED.` : `PARAKH AI backend analysis found no significant indicators of AI synthesis. The media appears to be REAL with ${data.confidence}% confidence.`,
            identityBadge: isFake ? 'AI Generated' : 'Authentic',
            forensicBadge: isFake ? 'Artifacts Flagged' : 'Zero Artifacts',
            originBadge: 'User Upload',
            claimsBadge: isFake ? 'Content Disputed' : 'Content Verified',
            commentBadge: 'Local Analysis'
          };
          const newKey = `upload_${Date.now()}`;
          addDynamicCase(newKey, newCase);
          setCurrentCaseKey(newKey);
          setCurrentPage('analysis');
        } else {
          setErrorMsg(data.error || 'Detection failed');
        }
      } catch (err) {
        setErrorMsg('Failed to connect to detection server.');
        console.error(err);
      } finally {
        setAnalyzing(false);
      }
    } else {
      // Dummy flow for link or if no file
      setAnalyzing(true);
      setTimeout(() => {
        setAnalyzing(false);
        setCurrentPage('analysis');
      }, 1500);
    }
  };

  return (
    <div className="w-full pt-20 pb-16">
      {/* Hero */}
      <section className="text-center px-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono-cyber mb-4">
          <ShieldCheck size={14} /> AI Forensic Triangulation Engine
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-4 tracking-tight">
          Verify <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Any Digital Content</span> in Real Time
        </h1>
        <p className="text-white/50 max-w-2xl mx-auto font-mono-cyber text-xs leading-relaxed">
          Paste a suspicious social link, drop an image, or upload video footage. PARAKH AI orchestrates 5 deep-forensic pipelines to detect synthetics, recycled media, and coordinated disinformation.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Submission Card */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex border-b border-white/10 mb-6">
            <button 
              onClick={() => setActiveInputMode('link')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-mono-cyber uppercase transition-colors border-b-2 ${activeInputMode === 'link' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-white/40 hover:text-white/80'}`}
            >
              <Link2 size={16} /> Paste Link / URL
            </button>
            <button 
              onClick={() => setActiveInputMode('image')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-mono-cyber uppercase transition-colors border-b-2 ${activeInputMode === 'image' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-white/40 hover:text-white/80'}`}
            >
              <ImageIcon size={16} /> Upload Image
            </button>
            <button 
              onClick={() => setActiveInputMode('video')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-mono-cyber uppercase transition-colors border-b-2 ${activeInputMode === 'video' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-white/40 hover:text-white/80'}`}
            >
              <Video size={16} /> Upload Video
            </button>
          </div>

          <div className="min-h-[120px] mb-6">
            {activeInputMode === 'link' && (
              <div className="space-y-4">
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input 
                    type="url" 
                    placeholder="Paste any link (X / Twitter, Telegram, YouTube, Web News)..." 
                    defaultValue="https://x.com/breaking_geopol/status/17892182049102"
                    className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-sm font-mono text-white placeholder-white/20 focus:outline-none focus:border-cyan-400/50"
                  />
                </div>
                <div className="flex flex-wrap gap-2 items-center text-[10px] font-mono-cyber text-white/40">
                  <span>Auto-detects:</span>
                  <span className="px-2 py-1 rounded bg-white/5 border border-white/5">𝕏 Twitter / X</span>
                  <span className="px-2 py-1 rounded bg-white/5 border border-white/5">✈️ Telegram</span>
                  <span className="px-2 py-1 rounded bg-white/5 border border-white/5">▶️ YouTube</span>
                </div>
              </div>
            )}
            {(activeInputMode === 'image' || activeInputMode === 'video') && (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center py-10 hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-colors cursor-pointer"
              >
                {activeInputMode === 'image' ? <ImageIcon size={32} className="text-white/20 mb-3" /> : <Video size={32} className="text-white/20 mb-3" />}
                <p className="text-sm font-mono-cyber text-white mb-1">
                  {file ? file.name : `Drop ${activeInputMode} here or click to browse`}
                </p>
                <p className="text-[10px] font-mono text-white/40">
                  {file ? `${(file.size / 1024 / 1024).toFixed(2)}MB` : "Supports standard formats up to 50MB"}
                </p>
                {errorMsg && <p className="text-red-400 mt-2 text-xs font-mono">{errorMsg}</p>}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  accept={activeInputMode === 'image' ? 'image/*' : 'video/*'} 
                  className="hidden" 
                />
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono-cyber text-white/40">🎯 Try Sample Cases:</span>
              <button onClick={() => loadPresetCase('deepfake_speech')} className="text-[10px] font-mono-cyber px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/70">🎭 Deepfake</button>
              <button onClick={() => loadPresetCase('recycled_photo')} className="text-[10px] font-mono-cyber px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/70">🔄 Recycled</button>
              <button onClick={() => loadPresetCase('authentic_release')} className="text-[10px] font-mono-cyber px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/70">✅ Authentic</button>
            </div>
            
            <button 
              onClick={runInvestigationScan}
              disabled={analyzing}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-mono-cyber text-xs uppercase font-bold tracking-wider rounded flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {analyzing ? (
                <><div className="w-3 h-3 rounded-full bg-black animate-pulse" /> Orchestrating...</>
              ) : (
                <><Search size={16} /> Analyze Content</>
              )}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          <div className="glass-card p-5">
            <h3 className="font-mono-cyber text-xs text-white/50 uppercase mb-4 flex items-center gap-2">
              <Activity size={14} /> 5-Stage Forensics
            </h3>
            <div className="space-y-3">
              {[
                { icon: '🕵️', title: 'Identity Scan', desc: 'Facial matches & ID' },
                { icon: '🔬', title: 'Forensic Check', desc: 'Metadata & ELA' },
                { icon: '🌐', title: 'Origin Tracker', desc: 'Recycled timelines' },
                { icon: '📰', title: 'Claim Investigator', desc: 'Cross-source proof' },
                { icon: '💬', title: 'Comment Intel', desc: 'Public reaction signal' }
              ].map((stage, i) => (
                <div key={i} className="flex items-start gap-3 p-2 rounded hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="text-xl bg-white/5 p-2 rounded">{stage.icon}</div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-white">{stage.title}</h4>
                    <p className="font-mono-cyber text-[9px] text-white/40">{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <h3 className="font-mono-cyber text-xs text-white/50 uppercase mb-4 flex items-center justify-between">
              <span>⏱️ Recent Cases</span>
              <span className="text-[9px]">3 / 142</span>
            </h3>
            <div className="space-y-3">
              {[
                { title: 'Doctored Briefing', status: 'Manipulated', color: 'text-red-400 bg-red-400/10 border-red-400/20' },
                { title: 'Bridge Collapse Claim', status: 'Suspicious', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
                { title: 'WHO Official Update', status: 'Verified', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' }
              ].map((c, i) => (
                <div key={i} className="p-3 border border-white/5 bg-white/[0.02] rounded hover:border-cyan-500/30 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[9px] font-mono-cyber px-1.5 py-0.5 rounded border ${c.color}`}>{c.status}</span>
                    <span className="text-[9px] font-mono text-white/30">{i+2}h ago</span>
                  </div>
                  <h4 className="font-display text-xs text-white truncate">{c.title}</h4>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
