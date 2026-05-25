
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PageLayout from "@/components/layout/page-layout"
import ProductCard from "@/components/product-card"
import { useProducts } from "@/hooks/useProducts"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { Search, Grid3x3, List, Trophy, ChevronLeft, ChevronRight } from "lucide-react"
import type { FrontendProduct } from "@/hooks/useProducts"

const ITEMS_PER_PAGE = 9

export default function BasketballPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)

  const { products, loading, error, total } = useProducts({ categoryId: 3, perPage: 50 })
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const filtered = products
    .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      return 0
    })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleAddToCart = (product: FrontendProduct, e: React.MouseEvent) => {
    e.preventDefault()
    if (!product.inStock) return
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category, quantity: 1, inStock: product.inStock })
  }

  const handleToggleWishlist = (product: FrontendProduct, e: React.MouseEvent) => {
    e.preventDefault()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({ id: product.id, name: product.name, price: product.price, originalPrice: product.originalPrice, image: product.image, category: product.category, inStock: product.inStock })
    }
  }

  return (
    <PageLayout activePage="sports" seoTitle="Basketball Shoes & Gear | Under Armour®" seoDescription="Shop Under Armour basketball shoes and gear. Performance footwear and apparel built for the game.">
      <main className="flex-1 bg-gray-100">
        <section className="relative bg-black text-white py-12 lg:py-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="h-12 w-12 text-red-600" />
                <h1 className="text-4xl lg:text-5xl font-black uppercase leading-none tracking-tight">
                  Basketball <span className="text-red-600">Gear</span>
                </h1>
              </div>
              <p className="text-lg text-gray-300 font-bold">Dominate the court with performance footwear and apparel.</p>
            </div>
          </div>
        </section>

        <section className="bg-white border-b-4 border-black sticky top-0 z-30 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input type="text" placeholder="Search basketball gear..." value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1) }} className="pl-10 border-2 border-gray-300 focus:border-red-600 font-bold" />
              </div>
              <div className="relative w-full md:w-48">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full border-2 border-gray-300 rounded px-4 py-2 font-bold appearance-none cursor-pointer focus:border-red-600">
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setViewMode('grid')} variant={viewMode === 'grid' ? 'default' : 'outline'} size="icon" className={viewMode === 'grid' ? 'bg-red-600' : ''}><Grid3x3 className="h-5 w-5" /></Button>
                <Button onClick={() => setViewMode('list')} variant={viewMode === 'list' ? 'default' : 'outline'} size="icon" className={viewMode === 'list' ? 'bg-red-600' : ''}><List className="h-5 w-5" /></Button>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-6">
          <p className="font-bold text-gray-700">{loading ? 'Loading...' : `Showing ${paginated.length} of ${filtered.length} of ${total} basketball products`}</p>
          {error && <p className="text-red-600 font-bold mt-2">{error}</p>}
        </section>

        <section className="container mx-auto px-4 pb-12">
          {loading ? (
            <div className="text-center py-20"><div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-red-600 border-b-4" /></div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl font-black text-gray-600 mb-4">No products found</p>
              <Button onClick={() => setSearchQuery('')} className="bg-red-600 text-white font-black uppercase">Clear Search</Button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'ua-product-grid-3' : 'space-y-4'}>
              {paginated.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  category={product.category}
                  image={product.image}
                  inStock={product.inStock}
                  isNew={product.isNew}
                  isSale={product.isSale}
                  rating={product.rating}
                  reviews={product.reviews}
                  viewMode={viewMode}
                  isWishlisted={isInWishlist(product.id)}
                  onAddToCart={e => handleAddToCart(product, e)}
                  onToggleWishlist={e => handleToggleWishlist(product, e)}
                />
              ))}
            </div>
          )}
        </section>

        {totalPages > 1 && (
          <section className="container mx-auto px-4 pb-12 flex items-center justify-center gap-3">
            <Button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} variant="outline" size="icon"><ChevronLeft className="h-5 w-5" /></Button>
            <span className="font-black">{currentPage} / {totalPages}</span>
            <Button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} variant="outline" size="icon"><ChevronRight className="h-5 w-5" /></Button>
          </section>
        )}
      </main>
    </PageLayout>
  )
}
