import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, ShieldAlert } from 'lucide-react'
import { useAppContext, PageView } from '../store/appState'

const NAV_LINKS: { id: PageView; label: string; icon: string }[] = [
  { id: 'auth', label: 'Auth (War-Room)', icon: '🔒' },
  { id: 'home', label: 'Dashboard', icon: '🏠' },
  { id: 'analysis', label: 'Analysis', icon: '🔬' },
  { id: 'verdict', label: 'Verdict', icon: '⚖️' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { currentPage, setCurrentPage, isAuthenticated } = useAppContext();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(2,4,8,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,245,255,0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="w-7 h-7 rounded border border-amber-500/40 flex items-center justify-center bg-amber-500/10">
            <ShieldAlert size={14} className="text-amber-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-black tracking-widest text-white">
              PARAKH AI <span className="text-[9px] text-cyan-400 bg-cyan-400/10 px-1 py-0.5 rounded ml-1">INTEL-v4</span>
            </span>
          </div>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated && NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => setCurrentPage(link.id)}
              className={`font-mono-cyber text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-2 ${
                currentPage === link.id ? 'text-cyan-400 border-b border-cyan-400 pb-0.5' : 'text-white/40 hover:text-cyan-400/70'
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 font-mono-cyber text-xs text-neon-green/70 bg-neon-green/5 border border-neon-green/20 px-3 py-1.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            ENGINES ONLINE v2.4
          </div>
          <button
            className="md:hidden text-white/60 hover:text-white transition-colors"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-white/5 px-4 py-4 space-y-3"
          style={{ background: 'rgba(2,4,8,0.95)' }}
        >
          {isAuthenticated && NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setCurrentPage(link.id)
                setOpen(false)
              }}
              className={`block w-full text-left font-mono-cyber text-sm tracking-wider uppercase transition-colors py-2 flex items-center gap-2 ${
                currentPage === link.id ? 'text-cyan-400' : 'text-white/50 hover:text-cyan-400/70'
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}
