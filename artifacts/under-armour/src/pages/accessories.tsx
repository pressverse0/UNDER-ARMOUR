import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart, Star, Filter } from "lucide-react"
import { Link } from "wouter"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface AccessoryProduct {
  id: number
  name: string
  price: number
  originalPrice?: number
  category: string
  rating: number
  reviews: number
  image: string
  isNew?: boolean
  isSale?: boolean
  inStock: boolean
  description: string
}

const products: AccessoryProduct[] = [
  { id: 201, name: "Project Rock Gym Bag", price: 75, category: "Bags", rating: 4.8, reviews: 234, image: "/ARMOUR/ProjectRockGymBag.jpg", inStock: true, isNew: true, description: "Built for champions, by champions. 42L capacity." },
  { id: 202, name: "UA Blitzing Cap", price: 25, category: "Headwear", rating: 4.5, reviews: 167, image: "/ARMOUR/HeatGear Training Shirt.jpg", inStock: true, description: "Stretch-fit cap with moisture-wicking sweatband" },
  { id: 203, name: "Training Gloves Pro", price: 35, originalPrice: 45, category: "Gloves", rating: 4.4, reviews: 88, image: "/ARMOUR/Project Rock Tank.jpg", inStock: true, isSale: true, description: "Grip-enhanced gloves with palm protection" },
  { id: 204, name: "Storm Laptop Backpack", price: 65, category: "Bags", rating: 4.6, reviews: 143, image: "/ARMOUR/Sportstyle Jacket.jpg", inStock: true, description: "Water-resistant 20L backpack for work & gym" },
  { id: 205, name: "Performance Socks 6-Pack", price: 28, category: "Socks", rating: 4.7, reviews: 312, image: "/ARMOUR/HeatGearCompressionShirt.jpg", inStock: true, description: "Arch support and blister protection built in" },
  { id: 206, name: "UA 32oz Squeeze Bottle", price: 18, category: "Hydration", rating: 4.3, reviews: 56, image: "/ARMOUR/HOVRPhantom3.jpg", inStock: true, description: "Leak-proof sports bottle with wide mouth" },
  { id: 207, name: "HOVR Running Belt", price: 30, category: "Accessories", rating: 4.5, reviews: 79, image: "/ARMOUR/UA RUSH Training Pants.jpg", inStock: true, isNew: true, description: "Secure belt for hands-free running storage" },
  { id: 208, name: "Undeniable 5.0 Duffle Bag", price: 55, category: "Bags", rating: 4.7, reviews: 198, image: "/ARMOUR/Storm Windbreaker.jpg", inStock: true, description: "D-shaped lid & vented shoe pocket" },
  { id: 209, name: "Liner Socks 3-Pack", price: 14, originalPrice: 18, category: "Socks", rating: 4.4, reviews: 224, image: "/ARMOUR/Tech2.0Shorts.jpg", inStock: true, isSale: true, description: "No-show design with UA logo on the heel" },
  { id: 210, name: "UA Hustle 5.0 Backpack", price: 55, category: "Bags", rating: 4.8, reviews: 411, image: "/ARMOUR/ColdGear Base Layer.jpg", inStock: true, description: "16\" laptop sleeve & water-resistant base" },
  { id: 211, name: "Training Headband 2-Pack", price: 14, category: "Headwear", rating: 4.3, reviews: 47, image: "/ARMOUR/Rival Fleece Hoodie.jpg", inStock: false, description: "Keeps sweat out of your eyes during training" },
  { id: 212, name: "UA 24oz Stainless Bottle", price: 35, category: "Hydration", rating: 4.6, reviews: 92, image: "/ARMOUR/Curry Flow 11.jpg", inStock: true, isNew: true, description: "Vacuum-insulated keeps drinks cold 24hrs" },
]

const categoryFilters = ["All", "Bags", "Headwear", "Gloves", "Socks", "Hydration", "Accessories"]

