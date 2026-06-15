'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  {
    name: 'Getting Started',
    href: '/docs/getting-started',
    children: []
  },
  {
    name: 'Contracts',
    href: '/docs/contracts',
    children: [
      { name: 'Token Contract', href: '/docs/contracts/token' },
      { name: 'Vesting Contract', href: '/docs/contracts/vesting' },
      { name: 'Airdrop Contract', href: '/docs/contracts/airdrop' },
      { name: 'Launchpad Registry', href: '/docs/contracts/launchpad' }
    ]
  },
  {
    name: 'CLI Reference',
    href: '/docs/cli',
    children: []
  },
  {
    name: 'Web App Guide',
    href: '/docs/web-app',
    children: []
  },
  {
    name: 'Integration Guide',
    href: '/docs/integration',
    children: []
  },
  {
    name: 'Security',
    href: '/docs/security',
    children: []
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-800 p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 border-r border-gray-700 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <Link href="/" className="text-xl font-bold text-white">
            Stellar Launchpad
          </Link>
          <p className="text-sm text-gray-400 mt-1">Documentation</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
              
              {item.children.length > 0 && (
                <div className="ml-4 mt-2 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                        pathname === child.href
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                      }`}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer links */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="space-y-2 text-sm text-gray-400">
            <a
              href="https://github.com/<your-org>/stellar-launchpad-core"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-white"
            >
              Core Contracts →
            </a>
            <a
              href="https://github.com/<your-org>/stellar-launchpad-web"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-white"
            >
              Web Dashboard →
            </a>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}