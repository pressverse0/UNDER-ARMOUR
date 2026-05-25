import { useState, useMemo } from "react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import PageLayout from "@/components/layout/page-layout"
import ErrorBoundary from "@/components/error-boundary"
import ProductCard from "@/components/product-card"
import {
  SearchInput, SortSelect, PillToggle, CheckboxGroup,
  PriceRange, ViewToggle, FilterPanel, FilterToggleButton,
  ResultsCount, Pagination,
} from "@/components/filters"
import { shoesProducts, shoesCategories, shoesGenders, shoesSizes, shoesTechnologies } from "@/data/products/shoes"
import type { Product } from "@/types/product"

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

  const filtered = useMemo(() => {
    let items = shoesProducts.filter((p) => {
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
      case "price-low":  items.sort((a, b) => a.price - b.price); break
      case "price-high": items.sort((a, b) => b.price - a.price); break
      case "rating":     items.sort((a, b) => b.rating - a.rating); break
      case "newest":     items.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
    }
    return items
  }, [searchQuery, selectedCategories, selectedGenders, selectedSizes, selectedTechs, priceRange, sortBy])

  const totalPages  = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated   = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  const activeCount = selectedCategories.length + selectedGenders.length + selectedSizes.length + selectedTechs.length

  const clearFilters = () => {
    setSelectedCategories([]); setSelectedGenders([]); setSelectedSizes([])
    setSelectedTechs([]);       setPriceRange([0, 250]); setSearchQuery(""); setCurrentPage(1)
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
    <PageLayout activePage="shoes" seoTitle="Athletic Shoes & Footwear | Under Armour® HOVR™">
      <main className="flex-1 bg-gray-100">
        <section className="bg-black text-white py-10 lg:py-14">
          <div className="ua-page-container">
            <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight mb-2">
              Performance <span className="text-red-600">Footwear</span>
            </h1>
            <p className="text-gray-400 font-bold">Revolutionary technology. Every step engineered for excellence.</p>
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
            <CheckboxGroup label="Type"       options={shoesCategories}   selected={selectedCategories} onChange={(v) => { setSelectedCategories(v); setCurrentPage(1) }} />
            <CheckboxGroup label="Gender"     options={shoesGenders}      selected={selectedGenders}    onChange={(v) => { setSelectedGenders(v);    setCurrentPage(1) }} />
            <div>
              <p className="ua-filter-label">Size (US)</p>
              <div className="flex flex-wrap gap-1.5">
                {shoesSizes.map((s) => (
                  <PillToggle key={s} label={s} isActive={selectedSizes.includes(s)}
                    onClick={() => { setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]); setCurrentPage(1) }} />
                ))}
              </div>
            </div>
            <CheckboxGroup label="Technology" options={shoesTechnologies} selected={selectedTechs}      onChange={(v) => { setSelectedTechs(v);      setCurrentPage(1) }} />
            <PriceRange min={0} max={250} value={priceRange} onChange={(v) => { setPriceRange(v); setCurrentPage(1) }} />
          </FilterPanel>
        </ErrorBoundary>

        <section className="ua-products-section">
          <div className="ua-page-container">
            <div className="mb-6">
              <ResultsCount shown={paginated.length} total={filtered.length} label="shoes" />
            </div>

            {paginated.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-gray-200">
                <p className="text-2xl font-black text-gray-500 mb-4">No shoes found</p>
                <button onClick={clearFilters} className="bg-red-600 hover:bg-red-700 text-white font-black uppercase px-8 py-3 rounded-xl transition-colors">Clear Filters</button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="ua-product-grid">
                {paginated.map((p) => (
                  <ProductCard
                    key={p.id}
                    id={p.id} name={p.name} price={p.price} originalPrice={p.originalPrice}
                    category={`${p.category}${p.gender ? ` · ${p.gender}` : ""}`}
                    image={p.image} inStock={p.inStock}
                    isNew={p.isNew} isSale={p.isSale} rating={p.rating} reviews={p.reviews}
                    isWishlisted={isInWishlist(p.id)}
                    bottomImageBadge={p.technology ? <span className="ua-badge ua-badge-new">{p.technology}</span> : undefined}
                    onAddToCart={(e) => handleCart(e, p)}
                    onToggleWishlist={(e) => handleWishlist(e, p)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {paginated.map((p) => (
                  <div key={p.id} className="bg-white border-2 border-gray-200 hover:border-red-500 rounded-2xl overflow-hidden transition-all duration-200 group cursor-pointer"
                    onClick={() => window.location.href = `/product/${p.id}`}>
                    <div className="flex gap-4 p-4">
                      <div className="relative bg-gray-900 w-36 h-36 flex-shrink-0 rounded-xl overflow-hidden">
                        {p.isNew && <span className="ua-badge ua-badge-new absolute top-2 left-2 z-10">New</span>}
                        {!p.inStock && <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10 rounded-xl"><span className="ua-badge ua-badge-oos text-xs">Out of Stock</span></div>}
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="ua-category-tag"><span className="ua-category-tag-text">{p.category}</span></span>
                            {p.technology && <span className="ua-badge ua-badge-new">{p.technology}</span>}
                            {p.gender && <span className="text-xs font-bold text-gray-500">{p.gender}</span>}
                          </div>
                          <h3 className="ua-product-name-lg mt-1 mb-2">{p.name}</h3>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-black text-red-600">${p.price}</span>
                            {p.originalPrice && <span className="ua-price-orig">${p.originalPrice}</span>}
                          </div>
                          <button disabled={!p.inStock} onClick={(e) => handleCart(e, p)}
                            className="flex items-center gap-2 bg-black hover:bg-red-600 disabled:bg-gray-300 text-white font-black uppercase text-sm px-5 py-2.5 rounded-xl transition-colors">
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
