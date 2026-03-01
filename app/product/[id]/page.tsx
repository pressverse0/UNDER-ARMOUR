'use client'

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { 
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  ChevronLeft,
  ChevronRight,
  Check,
  X
} from "lucide-react"

// Mock product data - in real app, this would come from API/database
const allProducts = [
  { id: 1, name: "HeatGear Compression Shirt", price: 35, category: "Training", size: ["S", "M", "L", "XL"], color: ["Black", "Red", "Blue"], rating: 4.5, reviews: 128, image: "/ARMOUR/HeatGearCompressionShirt.jpg", description: "Stay cool and dry with our advanced HeatGear technology. This compression shirt wicks sweat away from your body and dries incredibly fast.", features: ["HeatGear fabric keeps you cool", "4-way stretch construction", "Anti-odor technology", "Moisture-wicking"], inStock: true, gender: "Men" },
  { id: 2, name: "HOVR Phantom 3", price: 140, category: "Footwear", size: ["8", "9", "10", "11", "12"], color: ["Black", "White", "Gray"], rating: 4.8, reviews: 256, image: "/ARMOUR/HOVRPhantom3.jpg", description: "Experience zero-gravity feel with HOVR cushioning technology. Engineered mesh upper provides breathability and support.", features: ["HOVR cushioning technology", "Engineered mesh upper", "Responsive UA HOVR foam", "Durable rubber outsole"], inStock: true, gender: "Men" },
  { id: 3, name: "Tech 2.0 Shorts", price: 30, originalPrice: 45, category: "Bottoms", size: ["S", "M", "L", "XL"], color: ["Black", "Navy", "Gray"], rating: 4.3, reviews: 89, image: "/ARMOUR/Tech2.0Shorts.jpg", description: "Lightweight and breathable training shorts with moisture-wicking fabric. Perfect for any workout.", features: ["Ultra-light fabric", "Moisture-wicking", "Elastic waistband", "Side pockets"], inStock: true, gender: "Men" },
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const productId = parseInt(params.id as string)
  
  const product = allProducts.find(p => p.id === productId) || allProducts[0]
  
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>(product.color[0])
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'reviews'>('description')

  // Mock multiple images (in real app, product would have multiple images)
  const productImages = [product.image, product.image, product.image]

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose your size before adding to cart",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Added to Cart",
      description: `${product.name} (${selectedSize}, ${selectedColor}) x${quantity} added to your cart`,
      variant: "success" as any,
    })
  }

  const handleAddToWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist`,
      variant: "success" as any,
    })
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-100">
        {/* Breadcrumb */}
        <section className="bg-white border-b-2 border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm font-bold">
              <Link href="/" className="text-gray-600 hover:text-red-600">Home</Link>
              <span className="text-gray-400">/</span>
              <Link href={`/${product.gender.toLowerCase()}`} className="text-gray-600 hover:text-red-600">{product.gender}</Link>
              <span className="text-gray-400">/</span>
              <Link href={`/${product.gender.toLowerCase()}`} className="text-gray-600 hover:text-red-600">{product.category}</Link>
              <span className="text-gray-400">/</span>
              <span className="text-black">{product.name}</span>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <Card className="sketchy-card bg-white border-4 border-black overflow-hidden">
                <CardContent className="p-0 relative">
                  <div className="relative h-[500px] bg-gray-900 flex items-center justify-center">
                    <Image
                      src={productImages[currentImageIndex]}
                      alt={product.name}
                      width={600}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Navigation Arrows */}
                    {productImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`sketchy-card border-4 ${
                      currentImageIndex === index ? 'border-red-600' : 'border-black'
                    } overflow-hidden hover:border-red-600 transition-colors`}
                  >
                    <div className="h-32 bg-gray-900 flex items-center justify-center">
                      <Image
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        width={150}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              {/* Title and Rating */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-red-600 font-black uppercase">{product.category}</Badge>
                  {product.originalPrice && (
                    <Badge className="bg-green-600 font-black uppercase">Sale</Badge>
                  )}
                </div>
                <h1 className="text-4xl font-black uppercase mb-4">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-500 text-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-lg">{product.rating}</span>
                  </div>
                  <span className="text-gray-600 font-bold">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <p className="text-4xl font-black text-red-600">${product.price}</p>
                  {product.originalPrice && (
                    <p className="text-2xl font-bold text-gray-400 line-through">${product.originalPrice}</p>
                  )}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <Label className="font-black uppercase text-sm mb-3 block">
                  Color: <span className="text-red-600">{selectedColor}</span>
                </Label>
                <div className="flex gap-3">
                  {product.color.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 border-4 font-black uppercase text-sm rounded transition-all ${
                        selectedColor === color
                          ? 'bg-red-600 text-white border-red-600 scale-110'
                          : 'bg-white border-black hover:border-red-600'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <Label className="font-black uppercase text-sm mb-3 block">
                  Size: {selectedSize && <span className="text-red-600">{selectedSize}</span>}
                </Label>
                <div className="grid grid-cols-5 gap-3">
                  {product.size.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border-4 font-black uppercase text-sm rounded transition-all ${
                        selectedSize === size
                          ? 'bg-red-600 text-white border-red-600 scale-110'
                          : 'bg-white border-black hover:border-red-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <Label className="font-black uppercase text-sm mb-3 block">Quantity</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-4 border-black rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <span className="px-6 font-black text-xl">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  <span className="text-gray-600 font-bold">
                    {product.inStock ? (
                      <span className="text-green-600 flex items-center gap-2">
                        <Check className="h-5 w-5" /> In Stock
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-2">
                        <X className="h-5 w-5" /> Out of Stock
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="sketchy-btn bg-red-600 text-white hover:bg-red-700 font-black uppercase w-full py-6 text-lg disabled:opacity-50"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleAddToWishlist}
                    variant="outline"
                    className="sketchy-btn-outline border-2 border-black text-black hover:bg-black hover:text-white font-black uppercase py-4"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Wishlist
                  </Button>
                  <Button
                    variant="outline"
                    className="sketchy-btn-outline border-2 border-black text-black hover:bg-black hover:text-white font-black uppercase py-4"
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Features */}
              <Card className="sketchy-card bg-gray-50 border-2 border-gray-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Truck className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-black uppercase text-sm">Free Shipping</p>
                      <p className="text-sm text-gray-600 font-bold">On orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RotateCcw className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-black uppercase text-sm">Easy Returns</p>
                      <p className="text-sm text-gray-600 font-bold">60-day return policy</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-black uppercase text-sm">Secure Payment</p>
                      <p className="text-sm text-gray-600 font-bold">100% secure transactions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-12">
            <Card className="sketchy-card bg-white border-4 border-black">
              <CardContent className="p-0">
                {/* Tab Headers */}
                <div className="flex border-b-4 border-black">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`flex-1 py-4 font-black uppercase ${
                      activeTab === 'description'
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('features')}
                    className={`flex-1 py-4 font-black uppercase border-x-4 border-black ${
                      activeTab === 'features'
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                  >
                    Features
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`flex-1 py-4 font-black uppercase ${
                      activeTab === 'reviews'
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                  >
                    Reviews ({product.reviews})
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-8">
                  {activeTab === 'description' && (
                    <div className="prose max-w-none">
                      <p className="text-lg font-bold text-gray-700 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  )}

                  {activeTab === 'features' && (
                    <div className="space-y-4">
                      {product.features?.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Check className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                          <p className="text-lg font-bold text-gray-700">{feature}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-6">
                      <div className="text-center py-8">
                        <p className="text-2xl font-black text-gray-600 mb-2">Customer Reviews</p>
                        <p className="text-gray-500 font-bold">Be the first to review this product</p>
                        <Button className="sketchy-btn bg-red-600 text-white hover:bg-red-700 font-black uppercase mt-4">
                          Write a Review
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
