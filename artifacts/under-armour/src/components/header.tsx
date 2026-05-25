import { Shield, Menu, X, ShoppingCart, Heart, User, Search, ChevronDown, Tag, Sparkles } from "lucide-react"
import { Link } from "wouter"
import { useState, useRef, useEffect } from "react"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import CartSidebar from "./cart-sidebar"
import WishlistSidebar from "./wishlist-sidebar"
import AnnouncementBanner from "./announcement-banner"

import type { ActivePage } from "@/types/ui"

interface HeaderProps {
  activePage?: ActivePage
}

const navLinks = [
  {
    label: "Men", href: "/men", key: "men" as ActivePage,
    dropdown: [
      { label: "Training", href: "/men" },
      { label: "Footwear", href: "/men" },
      { label: "Bottoms", href: "/men" },
      { label: "Outerwear", href: "/men" },
    ],
  },
  {
    label: "Women", href: "/women", key: "women" as ActivePage,
    dropdown: [
      { label: "Sports Bras", href: "/women" },
      { label: "Tops", href: "/women" },
      { label: "Bottoms", href: "/women" },
      { label: "Footwear", href: "/women" },
    ],
  },
  {
    label: "Shoes", href: "/shoes", key: "shoes" as ActivePage,
    dropdown: [
      { label: "Running", href: "/shoes" },
      { label: "Training", href: "/shoes" },
      { label: "Basketball", href: "/shoes" },
      { label: "All Shoes", href: "/shoes" },
    ],
  },
  {
    label: "Sports", href: "/sports", key: "sports" as ActivePage,
    dropdown: [
      { label: "Basketball", href: "/sports/basketball" },
      { label: "Football", href: "/sports/football" },
      { label: "Running", href: "/sports/running" },
      { label: "Training", href: "/sports/training" },
      { label: "Golf", href: "/sports/golf" },
    ],
  },
  {
    label: "Kids", href: "/kids", key: "kids" as ActivePage,
    dropdown: [
      { label: "Boys", href: "/kids" },
      { label: "Girls", href: "/kids" },
      { label: "Unisex", href: "/kids" },
    ],
  },
  {
    label: "Accessories", href: "/accessories", key: "accessories" as ActivePage,
    dropdown: [
      { label: "Bags", href: "/accessories" },
      { label: "Headwear", href: "/accessories" },
      { label: "Socks", href: "/accessories" },
      { label: "Hydration", href: "/accessories" },
    ],
  },
]

const supportLinks = [
  { label: "FAQ", href: "/support/faq" },
  { label: "Shipping", href: "/support/shipping" },
  { label: "Returns", href: "/support/returns" },
  { label: "Size Guide", href: "/support/size-guide" },
  { label: "Track Order", href: "/track-order" },
  { label: "Contact Us", href: "/support/contact" },
]

