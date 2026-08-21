import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from 'lucide-react'

const TRACKS = [
  { title: 'NEON COLLAPSE', artist: 'VOID_RUNNER', duration: '4:23', bpm: 140 },
  { title: 'GRID PHANTOM', artist: 'SYNTHEX', duration: '3:58', bpm: 128 },
  { title: 'DATA GHOST', artist: 'NULL_SIGNAL', duration: '5:11', bpm: 155 },
  { title: 'CHROME REVERIE', artist: 'AXIOM_9', duration: '3:44', bpm: 133 },
]

const BAR_ANIMS = [
  'animate-bar1','animate-bar2','animate-bar3','animate-bar4',
  'animate-bar5','animate-bar6','animate-bar7','animate-bar8',
  'animate-bar9','animate-bar10','animate-bar11','animate-bar12',
]

const BAR_DELAYS = [0, 0.1, 0.2, 0.05, 0.15, 0.25, 0.08, 0.18, 0.3, 0.12, 0.22, 0.03]

const BAR_HEIGHTS: [string, string][] = [
  ['20%', '100%'],['20%','75%'],['20%','90%'],['20%','60%'],
  ['20%','85%'],['20%','45%'],['20%','95%'],['20%','70%'],
  ['20%','80%'],['20%','55%'],['20%','88%'],['20%','65%'],
]

export default function MusicVisualizer() {
  const [playing, setPlaying] = useState(true)
  const [trackIdx, setTrackIdx] = useState(0)
  const [progress, setProgress] = useState(34)

  const track = TRACKS[trackIdx]

  const prev = () => setTrackIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length)
  const next = () => setTrackIdx((i) => (i + 1) % TRACKS.length)

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative z-10 px-4 md:px-8 mb-12"
    >
      <div className="glass-card-purple p-6 md:p-8">
        {/* Section tag */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-purple animate-pulse" />
          <span className="font-mono-cyber text-xs text-neon-purple tracking-widest uppercase">
            Neural Broadcast // Music Feed
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left — Player */}
          <div className="flex-1 min-w-0">
            {/* Album art placeholder */}
            <div className="relative w-full aspect-square max-w-[240px] mx-auto lg:mx-0 mb-6 rounded-lg overflow-hidden">
              <div
                className="absolute inset-0 scanlines"
                style={{
                  background:
                    'linear-gradient(135deg, #0a0020 0%, #150035 40%, #00001a 60%, #050020 100%)',
                }}
              />
              {/* Animated circles inside album art */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[80, 55, 35, 18].map((size, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border"
                    style={{
                      width: `${size}%`,
                      height: `${size}%`,
                      borderColor: `rgba(191,0,255,${0.1 + i * 0.08})`,
                      animation: `spin-slow ${8 + i * 3}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
                    }}
                  />
                ))}
                <div className="font-display text-2xl font-black neon-text-purple">
                  {track.artist.slice(0, 2)}
                </div>
              </div>
              {/* BPM badge */}
              <div className="absolute top-2 right-2 font-mono-cyber text-xs bg-black/60 px-2 py-1 rounded text-neon-purple border border-neon-purple/30">
                {track.bpm} BPM
              </div>
            </div>

            {/* Track info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={trackIdx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <h3 className="font-display font-bold text-xl neon-text-cyan tracking-wider">
                  {track.title}
                </h3>
                <p className="font-mono-cyber text-sm text-white/50 mt-1">{track.artist}</p>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="mb-4">
              <div
                className="h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  setProgress(Math.round(((e.clientX - rect.left) / rect.width) * 100))
                }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #bf00ff, #00f5ff)',
                    boxShadow: '0 0 8px rgba(0,245,255,0.5)',
                    transition: 'width 0.2s',
                  }}
                />
              </div>
              <div className="flex justify-between font-mono-cyber text-xs text-white/30 mt-1">
                <span>
                  {Math.floor((parseInt(track.duration) * progress) / 100)}:
                  {String(Math.floor(((parseInt(track.duration.split(':')[1]) || 0) * progress) / 100)).padStart(2, '0')}
                </span>
                <span>{track.duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <button className="text-white/30 hover:text-neon-cyan transition-colors">
                <Shuffle size={14} />
              </button>
              <div className="flex items-center gap-4">
                <button
                  onClick={prev}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <SkipBack size={18} />
                </button>
                <button
                  onClick={() => setPlaying((p) => !p)}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-cyber-black font-bold transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
                    boxShadow: playing
                      ? '0 0 20px rgba(0,245,255,0.5), 0 0 40px rgba(191,0,255,0.3)'
                      : 'none',
                  }}
                >
                  {playing ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button
                  onClick={next}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <SkipForward size={18} />
                </button>
              </div>
              <button className="text-white/30 hover:text-neon-cyan transition-colors">
                <Repeat size={14} />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 mt-4">
              <Volume2 size={12} className="text-white/30" />
              <div className="flex-1 h-0.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: '72%',
                    background: 'linear-gradient(90deg, #bf00ff, #00f5ff)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right — Visualizer */}
          <div className="flex-1 flex flex-col">
            <p className="font-mono-cyber text-xs text-white/30 tracking-widest mb-4 uppercase">
              Frequency Spectrum
            </p>

            {/* Bars */}
            <div className="flex-1 flex items-end gap-1.5 min-h-[140px] bg-black/30 rounded-lg p-4 border border-white/5">
              {BAR_ANIMS.map((anim, i) => (
                <div
                  key={i}
                  className={`freq-bar flex-1 ${playing ? anim : ''}`}
                  style={{
                    minHeight: BAR_HEIGHTS[i][0],
                    height: playing ? BAR_HEIGHTS[i][1] : BAR_HEIGHTS[i][0],
                    animationDelay: `${BAR_DELAYS[i]}s`,
                    background: `linear-gradient(to top, 
                      ${i % 3 === 0 ? '#bf00ff' : i % 3 === 1 ? '#00f5ff' : '#39ff14'}, 
                      ${i % 3 === 0 ? '#00f5ff80' : i % 3 === 1 ? '#bf00ff80' : '#00f5ff80'}
                    )`,
                    boxShadow: playing
                      ? `0 0 6px ${i % 3 === 0 ? 'rgba(191,0,255,0.6)' : i % 3 === 1 ? 'rgba(0,245,255,0.6)' : 'rgba(57,255,20,0.6)'}`
                      : 'none',
                    transition: 'height 0.3s',
                  }}
                />
              ))}
            </div>

            {/* Track list */}
            <div className="mt-4 space-y-1">
              {TRACKS.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setTrackIdx(i)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-all duration-200 text-left ${
                    i === trackIdx
                      ? 'bg-neon-cyan/10 border border-neon-cyan/20'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span
                    className={`font-mono-cyber text-xs w-4 ${
                      i === trackIdx ? 'neon-text-cyan' : 'text-white/30'
                    }`}
                  >
                    {i === trackIdx && playing ? '▶' : String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-display text-xs font-bold truncate ${
                        i === trackIdx ? 'text-white' : 'text-white/50'
                      }`}
                    >
                      {t.title}
                    </p>
                    <p className="font-mono-cyber text-[10px] text-white/30 truncate">
                      {t.artist}
                    </p>
                  </div>
                  <span className="font-mono-cyber text-xs text-white/30">{t.duration}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
