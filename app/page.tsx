import Link from 'next/link'

export default function Home(){
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-semibold mb-4">Dealr Demo App</h1>
      <p className="mb-6">A minimal shell with protected routes and a Desking iframe.</p>
      <Link href="/login" className="btn">Go to Login</Link>
    </div>
  )
}
