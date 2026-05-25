import type { ActivePage } from "@/types/ui"

export interface NavDropdownItem {
  label: string
  href: string
}

export interface NavLink {
  label: string
  href: string
  key: ActivePage
  dropdown: NavDropdownItem[]
}

export interface SupportLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  {
    label: "Men", href: "/men", key: "men",
    dropdown: [
      { label: "Training", href: "/men" },
      { label: "Footwear", href: "/men" },
      { label: "Bottoms", href: "/men" },
      { label: "Outerwear", href: "/men" },
    ],
  },
  {
    label: "Women", href: "/women", key: "women",
    dropdown: [
      { label: "Sports Bras", href: "/women" },
      { label: "Tops", href: "/women" },
      { label: "Bottoms", href: "/women" },
      { label: "Footwear", href: "/women" },
    ],
  },
  {
    label: "Shoes", href: "/shoes", key: "shoes",
    dropdown: [
      { label: "Running", href: "/shoes" },
      { label: "Training", href: "/shoes" },
      { label: "Basketball", href: "/shoes" },
      { label: "All Shoes", href: "/shoes" },
    ],
  },
  {
    label: "Sports", href: "/sports", key: "sports",
    dropdown: [
      { label: "Basketball", href: "/sports/basketball" },
      { label: "Football", href: "/sports/football" },
      { label: "Running", href: "/sports/running" },
      { label: "Training", href: "/sports/training" },
      { label: "Golf", href: "/sports/golf" },
    ],
  },
  {
    label: "Kids", href: "/kids", key: "kids",
    dropdown: [
      { label: "Boys", href: "/kids" },
      { label: "Girls", href: "/kids" },
      { label: "Unisex", href: "/kids" },
    ],
  },
  {
    label: "Accessories", href: "/accessories", key: "accessories",
    dropdown: [
      { label: "Bags", href: "/accessories" },
      { label: "Headwear", href: "/accessories" },
      { label: "Socks", href: "/accessories" },
      { label: "Hydration", href: "/accessories" },
    ],
  },
]

export const supportLinks: SupportLink[] = [
  { label: "FAQ", href: "/support/faq" },
  { label: "Shipping", href: "/support/shipping" },
  { label: "Returns", href: "/support/returns" },
  { label: "Size Guide", href: "/support/size-guide" },
  { label: "Track Order", href: "/track-order" },
  { label: "Contact Us", href: "/support/contact" },
]
