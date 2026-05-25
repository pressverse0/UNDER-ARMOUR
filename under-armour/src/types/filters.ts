export interface FilterOption {
  label: string
  value: string
}

export interface FilterGroup {
  label?: string
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  activeClass?: "red" | "black"
}

export interface SortOption {
  label: string
  value: string
}