export default function AccessoriesPage() {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const [category, setCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")

  const filtered = useMemo(() => {
    let items = products.filter(p => category === "All" || p.category === category)
    switch (sortBy) {
      case "price-low": return items.sort((a, b) => a.price - b.price)
      case "price-high": return items.sort((a, b) => b.price - a.price)
      case "rating": return items.sort((a, b) => b.rating - a.rating)
      case "newest": return items.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      default: return items
    }
  }, [category, sortBy])

  const handleAddToCart = (e: React.MouseEvent, product: AccessoryProduct) => {
    e.preventDefault()
    if (!product.inStock) return
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category })
    toast({ title: "Added to Cart!", description: product.name })
  }

  const handleWishlist = (e: React.MouseEvent, product: AccessoryProduct) => {
    e.preventDefault()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({ title: "Removed from Wishlist", description: product.name, variant: "destructive" })
    } else {
      addToWishlist({ id: product.id, name: product.name, price: product.price, originalPrice: product.originalPrice, image: product.image, category: product.category, inStock: product.inStock })
      toast({ title: "Added to Wishlist!", description: product.name })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header activePage="accessories" />

      {/* Hero */}
      <section className="relative bg-black text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="sketchy-border bg-red-600 inline-block px-4 py-2 transform -rotate-1 mb-4">
              <span className="text-white font-black text-sm uppercase tracking-widest">Complete Your Kit</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight mb-6">
              Athletic <span className="text-red-600">Accessories</span>
            </h1>
            <p className="text-xl text-gray-300 font-bold mb-6">
              Every detail counts. Bags, headwear, hydration, and more — built for performance.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-red-600 sketchy-divider" />
      </section>

      {/* Filters */}
      <section className="bg-white border-b-4 border-black sticky top-[56px] z-30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-black uppercase text-gray-500">Category:</span>
              </div>
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
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black uppercase text-gray-500">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="border-2 border-black text-sm font-bold px-2 py-1.5 focus:outline-none focus:border-red-600"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
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
            Showing <span className="text-red-600">{filtered.length}</span> accessories
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="sketchy-card bg-white border-4 border-black transform hover:scale-105 transition-all duration-300 h-full flex flex-col cursor-pointer group">
                  <CardContent className="p-0 flex flex-col flex-1">
                    <div className="relative bg-gray-900 overflow-hidden" style={{ height: 200 }}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {product.isNew && <span className="bg-black text-white text-xs font-black uppercase px-2 py-1">New</span>}
                        {product.isSale && <span className="bg-red-600 text-white text-xs font-black uppercase px-2 py-1">Sale</span>}
                        {!product.inStock && <span className="bg-gray-600 text-white text-xs font-black uppercase px-2 py-1">Out of Stock</span>}
                      </div>
                      <button
                        onClick={(e) => handleWishlist(e, product)}
                        className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow hover:scale-110 transition-transform"
                        aria-label="Add to wishlist"
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-600 text-red-600' : 'text-gray-400'}`} />
                      </button>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="sketchy-border bg-red-600 inline-block px-2 py-0.5 mb-2 self-start">
                        <span className="text-white font-bold text-xs uppercase">{product.category}</span>
                      </div>
                      <h3 className="font-black text-sm uppercase mb-1 leading-snug">{product.name}</h3>
                      <p className="text-xs text-gray-500 font-bold mb-2">{product.description}</p>
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-red-600 text-red-600' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 font-bold">({product.reviews})</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3 mt-auto">
                        <span className="text-lg font-black text-red-600">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through font-bold">${product.originalPrice}</span>
                        )}
                      </div>
                      <Button
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={!product.inStock}
                        className="sketchy-btn bg-black text-white hover:bg-red-600 font-black uppercase text-xs w-full disabled:opacity-50"
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

      {/* CTA */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-black uppercase mb-4">Gear Up <span className="text-red-600">Completely</span></h2>
          <p className="text-gray-300 font-bold mb-8">Complete your look with the right accessories for your sport.</p>
          <Link href="/men">
            <Button className="sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black text-lg px-10 py-4 uppercase">
              Shop All Gear
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
