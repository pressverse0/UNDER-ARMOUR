import type { BaseProduct } from "@/types/product"

export type SortKey = "featured" | "price-low" | "price-high" | "rating" | "newest" | "discount"

export function sortProducts<T extends BaseProduct & { discount?: number; arrivedWeeks?: number }>(
  items: T[],
  sortBy: string
): T[] {
  const copy = [...items]
  switch (sortBy) {
    case "price-low":
      return copy.sort((a, b) => a.price - b.price)
    case "price-high":
      return copy.sort((a, b) => b.price - a.price)
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating)
    case "discount":
      return copy.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
    case "newest":
      return copy.sort((a, b) => (a.arrivedWeeks ?? 99) - (b.arrivedWeeks ?? 99))
    default:
      return copy
  }
}
