'use client'

import { Shield, Menu, X, ShoppingCart, Heart, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import CartSidebar from "./cart-sidebar"
import WishlistSidebar from "./wishlist-sidebar"

interface HeaderProps {
  activePage?: 'men' | 'women' | 'shoes' | 'sports' | 'home'
}

export default function Header({ activePage = 'home' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const toggleCart = () => {
    setCartOpen(!cartOpen)
    setWishlistOpen(false) // Close wishlist when opening cart
  }

  const closeCart = () => {
    setCartOpen(false)
  }

  const toggleWishlist = () => {
    setWishlistOpen(!wishlistOpen)
    setCartOpen(false) // Close cart when opening wishlist
  }

  const closeWishlist = () => {
    setWishlistOpen(false)
  }

  return (
    <header className="bg-black border-b-4 border-red-600 sketchy-border" role="banner">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <Shield className="h-8 w-8 text-red-600" aria-hidden="true" />
            <span className="text-white text-2xl font-black tracking-wider">UNDER ARMOUR</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
            <Link
              href="/men"
              className={`font-bold uppercase tracking-wide transition-colors ${
                activePage === 'men' 
                  ? 'text-red-600 hover:text-red-500' 
                  : 'text-gray-300 hover:text-red-600'
              }`}
            >
              Men
            </Link>
            <Link
              href="/women"
              className={`font-bold uppercase tracking-wide transition-colors ${
                activePage === 'women' 
                  ? 'text-red-600 hover:text-red-500' 
                  : 'text-gray-300 hover:text-red-600'
              }`}
            >
              Women
            </Link>
            <Link
              href="/shoes"
              className={`font-bold uppercase tracking-wide transition-colors ${
                activePage === 'shoes' 
                  ? 'text-red-600 hover:text-red-500' 
                  : 'text-gray-300 hover:text-red-600'
              }`}
            >
              Shoes
            </Link>
            <Link
              href="/sports"
              className={`font-bold uppercase tracking-wide transition-colors ${
                activePage === 'sports' 
                  ? 'text-red-600 hover:text-red-500' 
                  : 'text-gray-300 hover:text-red-600'
              }`}
            >
              Sports
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist Icon */}
            <button
              onClick={toggleWishlist}
              className="text-gray-300 hover:text-red-600 transition-colors relative group"
              aria-label="Wishlist"
            >
              <Heart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-black rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Cart Icon */}
            <button
              onClick={toggleCart}
              className="text-gray-300 hover:text-red-600 transition-colors relative group"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-black rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </button>

            {/* User Avatar */}
            <Link 
              href="/account" 
              className="hidden sm:flex text-gray-300 hover:text-red-600 transition-colors"
              aria-label="User account"
            >
              <User className="h-6 w-6" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white hover:text-red-600 transition-colors p-2"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <nav 
            className="md:hidden mt-4 pb-4 border-t-2 border-red-600 pt-4 animate-fadeInUp"
            role="navigation" 
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col space-y-4">
              <Link
                href="/men"
                onClick={closeMobileMenu}
                className={`font-bold uppercase tracking-wide transition-colors text-lg py-2 px-4 rounded sketchy-border ${
                  activePage === 'men' 
                    ? 'text-red-600 bg-gray-900' 
                    : 'text-gray-300 hover:text-red-600 hover:bg-gray-900'
                }`}
              >
                Men
              </Link>
              <Link
                href="/women"
                onClick={closeMobileMenu}
                className={`font-bold uppercase tracking-wide transition-colors text-lg py-2 px-4 rounded sketchy-border ${
                  activePage === 'women' 
                    ? 'text-red-600 bg-gray-900' 
                    : 'text-gray-300 hover:text-red-600 hover:bg-gray-900'
                }`}
              >
                Women
              </Link>
              <Link
                href="/shoes"
                onClick={closeMobileMenu}
                className={`font-bold uppercase tracking-wide transition-colors text-lg py-2 px-4 rounded sketchy-border ${
                  activePage === 'shoes' 
                    ? 'text-red-600 bg-gray-900' 
                    : 'text-gray-300 hover:text-red-600 hover:bg-gray-900'
                }`}
              >
                Shoes
              </Link>
              <Link
                href="/sports"
                onClick={closeMobileMenu}
                className={`font-bold uppercase tracking-wide transition-colors text-lg py-2 px-4 rounded sketchy-border ${
                  activePage === 'sports' 
                    ? 'text-red-600 bg-gray-900' 
                    : 'text-gray-300 hover:text-red-600 hover:bg-gray-900'
                }`}
              >
                Sports
              </Link>

              {/* Mobile Account Link */}
              <Link
                href="/account"
                onClick={closeMobileMenu}
                className="flex items-center space-x-2 font-bold uppercase tracking-wide transition-colors text-lg py-2 px-4 rounded sketchy-border text-gray-300 hover:text-red-600 hover:bg-gray-900 sm:hidden"
              >
                <User className="h-5 w-5" />
                <span>Account</span>
              </Link>
            </div>
          </nav>
        )}
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={closeCart} />

      {/* Wishlist Sidebar */}
      <WishlistSidebar isOpen={wishlistOpen} onClose={closeWishlist} />
    </header>
  )
}
