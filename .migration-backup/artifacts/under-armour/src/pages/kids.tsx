import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { Link } from "wouter"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"

interface KidsProduct {
  id: number
  name: string
  price: number
  originalPrice?: number
  category: string
  gender: "Boys" | "Girls" | "Unisex"
  ages: string
  rating: number
  reviews: number
  image: string
  isNew?: boolean
  isSale?: boolean
  inStock: boolean
  description: string
}

const products: KidsProduct[] = [
  { id: 101, name: "Boys' Tech T-Shirt", price: 20, category: "Tops", gender: "Boys", ages: "6-16", rating: 4.5, reviews: 89, image: "/ARMOUR/HeatGear Training Shirt.jpg", inStock: true, isNew: true, description: "Lightweight, breathable tee for young athletes" },
  { id: 102, name: "Girls' HeatGear Tank", price: 22, category: "Tops", gender: "Girls", ages: "6-16", rating: 4.6, reviews: 103, image: "/ARMOUR/Meridian Crop Tank.jpg", inStock: true, isNew: true, description: "Ultra-soft HeatGear fabric keeps her cool" },
  { id: 103, name: "Kids' Assert 9 Sneaker", price: 50, category: "Footwear", gender: "Unisex", ages: "4-7Y", rating: 4.7, reviews: 212, image: "/ARMOUR/Charged Assert 10.jpg", inStock: true, description: "Lightweight and durable everyday trainer" },
  { id: 104, name: "Boys' Prototype 2.0 Shorts", price: 25, category: "Bottoms", gender: "Boys", ages: "6-16", rating: 4.4, reviews: 67, image: "/ARMOUR/Tech2.0Shorts.jpg", inStock: true, description: "Quick-dry shorts perfect for the field" },
  { id: 105, name: "Girls' Play Up Shorts", price: 25, originalPrice: 32, category: "Bottoms", gender: "Girls", ages: "6-16", rating: 4.5, reviews: 88, image: "/ARMOUR/Play Up 3.0 Shorts.jpg", inStock: true, isSale: true, description: "Flexible, stretchy shorts for any sport" },
  { id: 106, name: "Kids' Backpack 20L", price: 40, category: "Accessories", gender: "Unisex", ages: "All", rating: 4.3, reviews: 54, image: "/ARMOUR/ProjectRockGymBag.jpg", inStock: true, description: "Durable, spacious bag for school & training" },
  { id: 107, name: "Boys' Rival Fleece Hoodie", price: 40, category: "Outerwear", gender: "Boys", ages: "8-16", rating: 4.8, reviews: 143, image: "/ARMOUR/Rival Fleece Hoodie.jpg", inStock: true, isNew: true, description: "Super-soft fleece hoodie for cool days" },
  { id: 108, name: "Girls' ColdGear Leggings", price: 35, category: "Bottoms", gender: "Girls", ages: "6-16", rating: 4.6, reviews: 97, image: "/ARMOUR/Fly Fast 2.0 Tights.jpg", inStock: true, description: "Stay warm during cold-weather training" },
  { id: 109, name: "Kids' Charged Pursuit Shoe", price: 55, category: "Footwear", gender: "Unisex", ages: "3.5Y-7Y", rating: 4.5, reviews: 78, image: "/ARMOUR/Charged Pursuit 3.jpg", inStock: false, description: "Charged cushioning for all-day comfort" },
  { id: 110, name: "Boys' HeatGear Compression Shirt", price: 22, category: "Tops", gender: "Boys", ages: "6-16", rating: 4.4, reviews: 61, image: "/ARMOUR/HeatGearCompressionShirt.jpg", inStock: true, description: "Compression tee that keeps him cool" },
  { id: 111, name: "Girls' Infinity Sports Bra (Big Kid)", price: 28, category: "Tops", gender: "Girls", ages: "10-16", rating: 4.7, reviews: 49, image: "/ARMOUR/Infinity High Sports Bra.jpg", inStock: true, description: "Support for active big kids" },
  { id: 112, name: "Kids' Storm Windbreaker", price: 48, originalPrice: 60, category: "Outerwear", gender: "Unisex", ages: "6-16", rating: 4.5, reviews: 35, image: "/ARMOUR/Storm Windbreaker.jpg", inStock: true, isSale: true, description: "Water-resistant protection for any weather" },
]

const genderFilters = ["All", "Boys", "Girls", "Unisex"]
const categoryFilters = ["All", "Tops", "Bottoms", "Footwear", "Outerwear", "Accessories"]

