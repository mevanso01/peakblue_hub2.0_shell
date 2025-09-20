'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileSignature } from 'lucide-react'

const items = [
  { href: '/app/desking', label: 'Desking', icon: FileSignature },
  { href: '/app/inventory', label: 'Inventory', icon: FileSignature },
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-64 h-full border-r bg-card flex flex-col">
      <div className="mb-4 px-4">
        <Link href="/app/desking" className="font-bold text-lg">
          Dealr Demo
        </Link>
      </div>
      <nav className="flex flex-col gap-1 px-2">
        {items.map((it) => {
          const ActiveIcon = it.icon
          const active = pathname.startsWith(it.href)
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              <ActiveIcon size={18} />
              <span>{it.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
