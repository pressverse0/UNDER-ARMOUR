import type { Product } from "@/types/product"

export const shoesProducts: Product[] = [
  { id: 201, name: "HOVR Phantom 3",         price: 140, category: "Running",    gender: "Men",   size: ["8","9","10","11","12"],       color: ["Black","White","Gray"],    rating: 4.8, reviews: 456, image: "/ARMOUR/HOVRPhantom3.jpg",             technology: "HOVR",    isNew: true,  inStock: true  },
  { id: 202, name: "Charged Assert 10",      price: 75,  category: "Running",    gender: "Men",   size: ["8","9","10","11","12"],       color: ["Black","Blue","Red"],      rating: 4.4, reviews: 289, image: "/ARMOUR/Charged Assert 10.jpg",        technology: "Charged",             inStock: true  },
  { id: 203, name: "Curry Flow 11",          price: 160, originalPrice: 180, category: "Basketball", gender: "Men",   size: ["8","9","10","11","12","13"],  color: ["White","Blue","Black"],    rating: 4.9, reviews: 621, image: "/ARMOUR/Curry Flow 11.jpg",            technology: "Flow",    isSale: true, inStock: true  },
  { id: 204, name: "Project Rock 5",         price: 150, category: "Training",   gender: "Men",   size: ["8","9","10","11","12"],       color: ["Black","Red"],             rating: 4.7, reviews: 398, image: "/ARMOUR/Project Rock Tank.jpg",        technology: "TriBase",             inStock: true  },
  { id: 205, name: "HOVR Sonic 5",           price: 120, category: "Running",    gender: "Women", size: ["6","7","8","9","10"],         color: ["White","Pink","Blue"],     rating: 4.6, reviews: 312, image: "/ARMOUR/HOVR Sonic 5.jpg",             technology: "HOVR",                inStock: true  },
  { id: 206, name: "Charged Pursuit 3",      price: 70,  category: "Running",    gender: "Women", size: ["6","7","8","9","10"],         color: ["Black","Gray","Pink"],     rating: 4.5, reviews: 267, image: "/ARMOUR/Charged Pursuit 3.jpg",        technology: "Charged", isNew: true,  inStock: true  },
  { id: 207, name: "Flow Velociti Wind 2",   price: 150, category: "Running",    gender: "Women", size: ["6","7","8","9","10"],         color: ["White","Pink","Purple"],   rating: 4.8, reviews: 445, image: "/ARMOUR/Flow Velociti Wind 2.jpg",     technology: "Flow",                inStock: true  },
  { id: 208, name: "TriBase Reign 5",        price: 130, originalPrice: 150, category: "Training",   gender: "Men",   size: ["8","9","10","11","12"],       color: ["Black","Gray"],            rating: 4.7, reviews: 356, image: "/ARMOUR/Tech Twist T-Shirt.jpg",       technology: "TriBase", isSale: true, inStock: true  },
  { id: 209, name: "Charged Bandit Trail 2", price: 110, category: "Trail",      gender: "Men",   size: ["8","9","10","11","12"],       color: ["Black","Green","Gray"],    rating: 4.6, reviews: 234, image: "/ARMOUR/Charged Assert 10.jpg",        technology: "Charged",             inStock: true  },
  { id: 210, name: "HOVR Machina 3",         price: 170, category: "Running",    gender: "Men",   size: ["8","9","10","11","12"],       color: ["Black","White","Blue"],    rating: 4.9, reviews: 578, image: "/ARMOUR/HOVRPhantom3.jpg",             technology: "HOVR",    isNew: true,  inStock: true  },
  { id: 211, name: "Charged Rogue 3",        price: 80,  category: "Running",    gender: "Women", size: ["6","7","8","9","10"],         color: ["Black","Pink","White"],    rating: 4.5, reviews: 389, image: "/ARMOUR/Charged Pursuit 3.jpg",        technology: "Charged",             inStock: true  },
  { id: 212, name: "Spawn 5",                price: 120, category: "Basketball", gender: "Men",   size: ["8","9","10","11","12","13"],  color: ["Black","Red","White"],     rating: 4.6, reviews: 298, image: "/ARMOUR/Curry Flow 11.jpg",            technology: "Charged",             inStock: false },
]

export const shoesCategories = ["Running", "Basketball", "Training", "Trail"]
export const shoesGenders = ["Men", "Women", "Unisex"]
export const shoesSizes = ["6", "7", "8", "9", "10", "11", "12", "13"]
export const shoesColors = ["Black", "White", "Red", "Blue", "Gray", "Pink", "Purple", "Green"]
export const shoesTechnologies = ["HOVR", "Charged", "Flow", "TriBase"]
