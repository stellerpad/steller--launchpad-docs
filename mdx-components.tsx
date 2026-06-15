import type { MDXComponents } from 'mdx/types'
import { CodeBlock } from './components/CodeBlock'
import { CalloutBox } from './components/CalloutBox'
import { FunctionRef } from './components/FunctionRef'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: ({ children, ...props }) => <CodeBlock {...props}>{children}</CodeBlock>,
    CodeBlock,
    CalloutBox,
    FunctionRef,
  }
}