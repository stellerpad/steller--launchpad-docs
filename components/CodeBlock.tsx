import { ReactNode } from 'react'

interface CodeBlockProps {
  children: ReactNode
  className?: string
}

export function CodeBlock({ children, className = '' }: CodeBlockProps) {
  return (
    <div className="relative">
      <pre className={`bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm ${className}`}>
        <code>{children}</code>
      </pre>
    </div>
  )
}