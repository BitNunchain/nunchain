'use client'

import { useState } from 'react'

export default function MiningPanel() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const startMining = async () => {
    setLoading(true)
    setResult(null)
    setError(null)
    try {
      const res = await fetch('/api/mine', { method: 'POST' })
      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error || 'Mining request failed')
      }
      const data = await res.json()
      setResult(`Block #${data.blockNumber} mined — reward: ${data.reward} NUN`)
    } catch (err: any) {
      setError(err.message || 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-zinc-900 rounded shadow-lg space-y-4">
      <h2 className="text-xl font-bold">Start Mining</h2>
      <button
        onClick={startMining}
        disabled={loading}
        className="px-4 py-2 rounded bg-avalRed hover:brightness-110 text-white disabled:opacity-50"
      >
        {loading ? 'Mining…' : 'Mine a Block'}
      </button>
      {result && <p className="text-green-400">{result}</p>}
      {error && <p className="text-red-400">{error}</p>}
    </div>
  )
}
