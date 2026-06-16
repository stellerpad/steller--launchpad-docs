import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Stellar Launchpad Docs',
  description: 'Documentation for the Stellar Launchpad ecosystem',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-gray-100">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 lg:ml-64">
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  )
}