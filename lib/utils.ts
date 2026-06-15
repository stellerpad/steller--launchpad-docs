export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatAmount(amount: string | number, decimals: number = 7): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return (num / Math.pow(10, decimals)).toLocaleString()
}

export function truncateAddress(address: string, start: number = 6, end: number = 4): string {
  if (address.length <= start + end) return address
  return `${address.slice(0, start)}...${address.slice(-end)}`
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function validateStellarAddress(address: string): boolean {
  return /^G[A-Z2-7]{55}$/.test(address)
}

export function formatDuration(seconds: number): string {
  const units = [
    { name: 'year', seconds: 31536000 },
    { name: 'month', seconds: 2592000 },
    { name: 'day', seconds: 86400 },
    { name: 'hour', seconds: 3600 },
    { name: 'minute', seconds: 60 }
  ]

  for (const unit of units) {
    const value = Math.floor(seconds / unit.seconds)
    if (value >= 1) {
      return `${value} ${unit.name}${value > 1 ? 's' : ''}`
    }
  }
  
  return `${seconds} second${seconds !== 1 ? 's' : ''}`
}