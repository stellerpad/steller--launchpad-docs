// Network Configuration
export const NETWORKS = {
  TESTNET: {
    name: 'testnet',
    rpcUrl: 'https://soroban-testnet.stellar.org',
    networkPassphrase: 'Test SDF Network ; September 2015',
    explorerUrl: 'https://testnet.stellarchain.io'
  },
  MAINNET: {
    name: 'mainnet', 
    rpcUrl: 'https://soroban-mainnet.stellar.org',
    networkPassphrase: 'Public Global Stellar Network ; September 2015',
    explorerUrl: 'https://stellarchain.io'
  }
} as const

// Contract Addresses
export const CONTRACT_ADDRESSES = {
  TESTNET: {
    TOKEN: 'CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    VESTING: 'CBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
    AIRDROP: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
    REGISTRY: 'CDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD'
  },
  MAINNET: {
    TOKEN: 'C1111111111111111111111111111111111111111111111111111111',
    VESTING: 'C2222222222222222222222222222222222222222222222222222222',
    AIRDROP: 'C3333333333333333333333333333333333333333333333333333333',
    REGISTRY: 'C4444444444444444444444444444444444444444444444444444444'
  }
} as const

// Token Categories
export const TOKEN_CATEGORIES = [
  { value: 'utility', label: 'Utility', description: 'Utility tokens for dApps and protocols' },
  { value: 'governance', label: 'Governance', description: 'Governance tokens for DAOs' },
  { value: 'defi', label: 'DeFi', description: 'DeFi protocol tokens' },
  { value: 'gaming', label: 'Gaming', description: 'Gaming and metaverse tokens' },
  { value: 'nft', label: 'NFT', description: 'NFT collection tokens' },
  { value: 'community', label: 'Community', description: 'Community and social tokens' },
  { value: 'meme', label: 'Meme', description: 'Meme tokens' },
  { value: 'stablecoin', label: 'Stablecoin', description: 'Stablecoins and pegged assets' },
  { value: 'other', label: 'Other', description: 'Miscellaneous or experimental tokens' }
] as const

// Validation Constants
export const VALIDATION = {
  TOKEN_SYMBOL: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 12,
    PATTERN: /^[A-Z0-9]+$/
  },
  TOKEN_NAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 100
  },
  TOKEN_DECIMALS: {
    MIN: 0,
    MAX: 18,
    DEFAULT: 7
  },
  DESCRIPTION: {
    MAX_LENGTH: 500
  }
} as const

// Time Constants (in seconds)
export const TIME_UNITS = {
  MINUTE: 60,
  HOUR: 60 * 60,
  DAY: 24 * 60 * 60,
  WEEK: 7 * 24 * 60 * 60,
  MONTH: 30 * 24 * 60 * 60,
  YEAR: 365 * 24 * 60 * 60
} as const

// UI Constants
export const UI = {
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100
  },
  BATCH_SIZES: {
    AIRDROP_EQUAL: 200,
    AIRDROP_WEIGHTED: 150,
    AIRDROP_CLAIMABLE: 1000
  },
  DEBOUNCE_DELAY: 300
} as const

// External Links
export const LINKS = {
  STELLAR_DOCS: 'https://developers.stellar.org',
  FREIGHTER_WALLET: 'https://freighter.app',
  STELLAR_LABORATORY: 'https://laboratory.stellar.org',
  GITHUB_CORE: 'https://github.com/<your-org>/stellar-launchpad-core',
  GITHUB_WEB: 'https://github.com/<your-org>/stellar-launchpad-web',
  DISCORD: 'https://discord.gg/stellar',
  TWITTER: 'https://twitter.com/stellarorg'
} as const