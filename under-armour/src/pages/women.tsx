import { useState, useMemo } from "react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import PageLayout from "@/components/layout/page-layout"
import ErrorBoundary from "@/components/error-boundary"
import ProductCard from "@/components/product-card"
import EmptyState from "@/components/EmptyState"
import {
  SearchInput, SortSelect, PillToggle, CheckboxGroup,
  PriceRange, ViewToggle, FilterPanel, FilterToggleButton,
  ResultsCount, Pagination,
} from "@/components/filters"
import { womenProducts, womenCategories, womenSizes, womenColors } from "@/data/products/women"
import type { Product } from "@/types/product"

const SORT_OPTIONS = [
  { label: "Featured",          value: "featured"   },
  { label: "Newest First",      value: "newest"     },
  { label: "Price: Low → High", value: "price-low"  },
  { label: "Price: High → Low", value: "price-high" },
  { label: "Highest Rated",     value: "rating"     },
]
const ITEMS_PER_PAGE = 9

export default function WomenPage() {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const [searchQuery,        setSearchQuery]        = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes,      setSelectedSizes]      = useState<string[]>([])
  const [selectedColors,     setSelectedColors]     = useState<string[]>([])
  const [priceRange,         setPriceRange]         = useState<[number, number]>([0, 200])
  const [sortBy,             setSortBy]             = useState("featured")
  const [currentPage,        setCurrentPage]        = useState(1)
  const [viewMode,           setViewMode]           = useState<"grid" | "list">("grid")
  const [filtersOpen,        setFiltersOpen]        = useState(false)

  const filtered = useMemo(() => {
    let items = womenProducts.filter((p) => {
      const q = searchQuery.toLowerCase()
      return (
        (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) &&
        (selectedCategories.length === 0 || selectedCategories.includes(p.category)) &&
        (selectedSizes.length   === 0 || p.size.some((s) => selectedSizes.includes(s))) &&
        (selectedColors.length  === 0 || p.color.some((c) => selectedColors.includes(c))) &&
        p.price >= priceRange[0] && p.price <= priceRange[1]
      )
    })
    switch (sortBy) {
      case "price-low":  items.sort((a, b) => a.price - b.price); break
      case "price-high": items.sort((a, b) => b.price - a.price); break
      case "rating":     items.sort((a, b) => b.rating - a.rating); break
      case "newest":     items.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
    }
    return items
  }, [searchQuery, selectedCategories, selectedSizes, selectedColors, priceRange, sortBy])

  const totalPages  = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated   = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  const activeCount = selectedCategories.length + selectedSizes.length + selectedColors.length

  const clearFilters = () => {
    setSelectedCategories([]); setSelectedSizes([]); setSelectedColors([])
    setPriceRange([0, 200]);   setSearchQuery("");   setCurrentPage(1)
  }

  const handleCart = (e: React.MouseEvent, p: Product) => {
    e.preventDefault()
    if (!p.inStock) return
    addToCart({ id: p.id, name: p.name, price: p.price, image: p.image, category: p.category })
    toast({ title: "Added to Cart!", description: p.name })
  }

  const handleWishlist = (e: React.MouseEvent, p: Product) => {
    e.preventDefault()
    if (isInWishlist(p.id)) {
      removeFromWishlist(p.id)
      toast({ title: "Removed from Wishlist", description: p.name, variant: "destructive" })
    } else {
      addToWishlist({ id: p.id, name: p.name, price: p.price, originalPrice: p.originalPrice, image: p.image, category: p.category, inStock: p.inStock })
      toast({ title: "Saved!", description: p.name })
    }
  }

  return (
    <PageLayout activePage="women" seoTitle="Women's Athletic Clothing & Shoes | Under Armour®">
      <main className="flex-1 bg-gray-100">
        <section className="ua-hero-simple">
          <div className="ua-page-container">
            <h1 className="ua-hero-simple-h1">Women's <span className="text-red-600">Gear</span></h1>
            <p className="ua-hero-simple-sub">Designed for powerful women. Engineered for performance.</p>
          </div>
        </section>

        <div className="ua-toolbar">
          <div className="ua-toolbar-inner">
            <SearchInput value={searchQuery} onChange={(v) => { setSearchQuery(v); setCurrentPage(1) }} placeholder="Search women's gear…" className="max-w-xs" />
            <FilterToggleButton isOpen={filtersOpen} onToggle={() => setFiltersOpen(!filtersOpen)} activeCount={activeCount} />
            <div className="ml-auto flex items-center gap-3">
              <SortSelect value={sortBy} options={SORT_OPTIONS} onChange={(v) => { setSortBy(v); setCurrentPage(1) }} />
              <ViewToggle value={viewMode} onChange={setViewMode} />
            </div>
          </div>
        </div>

        <ErrorBoundary>
          <FilterPanel isOpen={filtersOpen} onToggle={() => setFiltersOpen(!filtersOpen)} onClear={clearFilters} activeCount={activeCount}>
            <CheckboxGroup label="Category" options={womenCategories} selected={selectedCategories} onChange={(v) => { setSelectedCategories(v); setCurrentPage(1) }} />
            <div>
              <p className="ua-filter-label">Size</p>
              <div className="flex flex-wrap gap-1.5">
                {womenSizes.map((s) => (
                  <PillToggle key={s} label={s} isActive={selectedSizes.includes(s)}
                    onClick={() => { setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]); setCurrentPage(1) }} />
                ))}
              </div>
            </div>
            <div>
              <p className="ua-filter-label">Color</p>
              <div className="flex flex-wrap gap-1.5">
                {womenColors.map((c) => (
                  <PillToggle key={c} label={c} isActive={selectedColors.includes(c)}
                    onClick={() => { setSelectedColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]); setCurrentPage(1) }} />
                ))}
              </div>
            </div>
            <PriceRange min={0} max={200} value={priceRange} onChange={(v) => { setPriceRange(v); setCurrentPage(1) }} />
          </FilterPanel>
        </ErrorBoundary>

        <section className="ua-products-section">
          <div className="ua-page-container">
            <div className="mb-6">
              <ResultsCount shown={paginated.length} total={filtered.length} label="women's products" />
            </div>
            {paginated.length === 0 ? (
              <EmptyState onClear={clearFilters} />
            ) : (
              <div className={viewMode === "grid" ? "ua-product-grid" : "ua-list-view"}>
                {paginated.map((p) => (
                  <ProductCard key={p.id} viewMode={viewMode}
                    id={p.id} name={p.name} price={p.price} originalPrice={p.originalPrice}
                    category={p.category} image={p.image} inStock={p.inStock}
                    isNew={p.isNew} isSale={p.isSale} rating={p.rating} reviews={p.reviews}
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
