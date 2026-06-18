import Link from 'next/link'
import { DocHeader } from '@/components/DocHeader'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <DocHeader 
        title="Stellar Launchpad Documentation"
        description="Complete guide to launching tokens, managing vesting schedules, and running airdrops on the Stellar network."
      />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Getting Started */}
          <Link href="/docs/getting-started" className="group">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-primary-500 transition-colors">
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400">
                Getting Started
              </h3>
              <p className="text-gray-300">
                Launch your first token in 5 minutes. Learn about prerequisites, network setup, and quickstart guide.
              </p>
            </div>
          </Link>

          {/* Token Contract */}
          <Link href="/docs/contracts/token" className="group">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-primary-500 transition-colors">
              <div className="text-2xl mb-3">🪙</div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400">
                Token Contract
              </h3>
              <p className="text-gray-300">
                Complete reference for the token contract including all functions, parameters, and security considerations.
              </p>
            </div>
          </Link>

          {/* Vesting Contract */}
          <Link href="/docs/contracts/vesting" className="group">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-primary-500 transition-colors">
              <div className="text-2xl mb-3">⏳</div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400">
                Vesting Contract
              </h3>
              <p className="text-gray-300">
                Set up team vesting schedules with linear, cliff, or hybrid vesting models.
              </p>
            </div>
          </Link>

          {/* Airdrop Contract */}
          <Link href="/docs/contracts/airdrop" className="group">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-primary-500 transition-colors">
              <div className="text-2xl mb-3">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400">
                Airdrop Contract
              </h3>
              <p className="text-gray-300">
                Run airdrop campaigns with equal, weighted, or claimable distribution models.
              </p>
            </div>
          </Link>

          {/* CLI Reference */}
          <Link href="/docs/cli" className="group">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-primary-500 transition-colors">
              <div className="text-2xl mb-3">⌨️</div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400">
                CLI Reference
              </h3>
              <p className="text-gray-300">
                Command-line interface for interacting with contracts, launching tokens, and managing campaigns.
              </p>
            </div>
          </Link>

          {/* Web App Guide */}
          <Link href="/docs/web-app" className="group">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-primary-500 transition-colors">
              <div className="text-2xl mb-3">🌐</div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400">
                Web App Guide
              </h3>
              <p className="text-gray-300">
                Use the web dashboard to launch tokens, create vesting schedules, and browse the ecosystem.
              </p>
            </div>
          </Link>

        </div>

        {/* Quick Links */}
        <div className="mt-16 border-t border-gray-700 pt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Links</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Sister Repositories</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://github.com/stellerpad/stellar-launchpad-core" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:text-primary-300 flex items-center gap-2"
                  >
                    Core Contracts
                    <span className="text-gray-400">→</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/stellerpad/stellar-launchpad-web" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:text-primary-300 flex items-center gap-2"
                  >
                    Web Dashboard
                    <span className="text-gray-400">→</span>
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Popular Topics</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs/integration" className="text-primary-400 hover:text-primary-300">
                    Integration Guide
                  </Link>
                </li>
                <li>
                  <Link href="/docs/security" className="text-primary-400 hover:text-primary-300">
                    Security Best Practices
                  </Link>
                </li>
                <li>
                  <Link href="/docs/contracts/launchpad" className="text-primary-400 hover:text-primary-300">
                    Launchpad Registry
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}