'use client'

import { X, Heart, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface WishlistItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  inStock: boolean
}

interface WishlistSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function WishlistSidebar({ isOpen, onClose }: WishlistSidebarProps) {
  const { toast } = useToast()
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "HeatGear Compression Shirt",
      price: 35,
      image: "/athletic-gear-display.png",
      category: "Training",
      inStock: true
    },
    {
      id: 2,
      name: "HOVR Phantom 3",
      price: 140,
      image: "/athletic-gear-display.png",
      category: "Footwear",
      inStock: true
    },
    {
      id: 3,
      name: "Tech 2.0 Shorts",
      price: 30,
      originalPrice: 45,
      image: "/athletic-gear-display.png",
      category: "Bottoms",
      inStock: false
    }
  ])

  const removeItem = (id: number) => {
    const item = wishlistItems.find(i => i.id === id)
    setWishlistItems(items => items.filter(item => item.id !== id))
    toast({
      title: "Removed from Wishlist",
      description: `${item?.name} has been removed`,
      variant: "destructive",
    })
  }

  const moveToCart = (id: number) => {
    const item = wishlistItems.find(i => i.id === id)
    // In a real app, this would add to cart and remove from wishlist
    console.log('Moving item to cart:', id)
    removeItem(id)
    toast({
      title: "Added to Cart",
      description: `${item?.name} moved to cart`,
      variant: "success" as any,
    })
  }

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
              <Heart className="h-6 w-6 text-red-600 fill-red-600" />
              <h2 className="text-2xl font-black uppercase text-white">Wishlist</h2>
              <span className="bg-red-600 text-white text-xs font-black rounded-full h-6 w-6 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-red-600 transition-colors"
              aria-label="Close wishlist"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {wishlistItems.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 font-bold text-lg">Your wishlist is empty</p>
                <p className="text-gray-500 font-bold text-sm mt-2">Save items you love for later</p>
                <Button
                  onClick={onClose}
                  className="mt-6 sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black uppercase"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border-2 border-gray-200 rounded sketchy-border hover:border-red-600 transition-colors"
                  >
                    <div className="w-20 h-20 bg-gray-900 rounded sketchy-border overflow-hidden flex-shrink-0 relative">
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10">
                          <span className="text-white font-black text-xs uppercase">Out</span>
                        </div>
                      )}
                      <Image
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
                          <p className="font-black text-sm uppercase leading-tight">{item.name}</p>
                          <p className="text-xs text-gray-600 font-bold">{item.category}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-black text-red-600">${item.price.toFixed(2)}</p>
                        {item.originalPrice && (
                          <p className="text-sm font-bold text-gray-400 line-through">${item.originalPrice.toFixed(2)}</p>
                        )}
                      </div>
                      <Button
                        onClick={() => moveToCart(item.id)}
                        disabled={!item.inStock}
                        className="w-full sketchy-btn-outline border-2 border-black text-black hover:bg-black hover:text-white font-black uppercase text-xs py-1 disabled:opacity-50"
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlistItems.length > 0 && (
            <div className="border-t-4 border-red-600 p-6 bg-gray-50">
              <div className="mb-4">
                <p className="text-sm font-bold text-gray-600 mb-2">
                  {wishlistItems.filter(item => item.inStock).length} of {wishlistItems.length} items in stock
                </p>
              </div>
              <Link href="/wishlist" onClick={onClose}>
                <Button className="w-full sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black text-lg uppercase mb-2">
                  <Heart className="h-5 w-5 mr-2 fill-white" />
                  View All Wishlist
                </Button>
              </Link>
              <Button 
                onClick={onClose}
                className="w-full sketchy-btn-outline border-2 border-black text-black hover:bg-black hover:text-white font-black text-lg uppercase"
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
