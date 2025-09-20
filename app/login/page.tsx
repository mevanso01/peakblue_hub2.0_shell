'use client'
import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})
type FormValues = z.infer<typeof schema>

function LoginPage() {
  const router = useRouter()
  const search = useSearchParams()
  const next = search.get('next') || '/app/desking'
  const [error, setError] = React.useState<string | undefined>()
  const [locations, setLocations] = React.useState<any[] | null>(null)
  const [tmpToken, setTmpToken] = React.useState<string | undefined>()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    setError(undefined)
    setLocations(null)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')

      console.log('Login response:', data)

      if (Array.isArray(data.locations) && data.locations.length > 0) {
        setLocations(data.locations)
        setTmpToken(data.token)
      } else {
        throw new Error('No locations found in response')
      }
    } catch (e: any) {
      setError(e.message)
    }
  }

  const onPickLocation = async (lid: number) => {
    if (!tmpToken) return
    setError(undefined)
    try {
      const res = await fetch('/api/auth/set-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lid, token: tmpToken }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Set location failed')
      router.replace(next)
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <div className="container flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          {!locations && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                void handleSubmit(onSubmit)(e)
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register('email')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                Sign in
              </Button>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <p className="text-xs text-neutral-500">
                After login, pick a location to finish authentication.
              </p>
            </form>
          )}
          {locations && (
            <div className="space-y-3">
              <h3 className="font-semibold">Select Location</h3>
              <div className="max-h-64 space-y-2 overflow-auto">
                {locations.map((loc: any) => (
                  <button
                    key={loc.lid}
                    onClick={() => onPickLocation(loc.lid)}
                    className="w-full rounded-lg border p-3 text-left hover:bg-neutral-50"
                  >
                    <div className="font-medium">{loc.name}</div>
                    <div className="text-xs text-neutral-500">
                      lid: {loc.lid} - {loc.city}, {loc.state}
                    </div>
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setLocations(null)
                  setTmpToken(undefined)
                }}
              >
                Back
              </Button>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


export default function LoginPageWrapper() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </React.Suspense>
  );
}