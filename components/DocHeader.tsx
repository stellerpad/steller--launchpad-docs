import Link from 'next/link'

interface DocHeaderProps {
  title: string
  description?: string
  breadcrumbs?: Array<{
    label: string
    href: string
  }>
}

export function DocHeader({ title, description, breadcrumbs = [] }: DocHeaderProps) {
  return (
    <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {breadcrumbs.length > 0 && (
          <nav className="flex mb-4 text-sm text-gray-400">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center">
                <Link
                  href={crumb.href}
                  className="hover:text-white transition-colors"
                >
                  {crumb.label}
                </Link>
                {index < breadcrumbs.length - 1 && (
                  <span className="mx-2 text-gray-500">/</span>
                )}
              </div>
            ))}
          </nav>
        )}
        
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        
        {description && (
          <p className="text-gray-300 text-lg leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}