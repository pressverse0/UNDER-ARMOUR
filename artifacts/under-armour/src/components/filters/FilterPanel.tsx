import { useState } from "react"
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react"
import type { ReactNode } from "react"

interface FilterPanelProps {
  isOpen: boolean
  onToggle: () => void
  onClear: () => void
  activeCount: number
  children: ReactNode
}

export default function FilterPanel({
  isOpen,
  onToggle,
  onClear,
  activeCount,
  children,
}: FilterPanelProps) {
  return (
    <>
      {/* Toggle button — returned separately, inserted into the toolbar by caller */}
      <div className="contents" data-filter-panel>
        {isOpen && (
          <section className="bg-white border-b-2 border-gray-200 shadow-inner">
            <div className="container mx-auto px-4 py-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-red-600" />
                  <h3 className="font-black text-base uppercase text-black">Filters</h3>
                  {activeCount > 0 && (
                    <span className="bg-red-600 text-white text-xs font-black rounded-full px-2 py-0.5">
                      {activeCount} active
                    </span>
                  )}
                </div>
                {activeCount > 0 && (
                  <button
                    type="button"
                    onClick={onClear}
                    className="flex items-center gap-1.5 text-sm font-black uppercase text-gray-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50 border border-gray-200 hover:border-red-300"
                  >
                    <X className="h-3.5 w-3.5" /> Clear All
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {children}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}

interface FilterToggleButtonProps {
  isOpen: boolean
  onToggle: () => void
  activeCount: number
  label?: string
}

export function FilterToggleButton({
  isOpen,
  onToggle,
  activeCount,
  label = "Filters",
}: FilterToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`ua-filter-toggle-btn ${isOpen ? "ua-filter-toggle-active" : "ua-filter-toggle-inactive"}`}
    >
      <SlidersHorizontal className="h-4 w-4" />
      {label}
      {activeCount > 0 && (
        <span className="bg-red-600 text-white text-xs font-black rounded-full w-5 h-5 flex items-center justify-center">
          {activeCount}
        </span>
      )}
      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
    </button>
  )
}
