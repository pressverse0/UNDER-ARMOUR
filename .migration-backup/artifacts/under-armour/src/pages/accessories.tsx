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
  { id: 210, name: "UA Hustle 5.0 Backpack", price: 55, category: "Bags", rating: 4.8, reviews: 411, image: "/ARMOUR/ColdGear Base Layer.jpg", inStock: true, description: '16" laptop sleeve & water-resistant base' },
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
      <section className="ua-hero py-16 lg:py-24">
        <div className="ua-hero-gradient" />
        <div className="ua-page-container relative z-10">
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
        <div className="ua-hero-divider" />
      </section>

      {/* Filters */}
      <section className="ua-filter-bar top-[56px]">
        <div className="ua-page-container py-3">
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
                    className={`ua-filter-chip ${category === c ? "ua-filter-chip-on" : "ua-filter-chip-off"}`}
                  >
                    {c}
                  </button>
                ))}
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
          <p className="ua-results-count">
            Showing <span className="text-red-600">{filtered.length}</span> accessories
          </p>
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
                isWishlisted={isInWishlist(product.id)}
                onAddToCart={(e) => handleAddToCart(e, product)}
                onToggleWishlist={(e) => handleWishlist(e, product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ua-cta-section">
        <div className="ua-page-container text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-4">Gear Up <span className="text-red-600">Completely</span></h2>
          <p className="text-gray-300 font-bold mb-8">Complete your look with the right accessories for your sport.</p>
          <Link href="/men">
            <Button className="ua-btn-primary text-lg px-10 py-4">Shop All Gear</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
