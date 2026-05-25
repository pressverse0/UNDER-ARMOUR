interface EmptyStateProps {
  title?: string
  onClear: () => void
  clearLabel?: string
}

export default function EmptyState({
  title = "No products found",
  onClear,
  clearLabel = "Clear Filters",
}: EmptyStateProps) {
  return (
    <div className="ua-empty-state">
      <p className="ua-empty-state-title">{title}</p>
      <button onClick={onClear} className="ua-empty-state-btn">{clearLabel}</button>
    </div>
  )
}
