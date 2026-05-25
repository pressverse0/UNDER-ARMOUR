import { useState, useMemo } from "react"
import { Tag } from "lucide-react"
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

const SORT_OPTIONS = [
  { label: "Biggest Discount",  value: "discount"   },
  { label: "Price: Low → High", value: "price-low"  },
  { label: "Price: High → Low", value: "price-high" },
  { label: "Top Rated",         value: "rating"     },
]
const ITEMS_PER_PAGE = 9

export default function SalePage() {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { products: saleProducts, loading } = useProducts({ filter: 'sale' })

  const [searchQuery, setSearchQuery] = useState("")
  const [categories,  setCategories]  = useState<string[]>([])
  const [sortBy,      setSortBy]      = useState("discount")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode,    setViewMode]    = useState<"grid" | "list">("grid")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const ALL_CATEGORIES = useMemo(() => [...new Set(saleProducts.map(p => p.category))].filter(Boolean), [saleProducts])

  const filtered = useMemo(() => {
    let items = saleProducts.filter((p) => {
      const q = searchQuery.toLowerCase()
      return (
        (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) &&
        (categories.length === 0 || categories.includes(p.category))
      )
    })
    switch (sortBy) {
      case "discount":   items.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0)); break
      case "price-low":  items.sort((a, b) => a.price - b.price); break
      case "price-high": items.sort((a, b) => b.price - a.price); break
      case "rating":     items.sort((a, b) => b.rating - a.rating); break
    }
    return items
  }, [searchQuery, categories, sortBy, saleProducts])

  const totalPages  = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated   = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  const activeCount = categories.length

  const clearFilters = () => { setCategories([]); setSearchQuery(""); setCurrentPage(1) }

  const handleCart = (e: React.MouseEvent, p: (typeof saleProducts)[0]) => {
    e.preventDefault()
    if (!p.inStock) return
    addToCart({ id: p.id, name: p.name, price: p.price, image: p.image, category: p.category })
    toast({ title: "Added to Cart!", description: `${p.name} — $${p.price}` })
  }

  const handleWishlist = (e: React.MouseEvent, p: (typeof saleProducts)[0]) => {
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
    <PageLayout activePage="sale" seoTitle="Sale — Up to 40% Off | Under Armour®">
      <main className="flex-1 bg-gray-100">
        <PageHero variant="full" title="Summer" titleAccent="Sale" subtitle="Limited time deals on top-rated gear. Up to 40% off — don't miss out." align="center"
          badge={
            <div className="sketchy-border bg-red-600 inline-block px-6 py-2 transform -rotate-1">
              <span className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Tag className="h-4 w-4 fill-white" /> Up to 40% Off
              </span>
            </div>
          }
        />

        <div className="ua-toolbar">
          <div className="ua-toolbar-inner">
            <SearchInput value={searchQuery} onChange={(v) => { setSearchQuery(v); setCurrentPage(1) }} placeholder="Search sale items…" className="max-w-xs" />
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
              <ResultsCount shown={paginated.length} total={filtered.length} label="sale items" />
            </div>
            {paginated.length === 0 ? (
              <EmptyState title="No sale items found" onClear={clearFilters} />
            ) : (
              <div className={viewMode === "grid" ? "ua-product-grid" : "ua-list-view"}>
                {paginated.map((p) => (
                  <ProductCard key={p.id} viewMode={viewMode}
                    id={p.id} name={p.name} price={p.price} originalPrice={p.originalPrice}
                    category={p.category} image={p.image} inStock={p.inStock} isSale={true}
                    rating={p.rating} reviews={p.reviews}
                    savingsText={p.originalPrice ? `You save $${(p.originalPrice - p.price).toFixed(2)} (${p.discount ?? 0}% off)` : undefined}
                    customBadge={<span className="ua-badge ua-badge-sale">-{p.discount ?? 0}%</span>}
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
