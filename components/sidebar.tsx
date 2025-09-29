'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileSignature } from 'lucide-react'

const items = [
  { href: '/app/home', label: 'Home', icon: FileSignature },
  { href: '/app/desking', label: 'Desking', icon: FileSignature },
  { href: '/app/inventory', label: 'Inventory', icon: FileSignature },
  { href: '/app/inventory-export-manager', label: 'Inventory Export Manager', icon: FileSignature },
  { href: '/app/settings', label: 'Settings', icon: FileSignature },
  { href: '/app/crm', label: 'CRM', icon: FileSignature },
  { href: '/app/accounting', label: 'Accounting', icon: FileSignature },
  { href: '/app/contacts', label: 'Contacts', icon: FileSignature },
  { href: '/app/credit', label: 'Credit', icon: FileSignature },
  { href: '/app/report', label: 'Report', icon: FileSignature },
  { href: '/app/website-utilities', label: 'Website Utilities', icon: FileSignature },
  { href: '/app/marketing', label: 'Marketing', icon: FileSignature },
  { href: '/app/dashboard', label: 'Dashboard', icon: FileSignature },
  { href: '/app/craigslist-campaigns', label: 'Craigslist-Campaigns', icon: FileSignature },
  { href: '/app/craigslist-manual-post', label: 'Craigslist-Manual Post', icon: FileSignature },
  { href: '/app/craigslist-posted-ads', label: 'Craigslist-Posted ADS', icon: FileSignature },
  
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
