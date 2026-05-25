import { useState, useMemo } from "react"
import { Tag } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import ProductCard from "@/components/product-card"
import { PageLayout, PageHero, FilterBar } from "@/components/layout"
import { saleProducts, saleCategoryFilters } from "@/data/products/sale"

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
    <PageLayout activePage="sale" seoTitle="Sale — Up to 40% Off | Under Armour®" seoDescription="Shop Under Armour sale items — discounted apparel, shoes, and accessories. Limited time deals on performance gear.">
      <main className="flex-1 bg-gray-100">
        <PageHero
          variant="full"
          title="Summer"
          titleAccent="Sale"
          subtitle="Limited time deals on top-rated gear. Up to 40% off — don't miss out."
          align="center"
          badge={
            <div className="sketchy-border bg-red-600 inline-block px-6 py-2 transform -rotate-1">
              <span className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Tag className="h-4 w-4 fill-white" /> Up to 40% Off
              </span>
            </div>
          }
        />
        <FilterBar
          filterGroups={[
            {
              options: saleCategoryFilters.map(c => ({ label: c, value: c })),
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
        <section className="ua-products-section">
          <div className="ua-page-container">
            <p className="ua-results-count">
              <span className="text-red-600">{filtered.length}</span> sale items
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
                  isSale={true}
                  isWishlisted={isInWishlist(product.id)}
                  customBadge={
                    <span className="bg-green-600 text-white text-xs font-black uppercase px-2 py-1 flex items-center gap-1 rounded-full">
                      -{product.discount}%
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
