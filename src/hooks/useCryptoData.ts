import { useState, useEffect, useCallback } from 'react'

export interface CoinData {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  high_24h: number
  low_24h: number
}

const MOCK_DATA: CoinData[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    current_price: 67_420.15,
    price_change_percentage_24h: 2.47,
    market_cap: 1_327_000_000_000,
    total_volume: 28_400_000_000,
    high_24h: 68_100.0,
    low_24h: 65_800.0,
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    current_price: 3_541.88,
    price_change_percentage_24h: -1.12,
    market_cap: 425_000_000_000,
    total_volume: 14_200_000_000,
    high_24h: 3_620.0,
    low_24h: 3_490.0,
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    current_price: 178.34,
    price_change_percentage_24h: 5.83,
    market_cap: 82_000_000_000,
    total_volume: 4_100_000_000,
    high_24h: 182.0,
    low_24h: 168.0,
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    current_price: 0.4812,
    price_change_percentage_24h: -0.75,
    market_cap: 17_000_000_000,
    total_volume: 620_000_000,
    high_24h: 0.498,
    low_24h: 0.471,
  },
]

export function useCryptoData() {
  const [data, setData] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)
  const [isMock, setIsMock] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const url =
        '/api/coingecko/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,cardano&order=market_cap_desc&per_page=4&page=1&sparkline=false'

      const res = await fetch(url, {
        signal: AbortSignal.timeout(5000),
      })

      if (!res.ok) throw new Error('API error')

      const json: CoinData[] = await res.json()
      setData(json)
      setIsMock(false)
      setLastUpdated(new Date())
    } catch {
      // Fallback with slight randomization to feel "live"
      const jittered = MOCK_DATA.map((coin) => ({
        ...coin,
        current_price: coin.current_price * (1 + (Math.random() - 0.5) * 0.002),
        price_change_percentage_24h:
          coin.price_change_percentage_24h + (Math.random() - 0.5) * 0.1,
      }))
      setData(jittered)
      setIsMock(true)
      setLastUpdated(new Date())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30_000)
    return () => clearInterval(interval)
  }, [fetchData])

  return { data, loading, isMock, lastUpdated, refetch: fetchData }
}
