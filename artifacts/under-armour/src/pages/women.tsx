import { useState, useMemo } from "react"
import { Link } from "wouter"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import PageLayout from "@/components/layout/page-layout"
import ErrorBoundary from "@/components/error-boundary"
import StarRating from "@/components/star-rating"
import {
  SearchInput,
  SortSelect,
  PillToggle,
  CheckboxGroup,
  PriceRange,
  ViewToggle,
  FilterPanel,
  FilterToggleButton,
  ResultsCount,
} from "@/components/filters"
import { womenProducts, womenCategories, womenSizes, womenColors } from "@/data/products/women"
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import type { Product } from "@/types/product"

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Newest First", value: "newest" },
  { label: "Price: Low → High", value: "price-low" },
  { label: "Price: High → Low", value: "price-high" },
  { label: "Highest Rated", value: "rating" },
]

const ITEMS_PER_PAGE = 9

export default function WomenPage() {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let items = womenProducts.filter((p) => {
      const q = searchQuery.toLowerCase()
      return (
        (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) &&
        (selectedCategories.length === 0 || selectedCategories.includes(p.category)) &&
        (selectedSizes.length === 0 || p.size.some((s) => selectedSizes.includes(s))) &&
        (selectedColors.length === 0 || p.color.some((c) => selectedColors.includes(c))) &&
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

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  const activeCount = selectedCategories.length + selectedSizes.length + selectedColors.length

  const clearFilters = () => {
    setSelectedCategories([]); setSelectedSizes([]); setSelectedColors([])
    setPriceRange([0, 200]); setSearchQuery(""); setCurrentPage(1)
  }

  const changePage = (n: number) => { setCurrentPage(n); window.scrollTo({ top: 0, behavior: "smooth" }) }

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
        <section className="bg-black text-white py-10 lg:py-14">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight mb-2">
              Women's <span className="text-red-600">Gear</span>
            </h1>
            <p className="text-gray-400 font-bold">Designed for powerful women. Engineered for performance.</p>
          </div>
        </section>

        <div className="ua-toolbar">
          <div className="ua-toolbar-inner">
            <SearchInput value={searchQuery} onChange={(v) => { setSearchQuery(v); setCurrentPage(1) }} placeholder="Search women's gear..." className="max-w-xs" />
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

        <div className="container mx-auto px-4 py-4">
          <ResultsCount shown={paginated.length} total={filtered.length} label="women's products" />
        </div>

        <ErrorBoundary>
          <section className="container mx-auto px-4 pb-12">
            {paginated.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-gray-200">
                <p className="text-2xl font-black text-gray-500 mb-4">No products found</p>
                <Button onClick={clearFilters} className="bg-red-600 hover:bg-red-700 text-white font-black uppercase rounded-xl px-8">Clear Filters</Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="ua-product-grid-3">
                {paginated.map((p) => (
                  <Link key={p.id} href={`/product/${p.id}`}>
                    <div className="bg-white border-2 border-gray-200 hover:border-red-500 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group h-full flex flex-col cursor-pointer">
                      <div className="relative bg-gray-900 h-60 overflow-hidden">
                        {p.isNew && <Badge className="absolute top-3 left-3 bg-red-600 text-white font-black uppercase z-10 rounded-full text-xs">New</Badge>}
                        {p.isSale && <Badge className="absolute top-3 left-3 bg-emerald-600 text-white font-black uppercase z-10 rounded-full text-xs">Sale</Badge>}
                        {!p.inStock && <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10"><span className="text-white font-black uppercase text-sm">Out of Stock</span></div>}
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <button onClick={(e) => handleWishlist(e, p)} className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow">
                          <Heart className={`h-4 w-4 ${isInWishlist(p.id) ? "fill-red-600 text-red-600" : "text-gray-600"}`} />
                        </button>
                      </div>
                      <div className="p-5 flex flex-col flex-1 gap-2">
                        <span className="text-xs font-black uppercase text-red-600 tracking-wide">{p.category}</span>
                        <h3 className="font-black text-base text-black uppercase leading-tight line-clamp-2">{p.name}</h3>
                        <StarRating rating={p.rating} reviews={p.reviews} size="sm" />
                        <div className="flex items-center gap-2 mt-auto pt-2">
                          <span className="text-xl font-black text-black">${p.price}</span>
                          {p.originalPrice && <span className="text-sm font-bold text-gray-400 line-through">${p.originalPrice}</span>}
                        </div>
                        <button disabled={!p.inStock} onClick={(e) => handleCart(e, p)}
                          className="flex items-center justify-center gap-2 w-full bg-black hover:bg-red-600 disabled:bg-gray-300 text-white font-black uppercase text-sm py-2.5 rounded-xl transition-colors">
                          <ShoppingCart className="h-4 w-4" /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginated.map((p) => (
                  <Link key={p.id} href={`/product/${p.id}`}>
                    <div className="bg-white border-2 border-gray-200 hover:border-red-500 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer">
                      <div className="flex gap-5 p-4">
                        <div className="relative bg-gray-900 w-40 h-40 flex-shrink-0 rounded-xl overflow-hidden">
                          {p.isNew && <Badge className="absolute top-2 left-2 bg-red-600 text-white font-black uppercase z-10 rounded-full text-xs">New</Badge>}
                          {!p.inStock && <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10 rounded-xl"><span className="text-white font-black text-xs uppercase">Out of Stock</span></div>}
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <span className="text-xs font-black uppercase text-red-600 tracking-wide">{p.category}</span>
                            <h3 className="font-black text-xl text-black uppercase mt-1 mb-2">{p.name}</h3>
                            <StarRating rating={p.rating} reviews={p.reviews} size="sm" />
                            <div className="flex flex-wrap gap-1 mt-3">
                              {p.size.slice(0, 6).map((s) => <span key={s} className="px-2 py-0.5 border border-gray-200 rounded text-xs font-bold text-gray-600">{s}</span>)}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-black text-black">${p.price}</span>
                              {p.originalPrice && <span className="text-sm font-bold text-gray-400 line-through">${p.originalPrice}</span>}
                            </div>
                            <div className="flex gap-2">
                              <button onClick={(e) => handleWishlist(e, p)} className="p-2.5 border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 rounded-xl transition-colors">
                                <Heart className={`h-4 w-4 ${isInWishlist(p.id) ? "fill-red-600 text-red-600" : "text-gray-600"}`} />
                              </button>
                              <button disabled={!p.inStock} onClick={(e) => handleCart(e, p)}
                                className="flex items-center gap-2 bg-black hover:bg-red-600 disabled:bg-gray-300 text-white font-black uppercase text-sm px-5 py-2.5 rounded-xl transition-colors">
                                <ShoppingCart className="h-4 w-4" /> Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </ErrorBoundary>

        {totalPages > 1 && (
          <div className="container mx-auto px-4 pb-12 flex justify-center items-center gap-2">
            <button onClick={() => changePage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}
              className="p-2.5 border-2 border-gray-300 rounded-xl disabled:opacity-40 hover:border-red-500 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => changePage(n)}
                className={`w-10 h-10 font-black rounded-xl border-2 transition-colors ${currentPage === n ? "bg-red-600 text-white border-red-600" : "border-gray-300 hover:border-red-500 text-black"}`}>
                {n}
              </button>
            ))}
            <button onClick={() => changePage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}
              className="p-2.5 border-2 border-gray-300 rounded-xl disabled:opacity-40 hover:border-red-500 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </main>
    </PageLayout>
  )
}
