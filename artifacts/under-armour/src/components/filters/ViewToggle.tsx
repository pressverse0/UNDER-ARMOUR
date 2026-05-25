import { Grid3x3, List } from "lucide-react"

type ViewMode = "grid" | "list"

interface ViewToggleProps {
  value: ViewMode
  onChange: (mode: ViewMode) => void
}

export default function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="ua-view-toggle">
      <button
        type="button"
        onClick={() => onChange("grid")}
        aria-label="Grid view"
        className={value === "grid" ? "ua-view-btn-active" : "ua-view-btn"}
      >
        <Grid3x3 className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onChange("list")}
        aria-label="List view"
        className={value === "list" ? "ua-view-btn-active" : "ua-view-btn"}
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  )
}
