'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const SEARCH_INDEX = [
  { title: 'Getting Started', href: '/docs/getting-started', desc: 'Launch your first token in 5 minutes' },
  { title: 'Token Contract', href: '/docs/contracts/token', desc: 'Core token functions: mint, burn, transfer' },
  { title: 'Vesting Contract', href: '/docs/contracts/vesting', desc: 'Time-locked distribution schedules' },
  { title: 'Airdrop Contract', href: '/docs/contracts/airdrop', desc: 'Equal, weighted, and claimable airdrops' },
  { title: 'Launchpad Registry', href: '/docs/contracts/launchpad', desc: 'Discover and track token launches' },
  { title: 'CLI Reference', href: '/docs/cli', desc: 'Command-line interface guide' },
  { title: 'Web App Guide', href: '/docs/web-app', desc: 'Using the web dashboard' },
  { title: 'Integration Guide', href: '/docs/integration', desc: 'SDK and developer integration' },
  { title: 'Security', href: '/docs/security', desc: 'Best practices and audit guidelines' },
]

export function SearchBox() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const results = query.trim().length > 0
    ? SEARCH_INDEX.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase())
      )
    : []

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder="Search documentation..."
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
          {results.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => { setQuery(''); setOpen(false) }}
              className="block px-4 py-3 hover:bg-gray-700 transition-colors"
            >
              <div className="text-sm font-medium text-white">{item.title}</div>
              <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
            </Link>
          ))}
        </div>
      )}

      {open && query.trim().length > 0 && results.length === 0 && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 px-4 py-3">
          <p className="text-sm text-gray-400">No results for &ldquo;{query}&rdquo;</p>
        </div>
      )}
    </div>
  )
}
