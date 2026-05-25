import { useState, useMemo } from "react"
import { Tag, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import ProductCard from "@/components/product-card"
import { PageLayout, PageHero, FilterBar } from "@/components/layout"

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

  return (
    <PageLayout activePage="sale">
      <main className="flex-1 bg-gray-100">
      <PageHero
        variant="full"
        title="Summer"
        titleAccent="Sale"
        subtitle="Up to 40% off performance gear. No excuses."
        align="center"
        badge={
          <div className="sketchy-border bg-red-600 inline-block px-6 py-2 transform -rotate-1">
            <span className="text-white font-black text-sm uppercase tracking-widest">Limited Time</span>
          </div>
        }
      >
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
      </PageHero>

      <FilterBar
        filterGroups={[
          {
            options: categoryFilters.map(c => ({ label: c, value: c })),
            value: category,
            onChange: setCategory,
          },
        ]}
        sortOptions={[
          { label: "Biggest Discount", value: "discount" },
          { label: "Price: Low to High", value: "price-low" },
          { label: "Price: High to Low", value: "price-high" },
          { label: "Top Rated", value: "rating" },
        ]}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Products */}
      <section className="ua-products-section">
        <div className="ua-page-container">
          <p className="ua-results-count">
            <span className="text-red-600">{filtered.length}</span> sale items · Potential savings up to{" "}
            <span className="text-red-600">${Math.max(...filtered.map(p => p.originalPrice - p.price))}</span> per item
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
                rating={product.rating}
                reviews={product.reviews}
                isWishlisted={isInWishlist(product.id)}
                cartVariant="red"
                categoryTagVariant="black"
                savingsText={`You save $${product.originalPrice - product.price}!`}
                customBadge={
                  <span className="bg-red-600 text-white text-sm font-black uppercase px-3 py-1.5 flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5" /> -{product.discount}%
                  </span>
                }
                onAddToCart={(e) => handleAddToCart(e, product)}
                onToggleWishlist={(e) => handleWishlist(e, product)}
              />
            ))}
          </div>
        </div>
      </section>

      </main>
    </PageLayout>
  )
}
