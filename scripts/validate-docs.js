#!/usr/bin/env node

/**
 * Documentation validation script
 * Checks for common issues in MDX files
 */

const fs = require('fs')
const path = require('path')
const glob = require('glob')

const DOCS_DIR = './app/docs'
const MDX_PATTERN = '**/*.mdx'

// Validation rules
const rules = {
  // Check for missing DocHeader component
  missingDocHeader: (content) => {
    return !content.includes('<DocHeader')
  },
  
  // Check for broken internal links
  brokenInternalLinks: (content) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    const matches = [...content.matchAll(linkRegex)]
    const brokenLinks = []
    
    matches.forEach(([fullMatch, text, url]) => {
      if (url.startsWith('/docs/') && !url.startsWith('http')) {
        const filePath = `./app${url}.mdx`
        if (!fs.existsSync(filePath) && !fs.existsSync(`./app${url}/page.mdx`)) {
          brokenLinks.push(url)
        }
      }
    })
    
    return brokenLinks.length > 0 ? brokenLinks : false
  },
  
  // Check for inconsistent code block languages
  inconsistentCodeBlocks: (content) => {
    const codeBlockRegex = /```(\w+)?/g
    const languages = [...content.matchAll(codeBlockRegex)]
      .map(match => match[1] || 'plain')
      .filter(lang => ['javascript', 'js', 'typescript', 'ts'].includes(lang))
    
    const hasJS = languages.includes('javascript') || languages.includes('js')
    const hasTS = languages.includes('typescript') || languages.includes('ts')
    
    return hasJS && hasTS ? 'Mixed JS/TS usage' : false
  },
  
  // Check for missing breadcrumbs
  missingBreadcrumbs: (content, filePath) => {
    if (filePath.includes('/docs/') && !filePath.endsWith('/docs/page.mdx')) {
      return !content.includes('breadcrumbs=')
    }
    return false
  }
}

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(process.cwd(), filePath)
  const issues = []

  Object.entries(rules).forEach(([ruleName, rule]) => {
    const result = rule(content, relativePath)
    if (result) {
      issues.push({
        rule: ruleName,
        message: typeof result === 'string' ? result : `Failed: ${ruleName}`,
        details: Array.isArray(result) ? result : null
      })
    }
  })

  return { filePath: relativePath, issues }
}

function main() {
  console.log('🔍 Validating documentation files...\n')

  const mdxFiles = glob.sync(path.join(DOCS_DIR, MDX_PATTERN))
  let totalIssues = 0

  mdxFiles.forEach(file => {
    const result = validateFile(file)
    
    if (result.issues.length > 0) {
      console.log(`❌ ${result.filePath}`)
      result.issues.forEach(issue => {
        console.log(`   • ${issue.message}`)
        if (issue.details) {
          issue.details.forEach(detail => {
            console.log(`     - ${detail}`)
          })
        }
      })
      console.log('')
      totalIssues += result.issues.length
    } else {
      console.log(`✅ ${result.filePath}`)
    }
  })

  console.log(`\n📊 Validation complete: ${totalIssues} issues found in ${mdxFiles.length} files`)
  
  if (totalIssues > 0) {
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}