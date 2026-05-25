interface PriceRangeProps {
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  step?: number
  label?: string
}

export default function PriceRange({ min, max, value, onChange, step = 5, label = "Price Range" }: PriceRangeProps) {
  const [low, high] = value
  const pct = Math.round(((high - min) / (max - min)) * 100)

  return (
    <div>
      <div className="ua-range-header">
        <p className="ua-filter-label">{label}</p>
        <span className="ua-price-badge">${low} – ${high}</span>
      </div>
      <div className="relative pt-1 pb-2">
        <div className="ua-range-track">
          <div className="ua-range-fill" style={{ width: `${pct}%` }} />
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
      <div className="ua-range-bounds">
        <span className="ua-range-bound-text">${min}</span>
        <span className="ua-range-bound-text">${max}</span>
      </div>
    </div>
  )
}
