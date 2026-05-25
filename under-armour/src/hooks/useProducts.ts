import { useState, useEffect } from 'react'

export interface ApiProduct {
  id: number
  name: string
  slug: string
  description: string
  price: number
  original_price: number | null
  category: { id: number; name: string; slug: string }
  image: string
  images: string[] | string
  rating: number
  reviews_count: number
  gender: string | null
  technology: string | null
  is_new: boolean
  is_sale: boolean
  discount_percentage: number | null
  variants: { id: number; size: string; color: string; stock_quantity: number; sku: string; in_stock: boolean }[]
  in_stock: boolean
}

export interface FrontendProduct {
  id: number
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  category: string
  image: string
  rating: number
  reviews: number
  gender?: string
  technology?: string
  isNew: boolean
  isSale: boolean
  discount?: number
  inStock: boolean
  size: string[]
  color: string[]
}

export function adaptProduct(p: ApiProduct): FrontendProduct {
  const variants = Array.isArray(p.variants) ? p.variants : []
  const sizes = [...new Set(variants.map(v => v.size).filter(Boolean))]
  const colors = [...new Set(variants.map(v => v.color).filter(Boolean))]
  return {
    id: p.id,
    name: p.name ?? '',
    slug: p.slug ?? '',
    description: p.description ?? '',
    price: Number(p.price) || 0,
    originalPrice: p.original_price ? Number(p.original_price) : undefined,
    category: p.category?.name ?? '',
    image: p.image ?? '',
    rating: Number(p.rating) || 0,
    reviews: p.reviews_count ?? 0,
    gender: p.gender ?? undefined,
    technology: p.technology ?? undefined,
    isNew: Boolean(p.is_new),
    isSale: Boolean(p.is_sale),
    discount: p.discount_percentage ?? undefined,
    inStock: Boolean(p.in_stock),
    size: sizes,
    color: colors,
  }
}

interface UseProductsOptions {
  filter?: 'new' | 'sale' | 'all'
  limit?: number
  gender?: string
  categoryId?: number
  perPage?: number
  search?: string
}

interface ApiResponse {
  data: ApiProduct[]
  meta?: { total: number; last_page: number; current_page: number }
}

export function useProducts(options: UseProductsOptions = {}) {
  const { filter, limit, gender, categoryId, perPage = 20, search } = options
  const [products, setProducts] = useState<FrontendProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setLoading(true)
    setError(null)

    let url = '/api/products'
    const params = new URLSearchParams()

    if (filter === 'new') {
      url = '/api/products/new-arrivals'
      if (limit) params.set('limit', String(limit))
    } else if (filter === 'sale') {
      url = '/api/products/sale'
      if (limit) params.set('limit', String(limit))
    } else {
      if (gender) params.set('gender', gender)
      if (categoryId) params.set('category_id', String(categoryId))
      if (search) params.set('search', search)
      params.set('per_page', String(perPage))
    }

    const qs = params.toString()
    const fullUrl = qs ? `${url}?${qs}` : url

    fetch(fullUrl)
      .then(r => r.json())
      .then((res: ApiResponse | ApiProduct[]) => {
        const items = Array.isArray(res) ? res : (res.data ?? [])
        const meta = !Array.isArray(res) ? res.meta : undefined
        setProducts(items.map(adaptProduct))
        setTotal(meta?.total ?? items.length)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [filter, limit, gender, categoryId, perPage, search])

  return { products, loading, error, total }
}
