import { useState, useMemo } from "react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import PageLayout from "@/components/layout/page-layout"
import { PageHero } from "@/components/layout"
import ErrorBoundary from "@/components/error-boundary"
import ProductCard from "@/components/product-card"
import EmptyState from "@/components/EmptyState"
import {
  SearchInput, SortSelect, CheckboxGroup,
  ViewToggle, FilterPanel, FilterToggleButton,
  ResultsCount, Pagination,
} from "@/components/filters"
import { useProducts } from "@/hooks/useProducts"
import type { FrontendProduct } from "@/hooks/useProducts"

const ACCESSORY_CATEGORIES = ["Outdoor", "Lifestyle", "Accessories", "Bags", "Headwear"]

const SORT_OPTIONS = [
  { label: "Featured",          value: "featured"   },
  { label: "Newest First",      value: "newest"     },
  { label: "Price: Low → High", value: "price-low"  },
  { label: "Price: High → Low", value: "price-high" },
  { label: "Top Rated",         value: "rating"     },
]
const ITEMS_PER_PAGE = 9

export default function AccessoriesPage() {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { products: allProducts, loading } = useProducts({ perPage: 100 })

  const accessoryProducts = useMemo(
    () => allProducts.filter(p =>
      ACCESSORY_CATEGORIES.some(c => p.category.toLowerCase().includes(c.toLowerCase()))
    ),
    [allProducts]
  )

  const [searchQuery, setSearchQuery] = useState("")
  const [categories,  setCategories]  = useState<string[]>([])
  const [sortBy,      setSortBy]      = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode,    setViewMode]    = useState<"grid" | "list">("grid")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const availableCategories = useMemo(() => [...new Set(accessoryProducts.map(p => p.category))].sort(), [accessoryProducts])

  const filtered = useMemo(() => {
    let items = accessoryProducts.filter((p) => {
      const q = searchQuery.toLowerCase()
      return (
        (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) &&
        (categories.length === 0 || categories.includes(p.category))
      )
    })
    switch (sortBy) {
      case "price-low":  items = [...items].sort((a, b) => a.price - b.price); break
      case "price-high": items = [...items].sort((a, b) => b.price - a.price); break
      case "rating":     items = [...items].sort((a, b) => b.rating - a.rating); break
      case "newest":     items = [...items].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
    }
    return items
  }, [accessoryProducts, searchQuery, categories, sortBy])

  const totalPages  = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated   = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  const activeCount = categories.length

  const clearFilters = () => { setCategories([]); setSearchQuery(""); setCurrentPage(1) }

  const handleCart = (e: React.MouseEvent, p: FrontendProduct) => {
    e.preventDefault()
    if (!p.inStock) return
    addToCart({ id: p.id, name: p.name, price: p.price, image: p.image, category: p.category })
    toast({ title: "Added to Cart!", description: p.name })
  }

  const handleWishlist = (e: React.MouseEvent, p: FrontendProduct) => {
    e.preventDefault()
    if (isInWishlist(p.id)) {
      removeFromWishlist(p.id)
      toast({ title: "Removed from Wishlist", description: p.name, variant: "destructive" })
    } else {
      addToWishlist({ id: p.id, name: p.name, price: p.price, originalPrice: p.originalPrice, image: p.image, category: p.category, inStock: p.inStock })
      toast({ title: "Saved to Wishlist!", description: p.name })
    }
  }

  return (
    <PageLayout activePage="accessories" seoTitle="Accessories & Gear | Under Armour®">
      <main className="flex-1 bg-gray-100">
        <PageHero variant="full" title="UA" titleAccent="Accessories" subtitle="Complete your kit with premium bags, headwear, hydration and more." align="left" />

        <div className="ua-toolbar">
          <div className="ua-toolbar-inner">
            <SearchInput value={searchQuery} onChange={(v) => { setSearchQuery(v); setCurrentPage(1) }} placeholder="Search accessories…" className="max-w-xs" />
            <FilterToggleButton isOpen={filtersOpen} onToggle={() => setFiltersOpen(!filtersOpen)} activeCount={activeCount} />
            <div className="ml-auto flex items-center gap-3">
              <SortSelect value={sortBy} options={SORT_OPTIONS} onChange={(v) => { setSortBy(v); setCurrentPage(1) }} />
              <ViewToggle value={viewMode} onChange={setViewMode} />
            </div>
          </div>
        </div>

        <ErrorBoundary>
          <FilterPanel isOpen={filtersOpen} onToggle={() => setFiltersOpen(!filtersOpen)} onClear={clearFilters} activeCount={activeCount}>
            <CheckboxGroup label="Category" options={availableCategories} selected={categories} onChange={(v) => { setCategories(v); setCurrentPage(1) }} />
          </FilterPanel>
        </ErrorBoundary>

        <section className="ua-products-section">
          <div className="ua-page-container">
            <div className="mb-6">
              <ResultsCount shown={paginated.length} total={filtered.length} label="accessories" />
            </div>
            {loading ? (
              <div className="ua-product-grid">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white border-4 border-gray-200 rounded animate-pulse h-80" />
                ))}
              </div>
            ) : paginated.length === 0 ? (
              <EmptyState title="No accessories found" onClear={clearFilters} />
            ) : (
              <div className={viewMode === "grid" ? "ua-product-grid" : "ua-list-view"}>
                {paginated.map((p) => (
                  <ProductCard key={p.id} viewMode={viewMode}
                    id={p.id} name={p.name} price={p.price} originalPrice={p.originalPrice}
                    category={p.category} image={p.image} inStock={p.inStock}
                    isNew={p.isNew} isSale={p.isSale} rating={p.rating} reviews={p.reviews}
                    description={p.description}
                    isWishlisted={isInWishlist(p.id)}
                    onAddToCart={(e) => handleCart(e, p)} onToggleWishlist={(e) => handleWishlist(e, p)}
                  />
                ))}
              </div>
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
