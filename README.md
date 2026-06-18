# Stellar Launchpad Documentation

Comprehensive documentation for the Stellar Launchpad ecosystem - a complete token lifecycle management platform on Stellar.

## Overview

Stellar Launchpad enables anyone to launch tokens on Stellar with built-in features for vesting, airdrops, and ecosystem discovery. This documentation covers all four smart contracts, the web app, CLI usage, and integration guides.

## Stellar Integration

This platform is built natively on the [Stellar network](https://stellar.org), leveraging its smart contract layer (Soroban) for all on-chain operations.

- **Network**: Stellar Mainnet / Testnet
- **Smart Contracts**: Written in Rust, compiled to WASM, deployed via [Soroban](https://soroban.stellar.org)
- **SDK**: [@stellar/stellar-sdk](https://www.npmjs.com/package/@stellar/stellar-sdk) for client-side interaction
- **Wallets**: Compatible with Freighter, xBull, and any WalletConnect-enabled Stellar wallet
- **Assets**: Tokens follow the Stellar Asset Contract (SAC) standard

```ts
import { Contract, SorobanRpc, TransactionBuilder } from "@stellar/stellar-sdk";

const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org");
const contract = new Contract("<CONTRACT_ADDRESS>");
```

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Documentation Structure

- **[Getting Started](/docs/getting-started)**: Launch your first token in 5 minutes
- **[Contracts](/docs/contracts)**: Complete smart contract reference
  - [Token Contract](/docs/contracts/token): Core token functionality  
  - [Vesting Contract](/docs/contracts/vesting): Time-locked distributions
  - [Airdrop Contract](/docs/contracts/airdrop): Community token drops
  - [Launchpad Registry](/docs/contracts/launchpad): Launch discovery
- **[CLI Reference](/docs/cli)**: Command-line interface guide
- **[Web App Guide](/docs/web-app)**: Using the web dashboard
- **[Integration Guide](/docs/integration)**: Developer SDK and APIs
- **[Security](/docs/security)**: Best practices and audit guidelines

## Features

- **Stellar / Soroban** smart contracts (Rust + WASM)
- **Stellar SDK** for wallet connection and transaction signing
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **MDX** for interactive documentation
- **Mobile responsive** design
- **Dark theme** matching the ecosystem

## Sister Repositories

- **[Core Contracts](https://github.com/stellerpad/stellar-launchpad-core)**: Smart contract source code
- **[Web Dashboard](https://github.com/stellerpad/stellar-launchpad-web)**: Web application interface

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](./LICENSE) for details.