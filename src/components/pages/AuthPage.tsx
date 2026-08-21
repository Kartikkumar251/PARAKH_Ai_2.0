import React, { useState } from 'react';
import { ShieldAlert, Mail, KeyRound, ArrowRight, Map } from 'lucide-react';
import { useAppContext } from '../../store/appState';

const TICKER_STREAMS = [
  [
    { tag: 'BREAKING', text: 'TAIWAN STRAIT: FABRICATED DRONE SWARM FOOTAGE - ANALYSIS ONGOING' },
    { tag: 'ALERT', text: 'RED SEA: AI-GENERATED OIL TANKER EXPLOSION VIDEO DEBUNKED' },
    { tag: 'INTERCEPT', text: 'SPACE CORRIDOR: ALTERED SATELLITE PHOTOS CLAIM TROOP MOBILIZATION' },
    { tag: 'WARNING', text: 'SYNTHETIC AUDIO OF FOREIGN MINISTER DETECTED IN TRADE TALKS' },
  ]
];

const NewsTickerBar: React.FC<{ items: typeof TICKER_STREAMS[0] }> = ({ items }) => {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="w-full overflow-hidden py-2 border-b border-white/5 bg-black/40 backdrop-blur-md">
      <div className="ticker-wrap">
        <div className="inline-flex gap-8 whitespace-nowrap" style={{ animation: `ticker 30s linear infinite normal` }}>
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center gap-3 font-mono-cyber text-[10px] uppercase tracking-widest">
              <span className="px-2 py-0.5 border border-white/20 text-white/80 bg-white/5">
                {item.tag}
              </span>
              <span className="text-white/60">{item.text}</span>
              <span className="text-white/20 ml-4">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const AuthPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { setCurrentPage, setIsAuthenticated } = useAppContext();

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const quickLoginDemo = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Top Header & Ticker (Tactical Style) */}
      <div className="absolute top-0 left-0 w-full z-10 flex flex-col pointer-events-none">
        <div className="flex justify-between items-center px-6 h-14 border-b border-white/5 bg-black/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-white/20 flex items-center justify-center">
              <ShieldAlert size={16} className="text-white/80" />
            </div>
            <div className="font-display font-bold text-xl tracking-widest text-white/90 leading-none pt-0.5">PARAKH AI</div>
          </div>
          <div className="flex items-center gap-2 font-mono-cyber text-[10px] tracking-widest text-white/50">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse"></div>
            ENGINES ONLINE v2.4
          </div>
        </div>
        <NewsTickerBar items={TICKER_STREAMS[0]} />
      </div>

      {/* Intelligence Map Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '4rem 4rem'
      }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-white/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-full bg-white/5"></div>
        
        {/* Crosshairs */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 border-t border-l border-white/20"></div>
        <div className="absolute top-1/4 right-1/4 w-8 h-8 border-t border-r border-white/20"></div>
        <div className="absolute bottom-1/4 left-1/4 w-8 h-8 border-b border-l border-white/20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-8 h-8 border-b border-r border-white/20"></div>
      </div>

      {/* Tactical Side Panels (Left) */}
      <div className="absolute left-6 top-36 bottom-24 w-48 z-0 hidden lg:flex flex-col justify-between pointer-events-none opacity-70">
        <div className="border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
          <div className="font-mono-cyber text-[9px] text-white/40 tracking-widest border-b border-white/10 pb-2 mb-3">SYSTEM STATUS</div>
          <div className="font-mono-cyber text-xs text-white/80 flex items-center gap-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> SECURE
          </div>
          
          <div className="font-mono-cyber text-[9px] text-white/40 tracking-widest border-b border-white/10 pb-2 mb-3 mt-6">COORDINATES</div>
          <div className="font-mono-cyber text-xs text-white/80 space-y-4">
            <div><span className="text-white/40 text-[9px]">LAT</span><br/>35°42'55.7" N</div>
            <div><span className="text-white/40 text-[9px]">LON</span><br/>139°47'07.7" E</div>
          </div>

          <div className="font-mono-cyber text-[9px] text-white/40 tracking-widest border-b border-white/10 pb-2 mb-3 mt-6">ALTITUDE</div>
          <div className="font-mono-cyber text-xs text-white/80">318.878</div>

          <div className="font-mono-cyber text-[9px] text-white/40 tracking-widest border-b border-white/10 pb-2 mb-3 mt-6">REGION</div>
          <div className="font-mono-cyber text-xs text-white/80">INTERZONE</div>

          <div className="font-mono-cyber text-[9px] text-white/40 tracking-widest border-b border-white/10 pb-2 mb-3 mt-6">FEED</div>
          <div className="font-mono-cyber text-xs text-white/80">LIVE</div>
        </div>
        
        <div className="h-24 border border-white/10 bg-black/40 backdrop-blur-sm p-3 relative overflow-hidden flex items-end">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
          }}></div>
          <Map className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white/20" />
        </div>
      </div>

      {/* Tactical Side Panels (Right) */}
      <div className="absolute right-6 top-36 bottom-24 w-48 z-0 hidden lg:flex flex-col justify-between pointer-events-none opacity-70">
        <div className="border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
          <div className="font-mono-cyber text-[9px] text-white/40 tracking-widest border-b border-white/10 pb-2 mb-4">LATEST ALERTS</div>
          <div className="space-y-5 text-left">
            <div className="flex gap-2">
              <div className="w-1 h-1 rounded-full bg-white/40 mt-1.5 shrink-0"></div>
              <div>
                <div className="text-[9px] font-mono-cyber text-white/60 mb-1">RED SEA:</div>
                <div className="text-[9px] font-mono-cyber text-white/80 leading-tight">AI-GENERATED OIL TANKER EXPLOSION DEBUNKED</div>
                <div className="text-[8px] font-mono-cyber text-white/30 mt-1.5">12 MIN AGO</div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-1 h-1 rounded-full bg-white/40 mt-1.5 shrink-0"></div>
              <div>
                <div className="text-[9px] font-mono-cyber text-white/60 mb-1">SPACE CORRIDOR:</div>
                <div className="text-[9px] font-mono-cyber text-white/80 leading-tight">ALTERED SATELLITE PHOTOS CLAIM TROOP MOBILIZATION</div>
                <div className="text-[8px] font-mono-cyber text-white/30 mt-1.5">26 MIN AGO</div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-1 h-1 rounded-full bg-white/40 mt-1.5 shrink-0"></div>
              <div>
                <div className="text-[9px] font-mono-cyber text-white/60 mb-1">BOT SWARM:</div>
                <div className="text-[9px] font-mono-cyber text-white/80 leading-tight">42,000 INAUTHENTIC ACCOUNTS DETECTED</div>
                <div className="text-[8px] font-mono-cyber text-white/30 mt-1.5">45 MIN AGO</div>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
          <div className="font-mono-cyber text-[9px] text-white/40 tracking-widest border-b border-white/10 pb-2 mb-4">DATA STREAM</div>
          <div className="font-mono-cyber text-[9px] text-white/80 mb-3">ACTIVE</div>
          <div className="h-12 border-b border-l border-white/20 flex items-end justify-between px-1 gap-1">
            <div className="w-2 bg-white/20 h-[30%]"></div>
            <div className="w-2 bg-white/40 h-[70%]"></div>
            <div className="w-2 bg-white/30 h-[40%]"></div>
            <div className="w-2 bg-white/50 h-[90%]"></div>
            <div className="w-2 bg-white/20 h-[20%]"></div>
            <div className="w-2 bg-white/60 h-[60%]"></div>
            <div className="w-2 bg-white/30 h-[45%]"></div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="absolute bottom-0 left-0 w-full z-10 flex justify-between items-center px-6 py-2 border-t border-white/5 bg-black/60 pointer-events-none font-mono-cyber text-[9px] tracking-widest text-white/40">
        <div>PARAKH AI INTERZONE TERMINAL</div>
        <div className="flex gap-8">
          <div>SYSTEM TIME: 14:32:07 UTC</div>
          <div>TZ: UTC +0</div>
          <div>SESSION ID: ZX-INTERZONE-7X91</div>
          <div>ENCRYPTION: AES-256</div>
        </div>
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-[340px] p-6 rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm shadow-2xl">
        
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full border-2 border-amber-500/40 flex items-center justify-center bg-gradient-to-b from-amber-500/20 to-black relative">
            <div className="absolute inset-0 rounded-full border border-amber-500 animate-ping opacity-20"></div>
            <ShieldAlert size={28} className="text-amber-500" />
          </div>
          <h1 className="text-xl font-bold font-display tracking-widest text-white mb-2">PARAKH AI</h1>
          <p className="text-xs font-mono-cyber text-cyan-400/70">VERIFY BEFORE YOU BELIEVE • ENTERPRISE FACT FORENSICS</p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 text-xs font-mono-cyber tracking-wider transition-all border-b-2 ${
              authMode === 'login' ? 'border-cyan-400 text-cyan-400' : 'border-white/10 text-white/40 hover:text-white/80'
            }`}
          >
            SIGN IN
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-2 text-xs font-mono-cyber tracking-wider transition-all border-b-2 ${
              authMode === 'signup' ? 'border-cyan-400 text-cyan-400' : 'border-white/10 text-white/40 hover:text-white/80'
            }`}
          >
            CREATE ACCOUNT
          </button>
        </div>

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-mono-cyber tracking-widest text-white/50 mb-1">OFFICIAL / AGENCY EMAIL</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="email" 
                required
                defaultValue="investigator@parakh.ai"
                className="w-full bg-white/5 border border-white/10 rounded px-10 py-2.5 text-sm font-mono text-white placeholder-white/20 focus:outline-none focus:border-cyan-400/50 transition-colors"
                placeholder="analyst@agency.gov"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-[10px] font-mono-cyber tracking-widest text-white/50">SECURITY PASSWORD</label>
              <a href="#" className="text-[10px] text-cyan-400 hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="password" 
                required
                defaultValue="verifiedSecure2026!"
                className="w-full bg-white/5 border border-white/10 rounded px-10 py-2.5 text-sm font-mono text-white placeholder-white/20 focus:outline-none focus:border-cyan-400/50 transition-colors"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 rounded text-xs font-mono-cyber tracking-widest transition-all shadow-[0_0_20px_rgba(0,245,255,0.2)]"
          >
            <span>{authMode === 'login' ? 'ENTER VERIFICATION TERMINAL' : 'CREATE ANALYST ACCOUNT'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-4 text-white/30 text-[10px] font-mono-cyber">
          <div className="h-px bg-white/10 flex-1"></div>
          <span>OR CONTINUE WITH</span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <button type="button" onClick={quickLoginDemo} className="flex items-center justify-center gap-2 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded text-xs font-mono-cyber text-white/70 transition-colors">
            GOOGLE ID
          </button>
          <button type="button" onClick={quickLoginDemo} className="flex items-center justify-center gap-2 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded text-xs font-mono-cyber text-white/70 transition-colors">
            ENTERPRISE SSO
          </button>
        </div>

        <div 
          onClick={quickLoginDemo}
          className="mt-6 p-3 border border-amber-500/30 bg-amber-500/10 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-amber-500/20 transition-colors"
        >
          <div className="text-amber-500 text-xs font-mono-cyber tracking-wider font-bold mb-1 flex items-center gap-2">
            <span>⚡</span> ONE-CLICK HACKATHON DEMO ACCESS
          </div>
          <div className="text-[9px] font-mono-cyber text-white/50 text-center">
            Bypass credentials & explore with pre-loaded forensic test cases
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
