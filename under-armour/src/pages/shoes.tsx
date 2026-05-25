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
import { useProducts } from "@/hooks/useProducts"
import type { FrontendProduct } from "@/hooks/useProducts"

const SHOE_CATEGORIES = ["Running", "Basketball"]

const SORT_OPTIONS = [
  { label: "Featured",          value: "featured"   },
  { label: "Newest First",      value: "newest"     },
  { label: "Price: Low → High", value: "price-low"  },
  { label: "Price: High → Low", value: "price-high" },
  { label: "Highest Rated",     value: "rating"     },
]
const ITEMS_PER_PAGE = 9

export default function ShoesPage() {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { products: allProducts, loading } = useProducts({ perPage: 100 })

  const shoeProducts = useMemo(
    () => allProducts.filter(p => SHOE_CATEGORIES.some(c => p.category.toLowerCase().includes(c.toLowerCase()))),
    [allProducts]
  )

  const [searchQuery,        setSearchQuery]        = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedGenders,    setSelectedGenders]    = useState<string[]>([])
  const [selectedSizes,      setSelectedSizes]      = useState<string[]>([])
  const [selectedTechs,      setSelectedTechs]      = useState<string[]>([])
  const [priceRange,         setPriceRange]         = useState<[number, number]>([0, 250])
  const [sortBy,             setSortBy]             = useState("featured")
  const [currentPage,        setCurrentPage]        = useState(1)
  const [viewMode,           setViewMode]           = useState<"grid" | "list">("grid")
  const [filtersOpen,        setFiltersOpen]        = useState(false)

  const categories  = useMemo(() => [...new Set(shoeProducts.map(p => p.category))].sort(), [shoeProducts])
  const genders     = useMemo(() => [...new Set(shoeProducts.map(p => p.gender).filter(Boolean) as string[])].sort(), [shoeProducts])
  const sizes       = useMemo(() => [...new Set(shoeProducts.flatMap(p => p.size))].sort(), [shoeProducts])
  const technologies = useMemo(() => [...new Set(shoeProducts.map(p => p.technology).filter(Boolean) as string[])].sort(), [shoeProducts])
  const maxPrice    = useMemo(() => Math.ceil(Math.max(...shoeProducts.map(p => p.price), 250)), [shoeProducts])

  const filtered = useMemo(() => {
    let items = shoeProducts.filter((p) => {
      const q = searchQuery.toLowerCase()
      return (
        (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) &&
        (selectedCategories.length === 0 || selectedCategories.includes(p.category)) &&
        (selectedGenders.length    === 0 || selectedGenders.includes(p.gender ?? "")) &&
        (selectedSizes.length      === 0 || p.size.some((s) => selectedSizes.includes(s))) &&
        (selectedTechs.length      === 0 || (p.technology && selectedTechs.includes(p.technology))) &&
        p.price >= priceRange[0] && p.price <= priceRange[1]
      )
    })
    switch (sortBy) {
      case "price-low":  items = [...items].sort((a, b) => a.price - b.price); break
      case "price-high": items = [...items].sort((a, b) => b.price - a.price); break
      case "rating":     items = [...items].sort((a, b) => b.rating - a.rating); break
      case "newest":     items = [...items].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
    }
    return items
  }, [shoeProducts, searchQuery, selectedCategories, selectedGenders, selectedSizes, selectedTechs, priceRange, sortBy])

  const totalPages  = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated   = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  const activeCount = selectedCategories.length + selectedGenders.length + selectedSizes.length + selectedTechs.length

  const clearFilters = () => {
    setSelectedCategories([]); setSelectedGenders([]); setSelectedSizes([])
    setSelectedTechs([]); setPriceRange([0, maxPrice]); setSearchQuery(""); setCurrentPage(1)
  }

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
      toast({ title: "Saved!", description: p.name })
    }
  }

  return (
    <PageLayout activePage="shoes" seoTitle="Athletic Shoes & Footwear | Under Armour® HOVR™">
      <main className="flex-1 bg-gray-100">
        <section className="ua-hero-simple">
          <div className="ua-page-container">
            <h1 className="ua-hero-simple-h1">Performance <span className="text-red-600">Footwear</span></h1>
            <p className="ua-hero-simple-sub">Revolutionary technology. Every step engineered for excellence.</p>
          </div>
        </section>

        <div className="ua-toolbar">
          <div className="ua-toolbar-inner">
            <SearchInput value={searchQuery} onChange={(v) => { setSearchQuery(v); setCurrentPage(1) }} placeholder="Search shoes…" className="max-w-xs" />
            <FilterToggleButton isOpen={filtersOpen} onToggle={() => setFiltersOpen(!filtersOpen)} activeCount={activeCount} />
            <div className="ml-auto flex items-center gap-3">
              <SortSelect value={sortBy} options={SORT_OPTIONS} onChange={(v) => { setSortBy(v); setCurrentPage(1) }} />
              <ViewToggle value={viewMode} onChange={setViewMode} />
            </div>
          </div>
        </div>

        <ErrorBoundary>
          <FilterPanel isOpen={filtersOpen} onToggle={() => setFiltersOpen(!filtersOpen)} onClear={clearFilters} activeCount={activeCount}>
            <CheckboxGroup label="Type"   options={categories}   selected={selectedCategories} onChange={(v) => { setSelectedCategories(v); setCurrentPage(1) }} />
            <CheckboxGroup label="Gender" options={genders}      selected={selectedGenders}    onChange={(v) => { setSelectedGenders(v);    setCurrentPage(1) }} />
            <div>
              <p className="ua-filter-label">Size (US)</p>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map((s) => (
                  <PillToggle key={s} label={s} isActive={selectedSizes.includes(s)}
                    onClick={() => { setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]); setCurrentPage(1) }} />
                ))}
              </div>
            </div>
            {technologies.length > 0 && (
              <CheckboxGroup label="Technology" options={technologies} selected={selectedTechs} onChange={(v) => { setSelectedTechs(v); setCurrentPage(1) }} />
            )}
            <PriceRange min={0} max={maxPrice} value={priceRange} onChange={(v) => { setPriceRange(v); setCurrentPage(1) }} />
          </FilterPanel>
        </ErrorBoundary>

        <section className="ua-products-section">
          <div className="ua-page-container">
            <div className="mb-6">
              <ResultsCount shown={paginated.length} total={filtered.length} label="shoes" />
            </div>
            {loading ? (
              <div className="ua-product-grid">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white border-4 border-gray-200 rounded animate-pulse h-80" />
                ))}
              </div>
            ) : paginated.length === 0 ? (
              <EmptyState title="No shoes found" onClear={clearFilters} />
            ) : (
              <div className={viewMode === "grid" ? "ua-product-grid" : "ua-list-view"}>
                {paginated.map((p) => (
                  <ProductCard key={p.id} viewMode={viewMode}
                    id={p.id} name={p.name} price={p.price} originalPrice={p.originalPrice}
                    category={`${p.category}${p.gender ? ` · ${p.gender}` : ""}`}
                    image={p.image} inStock={p.inStock}
                    isNew={p.isNew} isSale={p.isSale} rating={p.rating} reviews={p.reviews}
                    isWishlisted={isInWishlist(p.id)}
                    bottomImageBadge={p.technology ? <span className="ua-badge ua-badge-new">{p.technology}</span> : undefined}
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
