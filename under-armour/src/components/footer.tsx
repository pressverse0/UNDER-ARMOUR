import { Shield, Instagram, Twitter, Facebook, Youtube } from "lucide-react"
import { Link } from "wouter"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 border-t-4 border-red-600" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-red-600" aria-hidden="true" />
              <span className="text-white text-xl font-black tracking-wider">UNDER ARMOUR</span>
            </div>
            <p className="text-gray-400 font-bold mb-6 max-w-xs">Empowering athletes to push beyond limits since 1996. Built to make you better.</p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Facebook, label: "Facebook" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors rounded"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Products */}
          <nav aria-label="Products navigation">
            <h3 className="font-black text-white uppercase mb-4 tracking-wide text-sm">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/men" className="text-gray-400 hover:text-red-600 font-bold transition-colors text-sm">Men</Link></li>
              <li><Link href="/women" className="text-gray-400 hover:text-red-600 font-bold transition-colors text-sm">Women</Link></li>
              <li><Link href="/kids" className="text-gray-400 hover:text-red-600 font-bold transition-colors text-sm">Kids</Link></li>
              <li><Link href="/shoes" className="text-gray-400 hover:text-red-600 font-bold transition-colors text-sm">Shoes</Link></li>
              <li><Link href="/accessories" className="text-gray-400 hover:text-red-600 font-bold transition-colors text-sm">Accessories</Link></li>
              <li><Link href="/new-arrivals" className="text-gray-400 hover:text-red-600 font-bold transition-colors text-sm flex items-center gap-1">✦ New Arrivals</Link></li>
              <li><Link href="/sale" className="text-red-400 hover:text-red-300 font-bold transition-colors text-sm flex items-center gap-1">🔖 Sale</Link></li>
            </ul>
          </nav>

          {/* Sports */}
          <nav aria-label="Sports navigation">
            <h3 className="font-black text-white uppercase mb-4 tracking-wide text-sm">Sports</h3>
            <ul className="space-y-2">
              <li><Link href="/sports/basketball" className="text-gray-400 hover:text-red-600 font-bold transition-colors text-sm">Basketball</Link></li>
              <li><Link href="/sports/football" className="text-gray-400 hover:text-red-600 font-bold transition-colors text-sm">Football</Link></li>
              <li><Link href="/sports/running" className="text-gray-400 hover:text-red-600 font-bold transition-colors text-sm">Running</Link></li>
              <li><Link href="/sports/training" className="text-gray-400 hover:text-red-600 font-bold transition-colors text-sm">Training</Link></li>
              <li><Link href="/sports/golf" className="text-gray-400 hover:text-red-600 font-bold transition-colors text-sm">Golf</Link></li>
              <li><Link href="/sports" className="text-gray-400 hover:text-red-600 font-bold transition-colors text-sm">All Sports</Link></li>
            </ul>
          </nav>

          {/* Support */}
          <nav aria-label="Support navigation">
            <h3 className="font-black text-white uppercase mb-4 tracking-wide text-sm">Help</h3>
            <ul className="space-y-2">
              <li><Link href="/track-order" className="text-gray-400 hover:text-red-600 font-bold transition-colors text-sm">Track Order</Link></li>
              <li><Link href="/support/shipping" className="text-gray-400 hover:text-red-600 font-bold transition-colors text-sm">Shipping Info</Link></li>
              <li><Link href="/support/returns" className="text-gray-400 hover:text-red-600 font-bold transition-colors text-sm">Returns</Link></li>
              <li><Link href="/support/size-guide" className="text-gray-400 hover:text-red-600 font-bold transition-colors text-sm">Size Guide</Link></li>
              <li><Link href="/support/faq" className="text-gray-400 hover:text-red-600 font-bold transition-colors text-sm">FAQ</Link></li>
              <li><Link href="/support/contact" className="text-gray-400 hover:text-red-600 font-bold transition-colors text-sm">Contact Us</Link></li>
              <li><Link href="/account" className="text-gray-400 hover:text-red-600 font-bold transition-colors text-sm">My Account</Link></li>
            </ul>
          </nav>
        </div>

        {/* Free Shipping Banner */}
        <div className="bg-gray-800 border border-gray-700 px-6 py-3 rounded mb-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm font-bold text-gray-300">
            🚚 <strong className="text-white">Free standard shipping</strong> on all orders over $50
          </p>
          <p className="text-sm font-bold text-gray-300">
            🔄 <strong className="text-white">Free returns</strong> within 60 days
          </p>
          <p className="text-sm font-bold text-gray-300">
            🔒 <strong className="text-white">Secure checkout</strong> guaranteed
          </p>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 font-bold text-sm">
            © 2021–{new Date().getFullYear()} Under Armour, Inc. All rights reserved. Protect This House.
          </p>
          <div className="flex gap-4">
            <Link href="/support/contact" className="text-gray-600 hover:text-gray-400 text-xs font-bold transition-colors uppercase">Privacy</Link>
            <Link href="/support/contact" className="text-gray-600 hover:text-gray-400 text-xs font-bold transition-colors uppercase">Terms</Link>
            <Link href="/support/contact" className="text-gray-600 hover:text-gray-400 text-xs font-bold transition-colors uppercase">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
