import { Search, X } from "lucide-react"
import { useRef, useEffect } from "react"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  autoFocus?: boolean
  className?: string
}

export default function SearchInput({ value, onChange, placeholder = "Search products...", autoFocus = false, className = "" }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  return (
    <div className={`relative group flex-1 min-w-0 ${className}`}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-red-600 transition-colors pointer-events-none" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="ua-search-input"
      />
      {value && (
        <button type="button" onClick={() => onChange("")} className="ua-search-clear" aria-label="Clear search">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
