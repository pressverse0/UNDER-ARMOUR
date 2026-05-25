
import { X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

import { Link } from "wouter"
import { useState } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  category: string
}

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "HeatGear Training Shirt",
      price: 35,
      quantity: 1,
      image: "/ARMOUR/HeatGear Training Shirt.jpg",
      category: "Apparel"
    },
    {
      id: 2,
      name: "HOVR Phantom 3",
      price: 140,
      quantity: 1,
      image: "/ARMOUR/HOVRPhantom3.jpg",
      category: "Footwear"
    }
  ])

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
    if (change > 0) {
      toast({
        title: "Quantity Updated",
        description: "Item quantity increased",
        variant: "default",
      })
    }
  }

  const removeItem = (id: number) => {
    const item = cartItems.find(i => i.id === id)
    setCartItems(items => items.filter(item => item.id !== id))
    toast({
      title: "Removed from Cart",
      description: `${item?.name} has been removed`,
      variant: "destructive",
    })
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const total = subtotal + shipping

  return (
    <>
      {/* Overlay - starts below header */}
      {isOpen && (
        <div
          className="fixed top-[72px] left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar - starts below header */}
      <div
        className={`fixed top-[72px] right-0 bottom-0 w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b-4 border-red-600 bg-black">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-black uppercase text-white">Cart</h2>
              <span className="bg-red-600 text-white text-xs font-black rounded-full h-6 w-6 flex items-center justify-center">
                {cartItems.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-red-600 transition-colors"
              aria-label="Close cart"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 font-bold text-lg">Your cart is empty</p>
                <Button
                  onClick={onClose}
                  className="mt-6 sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black uppercase"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border-2 border-gray-200 rounded sketchy-border hover:border-red-600 transition-colors"
                  >
                    <div className="w-20 h-20 bg-gray-900 rounded sketchy-border overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover filter grayscale"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-black text-sm uppercase">{item.name}</p>
                          <p className="text-xs text-gray-600 font-bold">{item.category}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2 border-2 border-gray-300 rounded">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-black text-sm w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="font-black text-red-600">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t-4 border-red-600 p-6 bg-gray-50">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between font-bold">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-black text-xl border-t-2 border-gray-300 pt-2">
                  <span>Total:</span>
                  <span className="text-red-600">${total.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/cart" onClick={onClose}>
                <Button className="w-full sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black text-lg uppercase mb-2">
                  View Cart
                </Button>
              </Link>
              <Link href="/checkout" onClick={onClose}>
                <Button className="w-full sketchy-btn bg-black hover:bg-gray-800 text-white font-black text-lg uppercase">
                  Checkout
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
