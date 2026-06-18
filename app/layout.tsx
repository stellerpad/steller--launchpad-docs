import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Stellar Launchpad Docs',
  description: 'Complete documentation for the Stellar Launchpad token ecosystem — launch tokens, manage vesting, and run airdrops on Stellar.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://stellerlaunchpad.netlify.app'),
  openGraph: {
    title: 'Stellar Launchpad Docs',
    description: 'Complete documentation for the Stellar Launchpad token ecosystem',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://stellerlaunchpad.netlify.app',
    siteName: 'Stellar Launchpad Docs',
    type: 'website',
  },
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