import { useState, useMemo } from "react"
import { Sparkles } from "lucide-react"
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
import { newArrivalProducts, newArrivalCategoryFilters } from "@/data/products/new-arrivals"

const weekLabel = (weeks: number) => {
  if (weeks <= 1) return "This Week"
  if (weeks <= 2) return "2 Weeks Ago"
  if (weeks <= 3) return "3 Weeks Ago"
  return "4 Weeks Ago"
}

const SORT_OPTIONS = [
  { label: "Newest First",      value: "newest"     },
  { label: "Price: Low → High", value: "price-low"  },
  { label: "Price: High → Low", value: "price-high" },
  { label: "Top Rated",         value: "rating"     },
]
const ITEMS_PER_PAGE = 9
const ALL_CATEGORIES = newArrivalCategoryFilters.filter((c) => c !== "All")

export default function NewArrivalsPage() {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()

  const [searchQuery, setSearchQuery] = useState("")
  const [categories,  setCategories]  = useState<string[]>([])
  const [sortBy,      setSortBy]      = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode,    setViewMode]    = useState<"grid" | "list">("grid")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let items = newArrivalProducts.filter((p) => {
      const q = searchQuery.toLowerCase()
      return (
        (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) &&
        (categories.length === 0 || categories.includes(p.category))
      )
    })
    switch (sortBy) {
      case "newest":     items.sort((a, b) => a.arrivedWeeks - b.arrivedWeeks); break
      case "price-low":  items.sort((a, b) => a.price - b.price); break
      case "price-high": items.sort((a, b) => b.price - a.price); break
      case "rating":     items.sort((a, b) => b.rating - a.rating); break
    }
    return items
  }, [searchQuery, categories, sortBy])

  const totalPages  = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated   = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  const activeCount = categories.length

  const clearFilters = () => { setCategories([]); setSearchQuery(""); setCurrentPage(1) }

  const handleCart = (e: React.MouseEvent, p: typeof newArrivalProducts[0]) => {
    e.preventDefault()
    if (!p.inStock) return
    addToCart({ id: p.id, name: p.name, price: p.price, image: p.image, category: p.category })
    toast({ title: "Added to Cart!", description: p.name })
  }

  const handleWishlist = (e: React.MouseEvent, p: typeof newArrivalProducts[0]) => {
    e.preventDefault()
    if (isInWishlist(p.id)) {
      removeFromWishlist(p.id)
      toast({ title: "Removed from Wishlist", description: p.name, variant: "destructive" })
    } else {
      addToWishlist({ id: p.id, name: p.name, price: p.price, image: p.image, category: p.category, inStock: p.inStock })
      toast({ title: "Saved to Wishlist!", description: p.name })
    }
  }

  return (
    <PageLayout activePage="new-arrivals" seoTitle="New Arrivals | Latest Athletic Gear | Under Armour®">
      <main className="flex-1 bg-gray-100">
        <PageHero variant="full" title="New" titleAccent="Arrivals" subtitle="Fresh performance gear. The latest drops from Under Armour — be first to own it." align="center"
          badge={
            <div className="sketchy-border bg-red-600 inline-block px-6 py-2 transform -rotate-1">
              <span className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Just Landed
              </span>
            </div>
          }
        >
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {["This Week", "Latest Drops", "New Technology", "New Collections"].map((tag) => (
              <span key={tag} className="bg-gray-900 border border-gray-700 text-gray-300 text-xs font-black uppercase px-4 py-2 rounded-full">{tag}</span>
            ))}
          </div>
        </PageHero>

        <div className="ua-toolbar">
          <div className="ua-toolbar-inner">
            <SearchInput value={searchQuery} onChange={(v) => { setSearchQuery(v); setCurrentPage(1) }} placeholder="Search new arrivals…" className="max-w-xs" />
            <FilterToggleButton isOpen={filtersOpen} onToggle={() => setFiltersOpen(!filtersOpen)} activeCount={activeCount} />
            <div className="ml-auto flex items-center gap-3">
              <SortSelect value={sortBy} options={SORT_OPTIONS} onChange={(v) => { setSortBy(v); setCurrentPage(1) }} />
              <ViewToggle value={viewMode} onChange={setViewMode} />
            </div>
          </div>
        </div>

        <ErrorBoundary>
          <FilterPanel isOpen={filtersOpen} onToggle={() => setFiltersOpen(!filtersOpen)} onClear={clearFilters} activeCount={activeCount}>
            <CheckboxGroup label="Category" options={ALL_CATEGORIES} selected={categories} onChange={(v) => { setCategories(v); setCurrentPage(1) }} />
          </FilterPanel>
        </ErrorBoundary>

        <section className="ua-products-section">
          <div className="ua-page-container">
            <div className="mb-6">
              <ResultsCount shown={paginated.length} total={filtered.length} label="new arrivals" />
            </div>
            {paginated.length === 0 ? (
              <EmptyState title="No arrivals found" onClear={clearFilters} />
            ) : (
              <div className={viewMode === "grid" ? "ua-product-grid" : "ua-list-view"}>
                {paginated.map((p) => (
                  <ProductCard key={`${p.id}-${p.name}`} viewMode={viewMode}
                    id={p.id} name={p.name} price={p.price}
                    category={p.category} image={p.image} inStock={p.inStock} isNew={true}
                    rating={p.rating} reviews={p.reviews}
                    customBadge={<span className="ua-badge ua-badge-new">{weekLabel(p.arrivedWeeks)}</span>}
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
