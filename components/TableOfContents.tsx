interface TOCItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  items: TOCItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <nav className="hidden xl:block fixed right-8 top-24 w-64">
      <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm border border-gray-700">
        <h3 className="text-sm font-semibold text-white mb-3">On this page</h3>
        <ul className="space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.id} className={`ml-${(item.level - 1) * 4}`}>
              <a
                href={`#${item.id}`}
                className="text-gray-300 hover:text-white transition-colors block py-1"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}