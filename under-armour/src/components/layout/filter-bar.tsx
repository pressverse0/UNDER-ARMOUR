import { Filter } from "lucide-react"
import type { FilterGroup, SortOption } from "@/types/filters"

export type { FilterOption, FilterGroup, SortOption } from "@/types/filters"

interface FilterBarProps {
  filterGroups?: FilterGroup[]
  sortOptions: SortOption[]
  sortBy: string
  onSortChange: (value: string) => void
  children?: React.ReactNode
}

export default function FilterBar({
  filterGroups,
  sortOptions,
  sortBy,
  onSortChange,
  children,
}: FilterBarProps) {
  return (
    <section className="ua-filter-bar top-[56px]">
      <div className="ua-page-container py-3">
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <div className="flex flex-wrap items-center gap-4">
            {filterGroups?.map((group, i) => (
              <div key={i} className="flex items-center gap-2">
                {i === 0 && <Filter className="h-4 w-4 text-gray-500" />}
                {group.label && (
                  <span className="text-sm font-black uppercase text-gray-500">
                    {group.label}:
                  </span>
                )}
                <div className="flex gap-1 flex-wrap">
                  {group.options.map((opt) => {
                    const isActive = group.value === opt.value
                    const activeClass =
                      group.activeClass === "black"
                        ? "bg-black text-white border-black"
                        : "ua-filter-chip-on"
                    return (
                      <button
                        key={opt.value}
                        onClick={() => group.onChange(opt.value)}
                        className={`ua-filter-chip ${isActive ? activeClass : "ua-filter-chip-off"}`}
                      >
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
            {children}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-black uppercase text-gray-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="ua-sort-select rounded-md"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  )
}
