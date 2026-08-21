import { motion } from 'framer-motion'
import { Activity, Radio } from 'lucide-react'

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 pt-28 pb-16 px-6 text-center"
    >
      {/* Status bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center gap-3 mb-8"
      >
        <span className="flex items-center gap-1.5 font-mono-cyber text-xs text-neon-green tracking-widest uppercase">
          <Radio size={10} className="animate-pulse" />
          SYSTEM ONLINE
        </span>
        <span className="w-px h-3 bg-white/20" />
        <span className="font-mono-cyber text-xs text-white/30 tracking-widest">
          v2.4.1 // NEUROMANCER BUILD
        </span>
        <span className="w-px h-3 bg-white/20" />
        <span className="flex items-center gap-1.5 font-mono-cyber text-xs text-neon-cyan/60 tracking-widest">
          <Activity size={10} />
          LIVE FEED
        </span>
      </motion.div>

      {/* Main heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="mb-4"
      >
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter">
          <span
            className="glitch-text block text-gradient-cyber"
            data-text="CYBER"
          >
            CYBER
          </span>
          <span
            className="glitch-text block text-white/90 mt-1"
            data-text="WAVE"
            style={{ WebkitTextStroke: '1px rgba(0,245,255,0.3)' }}
          >
            WAVE
          </span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="font-mono-cyber text-sm md:text-base text-white/40 tracking-[0.3em] uppercase mb-10"
      >
        Music · Markets · Data · Neural Interface
      </motion.p>

      {/* CTA row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <button className="relative px-8 py-3 font-display text-xs tracking-widest uppercase text-cyber-black bg-neon-cyan hover:bg-white transition-colors duration-200 neon-glow-cyan rounded">
          JACK IN
        </button>
        <button className="px-8 py-3 font-display text-xs tracking-widest uppercase text-neon-purple border border-neon-purple/40 hover:border-neon-purple/80 hover:neon-text-purple rounded transition-all duration-200">
          EXPLORE FEED
        </button>
      </motion.div>

      {/* Decorative scan line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,245,255,0.4), transparent)',
        }}
      />
    </motion.section>
  )
}
