import { createContext, useContext, useState, useCallback, ReactNode } from "react"

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  category: string
  size?: string
  color?: string
}

interface CartContextType {
  cartItems: CartItem[]
  cartCount: number
  cartTotal: number
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, change: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "HeatGear Training Shirt", price: 35, quantity: 1, image: "/ARMOUR/HeatGear Training Shirt.jpg", category: "Apparel" },
    { id: 2, name: "HOVR Phantom 3", price: 140, quantity: 1, image: "/ARMOUR/HOVRPhantom3.jpg", category: "Footwear" },
  ])

  const addToCart = useCallback((item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity ?? 1) } : i)
      }
      return [...prev, { ...item, quantity: item.quantity ?? 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id: number) => {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: number, change: number) => {
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + change) } : i)
    )
  }, [])

  const clearCart = useCallback(() => setCartItems([]), [])

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0)
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
