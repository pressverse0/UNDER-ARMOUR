import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart, Star, Tag, Clock } from "lucide-react"
import { Link } from "wouter"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

const saleProducts = [
  { id: 3, name: "Tech 2.0 Shorts", price: 30, originalPrice: 45, category: "Bottoms", rating: 4.3, reviews: 89, image: "/ARMOUR/Tech2.0Shorts.jpg", inStock: true, discount: 33 },
  { id: 8, name: "Rival Fleece Hoodie", price: 50, originalPrice: 65, category: "Outerwear", rating: 4.7, reviews: 312, image: "/ARMOUR/Rival Fleece Hoodie.jpg", inStock: true, discount: 23 },
  { id: 105, name: "Girls' Play Up Shorts", price: 25, originalPrice: 32, category: "Kids Bottoms", rating: 4.5, reviews: 88, image: "/ARMOUR/Play Up 3.0 Shorts.jpg", inStock: true, discount: 22 },
  { id: 112, name: "Kids' Storm Windbreaker", price: 48, originalPrice: 60, category: "Kids Outerwear", rating: 4.5, reviews: 35, image: "/ARMOUR/Storm Windbreaker.jpg", inStock: true, discount: 20 },
  { id: 203, name: "Training Gloves Pro", price: 35, originalPrice: 45, category: "Accessories", rating: 4.4, reviews: 88, image: "/ARMOUR/Project Rock Tank.jpg", inStock: true, discount: 22 },
  { id: 209, name: "Liner Socks 3-Pack", price: 14, originalPrice: 18, category: "Accessories", rating: 4.4, reviews: 224, image: "/ARMOUR/Tech2.0Shorts.jpg", inStock: true, discount: 22 },
  { id: 301, name: "HOVR Sonic 5 Running Shoe", price: 95, originalPrice: 130, category: "Footwear", rating: 4.6, reviews: 287, image: "/ARMOUR/HOVR Sonic 5.jpg", inStock: true, discount: 27 },
  { id: 302, name: "Charged Pursuit 3 Shoe", price: 55, originalPrice: 75, category: "Footwear", rating: 4.5, reviews: 176, image: "/ARMOUR/Charged Pursuit 3.jpg", inStock: true, discount: 27 },
  { id: 303, name: "Flow Velociti Wind 2", price: 100, originalPrice: 140, category: "Footwear", rating: 4.7, reviews: 143, image: "/ARMOUR/Flow Velociti Wind 2.jpg", inStock: false, discount: 29 },
  { id: 304, name: "ColdGear Armour Compression Shirt", price: 38, originalPrice: 55, category: "Training", rating: 4.6, reviews: 98, image: "/ARMOUR/ColdGear Base Layer.jpg", inStock: true, discount: 31 },
  { id: 305, name: "Unstoppable Bomber Jacket", price: 70, originalPrice: 110, category: "Outerwear", rating: 4.8, reviews: 62, image: "/ARMOUR/Unstoppable Bomber Jacket.jpg", inStock: true, discount: 36 },
  { id: 306, name: "Storm Windstrike Jacket", price: 65, originalPrice: 90, category: "Outerwear", rating: 4.5, reviews: 44, image: "/ARMOUR/Storm Windstrike Jacket.jpg", inStock: true, discount: 28 },
]

const categoryFilters = ["All", "Footwear", "Training", "Bottoms", "Outerwear", "Accessories", "Kids Bottoms", "Kids Outerwear"]

