'use client'

import { useEffect } from 'react'
import { DocHeader } from '@/components/DocHeader'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen">
      <DocHeader 
        title="Something went wrong" 
        description="An unexpected error occurred while loading this page."
      />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">
          <div className="text-6xl mb-6">💥</div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            Oops! Something went wrong
          </h1>
          
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            We're sorry, but something unexpected happened. This error has been logged and we'll look into it.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-left max-w-4xl mx-auto">
              <h3 className="text-red-400 font-medium mb-2">Error Details (Development Mode)</h3>
              <pre className="text-red-300 text-sm overflow-x-auto whitespace-pre-wrap">
                {error.message}
                {error.stack && '\n\nStack trace:\n' + error.stack}
              </pre>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
            
            <a
              href="/"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Go Home
            </a>
          </div>
          
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-white mb-4">Need Help?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/stellerpad/stellar-launchpad-docs/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 underline"
              >
                Report this issue on GitHub
              </a>
              
              <a
                href="https://discord.gg/stellar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 underline"
              >
                Get help on Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}