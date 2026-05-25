interface PriceRangeProps {
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  step?: number
  label?: string
}

export default function PriceRange({
  min,
  max,
  value,
  onChange,
  step = 5,
  label = "Price Range",
}: PriceRangeProps) {
  const [low, high] = value
  const pct = Math.round(((high - min) / (max - min)) * 100)

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="ua-filter-label">{label}</p>
        <span className="text-xs font-black text-red-600 bg-red-50 border border-red-200 rounded-full px-2 py-0.5">
          ${low} – ${high}
        </span>
      </div>

      <div className="relative pt-1 pb-2">
        <div className="relative h-2 rounded-full bg-gray-200">
          <div
            className="absolute top-0 left-0 h-2 bg-red-600 rounded-full"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={high}
          onChange={(e) => onChange([low, parseInt(e.target.value)])}
          className="ua-range-input"
          aria-label={`Maximum price: $${high}`}
        />
      </div>

      <div className="flex justify-between mt-1">
        <span className="text-xs font-bold text-gray-400">${min}</span>
        <span className="text-xs font-bold text-gray-400">${max}</span>
      </div>
    </div>
  )
}