export default function SalePage() {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const [category, setCategory] = useState("All")
  const [sortBy, setSortBy] = useState("discount")

  const filtered = useMemo(() => {
    let items = saleProducts.filter(p => category === "All" || p.category === category)
    switch (sortBy) {
      case "discount": return items.sort((a, b) => b.discount - a.discount)
      case "price-low": return items.sort((a, b) => a.price - b.price)
      case "price-high": return items.sort((a, b) => b.price - a.price)
      case "rating": return items.sort((a, b) => b.rating - a.rating)
      default: return items
    }
  }, [category, sortBy])

  const handleAddToCart = (e: React.MouseEvent, product: typeof saleProducts[0]) => {
    e.preventDefault()
    if (!product.inStock) return
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category })
    toast({ title: "Added to Cart!", description: `${product.name} – Sale price: $${product.price}` })
  }

  const handleWishlist = (e: React.MouseEvent, product: typeof saleProducts[0]) => {
    e.preventDefault()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({ title: "Removed from Wishlist", description: product.name, variant: "destructive" })
    } else {
      addToWishlist({ id: product.id, name: product.name, price: product.price, originalPrice: product.originalPrice, image: product.image, category: product.category, inStock: product.inStock })
      toast({ title: "Saved to Wishlist!", description: product.name })
    }
  }

  const totalSavings = filtered.filter(p => p.inStock).reduce((sum, p) => sum + (p.originalPrice - p.price), 0)

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header activePage="sale" />

      {/* Hero */}
      <section className="relative bg-black text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="sketchy-border bg-red-600 inline-block px-6 py-2 transform -rotate-1 mb-6">
            <span className="text-white font-black text-sm uppercase tracking-widest">Limited Time</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black uppercase leading-none tracking-tight mb-4">
            Summer <span className="text-red-600">Sale</span>
          </h1>
          <p className="text-2xl text-gray-300 font-bold mb-6">Up to 40% off performance gear. No excuses.</p>
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="bg-gray-900 border-2 border-red-600 px-6 py-4 text-center">
              <p className="text-3xl font-black text-red-600">{saleProducts.length}</p>
              <p className="text-sm font-black uppercase text-gray-400">Items on Sale</p>
            </div>
            <div className="bg-gray-900 border-2 border-red-600 px-6 py-4 text-center">
              <p className="text-3xl font-black text-red-600">Up to 40%</p>
              <p className="text-sm font-black uppercase text-gray-400">Off Original Price</p>
            </div>
            <div className="bg-gray-900 border-2 border-red-600 px-6 py-4 flex items-center gap-3">
              <Clock className="h-8 w-8 text-red-600 animate-pulse" />
              <div>
                <p className="text-xl font-black text-white">Ends Soon</p>
                <p className="text-xs font-black uppercase text-gray-400">While stocks last</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-red-600 sketchy-divider" />
      </section>

      {/* Filters */}
      <section className="bg-white border-b-4 border-black sticky top-[56px] z-30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex gap-1 flex-wrap">
              {categoryFilters.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`text-xs font-black uppercase px-3 py-1.5 border-2 transition-colors ${category === c ? 'bg-red-600 text-white border-red-600' : 'border-gray-300 text-gray-700 hover:border-red-600'}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black uppercase text-gray-500">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="border-2 border-black text-sm font-bold px-2 py-1.5 focus:outline-none focus:border-red-600"
              >
                <option value="discount">Biggest Discount</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-sm font-black uppercase text-gray-600 mb-6">
            <span className="text-red-600">{filtered.length}</span> sale items · Potential savings up to <span className="text-red-600">${Math.max(...filtered.map(p => p.originalPrice - p.price))}</span> per item
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="sketchy-card bg-white border-4 border-black transform hover:scale-105 transition-all duration-300 h-full flex flex-col cursor-pointer group">
                  <CardContent className="p-0 flex flex-col flex-1">
                    <div className="relative bg-gray-900 overflow-hidden" style={{ height: 200 }}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-600 text-white text-sm font-black uppercase px-3 py-1.5 flex items-center gap-1">
                          <Tag className="h-3.5 w-3.5" /> -{product.discount}%
                        </span>
                      </div>
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                          <span className="bg-gray-800 text-white font-black uppercase text-sm px-4 py-2">Out of Stock</span>
                        </div>
                      )}
                      <button
                        onClick={(e) => handleWishlist(e, product)}
                        className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow hover:scale-110 transition-transform"
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-600 text-red-600' : 'text-gray-400'}`} />
                      </button>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="sketchy-border bg-black inline-block px-2 py-0.5 mb-2 self-start">
                        <span className="text-white font-bold text-xs uppercase">{product.category}</span>
                      </div>
                      <h3 className="font-black text-sm uppercase mb-1 leading-snug">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-red-600 text-red-600' : 'text-gray-300'}`} />
                        ))}
                        <span className="text-xs text-gray-500 font-bold">({product.reviews})</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1 mt-auto">
                        <span className="text-xl font-black text-red-600">${product.price}</span>
                        <span className="text-sm text-gray-400 line-through font-bold">${product.originalPrice}</span>
                      </div>
                      <p className="text-xs font-black text-green-600 mb-3">You save ${product.originalPrice - product.price}!</p>
                      <Button
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={!product.inStock}
                        className="sketchy-btn bg-red-600 text-white hover:bg-red-700 font-black uppercase text-xs w-full disabled:opacity-50"
                      >
                        <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
