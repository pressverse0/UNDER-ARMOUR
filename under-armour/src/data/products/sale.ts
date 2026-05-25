export interface SaleProduct {
  id: number
  name: string
  price: number
  originalPrice: number
  category: string
  rating: number
  reviews: number
  image: string
  inStock: boolean
  discount: number
}

export const saleProducts: SaleProduct[] = [
  { id: 3,   name: "Tech 2.0 Shorts",                   price: 30,  originalPrice: 45,  category: "Bottoms",       rating: 4.3, reviews: 89,  image: "/ARMOUR/Tech2.0Shorts.jpg",               inStock: true,  discount: 33 },
  { id: 8,   name: "Rival Fleece Hoodie",                price: 50,  originalPrice: 65,  category: "Outerwear",     rating: 4.7, reviews: 312, image: "/ARMOUR/Rival Fleece Hoodie.jpg",         inStock: true,  discount: 23 },
  { id: 305, name: "Girls' Play Up Shorts",              price: 25,  originalPrice: 32,  category: "Kids Bottoms",  rating: 4.5, reviews: 88,  image: "/ARMOUR/Play Up 3.0 Shorts.jpg",          inStock: true,  discount: 22 },
  { id: 312, name: "Kids' Storm Windbreaker",            price: 48,  originalPrice: 60,  category: "Kids Outerwear",rating: 4.5, reviews: 35,  image: "/ARMOUR/Storm Windbreaker.jpg",           inStock: true,  discount: 20 },
  { id: 403, name: "Training Gloves Pro",                price: 35,  originalPrice: 45,  category: "Accessories",   rating: 4.4, reviews: 88,  image: "/ARMOUR/Project Rock Tank.jpg",           inStock: true,  discount: 22 },
  { id: 409, name: "Liner Socks 3-Pack",                 price: 14,  originalPrice: 18,  category: "Accessories",   rating: 4.4, reviews: 224, image: "/ARMOUR/Tech2.0Shorts.jpg",               inStock: true,  discount: 22 },
  { id: 501, name: "HOVR Sonic 5 Running Shoe",          price: 95,  originalPrice: 130, category: "Footwear",      rating: 4.6, reviews: 287, image: "/ARMOUR/HOVR Sonic 5.jpg",                inStock: true,  discount: 27 },
  { id: 502, name: "Charged Pursuit 3 Shoe",             price: 55,  originalPrice: 75,  category: "Footwear",      rating: 4.5, reviews: 176, image: "/ARMOUR/Charged Pursuit 3.jpg",           inStock: true,  discount: 27 },
  { id: 503, name: "Flow Velociti Wind 2",               price: 100, originalPrice: 140, category: "Footwear",      rating: 4.7, reviews: 143, image: "/ARMOUR/Flow Velociti Wind 2.jpg",        inStock: false, discount: 29 },
  { id: 504, name: "ColdGear Armour Compression Shirt",  price: 38,  originalPrice: 55,  category: "Training",      rating: 4.6, reviews: 98,  image: "/ARMOUR/ColdGear Base Layer.jpg",         inStock: true,  discount: 31 },
  { id: 505, name: "Unstoppable Bomber Jacket",          price: 70,  originalPrice: 110, category: "Outerwear",     rating: 4.8, reviews: 62,  image: "/ARMOUR/Unstoppable Bomber Jacket.jpg",   inStock: true,  discount: 36 },
  { id: 506, name: "Storm Windstrike Jacket",            price: 65,  originalPrice: 90,  category: "Outerwear",     rating: 4.5, reviews: 44,  image: "/ARMOUR/Storm Windstrike Jacket.jpg",     inStock: true,  discount: 28 },
]

export const saleCategoryFilters = ["All", "Footwear", "Training", "Bottoms", "Outerwear", "Accessories", "Kids Bottoms", "Kids Outerwear"]
