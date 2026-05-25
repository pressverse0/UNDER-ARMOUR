import type { AccessoryProduct } from "@/types/product"

export const accessoryProducts: AccessoryProduct[] = [
  { id: 401, name: "Project Rock Gym Bag",      price: 75,  category: "Bags",        rating: 4.8, reviews: 234, image: "/ARMOUR/ProjectRockGymBag.jpg",           inStock: true,  isNew: true,  description: "Built for champions, by champions. 42L capacity." },
  { id: 402, name: "UA Blitzing Cap",           price: 25,  category: "Headwear",    rating: 4.5, reviews: 167, image: "/ARMOUR/HeatGear Training Shirt.jpg",      inStock: true,                description: "Stretch-fit cap with moisture-wicking sweatband" },
  { id: 403, name: "Training Gloves Pro",       price: 35,  originalPrice: 45,  category: "Gloves",      rating: 4.4, reviews: 88,  image: "/ARMOUR/Project Rock Tank.jpg",           inStock: true,  isSale: true, description: "Grip-enhanced gloves with palm protection" },
  { id: 404, name: "Storm Laptop Backpack",     price: 65,  category: "Bags",        rating: 4.6, reviews: 143, image: "/ARMOUR/Sportstyle Jacket.jpg",            inStock: true,                description: "Water-resistant 20L backpack for work & gym" },
  { id: 405, name: "Performance Socks 6-Pack", price: 28,  category: "Socks",       rating: 4.7, reviews: 312, image: "/ARMOUR/HeatGearCompressionShirt.jpg",     inStock: true,                description: "Arch support and blister protection built in" },
  { id: 406, name: "UA 32oz Squeeze Bottle",   price: 18,  category: "Hydration",   rating: 4.3, reviews: 56,  image: "/ARMOUR/HOVRPhantom3.jpg",                 inStock: true,                description: "Leak-proof sports bottle with wide mouth" },
  { id: 407, name: "HOVR Running Belt",         price: 30,  category: "Accessories", rating: 4.5, reviews: 79,  image: "/ARMOUR/UA RUSH Training Pants.jpg",       inStock: true,  isNew: true,  description: "Secure belt for hands-free running storage" },
  { id: 408, name: "Undeniable 5.0 Duffle Bag",price: 55,  category: "Bags",        rating: 4.7, reviews: 198, image: "/ARMOUR/Storm Windbreaker.jpg",             inStock: true,                description: "D-shaped lid & vented shoe pocket" },
  { id: 409, name: "Liner Socks 3-Pack",        price: 14,  originalPrice: 18,  category: "Socks",       rating: 4.4, reviews: 224, image: "/ARMOUR/Tech2.0Shorts.jpg",                inStock: true,  isSale: true, description: "No-show design with UA logo on the heel" },
  { id: 410, name: "UA Hustle 5.0 Backpack",   price: 55,  category: "Bags",        rating: 4.8, reviews: 411, image: "/ARMOUR/ColdGear Base Layer.jpg",           inStock: true,                description: '16" laptop sleeve & water-resistant base' },
  { id: 411, name: "Training Headband 2-Pack",  price: 14,  category: "Headwear",    rating: 4.3, reviews: 47,  image: "/ARMOUR/Rival Fleece Hoodie.jpg",           inStock: false,               description: "Keeps sweat out of your eyes during training" },
  { id: 412, name: "UA 24oz Stainless Bottle",  price: 35,  category: "Hydration",   rating: 4.6, reviews: 92,  image: "/ARMOUR/Curry Flow 11.jpg",                 inStock: true,  isNew: true,  description: "Vacuum-insulated keeps drinks cold 24hrs" },
]

export const accessoryCategoryFilters = ["All", "Bags", "Headwear", "Gloves", "Socks", "Hydration", "Accessories"]
