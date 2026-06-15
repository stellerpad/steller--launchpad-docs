# Contributing to Stellar Launchpad Docs

Thank you for your interest in contributing to the Stellar Launchpad documentation! This guide will help you get started.

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/<your-org>/stellar-launchpad-docs.git
cd stellar-launchpad-docs

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## Documentation Structure

```
docs/
├── getting-started/     # Introduction and quickstart
├── contracts/          # Contract documentation
│   ├── token/         # Token contract
│   ├── vesting/       # Vesting contract  
│   ├── airdrop/       # Airdrop contract
│   └── launchpad/     # Registry contract
├── cli/               # CLI reference
├── web-app/           # Web app guide
├── integration/       # Developer integration
└── security/          # Security best practices
```

## Writing Guidelines

### Documentation Standards

- **Clear and Concise**: Write for developers of all experience levels
- **Complete Examples**: Provide working code examples
- **Up-to-Date**: Ensure all examples and addresses are current
- **Mobile-Friendly**: Test documentation on mobile devices

### MDX Format

Documentation uses MDX (Markdown + JSX components):

```mdx
import { CalloutBox } from '@/components/CalloutBox'

# Page Title

Regular markdown content here.

<CalloutBox type="warning" title="Important Note">
This is a warning callout box.
</CalloutBox>

## Code Examples

\```typescript
// TypeScript code example
const result = await contract.call('function_name')
\```
```

### Available Components

- `<CalloutBox>`: Info, warning, danger, success callouts
- `<FunctionRef>`: Contract function documentation
- `<NetworkBadge>`: Testnet/mainnet badges
- `<DocHeader>`: Page headers with breadcrumbs

## Content Guidelines

### Code Examples

- **Complete**: Include all necessary imports and setup
- **Tested**: Ensure all code examples work
- **Commented**: Add explanatory comments
- **Consistent**: Use consistent naming and patterns

Example:
```typescript
import { Keypair } from '@stellar/stellar-sdk'
import { LaunchpadSDK } from '@stellar/launchpad-sdk'

// Initialize SDK with testnet configuration
const sdk = new LaunchpadSDK({
  network: 'testnet',
  // ... configuration
})

// Launch a token with proper error handling
try {
  const result = await sdk.token.launch({
    creator: creatorKeypair,
    name: 'My Token',
    symbol: 'MYT',
    totalSupply: '1000000'
  })
  
  console.log(`Token launched: ${result.contractAddress}`)
} catch (error) {
  console.error('Launch failed:', error.message)
}
```

### Contract Addresses

Always use placeholder addresses in documentation:

- **Testnet Token**: `CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`
- **Testnet Vesting**: `CBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB`
- **Testnet Airdrop**: `CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC`
- **Testnet Registry**: `CDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD`

Update these when real addresses are available.

## Contribution Process

### 1. Issue First

Before starting work:
1. Check existing issues for similar requests
2. Create a new issue describing your proposed changes
3. Wait for maintainer feedback and approval

### 2. Fork and Branch

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/stellar-launchpad-docs.git

# Create a feature branch
git checkout -b docs/your-feature-name
```

### 3. Make Changes

- Follow the writing guidelines above
- Test your changes locally
- Ensure all links work correctly
- Check mobile responsiveness

### 4. Submit Pull Request

```bash
# Add and commit changes
git add .
git commit -m "docs: add XYZ documentation"

# Push to your fork
git push origin docs/your-feature-name

# Create pull request on GitHub
```

### Pull Request Guidelines

- **Clear Title**: Describe what the PR adds/fixes
- **Detailed Description**: Explain the changes and why they're needed
- **Screenshots**: Include screenshots for UI changes
- **Testing**: Describe how you tested the changes

Example PR description:
```markdown
## Summary
Adds comprehensive documentation for the vesting contract including all functions, examples, and integration patterns.

## Changes
- Added complete function reference with parameters and examples
- Included real-world usage scenarios for team/advisor vesting
- Added integration examples with TypeScript SDK
- Included troubleshooting section for common issues

## Testing
- Tested all code examples on testnet
- Verified all links work correctly
- Checked mobile responsiveness
- Reviewed for typos and formatting
```

## Review Process

### What We Look For

- **Accuracy**: All technical information is correct
- **Completeness**: No missing steps or information
- **Clarity**: Easy to understand for the target audience  
- **Examples**: Working code examples where appropriate
- **Links**: All internal and external links work

### Feedback and Revisions

- Maintainers will review PRs within 2-3 business days
- Address feedback in new commits (don't squash during review)
- Request re-review when ready
- Maintainers will squash and merge when approved

## Style Guide

### Writing Style

- **Active Voice**: "Launch a token" not "A token can be launched"
- **Present Tense**: "The contract returns" not "The contract will return"
- **Direct Instructions**: "Click the button" not "You can click the button"
- **Consistent Terminology**: Use the same terms throughout

### Formatting

- **Headers**: Use sentence case (not title case)
- **Code**: Always use syntax highlighting
- **Lists**: Use parallel structure
- **Links**: Use descriptive link text

### Common Patterns

**Function Documentation:**
```mdx
<FunctionRef
  name="function_name"
  signature="function_name(param1: Type, param2: Type) -> ReturnType"
  description="Clear description of what the function does."
  parameters={[
    {
      name: "param1",
      type: "Type",
      description: "What this parameter does"
    }
  ]}
  returns={{
    type: "ReturnType",
    description: "What the function returns"
  }}
  errors={["ErrorType - When this error occurs"]}
  example={<CodeExample />}
/>
```

**Callout Boxes:**
```mdx
<CalloutBox type="info" title="Helpful Tip">
Additional information that helps users.
</CalloutBox>

<CalloutBox type="warning" title="Important">
Critical information users need to know.
</CalloutBox>
```

## Getting Help

### Questions and Support

- **GitHub Discussions**: For general questions about contributing
- **GitHub Issues**: For bugs in documentation or missing content
- **Stellar Discord**: For real-time help and community discussion

### Resources

- [MDX Documentation](https://mdxjs.com/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Stellar Developer Docs](https://developers.stellar.org/)

## Recognition

Contributors will be:
- Listed in the repository contributors
- Mentioned in release notes for significant contributions
- Invited to join the documentation team for ongoing contributors

Thank you for helping make Stellar Launchpad documentation better for everyone!