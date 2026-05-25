export interface BaseProduct {
  id: number
  name: string
  price: number
  originalPrice?: number
  category: string
  rating: number
  reviews: number
  image: string
  isNew?: boolean
  isSale?: boolean
  inStock: boolean
}

export interface Product extends BaseProduct {
  size: string[]
  color: string[]
  gender?: string
  technology?: string
  description?: string
}

export interface KidsProduct extends BaseProduct {
  gender: "Boys" | "Girls" | "Unisex"
  ages: string
  description: string
}

export interface AccessoryProduct extends BaseProduct {
  description: string
}

export interface SaleProduct extends BaseProduct {
  discount: number
}

export interface NewArrivalProduct extends BaseProduct {
  arrivedWeeks: number
}
