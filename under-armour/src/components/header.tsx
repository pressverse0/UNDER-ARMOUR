import { Shield, Menu, X, ShoppingCart, Heart, User, Search, ChevronDown, Tag, Sparkles } from "lucide-react"
import { Link } from "wouter"
import { useState, useRef, useEffect } from "react"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import CartSidebar from "./cart-sidebar"
import WishlistSidebar from "./wishlist-sidebar"
import AnnouncementBanner from "./announcement-banner"
import { navLinks, supportLinks } from "@/data/navigation"

import type { ActivePage } from "@/types/ui"

interface HeaderProps {
  activePage?: ActivePage
}

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
      <header className="bg-black sticky top-0 z-40 shadow-xl" role="banner">

        {/* ── NAV 1: Logo + Brand left | Action icons right ── */}
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">

              {/* Logo & Brand */}
              <Link
                href="/"
                className="flex items-center gap-2.5 flex-shrink-0 group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="bg-red-600 rounded-xl p-1.5 group-hover:bg-red-500 transition-colors">
                  <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <span className="text-white text-lg lg:text-xl font-black tracking-widest uppercase">
                  Under Armour
                </span>
              </Link>

              {/* Right: Search + Icons */}
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Search */}
                {searchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center gap-1">
                    <div className="flex items-center bg-gray-900 border border-gray-700 rounded-full px-4 py-1.5 focus-within:border-red-600 transition-colors">
                      <Search className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <input
                        ref={searchRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search gear..."
                        className="bg-transparent text-white text-sm font-bold w-28 sm:w-44 focus:outline-none placeholder:text-gray-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => { setSearchOpen(false); setSearchQuery("") }}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-gray-900"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="text-gray-300 hover:text-white hover:bg-gray-800 transition-colors p-2 rounded-full"
                    aria-label="Search"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                )}

                {/* Wishlist */}
                <button
                  onClick={() => { setWishlistOpen(!wishlistOpen); setCartOpen(false) }}
                  className="text-gray-300 hover:text-white hover:bg-gray-800 transition-colors relative p-2 rounded-full cursor-pointer"
                  aria-label={`Wishlist (${wishlistCount} items)`}
                  type="button"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 bg-red-600 text-white text-xs font-black rounded-full h-4 w-4 flex items-center justify-center">
                      {wishlistCount > 9 ? '9+' : wishlistCount}
                    </span>
                  )}
                </button>

                {/* Cart */}
                <button
                  onClick={() => { setCartOpen(!cartOpen); setWishlistOpen(false) }}
                  className="text-gray-300 hover:text-white hover:bg-gray-800 transition-colors relative p-2 rounded-full cursor-pointer"
                  aria-label={`Shopping cart (${cartCount} items)`}
                  type="button"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 bg-red-600 text-white text-xs font-black rounded-full h-4 w-4 flex items-center justify-center">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </button>

                {/* Account */}
                <Link
                  href="/account"
                  className="hidden sm:flex text-gray-300 hover:text-white hover:bg-gray-800 transition-colors p-2 rounded-full"
                  aria-label="Account"
                >
                  <User className="h-5 w-5" />
                </Link>

                {/* Mobile hamburger */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden text-white hover:text-red-500 hover:bg-gray-800 transition-colors p-2 rounded-full"
                  aria-label="Toggle mobile menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── NAV 2: Main links centered (desktop only) ── */}
        <nav
          className="hidden lg:block bg-black border-b-2 border-red-600"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-center gap-1">

              {navLinks.map((nav) => (
                <div
                  key={nav.key}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(nav.key)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    href={nav.href}
                    className={`flex items-center gap-0.5 font-black uppercase tracking-wide text-xs px-4 py-2 rounded-full transition-all duration-200 ${
                      activePage === nav.key
                        ? 'bg-red-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {nav.label}
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${openDropdown === nav.key ? 'rotate-180' : ''}`} />
                  </Link>

                  {openDropdown === nav.key && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-44 bg-white rounded-xl border border-gray-200 shadow-2xl z-50 overflow-hidden"
                      onMouseEnter={() => handleDropdownEnter(nav.key)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {nav.dropdown.map((item, idx) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={`block px-4 py-2.5 text-sm font-bold text-gray-800 hover:bg-red-600 hover:text-white transition-colors ${idx < nav.dropdown.length - 1 ? 'border-b border-gray-100' : ''}`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Support dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('support')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={`flex items-center gap-0.5 font-black uppercase tracking-wide text-xs px-4 py-2 rounded-full transition-all duration-200 text-gray-300 hover:bg-gray-800 hover:text-white`}
                >
                  Support
                  <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${openDropdown === 'support' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'support' && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-44 bg-white rounded-xl border border-gray-200 shadow-2xl z-50 overflow-hidden"
                    onMouseEnter={() => handleDropdownEnter('support')}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {supportLinks.map((item, idx) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-2.5 text-sm font-bold text-gray-800 hover:bg-red-600 hover:text-white transition-colors ${idx < supportLinks.length - 1 ? 'border-b border-gray-100' : ''}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Sale */}
              <Link
                href="/sale"
                className={`flex items-center gap-1.5 font-black uppercase tracking-wide text-xs px-4 py-2 rounded-full transition-all duration-200 ${
                  activePage === 'sale'
                    ? 'bg-red-600 text-white'
                    : 'text-red-400 hover:bg-red-600 hover:text-white'
                }`}
              >
                <Tag className="h-3 w-3" /> Sale
              </Link>

              {/* New Arrivals */}
              <Link
                href="/new-arrivals"
                className={`flex items-center gap-1.5 font-black uppercase tracking-wide text-xs px-4 py-2 rounded-full transition-all duration-200 ${
                  activePage === 'new-arrivals'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Sparkles className="h-3 w-3" /> New
              </Link>

            </div>
          </div>
        </nav>

        {/* ── Mobile Navigation ── */}
        {mobileMenuOpen && (
          <nav
            className="lg:hidden bg-gray-950 border-t border-gray-800 max-h-[80vh] overflow-y-auto"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((nav) => (
                <Link
                  key={nav.key}
                  href={nav.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-black uppercase tracking-wide text-base py-2.5 px-4 rounded-xl transition-colors ${
                    activePage === nav.key
                      ? 'text-white bg-red-600'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {nav.label}
                </Link>
              ))}
              <div className="border-t border-gray-800 pt-3 mt-3 space-y-1">
                <Link
                  href="/sale"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 font-black uppercase tracking-wide text-base py-2.5 px-4 rounded-xl transition-colors ${
                    activePage === 'sale' ? 'bg-red-600 text-white' : 'text-red-400 hover:bg-gray-800 hover:text-red-300'
                  }`}
                >
                  <Tag className="h-4 w-4" /> Sale
                </Link>
                <Link
                  href="/new-arrivals"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 font-black uppercase tracking-wide text-base py-2.5 px-4 rounded-xl transition-colors ${
                    activePage === 'new-arrivals' ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Sparkles className="h-4 w-4" /> New Arrivals
                </Link>
                <button
                  onClick={() => setSupportMobileOpen(!supportMobileOpen)}
                  className="w-full text-left flex items-center justify-between text-gray-300 font-black uppercase tracking-wide text-base py-2.5 px-4 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Support <ChevronDown className={`h-4 w-4 transition-transform ${supportMobileOpen ? 'rotate-180' : ''}`} />
                </button>
                {supportMobileOpen && (
                  <div className="pl-4 space-y-1 pb-2">
                    {supportLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-400 hover:text-white font-bold text-sm py-2 px-4 rounded-lg uppercase tracking-wide hover:bg-gray-800 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-gray-300 font-black uppercase tracking-wide text-base py-2.5 px-4 rounded-xl hover:bg-gray-800 hover:text-white transition-colors sm:hidden"
                >
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
