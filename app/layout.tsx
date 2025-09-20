import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dealr Demo App',
  description: 'Demo shell for dealerships with Desking embed'
}

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
