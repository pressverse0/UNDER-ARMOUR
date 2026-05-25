import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"
import { Link } from "wouter"
import StarRating from "./star-rating"

interface ProductCardProps {
  id: number
  name: string
  price: number
  originalPrice?: number
  category: string
  image: string
  inStock: boolean
  isNew?: boolean
  isSale?: boolean
  rating: number
  reviews: number
  description?: string
  imageHeight?: number
  customBadge?: React.ReactNode
  bottomImageBadge?: React.ReactNode
  savingsText?: string
  isWishlisted?: boolean
  cartVariant?: "black" | "red"
  categoryTagVariant?: "red" | "black"
  onAddToCart: (e: React.MouseEvent) => void
  onToggleWishlist: (e: React.MouseEvent) => void
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  category,
  image,
  inStock,
  isNew,
  isSale,
  rating,
  reviews,
  description,
  imageHeight = 200,
  customBadge,
  bottomImageBadge,
  savingsText,
  isWishlisted,
  cartVariant = "black",
  categoryTagVariant = "red",
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <Card className="ua-product-card">
        <CardContent className="p-0 flex flex-col flex-1">
          <div className="ua-card-image-wrap" style={{ height: imageHeight }}>
            <img src={image} alt={name} className="ua-card-image" />

            {customBadge ? (
              <div className="absolute top-3 left-3">{customBadge}</div>
            ) : (isNew || isSale) ? (
              <div className="ua-badge-stack">
                {isNew && <span className="ua-badge ua-badge-new">New</span>}
                {isSale && <span className="ua-badge ua-badge-sale">Sale</span>}
              </div>
            ) : null}

            {!inStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="ua-badge ua-badge-oos text-sm px-4 py-2">Out of Stock</span>
              </div>
            )}

            <button onClick={onToggleWishlist} className="ua-wishlist-btn" aria-label="Toggle wishlist">
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-600 text-red-600" : "text-gray-400"}`} />
            </button>

            {bottomImageBadge && (
              <div className="absolute bottom-2 left-2">{bottomImageBadge}</div>
            )}
          </div>

          <div className="ua-card-body">
            <div className={`sketchy-border ${categoryTagVariant === "black" ? "bg-black" : "bg-red-600"} inline-block px-2 py-0.5 mb-2 self-start`}>
              <span className="ua-category-tag-text">{category}</span>
            </div>
            <h3 className="ua-product-name">{name}</h3>
            {description && <p className="ua-product-desc">{description}</p>}
            <StarRating rating={rating} reviews={reviews} size="sm" />
            <div className="flex items-center gap-2 mb-3 mt-auto">
              <span className="ua-price">${price}</span>
              {originalPrice && <span className="ua-price-orig">${originalPrice}</span>}
            </div>
            {savingsText && <p className="ua-savings-text">{savingsText}</p>}
            <Button
              onClick={onAddToCart}
              disabled={!inStock}
              className={cartVariant === "red" ? "ua-btn-cart-red" : "ua-btn-cart"}
            >
              <ShoppingCart className="h-3.5 w-3.5 mr-1" />
              {inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
