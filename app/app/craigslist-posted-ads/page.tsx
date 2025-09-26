'use client'
import { EMBED_BASE } from '@/lib/coreapi'
import * as React from 'react'

export default function CraigslistPostedADSPage() {
  const [src, setSrc] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const getOtp = async () => {
    try {
      const res = await fetch('/api/craigslist-manual-post/otp', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'OTP error')
      setSrc(data.embedUrl)
    } catch (e: any) {
      setError(e.message)
    }
  }

  React.useEffect(() => {
    getOtp()
  }, [])

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Page header */}
      <div className="flex items-center justify-between border-b bg-background px-6 py-3">
        <h1 className="text-lg font-semibold">Craigslist / Posted ADS</h1>
        <button
          onClick={getOtp}
          className="rounded-md border px-3 py-1 text-sm hover:bg-muted"
        >
          Refresh OTP
        </button>
      </div>

      {/* Iframe fills the rest */}
      <div>{src}</div>
      
      <div className="flex-1 overflow-hidden bg-muted/5">
        {error && <p className="text-red-600 p-4">{error}</p>}
        {src ? (
          <iframe src={src} className="h-full w-full border-0" />
        ) : (
          <p className="p-4 text-sm text-muted-foreground">Requesting OTP...</p>
        )}
      </div>
    </div>
  )
}
