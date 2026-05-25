import { ChevronDown } from "lucide-react"

export interface SortOption {
  label: string
  value: string
}

interface SortSelectProps {
  value: string
  options: SortOption[]
  onChange: (value: string) => void
  label?: string
  className?: string
}

export default function SortSelect({ value, options, onChange, label = "Sort", className = "" }: SortSelectProps) {
  return (
    <div className={`ua-sort-wrapper ${className}`}>
      {label && <span className="ua-sort-label">{label}:</span>}
      <div className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value)} className="ua-sort-select-enhanced">
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
      </div>
    </div>
  )
}
