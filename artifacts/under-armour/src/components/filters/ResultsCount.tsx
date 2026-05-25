interface ResultsCountProps {
  shown: number
  total: number
  label?: string
}

export default function ResultsCount({ shown, total, label = "products" }: ResultsCountProps) {
  return (
    <div className="ua-results-row">
      <span className="ua-results-shown">{shown}</span>
      <span className="ua-results-sep">of</span>
      <span className="ua-results-total">{total}</span>
      <span className="ua-results-label">{label}</span>
    </div>
  )
}
