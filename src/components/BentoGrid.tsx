import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Music, Zap, Globe, Star, ArrowUpRight } from 'lucide-react'

const TRENDING_TRACKS = [
  { rank: 1,  title: 'CHROME DYSTOPIA',  artist: 'NEON_GHOST',   streams: '4.2M',  change: '+12%', hot: true },
  { rank: 2,  title: 'SYNTHETIC RAIN',   artist: 'AXIOM_9',      streams: '3.8M',  change: '+8%',  hot: false },
  { rank: 3,  title: 'VOID PROTOCOL',    artist: 'DARK_MATRIX',  streams: '3.1M',  change: '+22%', hot: true },
  { rank: 4,  title: 'BINARY ANGEL',     artist: 'SYNTHEX',      streams: '2.7M',  change: '+5%',  hot: false },
  { rank: 5,  title: 'GRID ECLIPSE',     artist: 'NULL_SIGNAL',  streams: '2.3M',  change: '+18%', hot: true },
  { rank: 6,  title: 'CIRCUIT DREAMS',   artist: 'AXIOM_9',      streams: '1.9M',  change: '+3%',  hot: false },
]

const TOP_GAINERS = [
  { symbol: 'WAVE', name: 'WaveProtocol',  price: '$2.41',  change: '+41.2%', volume: '$820M' },
  { symbol: 'NEXO', name: 'NexoChain',     price: '$0.88',  change: '+28.7%', volume: '$340M' },
  { symbol: 'GRID', name: 'GridToken',     price: '$12.50', change: '+19.4%', volume: '$1.1B' },
  { symbol: 'VOID', name: 'VoidProtocol',  price: '$0.034', change: '+16.8%', volume: '$210M' },
  { symbol: 'SYNC', name: 'SyncNet',       price: '$4.72',  change: '+14.2%', volume: '$560M' },
]

const STATS = [
  { label: 'ACTIVE NODES',    value: '1,248,309', icon: Globe,      color: '#00f5ff' },
  { label: 'TRACKS STREAMED', value: '847.2M',    icon: Music,      color: '#bf00ff' },
  { label: '24H VOLUME',      value: '$4.8B',     icon: TrendingUp, color: '#39ff14' },
  { label: 'NEURAL UPTIME',   value: '99.97%',    icon: Zap,        color: '#ff0080' },
]

type Tab = 'tracks' | 'gainers'

export default function BentoGrid() {
  const [activeTab, setActiveTab] = useState<Tab>('tracks')

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative z-10 px-4 md:px-8 mb-16"
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* ── Main panel (spans 2 cols) ── */}
        <div className="xl:col-span-2 glass-card p-6">
          {/* Tab nav */}
          <div className="flex items-center gap-1 mb-6 border-b border-white/5 pb-4">
            {(['tracks', 'gainers'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-display text-xs tracking-wider uppercase rounded transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-neon-cyan/10 neon-text-cyan border border-neon-cyan/20'
                    : 'text-white/30 hover:text-white/60 border border-transparent'
                }`}
              >
                {tab === 'tracks' ? '// Trending Tracks' : '// Top Gainers'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'tracks' ? (
              <motion.div
                key="tracks"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25 }}
                className="space-y-2"
              >
                {TRENDING_TRACKS.map((track, i) => (
                  <motion.div
                    key={track.rank}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bento-item flex items-center gap-4 p-3"
                  >
                    <span className="font-display text-xs text-white/20 w-5 text-right flex-shrink-0">
                      {track.rank < 4 ? (
                        <span className="neon-text-cyan">{track.rank}</span>
                      ) : (
                        track.rank
                      )}
                    </span>

                    {/* Mini waveform icon */}
                    <div className="flex items-end gap-0.5 h-6 flex-shrink-0">
                      {[3, 5, 8, 5, 3].map((h, j) => (
                        <div
                          key={j}
                          className="w-0.5 rounded-sm bg-neon-purple/40"
                          style={{ height: `${h * 2}px` }}
                        />
                      ))}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-display text-xs font-bold text-white truncate">
                          {track.title}
                        </p>
                        {track.hot && (
                          <span className="flex-shrink-0 flex items-center gap-0.5 font-mono-cyber text-[9px] text-neon-pink bg-neon-pink/10 px-1.5 py-0.5 rounded">
                            <Star size={7} fill="currentColor" /> HOT
                          </span>
                        )}
                      </div>
                      <p className="font-mono-cyber text-[10px] text-white/30">{track.artist}</p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="font-mono-cyber text-xs text-white/50">{track.streams}</p>
                      <p className="font-mono-cyber text-[10px] text-neon-green">{track.change}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="gainers"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-2"
              >
                {TOP_GAINERS.map((coin, i) => (
                  <motion.div
                    key={coin.symbol}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="bento-item flex items-center gap-4 p-3 group"
                  >
                    <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 bg-neon-green/10 border border-neon-green/20">
                      <span className="font-display text-[9px] font-black text-neon-green">
                        {coin.symbol.slice(0, 2)}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-display text-xs font-bold text-white">{coin.symbol}</p>
                      <p className="font-mono-cyber text-[10px] text-white/30">{coin.name}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-display text-xs font-bold text-white">{coin.price}</p>
                      <p className="font-mono-cyber text-[10px] text-neon-green">{coin.change}</p>
                    </div>

                    <div className="text-right hidden md:block">
                      <p className="font-mono-cyber text-[10px] text-white/30">Vol</p>
                      <p className="font-mono-cyber text-xs text-white/50">{coin.volume}</p>
                    </div>

                    <ArrowUpRight
                      size={12}
                      className="text-white/20 group-hover:text-neon-green transition-colors flex-shrink-0"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Stats sidebar ── */}
        <div className="flex flex-col gap-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bento-item p-4 flex items-center gap-4"
                style={{ borderColor: `${stat.color}20` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${stat.color}15`,
                    border: `1px solid ${stat.color}30`,
                  }}
                >
                  <Icon size={16} style={{ color: stat.color }} />
                </div>
                <div>
                  <p
                    className="font-display text-lg font-bold"
                    style={{
                      color: stat.color,
                      textShadow: `0 0 20px ${stat.color}80`,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-mono-cyber text-[10px] text-white/30 tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
