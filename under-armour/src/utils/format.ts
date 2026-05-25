export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`
}

export function formatDiscount(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100)
}

export function formatSavings(original: number, sale: number): string {
  const saved = original - sale
  const pct = formatDiscount(original, sale)
  return `You save ${formatPrice(saved)} (${pct}% off)`
}
