import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react"
import type { WishlistItem } from "@/types/wishlist"
import { storageGet, storageSet, STORAGE_KEYS } from "@/utils/storage"

export type { WishlistItem }

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  wishlistCount: number
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() =>
    storageGet<WishlistItem[]>(STORAGE_KEYS.WISHLIST, [])
  )

  useEffect(() => {
    storageSet(STORAGE_KEYS.WISHLIST, wishlistItems)
  }, [wishlistItems])

  const addToWishlist = useCallback((item: WishlistItem) => {
    setWishlistItems(prev => {
      if (prev.find(i => i.id === item.id)) return prev
      return [...prev, item]
    })
  }, [])

  const removeFromWishlist = useCallback((id: number) => {
    setWishlistItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const isInWishlist = useCallback((id: number) => {
    return wishlistItems.some(i => i.id === id)
  }, [wishlistItems])

  const wishlistCount = wishlistItems.length

  return (
    <WishlistContext.Provider value={{ wishlistItems, wishlistCount, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider")
  return ctx
}
