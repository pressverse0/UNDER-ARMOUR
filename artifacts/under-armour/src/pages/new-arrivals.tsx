import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart, Star, Sparkles } from "lucide-react"
import { Link } from "wouter"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

const newProducts = [
  { id: 10, name: "Curry Flow 11", price: 160, category: "Basketball Shoes", rating: 4.9, reviews: 421, image: "/ARMOUR/Curry Flow 11.jpg", inStock: true, arrivedWeeks: 1 },
  { id: 6, name: "Sportstyle Jacket", price: 90, category: "Outerwear", rating: 4.6, reviews: 142, image: "/ARMOUR/Sportstyle Jacket.jpg", inStock: true, arrivedWeeks: 1 },
  { id: 107, name: "Boys' Rival Fleece Hoodie", price: 40, category: "Kids", rating: 4.8, reviews: 143, image: "/ARMOUR/Rival Fleece Hoodie.jpg", inStock: true, arrivedWeeks: 2 },
  { id: 201, name: "Project Rock Gym Bag", price: 75, category: "Accessories", rating: 4.8, reviews: 234, image: "/ARMOUR/ProjectRockGymBag.jpg", inStock: true, arrivedWeeks: 2 },
  { id: 207, name: "HOVR Running Belt", price: 30, category: "Accessories", rating: 4.5, reviews: 79, image: "/ARMOUR/UA RUSH Training Pants.jpg", inStock: true, arrivedWeeks: 2 },
  { id: 212, name: "UA 24oz Stainless Bottle", price: 35, category: "Accessories", rating: 4.6, reviews: 92, image: "/ARMOUR/Curry Flow 11.jpg", inStock: true, arrivedWeeks: 2 },
  { id: 401, name: "Unstoppable Bomber Jacket", price: 110, category: "Outerwear", rating: 4.8, reviews: 62, image: "/ARMOUR/Unstoppable Bomber Jacket.jpg", inStock: true, arrivedWeeks: 3 },
  { id: 402, name: "Storm Windstrike Jacket", price: 90, category: "Outerwear", rating: 4.5, reviews: 44, image: "/ARMOUR/Storm Windstrike Jacket.jpg", inStock: true, arrivedWeeks: 3 },
  { id: 403, name: "Flow Velociti Wind 2", price: 140, category: "Running Shoes", rating: 4.7, reviews: 143, image: "/ARMOUR/Flow Velociti Wind 2.jpg", inStock: true, arrivedWeeks: 3 },
  { id: 101, name: "Boys' Tech T-Shirt", price: 20, category: "Kids", rating: 4.5, reviews: 89, image: "/ARMOUR/HeatGear Training Shirt.jpg", inStock: true, arrivedWeeks: 3 },
  { id: 102, name: "Girls' HeatGear Tank", price: 22, category: "Kids", rating: 4.6, reviews: 103, image: "/ARMOUR/Meridian Crop Tank.jpg", inStock: true, arrivedWeeks: 3 },
  { id: 1, name: "HeatGear Compression Shirt", price: 35, category: "Training", rating: 4.5, reviews: 128, image: "/ARMOUR/HeatGearCompressionShirt.jpg", inStock: true, arrivedWeeks: 4 },
]

const categoryFilters = ["All", "Training", "Running Shoes", "Basketball Shoes", "Outerwear", "Accessories", "Kids"]
const weekBadge = (weeks: number) => {
  if (weeks <= 1) return { label: "This Week", color: "bg-red-600" }
  if (weeks <= 2) return { label: "2 Weeks Ago", color: "bg-black" }
  if (weeks <= 3) return { label: "3 Weeks Ago", color: "bg-gray-700" }
  return { label: "4 Weeks Ago", color: "bg-gray-600" }
}

export default function NewArrivalsPage() {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const [category, setCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")

  const filtered = useMemo(() => {
    let items = newProducts.filter(p => category === "All" || p.category === category)
    switch (sortBy) {
      case "newest": return items.sort((a, b) => a.arrivedWeeks - b.arrivedWeeks)
      case "price-low": return items.sort((a, b) => a.price - b.price)
      case "price-high": return items.sort((a, b) => b.price - a.price)
      case "rating": return items.sort((a, b) => b.rating - a.rating)
      default: return items
    }
  }, [category, sortBy])

  const handleAddToCart = (e: React.MouseEvent, product: typeof newProducts[0]) => {
    e.preventDefault()
    if (!product.inStock) return
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category })
    toast({ title: "Added to Cart!", description: product.name })
  }

  const handleWishlist = (e: React.MouseEvent, product: typeof newProducts[0]) => {
    e.preventDefault()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({ title: "Removed from Wishlist", description: product.name, variant: "destructive" })
    } else {
      addToWishlist({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category, inStock: product.inStock })
      toast({ title: "Saved to Wishlist!", description: product.name })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header activePage="new-arrivals" />

      {/* Hero */}
      <section className="relative bg-black text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="sketchy-border bg-red-600 inline-block px-6 py-2 transform -rotate-1 mb-6">
            <span className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Just Landed
            </span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black uppercase leading-none tracking-tight mb-4">
            New <span className="text-red-600">Arrivals</span>
          </h1>
          <p className="text-xl text-gray-300 font-bold max-w-2xl mx-auto mb-8">
            Fresh performance gear. The latest drops from Under Armour — be first to own it.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {["This Week", "Latest Drops", "New Technology", "New Collections"].map(tag => (
              <span key={tag} className="bg-gray-900 border border-gray-700 text-gray-300 text-xs font-black uppercase px-4 py-2 rounded">
                {tag}
              </span>
            ))}
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
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border-2 border-black text-sm font-bold px-2 py-1.5 focus:outline-none focus:border-red-600">
                <option value="newest">Newest First</option>
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
            <span className="text-red-600">{filtered.length}</span> new products
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => {
              const badge = weekBadge(product.arrivedWeeks)
              return (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Card className="sketchy-card bg-white border-4 border-black transform hover:scale-105 transition-all duration-300 h-full flex flex-col cursor-pointer group">
                    <CardContent className="p-0 flex flex-col flex-1">
                      <div className="relative bg-gray-900 overflow-hidden" style={{ height: 200 }}>
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute top-3 left-3">
                          <span className={`${badge.color} text-white text-xs font-black uppercase px-2 py-1 flex items-center gap-1`}>
                            <Sparkles className="h-3 w-3" /> {badge.label}
                          </span>
                        </div>
                        <button
                          onClick={(e) => handleWishlist(e, product)}
                          className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow hover:scale-110 transition-transform"
                        >
                          <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-600 text-red-600' : 'text-gray-400'}`} />
                        </button>
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <div className="sketchy-border bg-red-600 inline-block px-2 py-0.5 mb-2 self-start">
                          <span className="text-white font-bold text-xs uppercase">{product.category}</span>
                        </div>
                        <h3 className="font-black text-sm uppercase mb-1 leading-snug">{product.name}</h3>
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-red-600 text-red-600' : 'text-gray-300'}`} />
                          ))}
                          <span className="text-xs text-gray-500 font-bold">({product.reviews})</span>
                        </div>
                        <p className="text-xl font-black text-red-600 mb-3 mt-auto">${product.price}</p>
                        <Button
                          onClick={(e) => handleAddToCart(e, product)}
                          disabled={!product.inStock}
                          className="sketchy-btn bg-black text-white hover:bg-red-600 font-black uppercase text-xs w-full"
                        >
                          <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
