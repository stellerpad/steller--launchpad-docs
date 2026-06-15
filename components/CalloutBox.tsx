import { ReactNode } from 'react'

interface CalloutBoxProps {
  type?: 'info' | 'warning' | 'danger' | 'success'
  title?: string
  children: ReactNode
}

export function CalloutBox({ type = 'info', title, children }: CalloutBoxProps) {
  const styles = {
    info: {
      bg: 'bg-blue-900/20',
      border: 'border-blue-500/50',
      icon: '💡',
      titleColor: 'text-blue-400'
    },
    warning: {
      bg: 'bg-yellow-900/20',
      border: 'border-yellow-500/50',
      icon: '⚠️',
      titleColor: 'text-yellow-400'
    },
    danger: {
      bg: 'bg-red-900/20',
      border: 'border-red-500/50',
      icon: '🚨',
      titleColor: 'text-red-400'
    },
    success: {
      bg: 'bg-green-900/20',
      border: 'border-green-500/50',
      icon: '✅',
      titleColor: 'text-green-400'
    }
  }

  const style = styles[type]

  return (
    <div className={`${style.bg} ${style.border} border rounded-lg p-4 my-6`}>
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{style.icon}</span>
          <h4 className={`font-semibold ${style.titleColor}`}>{title}</h4>
        </div>
      )}
      <div className="text-gray-300 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}