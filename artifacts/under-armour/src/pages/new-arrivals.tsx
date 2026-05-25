import { useState, useMemo } from "react"
import { Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import ProductCard from "@/components/product-card"
import { PageLayout, PageHero, FilterBar } from "@/components/layout"
import { newArrivalProducts, newArrivalCategoryFilters } from "@/data/products/new-arrivals"

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
    let items = newArrivalProducts.filter(p => category === "All" || p.category === category)
    switch (sortBy) {
      case "newest": return items.sort((a, b) => a.arrivedWeeks - b.arrivedWeeks)
      case "price-low": return items.sort((a, b) => a.price - b.price)
      case "price-high": return items.sort((a, b) => b.price - a.price)
      case "rating": return items.sort((a, b) => b.rating - a.rating)
      default: return items
    }
  }, [category, sortBy])

  const handleAddToCart = (e: React.MouseEvent, product: typeof newArrivalProducts[0]) => {
    e.preventDefault()
    if (!product.inStock) return
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category })
    toast({ title: "Added to Cart!", description: product.name })
  }

  const handleWishlist = (e: React.MouseEvent, product: typeof newArrivalProducts[0]) => {
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
    <PageLayout activePage="new-arrivals" seoTitle="New Arrivals | Latest Athletic Gear | Under Armour®" seoDescription="Discover the latest Under Armour performance gear, apparel, and shoes. Fresh styles and new technologies dropped every week.">
      <main className="flex-1 bg-gray-100">
        <PageHero
          variant="full"
          title="New"
          titleAccent="Arrivals"
          subtitle="Fresh performance gear. The latest drops from Under Armour — be first to own it."
          align="center"
          badge={
            <div className="sketchy-border bg-red-600 inline-block px-6 py-2 transform -rotate-1">
              <span className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Just Landed
              </span>
            </div>
          }
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {["This Week", "Latest Drops", "New Technology", "New Collections"].map(tag => (
              <span key={tag} className="bg-gray-900 border border-gray-700 text-gray-300 text-xs font-black uppercase px-4 py-2 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </PageHero>

        <FilterBar
          filterGroups={[
            {
              options: newArrivalCategoryFilters.map(c => ({ label: c, value: c })),
              value: category,
              onChange: setCategory,
            },
          ]}
          sortOptions={[
            { label: "Newest First", value: "newest" },
            { label: "Price: Low to High", value: "price-low" },
            { label: "Price: High to Low", value: "price-high" },
            { label: "Top Rated", value: "rating" },
          ]}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <section className="ua-products-section">
          <div className="ua-page-container">
            <p className="ua-results-count">
              <span className="text-red-600">{filtered.length}</span> new products
            </p>
            <div className="ua-product-grid">
              {filtered.map(product => {
                const badge = weekBadge(product.arrivedWeeks)
                return (
                  <ProductCard
                    key={`${product.id}-${product.name}`}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    category={product.category}
                    image={product.image}
                    inStock={product.inStock}
                    rating={product.rating}
                    reviews={product.reviews}
                    isWishlisted={isInWishlist(product.id)}
                    customBadge={
                      <span className={`${badge.color} text-white text-xs font-black uppercase px-2 py-1 flex items-center gap-1 rounded-full`}>
                        <Sparkles className="h-3 w-3" /> {badge.label}
                      </span>
                    }
                    onAddToCart={(e) => handleAddToCart(e, product)}
                    onToggleWishlist={(e) => handleWishlist(e, product)}
                  />
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
