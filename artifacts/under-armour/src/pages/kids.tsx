import { useState, useMemo } from "react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import PageLayout from "@/components/layout/page-layout"
import { PageHero } from "@/components/layout"
import ErrorBoundary from "@/components/error-boundary"
import ProductCard from "@/components/product-card"
import {
  SearchInput, SortSelect, PillToggle, CheckboxGroup,
  ViewToggle, FilterPanel, FilterToggleButton,
  ResultsCount, Pagination,
} from "@/components/filters"
import { kidsProducts, kidsGenderFilters, kidsCategoryFilters } from "@/data/products/kids"
import type { KidsProduct } from "@/types/product"

const SORT_OPTIONS = [
  { label: "Featured",          value: "featured"   },
  { label: "Newest First",      value: "newest"     },
  { label: "Price: Low → High", value: "price-low"  },
  { label: "Price: High → Low", value: "price-high" },
  { label: "Top Rated",         value: "rating"     },
]
const ITEMS_PER_PAGE = 9
const ALL_GENDERS    = kidsGenderFilters.filter((g) => g !== "All")
const ALL_CATEGORIES = kidsCategoryFilters.filter((c) => c !== "All")

export default function KidsPage() {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()

  const [searchQuery, setSearchQuery] = useState("")
  const [genders,     setGenders]     = useState<string[]>([])
  const [categories,  setCategories]  = useState<string[]>([])
  const [sortBy,      setSortBy]      = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode,    setViewMode]    = useState<"grid" | "list">("grid")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let items = kidsProducts.filter((p) => {
      const q = searchQuery.toLowerCase()
      return (
        (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) &&
        (genders.length    === 0 || genders.includes(p.gender)) &&
        (categories.length === 0 || categories.includes(p.category))
      )
    })
    switch (sortBy) {
      case "price-low":  items.sort((a, b) => a.price - b.price); break
      case "price-high": items.sort((a, b) => b.price - a.price); break
      case "rating":     items.sort((a, b) => b.rating - a.rating); break
      case "newest":     items.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
    }
    return items
  }, [searchQuery, genders, categories, sortBy])

  const totalPages  = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated   = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  const activeCount = genders.length + categories.length

  const clearFilters = () => {
    setGenders([]); setCategories([]); setSearchQuery(""); setCurrentPage(1)
  }

  const handleCart = (e: React.MouseEvent, p: KidsProduct) => {
    e.preventDefault()
    if (!p.inStock) return
    addToCart({ id: p.id, name: p.name, price: p.price, image: p.image, category: p.category })
    toast({ title: "Added to Cart!", description: p.name })
  }

  const handleWishlist = (e: React.MouseEvent, p: KidsProduct) => {
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
    <PageLayout activePage="kids" seoTitle="Kids' Athletic Clothing & Shoes | Under Armour®" seoDescription="Shop boys' and girls' performance gear, shoes, and accessories. Ages 3–16.">
      <main className="flex-1 bg-gray-100">
        <PageHero variant="full" title="Kids'" titleAccent="Performance" subtitle="Built tough for young athletes. Performance gear for boys, girls and everyone in between." align="left" />

        <div className="ua-toolbar">
          <div className="ua-toolbar-inner">
            <SearchInput value={searchQuery} onChange={(v) => { setSearchQuery(v); setCurrentPage(1) }} placeholder="Search kids' gear…" className="max-w-xs" />
            <FilterToggleButton isOpen={filtersOpen} onToggle={() => setFiltersOpen(!filtersOpen)} activeCount={activeCount} />
            <div className="ml-auto flex items-center gap-3">
              <SortSelect value={sortBy} options={SORT_OPTIONS} onChange={(v) => { setSortBy(v); setCurrentPage(1) }} />
              <ViewToggle value={viewMode} onChange={setViewMode} />
            </div>
          </div>
        </div>

        <ErrorBoundary>
          <FilterPanel isOpen={filtersOpen} onToggle={() => setFiltersOpen(!filtersOpen)} onClear={clearFilters} activeCount={activeCount}>
            <div>
              <p className="ua-filter-label">Gender</p>
              <div className="flex flex-wrap gap-1.5">
                {ALL_GENDERS.map((g) => (
                  <PillToggle key={g} label={g} isActive={genders.includes(g)}
                    onClick={() => { setGenders(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]); setCurrentPage(1) }} />
                ))}
              </div>
            </div>
            <CheckboxGroup label="Category" options={ALL_CATEGORIES} selected={categories} onChange={(v) => { setCategories(v); setCurrentPage(1) }} />
          </FilterPanel>
        </ErrorBoundary>

        <section className="ua-products-section">
          <div className="ua-page-container">
            <div className="mb-6">
              <ResultsCount shown={paginated.length} total={filtered.length} label="kids' products" />
            </div>
            {paginated.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-gray-200">
                <p className="text-2xl font-black text-gray-500 mb-4">No products found</p>
                <button onClick={clearFilters} className="bg-red-600 hover:bg-red-700 text-white font-black uppercase px-8 py-3 rounded-xl transition-colors">Clear Filters</button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="ua-product-grid">
                {paginated.map((p) => (
                  <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} originalPrice={p.originalPrice}
                    category={p.category} image={p.image} inStock={p.inStock} isNew={p.isNew} isSale={p.isSale}
                    rating={p.rating} reviews={p.reviews} description={p.description}
                    isWishlisted={isInWishlist(p.id)} onAddToCart={(e) => handleCart(e, p)} onToggleWishlist={(e) => handleWishlist(e, p)} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {paginated.map((p) => (
                  <div key={p.id} className="bg-white border-2 border-gray-200 hover:border-red-500 rounded-2xl overflow-hidden transition-all group cursor-pointer"
                    onClick={() => window.location.href = `/product/${p.id}`}>
                    <div className="flex gap-4 p-4">
                      <div className="relative bg-gray-900 w-36 h-36 flex-shrink-0 rounded-xl overflow-hidden">
                        {p.isNew && <span className="ua-badge ua-badge-new absolute top-2 left-2 z-10">New</span>}
                        {!p.inStock && <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10 rounded-xl"><span className="ua-badge ua-badge-oos">Out of Stock</span></div>}
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="ua-category-tag"><span className="ua-category-tag-text">{p.category}</span></span>
                            <span className="text-xs font-bold text-gray-500">{p.gender} · Ages {p.ages}</span>
                          </div>
                          <h3 className="ua-product-name-lg">{p.name}</h3>
                          {p.description && <p className="ua-product-desc mt-1">{p.description}</p>}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-black text-red-600">${p.price}</span>
                            {p.originalPrice && <span className="ua-price-orig">${p.originalPrice}</span>}
                          </div>
                          <button disabled={!p.inStock} onClick={(e) => handleCart(e, p)}
                            className="bg-black hover:bg-red-600 disabled:bg-gray-300 text-white font-black uppercase text-sm px-5 py-2.5 rounded-xl transition-colors">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
