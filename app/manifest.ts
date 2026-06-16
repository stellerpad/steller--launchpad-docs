import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Stellar Launchpad Documentation',
    short_name: 'Launchpad Docs',
    description: 'Complete documentation for the Stellar Launchpad token ecosystem',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0ea5e9',
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      }
    ],
  }
}