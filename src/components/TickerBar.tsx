import { useCryptoData } from '../hooks/useCryptoData'

export default function TickerBar() {
  const { data } = useCryptoData()

  const items = data.length > 0
    ? data.map((c) => ({
        label: c.symbol.toUpperCase(),
        value: `$${c.current_price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
        up: c.price_change_percentage_24h >= 0,
        pct: `${c.price_change_percentage_24h >= 0 ? '+' : ''}${c.price_change_percentage_24h.toFixed(2)}%`,
      }))
    : [
        { label: 'BTC', value: '$67,420', up: true,  pct: '+2.47%' },
        { label: 'ETH', value: '$3,541',  up: false, pct: '-1.12%' },
        { label: 'SOL', value: '$178.3',  up: true,  pct: '+5.83%' },
        { label: 'ADA', value: '$0.481',  up: false, pct: '-0.75%' },
      ]

  // Duplicate for seamless loop
  const doubled = [...items, ...items, ...items]

  return (
    <div
      className="relative z-20 w-full overflow-hidden py-2 border-y"
      style={{
        borderColor: 'rgba(0,245,255,0.08)',
        background: 'rgba(0,245,255,0.02)',
      }}
    >
      <div className="ticker-wrap">
        <div
          className="inline-flex gap-8"
          style={{ animation: 'ticker 25s linear infinite' }}
        >
          {doubled.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2 font-mono-cyber text-xs"
            >
              <span className="text-white/40">{item.label}</span>
              <span className="text-white/80">{item.value}</span>
              <span className={item.up ? 'text-neon-green' : 'text-neon-pink'}>
                {item.pct}
              </span>
              <span className="text-white/10">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
