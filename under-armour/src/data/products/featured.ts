export interface FeaturedProduct {
  id: number
  name: string
  price: number
  category: string
  description: string
  image: string
  rating: number
  reviews: number
  inStock: boolean
}

export interface NewArrivalCard {
  id: number
  name: string
  price: number
  category: string
  image: string
  rating: number
  reviews: number
  inStock: boolean
  isNew: boolean
}

export const featuredProducts: FeaturedProduct[] = [
  { id: 11,  name: "HeatGear Training Shirt", price: 35,  category: "Apparel",     description: "Moisture-wicking performance training shirt", image: "/ARMOUR/HeatGear Training Shirt.jpg", rating: 4.4, reviews: 267, inStock: true },
  { id: 2,   name: "HOVR Phantom 3",          price: 140, category: "Footwear",    description: "Premium running shoes with HOVR cushioning",   image: "/ARMOUR/HOVRPhantom3.jpg",            rating: 4.8, reviews: 256, inStock: true },
  { id: 401, name: "Project Rock Gym Bag",    price: 75,  category: "Accessories", description: "Built for champions. 42L capacity.",           image: "/ARMOUR/ProjectRockGymBag.jpg",       rating: 4.8, reviews: 234, inStock: true },
]

export const homeNewArrivals: NewArrivalCard[] = [
  { id: 10,  name: "Curry Flow 11",        price: 160, category: "Basketball", image: "/ARMOUR/Curry Flow 11.jpg",             rating: 4.9, reviews: 421, inStock: true, isNew: true },
  { id: 6,   name: "Sportstyle Jacket",    price: 90,  category: "Outerwear",  image: "/ARMOUR/Sportstyle Jacket.jpg",         rating: 4.6, reviews: 142, inStock: true, isNew: true },
  { id: 401, name: "Unstoppable Bomber",   price: 110, category: "Outerwear",  image: "/ARMOUR/Unstoppable Bomber Jacket.jpg", rating: 4.5, reviews: 98,  inStock: true, isNew: true },
  { id: 403, name: "Flow Velociti Wind 2", price: 140, category: "Running",    image: "/ARMOUR/Flow Velociti Wind 2.jpg",      rating: 4.7, reviews: 185, inStock: true, isNew: true },
]
