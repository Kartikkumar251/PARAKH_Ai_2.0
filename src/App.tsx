import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import GlobeScene from './components/GlobeScene'
import { useAppContext } from './store/appState'

import AuthPage from './components/pages/AuthPage'
import DashboardPage from './components/pages/DashboardPage'
import AnalysisPage from './components/pages/AnalysisPage'
import VerdictPage from './components/pages/VerdictPage'

function App() {
  const mouseRef = useRef({ x: 0, y: 0 })
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const { currentPage } = useAppContext();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      setMouse({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {/* ─── 3D Globe background ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <GlobeScene mouseX={mouse.x} mouseY={mouse.y} />
        {/* Vignette overlay to blend globe into content */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.98) 100%)',
          }}
        />
      </div>

      {/* ─── Scanlines overlay ─── */}
      <div
        className="fixed inset-0 z-1 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)',
        }}
      />

      {/* ─── Main content ─── */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* Page Routing */}
        <div className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.main
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 w-full"
            >
              {currentPage === 'auth' && <AuthPage />}
              {currentPage === 'home' && <DashboardPage />}
              {currentPage === 'analysis' && <AnalysisPage />}
              {currentPage === 'verdict' && <VerdictPage />}
            </motion.main>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/5 py-8 px-8 text-center mt-auto bg-black/40 backdrop-blur-md">
          <p className="font-mono-cyber text-xs text-cyan-500/50 tracking-widest">
            PARAKH AI // INTEL-v4 // SOVEREIGN FORENSIC TRIANGULATION
          </p>
          <p className="font-mono-cyber text-[10px] text-white/20 mt-1">
            DATA STREAMS ACTIVE · NEURAL UPLINK STABLE · GRID OPERATIONAL
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