export default function Header({ activePage = 'home' }: HeaderProps) {
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [supportMobileOpen, setSupportMobileOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  const handleDropdownEnter = (key: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setOpenDropdown(key)
  }
  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchOpen(false)
    setSearchQuery("")
  }

  return (
    <>
      <AnnouncementBanner />
      <header className="bg-black border-b-4 border-red-600 sticky top-0 z-40" role="banner">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-2">

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0" onClick={() => setMobileMenuOpen(false)}>
              <Shield className="h-8 w-8 text-red-600" aria-hidden="true" />
              <span className="text-white text-lg lg:text-2xl font-black tracking-wider">UNDER ARMOUR</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-0" role="navigation" aria-label="Main navigation">
              {navLinks.map((nav) => (
                <div
                  key={nav.key}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(nav.key)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    href={nav.href}
                    className={`flex items-center gap-0.5 font-black uppercase tracking-wide text-sm px-3 py-2 transition-colors ${
                      activePage === nav.key ? 'text-red-600' : 'text-gray-300 hover:text-red-600'
                    }`}
                  >
                    {nav.label}
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${openDropdown === nav.key ? 'rotate-180' : ''}`} />
                  </Link>
                  {openDropdown === nav.key && (
                    <div
                      className="absolute top-full left-0 mt-1 w-44 bg-white border-4 border-black shadow-2xl z-50"
                      onMouseEnter={() => handleDropdownEnter(nav.key)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {nav.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm font-black uppercase text-gray-800 hover:bg-red-600 hover:text-white transition-colors border-b border-gray-100 last:border-0"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Support Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('support')}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="flex items-center gap-0.5 font-black uppercase tracking-wide text-sm px-3 py-2 transition-colors text-gray-300 hover:text-red-600">
                  Support
                  <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${openDropdown === 'support' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'support' && (
                  <div
                    className="absolute top-full left-0 mt-1 w-44 bg-white border-4 border-black shadow-2xl z-50"
                    onMouseEnter={() => handleDropdownEnter('support')}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {supportLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm font-black uppercase text-gray-800 hover:bg-red-600 hover:text-white transition-colors border-b border-gray-100 last:border-0"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/sale"
                className={`flex items-center gap-1 font-black uppercase tracking-wide text-sm px-3 py-2 transition-colors ${
                  activePage === 'sale' ? 'text-red-600' : 'text-red-400 hover:text-red-300'
                }`}
              >
                <Tag className="h-3.5 w-3.5" /> Sale
              </Link>
              <Link
                href="/new-arrivals"
                className={`flex items-center gap-1 font-black uppercase tracking-wide text-sm px-3 py-2 transition-colors ${
                  activePage === 'new-arrivals' ? 'text-red-600' : 'text-gray-300 hover:text-red-600'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" /> New
              </Link>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search gear..."
                    className="bg-gray-900 text-white border-2 border-red-600 px-3 py-1.5 text-sm font-bold w-32 sm:w-44 focus:outline-none"
                  />
                  <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery("") }} className="text-gray-400 hover:text-red-600 transition-colors ml-1">
                    <X className="h-5 w-5" />
                  </button>
                </form>
              ) : (
                <button onClick={() => setSearchOpen(true)} className="text-gray-300 hover:text-red-600 transition-colors" aria-label="Search">
                  <Search className="h-5 w-5" />
                </button>
              )}

              <button
                onClick={() => { setWishlistOpen(!wishlistOpen); setCartOpen(false) }}
                className="text-gray-300 hover:text-red-600 transition-colors relative cursor-pointer"
                aria-label={`Wishlist (${wishlistCount} items)`}
                type="button"
              >
                <Heart className="h-6 w-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-black rounded-full h-4 w-4 flex items-center justify-center">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => { setCartOpen(!cartOpen); setWishlistOpen(false) }}
                className="text-gray-300 hover:text-red-600 transition-colors relative cursor-pointer"
                aria-label={`Shopping cart (${cartCount} items)`}
                type="button"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-black rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              <Link href="/account" className="hidden sm:flex text-gray-300 hover:text-red-600 transition-colors" aria-label="Account">
                <User className="h-6 w-6" />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-white hover:text-red-600 transition-colors p-1"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden bg-gray-950 border-t-2 border-red-600 max-h-[80vh] overflow-y-auto" role="navigation" aria-label="Mobile navigation">
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((nav) => (
                <Link
                  key={nav.key}
                  href={nav.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-black uppercase tracking-wide text-lg py-2 px-4 rounded transition-colors ${
                    activePage === nav.key ? 'text-red-600 bg-gray-900' : 'text-gray-300 hover:text-red-600 hover:bg-gray-900'
                  }`}
                >
                  {nav.label}
                </Link>
              ))}
              <div className="border-t border-gray-800 pt-3 mt-3 space-y-1">
                <Link href="/sale" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-red-400 font-black uppercase tracking-wide text-lg py-2 px-4 rounded hover:bg-gray-900 transition-colors">
                  <Tag className="h-4 w-4" /> Sale
                </Link>
                <Link href="/new-arrivals" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-gray-300 font-black uppercase tracking-wide text-lg py-2 px-4 rounded hover:bg-gray-900 transition-colors">
                  <Sparkles className="h-4 w-4" /> New Arrivals
                </Link>
                <button
                  onClick={() => setSupportMobileOpen(!supportMobileOpen)}
                  className="w-full text-left flex items-center justify-between text-gray-300 font-black uppercase tracking-wide text-lg py-2 px-4 rounded hover:bg-gray-900 transition-colors"
                >
                  Support <ChevronDown className={`h-4 w-4 transition-transform ${supportMobileOpen ? 'rotate-180' : ''}`} />
                </button>
                {supportMobileOpen && (
                  <div className="pl-6 space-y-1 pb-2">
                    {supportLinks.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block text-gray-400 hover:text-red-600 font-bold text-sm py-1.5 px-4 uppercase tracking-wide transition-colors">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
                <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-gray-300 font-black uppercase tracking-wide text-lg py-2 px-4 rounded hover:bg-gray-900 transition-colors sm:hidden">
                  <User className="h-5 w-5" /> Account
                </Link>
              </div>
            </div>
          </nav>
        )}

        <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        <WishlistSidebar isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />
      </header>
    </>
  )
}
