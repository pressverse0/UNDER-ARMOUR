'use client'

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
  X,
  Grid3x3,
  List
} from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  category: string
  gender: string
  size: string[]
  color: string[]
  rating: number
  reviews: number
  image: string
  isNew?: boolean
  isSale?: boolean
  inStock: boolean
  technology?: string
}

export default function ShoesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedGenders, setSelectedGenders] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 250])
  const [sortBy, setSortBy] = useState('featured')
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const itemsPerPage = 9

  const allProducts: Product[] = [
    { id: 1, name: "HOVR Phantom 3", price: 140, category: "Running", gender: "Men", size: ["8", "9", "10", "11", "12"], color: ["Black", "White", "Gray"], rating: 4.8, reviews: 456, image: "/ARMOUR/HOVRPhantom3.jpg", technology: "HOVR", isNew: true, inStock: true },
    { id: 2, name: "Charged Assert 10", price: 75, category: "Running", gender: "Men", size: ["8", "9", "10", "11", "12"], color: ["Black", "Blue", "Red"], rating: 4.4, reviews: 289, image: "/ARMOUR/Charged Assert 10.jpg", technology: "Charged", inStock: true },
    { id: 3, name: "Curry Flow 11", price: 160, originalPrice: 180, category: "Basketball", gender: "Men", size: ["8", "9", "10", "11", "12", "13"], color: ["White", "Blue", "Black"], rating: 4.9, reviews: 621, image: "/ARMOUR/Curry Flow 11.jpg", technology: "Flow", isSale: true, inStock: true },
    { id: 4, name: "Project Rock 5", price: 150, category: "Training", gender: "Men", size: ["8", "9", "10", "11", "12"], color: ["Black", "Red"], rating: 4.7, reviews: 398, image: "/ARMOUR/Project Rock Tank.jpg", technology: "TriBase", inStock: true },
    { id: 5, name: "HOVR Sonic 5", price: 120, category: "Running", gender: "Women", size: ["6", "7", "8", "9", "10"], color: ["White", "Pink", "Blue"], rating: 4.6, reviews: 312, image: "/ARMOUR/HOVR Sonic 5.jpg", technology: "HOVR", inStock: true },
    { id: 6, name: "Charged Pursuit 3", price: 70, category: "Running", gender: "Women", size: ["6", "7", "8", "9", "10"], color: ["Black", "Gray", "Pink"], rating: 4.5, reviews: 267, image: "/ARMOUR/Charged Pursuit 3.jpg", technology: "Charged", isNew: true, inStock: true },
    { id: 7, name: "Flow Velociti Wind 2", price: 150, category: "Running", gender: "Women", size: ["6", "7", "8", "9", "10"], color: ["White", "Pink", "Purple"], rating: 4.8, reviews: 445, image: "/ARMOUR/Flow Velociti Wind 2.jpg", technology: "Flow", inStock: true },
    { id: 8, name: "TriBase Reign 5", price: 130, originalPrice: 150, category: "Training", gender: "Men", size: ["8", "9", "10", "11", "12"], color: ["Black", "Gray"], rating: 4.7, reviews: 356, image: "/ARMOUR/Tech Twist T-Shirt.jpg", technology: "TriBase", isSale: true, inStock: true },
    { id: 9, name: "Charged Bandit Trail 2", price: 110, category: "Trail", gender: "Men", size: ["8", "9", "10", "11", "12"], color: ["Black", "Green", "Gray"], rating: 4.6, reviews: 234, image: "/ARMOUR/Charged Assert 10.jpg", technology: "Charged", inStock: true },
    { id: 10, name: "HOVR Machina 3", price: 170, category: "Running", gender: "Men", size: ["8", "9", "10", "11", "12"], color: ["Black", "White", "Blue"], rating: 4.9, reviews: 578, image: "/ARMOUR/HOVRPhantom3.jpg", technology: "HOVR", isNew: true, inStock: true },
    { id: 11, name: "Charged Rogue 3", price: 80, category: "Running", gender: "Women", size: ["6", "7", "8", "9", "10"], color: ["Black", "Pink", "White"], rating: 4.5, reviews: 389, image: "/ARMOUR/Charged Pursuit 3.jpg", technology: "Charged", inStock: true },
    { id: 12, name: "Spawn 5", price: 120, category: "Basketball", gender: "Men", size: ["8", "9", "10", "11", "12", "13"], color: ["Black", "Red", "White"], rating: 4.6, reviews: 298, image: "/ARMOUR/Curry Flow 11.jpg", technology: "Charged", inStock: false },
  ]

  const categories = ["Running", "Basketball", "Training", "Trail"]
  const genders = ["Men", "Women", "Unisex"]
  const sizes = ["6", "7", "8", "9", "10", "11", "12", "13"]
  const colors = ["Black", "White", "Red", "Blue", "Gray", "Pink", "Purple", "Green"]
  const technologies = ["HOVR", "Charged", "Flow", "TriBase"]

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesGender = selectedGenders.length === 0 || selectedGenders.includes(product.gender)
      const matchesSize = selectedSizes.length === 0 || product.size.some(s => selectedSizes.includes(s))
      const matchesColor = selectedColors.length === 0 || product.color.some(c => selectedColors.includes(c))
      const matchesTechnology = selectedTechnologies.length === 0 || (product.technology && selectedTechnologies.includes(product.technology))
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      
      return matchesSearch && matchesCategory && matchesGender && matchesSize && matchesColor && matchesTechnology && matchesPrice
    })

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
    }

    return filtered
  }, [allProducts, searchQuery, selectedCategories, selectedGenders, selectedSizes, selectedColors, selectedTechnologies, priceRange, sortBy])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
    setCurrentPage(1)
  }

  const toggleGender = (gender: string) => {
    setSelectedGenders(prev =>
      prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
    )
    setCurrentPage(1)
  }

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
    setCurrentPage(1)
  }

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    )
    setCurrentPage(1)
  }

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    )
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedGenders([])
    setSelectedSizes([])
    setSelectedColors([])
    setSelectedTechnologies([])
    setPriceRange([0, 250])
    setSearchQuery('')
    setCurrentPage(1)
  }

  const activeFiltersCount = selectedCategories.length + selectedGenders.length + selectedSizes.length + selectedColors.length + selectedTechnologies.length

  return (
    <>
      <Header activePage="shoes" />
      <main className="flex-1 bg-gray-100">
        <section className="relative bg-black text-white py-12 lg:py-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-5xl font-black uppercase leading-none tracking-tight mb-4">
                Performance <span className="text-red-600">Footwear</span>
              </h1>
              <p className="text-lg text-gray-300 font-bold">
                Revolutionary technology meets superior design. Every step, every move, engineered for excellence.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white border-b-4 border-black sticky top-0 z-30 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search shoes..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-10 border-2 border-gray-300 focus:border-red-600 font-bold"
                />
              </div>

              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="sketchy-btn bg-black text-white hover:bg-gray-800 font-black uppercase w-full md:w-auto"
              >
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-red-600">{activeFiltersCount}</Badge>
                )}
              </Button>

              <div className="relative w-full md:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full md:w-48 border-2 border-gray-300 rounded px-4 py-2 font-bold appearance-none cursor-pointer focus:border-red-600"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 pointer-events-none" />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => setViewMode('grid')}
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  className={viewMode === 'grid' ? 'bg-red-600' : ''}
                >
                  <Grid3x3 className="h-5 w-5" />
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  className={viewMode === 'list' ? 'bg-red-600' : ''}
                >
                  <List className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {showFilters && (
          <section className="bg-gray-50 border-b-4 border-gray-300">
            <div className="container mx-auto px-4 py-6">
              <div className="grid md:grid-cols-5 gap-6">
                <div>
                  <Label className="font-black uppercase text-sm mb-3 block">Category</Label>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="mr-2 w-4 h-4 accent-red-600"
                        />
                        <span className="font-bold text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="font-black uppercase text-sm mb-3 block">Gender</Label>
                  <div className="space-y-2">
                    {genders.map(gender => (
                      <label key={gender} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedGenders.includes(gender)}
                          onChange={() => toggleGender(gender)}
                          className="mr-2 w-4 h-4 accent-red-600"
                        />
                        <span className="font-bold text-sm">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="font-black uppercase text-sm mb-3 block">Size</Label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1 border-2 font-bold text-sm rounded transition-colors ${
                          selectedSizes.includes(size)
                            ? 'bg-red-600 text-white border-red-600'
                            : 'bg-white border-gray-300 hover:border-red-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="font-black uppercase text-sm mb-3 block">Technology</Label>
                  <div className="space-y-2">
                    {technologies.map(tech => (
                      <label key={tech} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedTechnologies.includes(tech)}
                          onChange={() => toggleTechnology(tech)}
                          className="mr-2 w-4 h-4 accent-red-600"
                        />
                        <span className="font-bold text-sm">{tech}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="font-black uppercase text-sm mb-3 block">
                    Price: ${priceRange[0]} - ${priceRange[1]}
                  </Label>
                  <input
                    type="range"
                    min="0"
                    max="250"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-red-600"
                  />
                  <div className="mt-4">
                    <Label className="font-black uppercase text-sm mb-3 block">Color</Label>
                    <div className="flex flex-wrap gap-2">
                      {colors.map(color => (
                        <button
                          key={color}
                          onClick={() => toggleColor(color)}
                          className={`px-2 py-1 border-2 font-bold text-xs rounded transition-colors ${
                            selectedColors.includes(color)
                              ? 'bg-red-600 text-white border-red-600'
                              : 'bg-white border-gray-300 hover:border-red-600'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="w-full mt-4 font-bold"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="container mx-auto px-4 py-6">
          <p className="font-bold text-gray-700">
            Showing {paginatedProducts.length} of {filteredProducts.length} shoes
          </p>
        </section>

        <section className="container mx-auto px-4 pb-12">
          {paginatedProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl font-black text-gray-600 mb-4">No shoes found</p>
              <Button onClick={clearFilters} className="sketchy-btn bg-red-600 text-white font-black uppercase">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
              {paginatedProducts.map((product) => (
                viewMode === 'grid' ? (
                  <Card key={product.id} className="sketchy-card bg-white border-4 border-black transform hover:scale-105 transition-all duration-300 group h-full flex flex-col">
                    <CardContent className="p-6 flex flex-col flex-1">
                      <div className="relative sketchy-frame bg-gray-900 p-4 mb-4">
                        {product.isNew && (
                          <Badge className="absolute top-2 left-2 bg-red-600 font-black uppercase z-10">New</Badge>
                        )}
                        {product.isSale && (
                          <Badge className="absolute top-2 left-2 bg-green-600 font-black uppercase z-10">Sale</Badge>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10">
                            <span className="text-white font-black text-xl uppercase">Out of Stock</span>
                          </div>
                        )}
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={300}
                          height={250}
                          className="w-full h-auto filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                        <button className="absolute top-2 right-2 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Heart className="h-5 w-5 text-red-600" />
                        </button>
                      </div>
                      <div className="space-y-3 flex-1 flex flex-col">
                        <div className="flex gap-2">
                          <div className="sketchy-border bg-red-600 inline-block px-3 py-1">
                            <span className="text-white font-bold text-xs uppercase">{product.category}</span>
                          </div>
                          {product.technology && (
                            <div className="sketchy-border bg-black inline-block px-3 py-1">
                              <span className="text-white font-bold text-xs uppercase">{product.technology}</span>
                            </div>
                          )}
                        </div>
                        <h3 className="font-black text-lg text-black uppercase leading-tight">{product.name}</h3>
                        <p className="text-sm font-bold text-gray-600">{product.gender}'s Shoe</p>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-bold text-gray-600">({product.reviews})</span>
                        </div>

                        <div className="flex items-center gap-2 flex-1">
                          <p className="text-2xl font-black text-red-600">${product.price}</p>
                          {product.originalPrice && (
                            <p className="text-lg font-bold text-gray-400 line-through">${product.originalPrice}</p>
                          )}
                        </div>

                        <Button 
                          disabled={!product.inStock}
                          className="sketchy-btn bg-black text-white hover:bg-red-600 hover:text-white font-black uppercase disabled:opacity-50 w-full mt-auto"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card key={product.id} className="sketchy-card bg-white border-4 border-black hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="relative sketchy-frame bg-gray-900 p-4 w-48 flex-shrink-0">
                          {product.isNew && (
                            <Badge className="absolute top-2 left-2 bg-red-600 font-black uppercase z-10">New</Badge>
                          )}
                          {product.isSale && (
                            <Badge className="absolute top-2 left-2 bg-green-600 font-black uppercase z-10">Sale</Badge>
                          )}
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10">
                              <span className="text-white font-black text-sm uppercase">Out of Stock</span>
                            </div>
                          )}
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={200}
                            height={200}
                            className="w-full h-auto filter grayscale group-hover:grayscale-0 transition-all duration-300"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex gap-2 mb-3">
                              <div className="sketchy-border bg-red-600 inline-block px-3 py-1">
                                <span className="text-white font-bold text-xs uppercase">{product.category}</span>
                              </div>
                              {product.technology && (
                                <div className="sketchy-border bg-black inline-block px-3 py-1">
                                  <span className="text-white font-bold text-xs uppercase">{product.technology}</span>
                                </div>
                              )}
                            </div>
                            <h3 className="font-black text-2xl text-black uppercase mb-1">{product.name}</h3>
                            <p className="text-sm font-bold text-gray-600 mb-3">{product.gender}'s Shoe</p>
                            
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm font-bold text-gray-600">{product.rating} ({product.reviews} reviews)</span>
                            </div>

                            <div className="mb-3">
                              <span className="font-bold text-sm text-gray-600 mr-2">Sizes:</span>
                              {product.size.map(s => (
                                <span key={s} className="inline-block px-2 py-1 border border-gray-300 text-xs font-bold mr-1 mb-1">{s}</span>
                              ))}
                            </div>

                            <div>
                              <span className="font-bold text-sm text-gray-600 mr-2">Colors:</span>
                              {product.color.map(c => (
                                <span key={c} className="inline-block px-2 py-1 border border-gray-300 text-xs font-bold mr-1 mb-1">{c}</span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <p className="text-3xl font-black text-red-600">${product.price}</p>
                              {product.originalPrice && (
                                <p className="text-xl font-bold text-gray-400 line-through">${product.originalPrice}</p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline"
                                size="icon"
                                className="border-2 border-black hover:bg-red-600 hover:text-white"
                              >
                                <Heart className="h-5 w-5" />
                              </Button>
                              <Button 
                                disabled={!product.inStock}
                                className="sketchy-btn bg-black text-white hover:bg-red-600 font-black uppercase disabled:opacity-50"
                              >
                                <ShoppingCart className="h-5 w-5 mr-2" />
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              ))}
            </div>
          )}
        </section>

        {totalPages > 1 && (
          <section className="container mx-auto px-4 pb-12">
            <div className="flex justify-center items-center gap-2">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                variant="outline"
                className="border-2 border-black font-black disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Button
                  key={`page-${pageNum}`}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`font-black ${
                    currentPage === pageNum
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-black border-2 border-black hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </Button>
              ))}

              <Button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                variant="outline"
                className="border-2 border-black font-black disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}
