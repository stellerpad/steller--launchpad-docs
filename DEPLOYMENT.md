# Deployment Guide

This document covers how to deploy the Stellar Launchpad Documentation site.

## Prerequisites

- Node.js 18+
- npm or yarn
- Vercel account (recommended)
- GitHub repository

## Environment Variables

Create environment files for different environments:

### Development (.env.local)
```bash
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_TOKEN_CONTRACT=CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
NEXT_PUBLIC_VESTING_CONTRACT=CBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
NEXT_PUBLIC_AIRDROP_CONTRACT=CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
NEXT_PUBLIC_REGISTRY_CONTRACT=CDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
```

### Production
```bash
NEXT_PUBLIC_STELLAR_NETWORK=mainnet
NEXT_PUBLIC_RPC_URL=https://soroban-mainnet.stellar.org
NEXT_PUBLIC_TOKEN_CONTRACT=C1111111111111111111111111111111111111111111111111111111
NEXT_PUBLIC_VESTING_CONTRACT=C2222222222222222222222222222222222222222222222222222222
NEXT_PUBLIC_AIRDROP_CONTRACT=C3333333333333333333333333333333333333333333333333333333
NEXT_PUBLIC_REGISTRY_CONTRACT=C4444444444444444444444444444444444444444444444444444444
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Link project
   vercel link
   ```

2. **Set Environment Variables**
   ```bash
   # Set production environment variables
   vercel env add NEXT_PUBLIC_STELLAR_NETWORK
   vercel env add NEXT_PUBLIC_RPC_URL
   # ... add other variables
   ```

3. **Deploy**
   ```bash
   # Deploy to preview
   vercel
   
   # Deploy to production
   vercel --prod
   ```

4. **Automatic Deployments**
   - Push to `main` branch triggers production deployment
   - Pull requests create preview deployments
   - GitHub Actions handle validation and deployment

### Option 2: Netlify

1. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: out
   ```

2. **Environment Variables**
   Set the same environment variables in Netlify dashboard

3. **Deploy**
   ```bash
   # Add static export to next.config.js
   output: 'export'
   
   # Build and deploy
   npm run build
   ```

### Option 3: Self-Hosted

1. **Build Application**
   ```bash
   npm install
   npm run build
   npm start
   ```

2. **Using PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "launchpad-docs" -- start
   pm2 save
   pm2 startup
   ```

3. **Using Docker**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY . .
   RUN npm run build
   
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

## Domain Configuration

### Custom Domain Setup

1. **Add Domain to Vercel**
   ```bash
   vercel domains add docs.launchpad.stellar.org
   ```

2. **DNS Configuration**
   ```
   Type: CNAME
   Name: docs
   Value: cname.vercel-dns.com
   ```

### SSL Certificate
- Vercel automatically provisions SSL certificates
- Custom certificates can be uploaded if needed

## Performance Optimization

### Build Optimizations

1. **Static Generation**
   ```javascript
   // next.config.js
   experimental: {
     staticWorkerRequestDeduping: true,
   }
   ```

2. **Image Optimization**
   ```javascript
   images: {
     domains: ['stellar.org', 'launchpad.stellar.org'],
     formats: ['image/webp', 'image/avif']
   }
   ```

### CDN Configuration

1. **Cache Headers**
   ```javascript
   // vercel.json
   "headers": [
     {
       "source": "/static/(.*)",
       "headers": [
         {
           "key": "Cache-Control",
           "value": "public, max-age=31536000, immutable"
         }
       ]
     }
   ]
   ```

## Monitoring and Analytics

### Setup Analytics

1. **Google Analytics**
   ```bash
   vercel env add NEXT_PUBLIC_GA_ID
   ```

2. **Vercel Analytics**
   ```javascript
   // pages/_app.js
   import { Analytics } from '@vercel/analytics/react'
   
   export default function App({ Component, pageProps }) {
     return (
       <>
         <Component {...pageProps} />
         <Analytics />
       </>
     )
   }
   ```

### Error Monitoring

1. **Sentry Integration**
   ```bash
   npm install @sentry/nextjs
   ```

2. **Configuration**
   ```javascript
   // sentry.client.config.js
   import * as Sentry from '@sentry/nextjs'
   
   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV
   })
   ```

## Security Considerations

### Content Security Policy

```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob: *.stellar.org;
      font-src 'self';
      connect-src 'self' *.stellar.org *.googleapis.com;
    `.replace(/\s{2,}/g, ' ').trim()
  }
]
```

### Rate Limiting

```javascript
// middleware.js
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 h')
})

export async function middleware(request) {
  const ip = request.ip ?? '127.0.0.1'
  const { success } = await ratelimit.limit(ip)
  
  if (!success) {
    return new Response('Rate limit exceeded', { status: 429 })
  }
}
```

## Maintenance

### Regular Updates

1. **Dependencies**
   ```bash
   # Check for updates
   npm outdated
   
   # Update dependencies
   npm update
   
   # Update Next.js
   npm install next@latest
   ```

2. **Security Audits**
   ```bash
   npm audit
   npm audit fix
   ```

### Backup Strategy

1. **Repository Backup**
   - GitHub automatically maintains repository history
   - Consider additional backup to different provider

2. **Content Backup**
   ```bash
   # Export all documentation
   git archive --format=tar.gz --output=docs-backup.tar.gz HEAD
   ```

### Performance Monitoring

1. **Core Web Vitals**
   - Monitor Largest Contentful Paint (LCP)
   - Monitor First Input Delay (FID)
   - Monitor Cumulative Layout Shift (CLS)

2. **Lighthouse CI**
   ```yaml
   # .github/workflows/lighthouse.yml
   name: Lighthouse CI
   on: [push]
   jobs:
     lighthouse:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Run Lighthouse CI
           uses: treosh/lighthouse-ci-action@v9
   ```

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   
   # Clear npm cache
   npm cache clean --force
   
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Environment Variables Not Working**
   - Ensure variables start with `NEXT_PUBLIC_` for client-side
   - Restart development server after adding variables
   - Check variable names match exactly

3. **MDX Compilation Errors**
   - Check MDX syntax is valid
   - Ensure imports are properly formatted
   - Verify component names match exports

### Rollback Procedure

1. **Vercel Rollback**
   ```bash
   # List deployments
   vercel ls
   
   # Promote previous deployment
   vercel promote <deployment-url>
   ```

2. **Git Rollback**
   ```bash
   # Revert to previous commit
   git revert HEAD
   
   # Or reset to specific commit
   git reset --hard <commit-hash>
   git push --force
   ```

## Support

- **Documentation Issues**: Create issue on GitHub
- **Deployment Questions**: Contact DevOps team
- **Security Concerns**: Email security@stellar.org