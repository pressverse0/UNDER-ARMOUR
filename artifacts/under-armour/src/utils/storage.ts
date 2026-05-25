export function storageGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function storageSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage quota exceeded or access denied — fail silently
  }
}

export function storageClear(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // fail silently
  }
}

export const STORAGE_KEYS = {
  CART: "ua_cart",
  WISHLIST: "ua_wishlist",
} as const
