import { useState, useMemo } from "react"
import { Link } from "wouter"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import PageLayout from "@/components/layout/page-layout"
import StarRating from "@/components/star-rating"
import { menProducts, menCategories, menSizes, menColors } from "@/data/products/men"
import {
  Search, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight,
  Heart, ShoppingCart, X, Grid3x3, List
} from "lucide-react"
import type { Product } from "@/types/product"

export default function MenPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [sortBy, setSortBy] = useState('featured')
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const itemsPerPage = 9

  const filteredProducts = useMemo(() => {
    let filtered = menProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesSize = selectedSizes.length === 0 || product.size.some(s => selectedSizes.includes(s))
      const matchesColor = selectedColors.length === 0 || product.color.some(c => selectedColors.includes(c))
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesSize && matchesColor && matchesPrice
    })
    switch (sortBy) {
      case 'price-low': filtered.sort((a, b) => a.price - b.price); break
      case 'price-high': filtered.sort((a, b) => b.price - a.price); break
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break
      case 'newest': filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
    }
    return filtered
  }, [searchQuery, selectedCategories, selectedSizes, selectedColors, priceRange, sortBy])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const toggle = <T extends string>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    value: T
  ) => {
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value])
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSelectedCategories([]); setSelectedSizes([]); setSelectedColors([])
    setPriceRange([0, 200]); setSearchQuery(''); setCurrentPage(1)
  }

  const activeFiltersCount = selectedCategories.length + selectedSizes.length + selectedColors.length

  const handleAddToCart = (product: Product) => {
    toast({ title: "Added to Cart", description: `${product.name} has been added to your cart` })
  }

  const handleAddToWishlist = (product: Product) => {
    toast({ title: "Added to Wishlist", description: `${product.name} has been added to your wishlist` })
  }

  return (
    <PageLayout activePage="men" seoTitle="Men's Athletic Clothing &amp; Shoes | Under Armour®" seoDescription="Shop men's performance training gear, running shoes, basketball apparel, and compression wear.">
      <main className="flex-1 bg-gray-100">
        <section className="relative bg-black text-white py-12 lg:py-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-5xl font-black uppercase leading-none tracking-tight mb-4">
                Men's <span className="text-red-600">Performance Gear</span>
              </h1>
              <p className="text-lg text-gray-300 font-bold">
                Engineered for athletes who demand the best. Superior comfort, unmatched performance.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white border-b-4 border-black sticky top-0 z-30 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input type="text" placeholder="Search products..." value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                  className="pl-10 border-2 border-gray-300 focus:border-red-600 font-bold rounded-xl"
                />
              </div>
              <Button onClick={() => setShowFilters(!showFilters)} className="sketchy-btn bg-black text-white hover:bg-gray-800 font-black uppercase w-full md:w-auto rounded-xl">
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Filters
                {activeFiltersCount > 0 && <Badge className="ml-2 bg-red-600 rounded-full">{activeFiltersCount}</Badge>}
              </Button>
              <div className="relative w-full md:w-auto">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                  className="w-full md:w-48 border-2 border-gray-300 rounded-xl px-4 py-2 font-bold appearance-none cursor-pointer focus:border-red-600">
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none" />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setViewMode('grid')} variant={viewMode === 'grid' ? 'default' : 'outline'} size="icon" className={`rounded-xl ${viewMode === 'grid' ? 'bg-red-600' : ''}`}>
                  <Grid3x3 className="h-5 w-5" />
                </Button>
                <Button onClick={() => setViewMode('list')} variant={viewMode === 'list' ? 'default' : 'outline'} size="icon" className={`rounded-xl ${viewMode === 'list' ? 'bg-red-600' : ''}`}>
                  <List className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {showFilters && (
          <section className="bg-gray-50 border-b-4 border-gray-300">
            <div className="container mx-auto px-4 py-6">
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <Label className="font-black uppercase text-sm mb-3 block">Category</Label>
                  <div className="space-y-2">
                    {menCategories.map(category => (
                      <label key={category} className="flex items-center cursor-pointer">
                        <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => toggle(setSelectedCategories, category)} className="mr-2 w-4 h-4 accent-red-600" />
                        <span className="font-bold text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="font-black uppercase text-sm mb-3 block">Size</Label>
                  <div className="flex flex-wrap gap-2">
                    {menSizes.map(size => (
                      <button key={size} onClick={() => toggle(setSelectedSizes, size)}
                        className={`px-3 py-1 border-2 font-bold text-sm rounded-full transition-colors ${selectedSizes.includes(size) ? 'bg-red-600 text-white border-red-600' : 'bg-white border-gray-300 hover:border-red-600'}`}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="font-black uppercase text-sm mb-3 block">Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {menColors.map(color => (
                      <button key={color} onClick={() => toggle(setSelectedColors, color)}
                        className={`px-3 py-1 border-2 font-bold text-sm rounded-full transition-colors ${selectedColors.includes(color) ? 'bg-red-600 text-white border-red-600' : 'bg-white border-gray-300 hover:border-red-600'}`}>
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="font-black uppercase text-sm mb-3 block">Price: ${priceRange[0]} - ${priceRange[1]}</Label>
                  <input type="range" min="0" max="200" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full accent-red-600" />
                  <Button onClick={clearFilters} variant="outline" className="w-full mt-4 font-bold rounded-xl">
                    <X className="h-4 w-4 mr-2" /> Clear All
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="container mx-auto px-4 py-6">
          <p className="font-bold text-gray-700">Showing {paginatedProducts.length} of {filteredProducts.length} products</p>
        </section>

        <section className="container mx-auto px-4 pb-12">
          {paginatedProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl font-black text-gray-600 mb-4">No products found</p>
              <Button onClick={clearFilters} className="sketchy-btn bg-red-600 text-white font-black uppercase rounded-xl">Clear Filters</Button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'ua-product-grid-3' : 'space-y-6'}>
              {paginatedProducts.map((product) => (
                viewMode === 'grid' ? (
                  <Link href={`/product/${product.id}`} key={product.id}>
                    <Card className="sketchy-card bg-white border-4 border-black transform hover:scale-105 transition-all duration-300 group h-full flex flex-col cursor-pointer rounded-2xl">
                      <CardContent className="p-6 flex flex-col flex-1">
                        <div className="relative sketchy-frame bg-gray-900 p-4 mb-4 h-64 flex items-center justify-center overflow-hidden rounded-xl">
                          {product.isNew && <Badge className="absolute top-2 left-2 bg-red-600 font-black uppercase z-10 rounded-full">New</Badge>}
                          {product.isSale && <Badge className="absolute top-2 left-2 bg-green-600 font-black uppercase z-10 rounded-full">Sale</Badge>}
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10 rounded-xl">
                              <span className="text-white font-black text-xl uppercase">Out of Stock</span>
                            </div>
                          )}
                          <img src={product.image} alt={product.name} width={300} height={250} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                          <button className="absolute top-2 right-2 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleAddToWishlist(product)}>
                            <Heart className="h-5 w-5 text-red-600" />
                          </button>
                        </div>
                        <div className="space-y-3 flex-1 flex flex-col">
                          <div className="sketchy-border bg-red-600 inline-block px-3 py-1 self-start rounded-lg">
                            <span className="text-white font-bold text-xs uppercase">{product.category}</span>
                          </div>
                          <h3 className="font-black text-lg text-black uppercase leading-tight">{product.name}</h3>
                          <StarRating rating={product.rating} reviews={product.reviews} size="md" />
                          <div className="flex items-center gap-2 flex-1">
                            <p className="text-2xl font-black text-red-600">${product.price}</p>
                            {product.originalPrice && <p className="text-lg font-bold text-gray-400 line-through">${product.originalPrice}</p>}
                          </div>
                          <Button disabled={!product.inStock} onClick={() => handleAddToCart(product)} className="sketchy-btn bg-black text-white hover:bg-red-600 font-black uppercase disabled:opacity-50 w-full mt-auto rounded-xl">
                            <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Link href={`/product/${product.id}`} key={product.id}>
                    <Card className="sketchy-card bg-white border-4 border-black hover:shadow-xl transition-all duration-300 group cursor-pointer rounded-2xl">
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          <div className="relative sketchy-frame bg-gray-900 p-4 w-48 flex-shrink-0 rounded-xl">
                            {product.isNew && <Badge className="absolute top-2 left-2 bg-red-600 font-black uppercase z-10 rounded-full">New</Badge>}
                            {product.isSale && <Badge className="absolute top-2 left-2 bg-green-600 font-black uppercase z-10 rounded-full">Sale</Badge>}
                            {!product.inStock && (
                              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10 rounded-xl">
                                <span className="text-white font-black text-sm uppercase">Out of Stock</span>
                              </div>
                            )}
                            <img src={product.image} alt={product.name} width={200} height={200} className="w-full h-auto filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="sketchy-border bg-red-600 inline-block px-3 py-1 mb-3 rounded-lg">
                                <span className="text-white font-bold text-xs uppercase">{product.category}</span>
                              </div>
                              <h3 className="font-black text-2xl text-black uppercase mb-2">{product.name}</h3>
                              <StarRating rating={product.rating} reviews={product.reviews} size="md" />
                              <div className="mb-3">
                                <span className="font-bold text-sm text-gray-600 mr-2">Sizes:</span>
                                {product.size.map(s => <span key={s} className="inline-block px-2 py-1 border border-gray-300 text-xs font-bold mr-1 mb-1 rounded">{s}</span>)}
                              </div>
                              <div>
                                <span className="font-bold text-sm text-gray-600 mr-2">Colors:</span>
                                {product.color.map(c => <span key={c} className="inline-block px-2 py-1 border border-gray-300 text-xs font-bold mr-1 mb-1 rounded">{c}</span>)}
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-2">
                                <p className="text-3xl font-black text-red-600">${product.price}</p>
                                {product.originalPrice && <p className="text-xl font-bold text-gray-400 line-through">${product.originalPrice}</p>}
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="icon" onClick={() => handleAddToWishlist(product)} className="border-2 border-black hover:bg-red-600 hover:text-white rounded-xl">
                                  <Heart className="h-5 w-5" />
                                </Button>
                                <Button disabled={!product.inStock} onClick={() => handleAddToCart(product)} className="sketchy-btn bg-black text-white hover:bg-red-600 font-black uppercase disabled:opacity-50 rounded-xl">
                                  <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              ))}
            </div>
          )}
        </section>

        {totalPages > 1 && (
          <section className="container mx-auto px-4 pb-12">
            <div className="flex justify-center items-center gap-2">
              <Button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} variant="outline" className="border-2 border-black font-black disabled:opacity-50 rounded-xl">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Button key={`page-${pageNum}`} onClick={() => setCurrentPage(pageNum)}
                  className={`font-black rounded-xl ${currentPage === pageNum ? 'bg-red-600 text-white' : 'bg-white text-black border-2 border-black hover:bg-gray-100'}`}>
                  {pageNum}
                </Button>
              ))}
              <Button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} variant="outline" className="border-2 border-black font-black disabled:opacity-50 rounded-xl">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </section>
        )}
      </main>
    </PageLayout>
  )
}
