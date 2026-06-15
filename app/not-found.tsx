import Link from 'next/link'
import { DocHeader } from '@/components/DocHeader'

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <DocHeader 
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
      />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">
          <div className="text-6xl mb-6">🚀</div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            404 - Page Not Found
          </h1>
          
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            The page you're looking for might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              Go Home
            </Link>
            
            <Link
              href="/docs/getting-started"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Documentation
            </Link>
          </div>
          
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-white mb-4">Popular Pages</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              <Link href="/docs/getting-started" className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <h3 className="font-medium text-white">Getting Started</h3>
                <p className="text-gray-400 text-sm mt-1">Launch your first token</p>
              </Link>
              
              <Link href="/docs/contracts/token" className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <h3 className="font-medium text-white">Token Contract</h3>
                <p className="text-gray-400 text-sm mt-1">Complete function reference</p>
              </Link>
              
              <Link href="/docs/cli" className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <h3 className="font-medium text-white">CLI Reference</h3>
                <p className="text-gray-400 text-sm mt-1">Command-line interface</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}