export default function KidsPage() {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const [gender, setGender] = useState("All")
  const [category, setCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")

  const filtered = useMemo(() => {
    let items = products.filter(p => {
      const matchGender = gender === "All" || p.gender === gender
      const matchCategory = category === "All" || p.category === category
      return matchGender && matchCategory
    })
    switch (sortBy) {
      case "price-low": return items.sort((a, b) => a.price - b.price)
      case "price-high": return items.sort((a, b) => b.price - a.price)
      case "rating": return items.sort((a, b) => b.rating - a.rating)
      case "newest": return items.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      default: return items
    }
  }, [gender, category, sortBy])

  const handleAddToCart = (e: React.MouseEvent, product: KidsProduct) => {
    e.preventDefault()
    if (!product.inStock) return
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category })
    toast({ title: "Added to Cart!", description: product.name })
  }

  const handleWishlist = (e: React.MouseEvent, product: KidsProduct) => {
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
      <Header activePage="kids" />

      {/* Hero */}
      <section className="ua-hero py-16 lg:py-24">
        <div className="ua-hero-gradient" />
        <div className="ua-page-container relative z-10">
          <div className="max-w-3xl">
            <div className="sketchy-border bg-red-600 inline-block px-4 py-2 transform -rotate-1 mb-4">
              <span className="text-white font-black text-sm uppercase tracking-widest">Young Champions</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight mb-6">
              Kids <span className="text-red-600">Performance</span>
            </h1>
            <p className="text-xl text-gray-300 font-bold mb-8">
              Built for young athletes. Engineered to grow with champions. Ages 3–16.
            </p>
            <div className="flex flex-wrap gap-3">
              {["HeatGear Tech", "Durable Designs", "Easy Care", "True-to-Size Fit"].map(tag => (
                <span key={tag} className="bg-gray-900 border border-gray-700 text-gray-300 text-xs font-black uppercase px-3 py-1.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="ua-hero-divider" />
      </section>

      {/* Filters */}
      <section className="ua-filter-bar top-[56px]">
        <div className="ua-page-container py-3">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-black uppercase text-gray-500">Gender:</span>
                <div className="flex gap-1">
                  {genderFilters.map(g => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`ua-filter-chip ${gender === g ? "bg-black text-white border-black" : "ua-filter-chip-off"}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black uppercase text-gray-500">Type:</span>
                <div className="flex gap-1 flex-wrap">
                  {categoryFilters.map(c => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`ua-filter-chip ${category === c ? "ua-filter-chip-on" : "ua-filter-chip-off"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black uppercase text-gray-500">Sort:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="ua-sort-select">
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
      <section className="ua-products-section">
        <div className="ua-page-container">
          <div className="flex items-center justify-between mb-6">
            <p className="ua-results-count mb-0">
              Showing <span className="text-red-600">{filtered.length}</span> products
            </p>
            <Link href="/support/size-guide" className="text-sm font-black uppercase text-gray-500 hover:text-red-600 transition-colors underline underline-offset-2">
              Size Guide
            </Link>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl font-black uppercase text-gray-400">No products match your filters</p>
              <button
                onClick={() => { setGender("All"); setCategory("All") }}
                className="mt-4 sketchy-btn bg-red-600 text-white font-black uppercase px-6 py-3"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="ua-product-grid">
              {filtered.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  category={product.category}
                  image={product.image}
                  inStock={product.inStock}
                  isNew={product.isNew}
                  isSale={product.isSale}
                  rating={product.rating}
                  reviews={product.reviews}
                  description={product.description}
                  imageHeight={220}
                  isWishlisted={isInWishlist(product.id)}
                  bottomImageBadge={
                    <span className="bg-black text-gray-300 text-xs font-bold uppercase px-2 py-0.5">
                      {product.gender} · Ages {product.ages}
                    </span>
                  }
                  onAddToCart={(e) => handleAddToCart(e, product)}
                  onToggleWishlist={(e) => handleWishlist(e, product)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="ua-cta-section">
        <div className="ua-page-container text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-4">
            Gear for Every Young <span className="text-red-600">Champion</span>
          </h2>
          <p className="text-gray-300 font-bold mb-8">Need help finding the right size? Check out our Kids' Size Guide.</p>
          <Link href="/support/size-guide">
            <Button className="ua-btn-primary text-lg px-10 py-4">Kids' Size Guide</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
