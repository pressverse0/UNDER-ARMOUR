interface ResultsCountProps {
  shown: number
  total: number
  label?: string
}

export default function ResultsCount({ shown, total, label = "products" }: ResultsCountProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-black text-red-600">{shown}</span>
      <span className="text-sm font-bold text-gray-500">of</span>
      <span className="text-sm font-black text-black">{total}</span>
      <span className="text-sm font-bold text-gray-500">{label}</span>
    </div>
  )
}
