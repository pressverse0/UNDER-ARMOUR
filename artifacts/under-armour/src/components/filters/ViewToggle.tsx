import { Grid3x3, List } from "lucide-react"

type ViewMode = "grid" | "list"

interface ViewToggleProps {
  value: ViewMode
  onChange: (mode: ViewMode) => void
}

export default function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 border border-gray-200">
      <button
        type="button"
        onClick={() => onChange("grid")}
        aria-label="Grid view"
        className={`p-2 rounded-lg transition-all ${
          value === "grid"
            ? "bg-black text-white shadow-sm"
            : "text-gray-500 hover:text-black"
        }`}
      >
        <Grid3x3 className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onChange("list")}
        aria-label="List view"
        className={`p-2 rounded-lg transition-all ${
          value === "list"
            ? "bg-black text-white shadow-sm"
            : "text-gray-500 hover:text-black"
        }`}
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  )
}
