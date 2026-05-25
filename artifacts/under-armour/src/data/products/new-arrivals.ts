export interface NewArrivalProduct {
  id: number
  name: string
  price: number
  category: string
  image: string
  rating: number
  reviews: number
  inStock: boolean
  arrivedWeeks: number
}

export const newArrivalProducts: NewArrivalProduct[] = [
  { id: 10,  name: "Curry Flow 11",              price: 160, category: "Basketball Shoes", image: "/ARMOUR/Curry Flow 11.jpg",               rating: 4.9, reviews: 421, inStock: true,  arrivedWeeks: 1 },
  { id: 6,   name: "Sportstyle Jacket",          price: 90,  category: "Outerwear",        image: "/ARMOUR/Sportstyle Jacket.jpg",           rating: 4.6, reviews: 142, inStock: true,  arrivedWeeks: 1 },
  { id: 307, name: "Boys' Rival Fleece Hoodie",  price: 40,  category: "Kids",             image: "/ARMOUR/Rival Fleece Hoodie.jpg",         rating: 4.8, reviews: 143, inStock: true,  arrivedWeeks: 2 },
  { id: 401, name: "Project Rock Gym Bag",       price: 75,  category: "Accessories",      image: "/ARMOUR/ProjectRockGymBag.jpg",           rating: 4.8, reviews: 234, inStock: true,  arrivedWeeks: 2 },
  { id: 407, name: "HOVR Running Belt",          price: 30,  category: "Accessories",      image: "/ARMOUR/UA RUSH Training Pants.jpg",      rating: 4.5, reviews: 79,  inStock: true,  arrivedWeeks: 2 },
  { id: 412, name: "UA 24oz Stainless Bottle",   price: 35,  category: "Accessories",      image: "/ARMOUR/Curry Flow 11.jpg",               rating: 4.6, reviews: 92,  inStock: true,  arrivedWeeks: 2 },
  { id: 401, name: "Unstoppable Bomber Jacket",  price: 110, category: "Outerwear",        image: "/ARMOUR/Unstoppable Bomber Jacket.jpg",   rating: 4.8, reviews: 62,  inStock: true,  arrivedWeeks: 3 },
  { id: 402, name: "Storm Windstrike Jacket",    price: 90,  category: "Outerwear",        image: "/ARMOUR/Storm Windstrike Jacket.jpg",     rating: 4.5, reviews: 44,  inStock: true,  arrivedWeeks: 3 },
  { id: 403, name: "Flow Velociti Wind 2",       price: 140, category: "Running Shoes",    image: "/ARMOUR/Flow Velociti Wind 2.jpg",        rating: 4.7, reviews: 143, inStock: true,  arrivedWeeks: 3 },
  { id: 301, name: "Boys' Tech T-Shirt",         price: 20,  category: "Kids",             image: "/ARMOUR/HeatGear Training Shirt.jpg",     rating: 4.5, reviews: 89,  inStock: true,  arrivedWeeks: 3 },
  { id: 302, name: "Girls' HeatGear Tank",       price: 22,  category: "Kids",             image: "/ARMOUR/Meridian Crop Tank.jpg",          rating: 4.6, reviews: 103, inStock: true,  arrivedWeeks: 3 },
  { id: 1,   name: "HeatGear Compression Shirt", price: 35,  category: "Training",         image: "/ARMOUR/HeatGearCompressionShirt.jpg",    rating: 4.5, reviews: 128, inStock: true,  arrivedWeeks: 4 },
]

export const newArrivalCategoryFilters = ["All", "Training", "Running Shoes", "Basketball Shoes", "Outerwear", "Accessories", "Kids"]
