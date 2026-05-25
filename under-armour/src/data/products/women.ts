import type { Product } from "@/types/product"

export const womenProducts: Product[] = [
  { id: 101, name: "HeatGear Armour Sports Bra",  price: 30,  category: "Training",  size: ["XS","S","M","L","XL"],    color: ["Black","Pink","Purple"],      rating: 4.7, reviews: 342, image: "/ARMOUR/HeatGear Armour Sports Bra.jpg",   isNew: true,  inStock: true  },
  { id: 102, name: "HOVR Sonic 5",               price: 120, category: "Footwear",  size: ["6","7","8","9","10"],      color: ["White","Pink","Blue"],         rating: 4.6, reviews: 198, image: "/ARMOUR/HOVR Sonic 5.jpg",                 inStock: true  },
  { id: 103, name: "Fly Fast 2.0 Tights",        price: 50,  originalPrice: 70,  category: "Bottoms",   size: ["XS","S","M","L","XL"],    color: ["Black","Navy","Purple"],      rating: 4.5, reviews: 267, image: "/ARMOUR/Fly Fast 2.0 Tights.jpg",          isSale: true, inStock: true  },
  { id: 104, name: "Meridian Crop Tank",          price: 35,  category: "Training",  size: ["XS","S","M","L"],         color: ["Black","White","Pink"],        rating: 4.8, reviews: 421, image: "/ARMOUR/Meridian Crop Tank.jpg",            inStock: true  },
  { id: 105, name: "Charged Pursuit 3",           price: 70,  category: "Footwear",  size: ["6","7","8","9","10"],      color: ["Black","Gray","Pink"],         rating: 4.4, reviews: 156, image: "/ARMOUR/Charged Pursuit 3.jpg",             inStock: true  },
  { id: 106, name: "Storm Windstrike Jacket",     price: 100, category: "Outerwear", size: ["S","M","L","XL"],         color: ["Black","Navy","Pink"],         rating: 4.6, reviews: 189, image: "/ARMOUR/Storm Windstrike Jacket.jpg",       isNew: true,  inStock: true  },
  { id: 107, name: "Infinity High Sports Bra",   price: 45,  category: "Training",  size: ["XS","S","M","L","XL"],    color: ["Black","Purple","Blue"],       rating: 4.9, reviews: 512, image: "/ARMOUR/Infinity High Sports Bra.jpg",     inStock: true  },
  { id: 108, name: "Rival Fleece Hoodie",         price: 55,  originalPrice: 75,  category: "Outerwear", size: ["S","M","L","XL"],         color: ["Gray","Pink","Black"],        rating: 4.7, reviews: 298, image: "/ARMOUR/Rival Fleece Hoodie.jpg",           isSale: true, inStock: true  },
  { id: 109, name: "Play Up 3.0 Shorts",         price: 25,  category: "Bottoms",   size: ["XS","S","M","L","XL"],    color: ["Black","Pink","Blue"],         rating: 4.5, reviews: 234, image: "/ARMOUR/Play Up 3.0 Shorts.jpg",            inStock: true  },
  { id: 110, name: "Flow Velociti Wind 2",        price: 150, category: "Footwear",  size: ["6","7","8","9","10"],      color: ["White","Pink","Purple"],       rating: 4.8, reviews: 387, image: "/ARMOUR/Flow Velociti Wind 2.jpg",          isNew: true,  inStock: true  },
  { id: 111, name: "Tech Twist T-Shirt",          price: 28,  category: "Training",  size: ["XS","S","M","L","XL"],    color: ["Black","White","Pink","Purple"],rating: 4.6, reviews: 445, image: "/ARMOUR/Tech Twist T-Shirt.jpg",            inStock: true  },
  { id: 112, name: "Unstoppable Bomber Jacket",   price: 110, category: "Outerwear", size: ["S","M","L","XL"],         color: ["Black","Navy"],               rating: 4.7, reviews: 167, image: "/ARMOUR/Unstoppable Bomber Jacket.jpg",     inStock: false },
]

export const womenCategories = ["Training", "Footwear", "Bottoms", "Outerwear"]
export const womenSizes = ["XS", "S", "M", "L", "XL", "6", "7", "8", "9", "10"]
export const womenColors = ["Black", "White", "Pink", "Purple", "Blue", "Gray", "Navy"]
