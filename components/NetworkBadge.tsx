interface NetworkBadgeProps {
  network: 'testnet' | 'mainnet'
}

export function NetworkBadge({ network }: NetworkBadgeProps) {
  const styles = {
    testnet: {
      bg: 'bg-orange-900/30',
      border: 'border-orange-500/50',
      text: 'text-orange-400'
    },
    mainnet: {
      bg: 'bg-green-900/30',
      border: 'border-green-500/50',
      text: 'text-green-400'
    }
  }

  const style = styles[network]

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${style.bg} ${style.border} ${style.text} border`}>
      {network === 'testnet' ? '🧪' : '🟢'} {network.toUpperCase()}
    </span>
  )
}