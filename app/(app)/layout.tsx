'use client'

import { GraduationCap, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Shortages', href: '/shortages' },
  { label: 'Predictive ML', href: '/predictions' },
  { label: 'Students', href: '/students' },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-black font-sans text-white antialiased flex flex-col selection:bg-[#0071e3] selection:text-white">
      <header className="sticky top-0 z-30 flex h-[60px] items-center justify-between border-b border-white/10 bg-black/80 px-8 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3 text-[19px] font-semibold tracking-[-0.04em]">
          <GraduationCap className="size-5 text-[#0071e3]" strokeWidth={2} />
          AttendanceHub
        </Link>
        <nav className="hidden items-center gap-10 text-[15px] md:flex">
          {navItems.map(item => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`transition-colors ${pathname === item.href ? 'text-[#0071e3] font-medium' : 'text-gray-400 hover:text-white'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <span className="hidden text-[15px] text-gray-400 sm:inline">Dr. Sarah Chen</span>
          <Link href="/" className="flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label="Sign out">
            <LogOut className="size-4" />
          </Link>
        </div>
      </header>
      <div className="flex-1">
        {children}
      </div>
      <footer className="border-t border-white/10 px-8 py-10 text-center text-gray-500 mt-auto">
        AttendanceHub · Predictive attendance analytics for modern institutions.
      </footer>
    </div>
  )
}
