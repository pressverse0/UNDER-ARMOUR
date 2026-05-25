import type { Product } from "@/types/product"

export const menProducts: Product[] = [
  { id: 1,  name: "HeatGear Compression Shirt", price: 35,  category: "Training",  size: ["S","M","L","XL"],         color: ["Black","Red","Blue"],         rating: 4.5, reviews: 128, image: "/ARMOUR/HeatGearCompressionShirt.jpg", isNew: true,  inStock: true  },
  { id: 2,  name: "HOVR Phantom 3",              price: 140, category: "Footwear",  size: ["8","9","10","11","12"],    color: ["Black","White","Gray"],       rating: 4.8, reviews: 256, image: "/ARMOUR/HOVRPhantom3.jpg",               inStock: true  },
  { id: 3,  name: "Tech 2.0 Shorts",             price: 30,  originalPrice: 45, category: "Bottoms",   size: ["S","M","L","XL"],         color: ["Black","Navy","Gray"],        rating: 4.3, reviews: 89,  image: "/ARMOUR/Tech2.0Shorts.jpg",              isSale: true, inStock: true  },
  { id: 4,  name: "Project Rock Tank",           price: 40,  category: "Training",  size: ["M","L","XL","XXL"],       color: ["Black","Red"],               rating: 4.7, reviews: 203, image: "/ARMOUR/Project Rock Tank.jpg",          inStock: true  },
  { id: 5,  name: "Charged Assert 10",           price: 75,  category: "Footwear",  size: ["8","9","10","11","12"],    color: ["Black","Blue","Red"],         rating: 4.4, reviews: 167, image: "/ARMOUR/Charged Assert 10.jpg",          inStock: true  },
  { id: 6,  name: "Sportstyle Jacket",           price: 90,  category: "Outerwear", size: ["M","L","XL"],             color: ["Black","Navy"],               rating: 4.6, reviews: 142, image: "/ARMOUR/Sportstyle Jacket.jpg",          isNew: true,  inStock: true  },
  { id: 7,  name: "ColdGear Base Layer",         price: 55,  category: "Training",  size: ["S","M","L","XL"],         color: ["Black","Gray"],               rating: 4.5, reviews: 98,  image: "/ARMOUR/ColdGear Base Layer.jpg",        inStock: true  },
  { id: 8,  name: "Rival Fleece Hoodie",         price: 50,  originalPrice: 65, category: "Outerwear", size: ["M","L","XL","XXL"],       color: ["Black","Gray","Navy"],        rating: 4.7, reviews: 312, image: "/ARMOUR/Rival Fleece Hoodie.jpg",        isSale: true, inStock: true  },
  { id: 9,  name: "UA RUSH Training Pants",      price: 70,  category: "Bottoms",   size: ["S","M","L","XL"],         color: ["Black","Gray"],               rating: 4.6, reviews: 156, image: "/ARMOUR/UA RUSH Training Pants.jpg",     inStock: true  },
  { id: 10, name: "Curry Flow 11",               price: 160, category: "Footwear",  size: ["8","9","10","11","12"],    color: ["White","Blue","Black"],       rating: 4.9, reviews: 421, image: "/ARMOUR/Curry Flow 11.jpg",              isNew: true,  inStock: true  },
  { id: 11, name: "HeatGear Training Shirt",     price: 25,  category: "Training",  size: ["S","M","L","XL","XXL"],   color: ["Black","White","Red","Blue"],  rating: 4.4, reviews: 267, image: "/ARMOUR/HeatGear Training Shirt.jpg",    inStock: true  },
  { id: 12, name: "Storm Windbreaker",           price: 80,  category: "Outerwear", size: ["M","L","XL"],             color: ["Black","Navy","Red"],         rating: 4.5, reviews: 134, image: "/ARMOUR/Storm Windbreaker.jpg",          inStock: false },
]

export const menCategories = ["Training", "Footwear", "Bottoms", "Outerwear"]
export const menSizes = ["S", "M", "L", "XL", "XXL", "8", "9", "10", "11", "12"]
export const menColors = ["Black", "White", "Red", "Blue", "Gray", "Navy"]
