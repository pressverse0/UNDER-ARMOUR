import { X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Link } from "wouter"
import { useCart } from "@/context/cart-context"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { toast } = useToast()
  const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity } = useCart()

  const shipping = cartTotal >= 50 ? 0 : 5.99
  const total = cartTotal + shipping

  const handleRemove = (id: number, name: string) => {
    removeFromCart(id)
    toast({ title: "Removed from Cart", description: `${name} has been removed`, variant: "destructive" })
  }

  const handleQuantityChange = (id: number, change: number) => {
    updateQuantity(id, change)
  }

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300" onClick={onClose} />
      )}
      <div className={`fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b-4 border-red-600 bg-black">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-black uppercase text-white">Cart</h2>
              <span className="ua-count-badge">{cartCount}</span>
            </div>
            <button onClick={onClose} className="text-white hover:text-red-600 transition-colors" aria-label="Close cart">
              <X className="h-6 w-6" />
            </button>
          </div>

          {shipping === 0 && cartItems.length > 0 && (
            <div className="bg-green-600 text-white text-center py-2 text-sm font-black uppercase">
              Free Shipping Applied!
            </div>
          )}
          {shipping > 0 && cartItems.length > 0 && (
            <div className="bg-gray-900 text-gray-300 text-center py-2 text-xs font-bold uppercase">
              Add ${(50 - cartTotal).toFixed(2)} more for free shipping
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 font-bold text-lg">Your cart is empty</p>
                <Button onClick={onClose} className="mt-6 sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black uppercase">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="ua-sidebar-item">
                    <div className="ua-sidebar-thumb">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover filter grayscale" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <p className="font-black text-sm uppercase leading-tight">{item.name}</p>
                          <p className="text-xs text-gray-600 font-bold">{item.category}</p>
                          {item.size && <p className="text-xs text-gray-500 font-bold">Size: {item.size}</p>}
                        </div>
                        <button onClick={() => handleRemove(item.id, item.name)} className="text-gray-400 hover:text-red-600 transition-colors" aria-label="Remove item">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="ua-qty-ctrl">
                          <button onClick={() => handleQuantityChange(item.id, -1)} className="p-1.5 hover:bg-gray-100 transition-colors" aria-label="Decrease quantity">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-black text-sm w-7 text-center">{item.quantity}</span>
                          <button onClick={() => handleQuantityChange(item.id, 1)} className="p-1.5 hover:bg-gray-100 transition-colors" aria-label="Increase quantity">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="font-black text-red-600">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t-4 border-red-600 p-6 bg-gray-50">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between font-bold text-sm">
                  <span>Subtotal:</span><span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? <span className="text-green-600">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-black text-xl border-t-2 border-gray-300 pt-2">
                  <span>Total:</span><span className="text-red-600">${total.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout" onClick={onClose}>
                <Button className="w-full sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black text-lg uppercase mb-2">
                  Checkout
                </Button>
              </Link>
              <button onClick={onClose} className="w-full text-center text-sm font-bold text-gray-500 hover:text-black transition-colors py-2 uppercase tracking-wide">
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
