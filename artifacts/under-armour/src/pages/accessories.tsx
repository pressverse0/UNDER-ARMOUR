import { useState, useMemo } from "react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import ProductCard from "@/components/product-card"
import { PageLayout, PageHero, FilterBar } from "@/components/layout"
import { accessoryProducts, accessoryCategoryFilters } from "@/data/products/accessories"
import type { AccessoryProduct } from "@/types/product"

export default function AccessoriesPage() {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const [category, setCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")

  const filtered = useMemo(() => {
    let items = accessoryProducts.filter(p => category === "All" || p.category === category)
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
      toast({ title: "Saved to Wishlist!", description: product.name })
    }
  }

  return (
    <PageLayout activePage="accessories" seoTitle="Accessories &amp; Gear | Under Armour®" seoDescription="Shop UA bags, headwear, socks, hydration, and more. Complete your kit with premium accessories.">
      <main className="flex-1 bg-gray-100">
        <PageHero
          variant="full"
          title="UA"
          titleAccent="Accessories"
          subtitle="Complete your kit with premium bags, headwear, hydration and more."
          align="left"
        />
        <FilterBar
          filterGroups={[
            {
              options: accessoryCategoryFilters.map(c => ({ label: c, value: c })),
              value: category,
              onChange: setCategory,
            },
          ]}
          sortOptions={[
            { label: "Featured", value: "featured" },
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
              <span className="text-red-600">{filtered.length}</span> accessories
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
                  isNew={product.isNew}
                  isSale={product.isSale}
                  description={product.description}
                  isWishlisted={isInWishlist(product.id)}
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
