import { ReactNode } from 'react'

interface FunctionRefProps {
  name: string
  signature: string
  description: string
  parameters?: Array<{
    name: string
    type: string
    description: string
    optional?: boolean
  }>
  returns?: {
    type: string
    description: string
  }
  errors?: string[]
  example?: ReactNode
}

export function FunctionRef({
  name,
  signature,
  description,
  parameters = [],
  returns,
  errors = [],
  example
}: FunctionRefProps) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 my-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
        <code className="bg-gray-900 text-green-400 px-3 py-2 rounded text-sm block overflow-x-auto">
          {signature}
        </code>
      </div>

      <p className="text-gray-300 mb-4">{description}</p>

      {parameters.length > 0 && (
        <div className="mb-4">
          <h4 className="text-lg font-medium text-white mb-2">Parameters</h4>
          <div className="space-y-2">
            {parameters.map((param) => (
              <div key={param.name} className="bg-gray-900/50 p-3 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-blue-400">{param.name}</code>
                  <span className="text-gray-500">:</span>
                  <code className="text-purple-400">{param.type}</code>
                  {param.optional && (
                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                      optional
                    </span>
                  )}
                </div>
                <p className="text-gray-300 text-sm">{param.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {returns && (
        <div className="mb-4">
          <h4 className="text-lg font-medium text-white mb-2">Returns</h4>
          <div className="bg-gray-900/50 p-3 rounded">
            <code className="text-purple-400 mb-1 block">{returns.type}</code>
            <p className="text-gray-300 text-sm">{returns.description}</p>
          </div>
        </div>
      )}

      {errors.length > 0 && (
        <div className="mb-4">
          <h4 className="text-lg font-medium text-white mb-2">Errors</h4>
          <ul className="space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-red-400 text-sm">
                • <code>{error}</code>
              </li>
            ))}
          </ul>
        </div>
      )}

      {example && (
        <div>
          <h4 className="text-lg font-medium text-white mb-2">Example</h4>
          {example}
        </div>
      )}
    </div>
  )
}