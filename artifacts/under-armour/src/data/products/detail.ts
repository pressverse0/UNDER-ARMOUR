export interface DetailProduct {
  id: number
  name: string
  price: number
  originalPrice?: number
  category: string
  size: string[]
  color: string[]
  rating: number
  reviews: number
  image: string
  description: string
  features: string[]
  inStock: boolean
  gender: string
  technology?: string
}

export const allDetailProducts: DetailProduct[] = [
  {
    id: 1, name: "HeatGear Compression Shirt", price: 35, category: "Training",
    size: ["S","M","L","XL"], color: ["Black","Red","Blue"], rating: 4.5, reviews: 128,
    image: "/ARMOUR/HeatGearCompressionShirt.jpg",
    description: "Stay cool and dry with our advanced HeatGear technology. This compression shirt wicks sweat away from your body and dries incredibly fast.",
    features: ["HeatGear fabric keeps you cool","4-way stretch construction","Anti-odor technology","Moisture-wicking"],
    inStock: true, gender: "Men",
  },
  {
    id: 2, name: "HOVR Phantom 3", price: 140, category: "Footwear",
    size: ["8","9","10","11","12"], color: ["Black","White","Gray"], rating: 4.8, reviews: 256,
    image: "/ARMOUR/HOVRPhantom3.jpg",
    description: "Experience zero-gravity feel with HOVR cushioning technology. Engineered mesh upper provides breathability and support.",
    features: ["HOVR cushioning technology","Engineered mesh upper","Responsive UA HOVR foam","Durable rubber outsole"],
    inStock: true, gender: "Men", technology: "HOVR",
  },
  {
    id: 3, name: "Tech 2.0 Shorts", price: 30, originalPrice: 45, category: "Bottoms",
    size: ["S","M","L","XL"], color: ["Black","Navy","Gray"], rating: 4.3, reviews: 89,
    image: "/ARMOUR/Tech2.0Shorts.jpg",
    description: "Lightweight and breathable training shorts with moisture-wicking fabric. Perfect for any workout.",
    features: ["Ultra-light fabric","Moisture-wicking","Elastic waistband","Side pockets"],
    inStock: true, gender: "Men",
  },
  {
    id: 4, name: "Project Rock Tank", price: 40, category: "Training",
    size: ["M","L","XL","XXL"], color: ["Black","Red"], rating: 4.7, reviews: 203,
    image: "/ARMOUR/Project Rock Tank.jpg",
    description: "Train like the hardest worker in the room. Project Rock performance tank designed for elite training sessions.",
    features: ["HeatGear fabric","Dropped armhole for mobility","Soft fabrication","Anti-odor technology"],
    inStock: true, gender: "Men",
  },
  {
    id: 5, name: "Charged Assert 10", price: 75, category: "Footwear",
    size: ["8","9","10","11","12"], color: ["Black","Blue","Red"], rating: 4.4, reviews: 167,
    image: "/ARMOUR/Charged Assert 10.jpg",
    description: "A durable everyday trainer that delivers incredible cushioning at a great value.",
    features: ["Charged Cushioning® midsole","Lightweight mesh upper","Solid rubber outsole","Breathable design"],
    inStock: true, gender: "Men", technology: "Charged",
  },
  {
    id: 6, name: "Sportstyle Jacket", price: 90, category: "Outerwear",
    size: ["M","L","XL"], color: ["Black","Navy"], rating: 4.6, reviews: 142,
    image: "/ARMOUR/Sportstyle Jacket.jpg",
    description: "Go from the gym to the streets without missing a beat. Sleek sportstyle design meets performance material.",
    features: ["Water-resistant finish","Secure zip pockets","Stretch panels for mobility","Lightweight construction"],
    inStock: true, gender: "Men", isNew: true,
  } as DetailProduct & { isNew?: boolean },
  {
    id: 7, name: "ColdGear Base Layer", price: 55, category: "Training",
    size: ["S","M","L","XL"], color: ["Black","Gray"], rating: 4.5, reviews: 98,
    image: "/ARMOUR/ColdGear Base Layer.jpg",
    description: "A single layer of ColdGear® to keep you warm without the bulk. Soft inner layer traps heat to keep you warm.",
    features: ["ColdGear fabric","Moisture transport system","Anti-odor technology","Fitted cut"],
    inStock: true, gender: "Men",
  },
  {
    id: 8, name: "Rival Fleece Hoodie", price: 50, originalPrice: 65, category: "Outerwear",
    size: ["M","L","XL","XXL"], color: ["Black","Gray","Navy"], rating: 4.7, reviews: 312,
    image: "/ARMOUR/Rival Fleece Hoodie.jpg",
    description: "Softer and more comfortable than ever, the Rival Fleece Hoodie is built for all-day wear.",
    features: ["Rival fleece fabric","Front kangaroo pocket","Ribbed cuffs & hem","Brushed interior"],
    inStock: true, gender: "Men",
  },
  {
    id: 9, name: "UA RUSH Training Pants", price: 70, category: "Bottoms",
    size: ["S","M","L","XL"], color: ["Black","Gray"], rating: 4.6, reviews: 156,
    image: "/ARMOUR/UA RUSH Training Pants.jpg",
    description: "UA RUSH fabric is infused with minerals that absorb and convert the body's energy to help improve performance.",
    features: ["UA RUSH technology","Moisture-wicking","Tapered fit","Side pockets"],
    inStock: true, gender: "Men",
  },
  {
    id: 10, name: "Curry Flow 11", price: 160, category: "Footwear",
    size: ["8","9","10","11","12"], color: ["White","Blue","Black"], rating: 4.9, reviews: 421,
    image: "/ARMOUR/Curry Flow 11.jpg",
    description: "Built for Stephen Curry's unique game — quick cuts, precise ball handling and deep range shooting.",
    features: ["UA Flow outsole","Warp upper for lockdown","Full-length UA Flow cushioning","Lightweight design"],
    inStock: true, gender: "Men", technology: "Flow",
  },
  {
    id: 11, name: "HeatGear Training Shirt", price: 25, category: "Training",
    size: ["S","M","L","XL","XXL"], color: ["Black","White","Red","Blue"], rating: 4.4, reviews: 267,
    image: "/ARMOUR/HeatGear Training Shirt.jpg",
    description: "Ultra-soft HeatGear fabric feels incredibly light and keeps you dry during the toughest training sessions.",
    features: ["HeatGear fabric","4-way stretch","Anti-odor technology","Breathable mesh panels"],
    inStock: true, gender: "Men",
  },
  {
    id: 12, name: "Storm Windbreaker", price: 80, category: "Outerwear",
    size: ["M","L","XL"], color: ["Black","Navy","Red"], rating: 4.5, reviews: 134,
    image: "/ARMOUR/Storm Windbreaker.jpg",
    description: "UA Storm technology repels water without sacrificing breathability, keeping you dry and comfortable.",
    features: ["UA Storm technology","Wind-resistant","Packable design","Reflective details"],
    inStock: false, gender: "Men",
  },
]
