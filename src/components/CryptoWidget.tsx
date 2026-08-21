import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, RefreshCw, Wifi, WifiOff } from 'lucide-react'
import { useCryptoData } from '../hooks/useCryptoData'

function formatPrice(price: number): string {
  if (price >= 1000) return price.toLocaleString('en-US', { maximumFractionDigits: 2 })
  if (price >= 1) return price.toFixed(3)
  return price.toFixed(4)
}

function formatVolume(vol: number): string {
  if (vol >= 1e9) return `$${(vol / 1e9).toFixed(1)}B`
  if (vol >= 1e6) return `$${(vol / 1e6).toFixed(1)}M`
  return `$${vol.toLocaleString()}`
}

const COIN_COLORS: Record<string, { accent: string; glow: string; bg: string }> = {
  bitcoin:  { accent: '#f7931a', glow: 'rgba(247,147,26,0.35)', bg: 'rgba(247,147,26,0.06)' },
  ethereum: { accent: '#627eea', glow: 'rgba(98,126,234,0.35)', bg: 'rgba(98,126,234,0.06)' },
  solana:   { accent: '#9945ff', glow: 'rgba(153,69,255,0.35)', bg: 'rgba(153,69,255,0.06)' },
  cardano:  { accent: '#00ade1', glow: 'rgba(0,173,225,0.35)', bg: 'rgba(0,173,225,0.06)' },
}

export default function CryptoWidget() {
  const { data, loading, isMock, lastUpdated, refetch } = useCryptoData()

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="relative z-10 px-4 md:px-8 mb-12">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-lg font-bold neon-text-cyan tracking-widest uppercase">
            Live Markets
          </h2>
          <p className="font-mono-cyber text-xs text-white/30 mt-0.5">
            {lastUpdated
              ? `Updated ${lastUpdated.toLocaleTimeString()}`
              : 'Fetching data...'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isMock ? (
            <span className="flex items-center gap-1.5 font-mono-cyber text-xs text-neon-yellow/60">
              <WifiOff size={10} />
              SIMULATED
            </span>
          ) : (
            <span className="flex items-center gap-1.5 font-mono-cyber text-xs text-neon-green">
              <Wifi size={10} className="animate-pulse" />
              LIVE
            </span>
          )}
          <button
            onClick={refetch}
            className="p-2 rounded border border-white/10 text-white/40 hover:text-neon-cyan hover:border-neon-cyan/40 transition-all duration-200"
          >
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Cards grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card p-5 h-36 animate-pulse">
              <div className="h-3 bg-white/10 rounded w-2/3 mb-3" />
              <div className="h-6 bg-white/10 rounded w-full mb-2" />
              <div className="h-3 bg-white/10 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {data.map((coin) => {
            const colors = COIN_COLORS[coin.id] ?? COIN_COLORS.bitcoin
            const isPositive = coin.price_change_percentage_24h >= 0

            return (
              <motion.div
                key={coin.id}
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -3 }}
                className="glass-card p-5 group cursor-pointer"
                style={{
                  borderColor: `${colors.accent}30`,
                  background: `linear-gradient(135deg, ${colors.bg}, rgba(10,21,32,0.8))`,
                }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span
                      className="font-display text-xs tracking-wider uppercase"
                      style={{ color: colors.accent }}
                    >
                      {coin.symbol}
                    </span>
                    <p className="font-mono-cyber text-white/40 text-xs">{coin.name}</p>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs font-mono-cyber px-2 py-0.5 rounded ${
                      isPositive
                        ? 'text-neon-green bg-neon-green/10'
                        : 'text-neon-pink bg-neon-pink/10'
                    }`}
                  >
                    {isPositive ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>

                {/* Price */}
                <div
                  className="font-display text-xl font-bold mb-2 group-hover:scale-[1.02] transition-transform"
                  style={{
                    color: colors.accent,
                    textShadow: `0 0 20px ${colors.glow}`,
                  }}
                >
                  ${formatPrice(coin.current_price)}
                </div>

                {/* Volume */}
                <div className="font-mono-cyber text-xs text-white/30">
                  Vol: {formatVolume(coin.total_volume)}
                </div>

                {/* Mini range bar */}
                <div className="mt-3">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${colors.accent}80, ${colors.accent})`,
                        width: `${Math.min(
                          100,
                          Math.max(
                            5,
                            ((coin.current_price - coin.low_24h) /
                              (coin.high_24h - coin.low_24h || 1)) *
                              100,
                          ),
                        )}%`,
                        boxShadow: `0 0 8px ${colors.glow}`,
                        transition: 'width 0.5s ease',
                      }}
                    />
                  </div>
                  <div className="flex justify-between font-mono-cyber text-[10px] text-white/20 mt-1">
                    <span>L: ${formatPrice(coin.low_24h)}</span>
                    <span>H: ${formatPrice(coin.high_24h)}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </section>
  )
}
