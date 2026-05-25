import { createContext, useContext, useState, useCallback, ReactNode } from "react"

export interface WishlistItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  inStock: boolean
}

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  wishlistCount: number
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    { id: 1, name: "HeatGear Compression Shirt", price: 35, image: "/ARMOUR/HeatGearCompressionShirt.jpg", category: "Training", inStock: true },
    { id: 2, name: "HOVR Phantom 3", price: 140, image: "/ARMOUR/HOVRPhantom3.jpg", category: "Footwear", inStock: true },
    { id: 3, name: "Tech 2.0 Shorts", price: 30, originalPrice: 45, image: "/ARMOUR/Tech2.0Shorts.jpg", category: "Bottoms", inStock: false },
  ])

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
