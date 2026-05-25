import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react"
import type { ReactNode } from "react"

interface FilterPanelProps {
  isOpen: boolean
  onToggle: () => void
  onClear: () => void
  activeCount: number
  children: ReactNode
}

export default function FilterPanel({ isOpen, onToggle, onClear, activeCount, children }: FilterPanelProps) {
  if (!isOpen) return null
  return (
    <section className="ua-filter-panel">
      <div className="ua-filter-panel-inner">
        <div className="ua-filter-panel-header">
          <div className="ua-filter-panel-title">
            <SlidersHorizontal className="ua-filter-panel-icon" />
            <h3 className="ua-filter-panel-title-text">Filters</h3>
            {activeCount > 0 && (
              <span className="ua-filter-count-badge">{activeCount} active</span>
            )}
          </div>
          {activeCount > 0 && (
            <button type="button" onClick={onClear} className="ua-filter-clear-btn">
              <X className="h-3.5 w-3.5" /> Clear All
            </button>
          )}
        </div>
        <div className="ua-filter-panel-grid">{children}</div>
      </div>
    </section>
  )
}

interface FilterToggleButtonProps {
  isOpen: boolean
  onToggle: () => void
  activeCount: number
  label?: string
}

export function FilterToggleButton({ isOpen, onToggle, activeCount, label = "Filters" }: FilterToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`ua-filter-toggle-btn ${isOpen ? "ua-filter-toggle-active" : "ua-filter-toggle-inactive"}`}
    >
      <SlidersHorizontal className="h-4 w-4" />
      {label}
      {activeCount > 0 && <span className="ua-filter-toggle-count">{activeCount}</span>}
      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
    </button>
  )
}
