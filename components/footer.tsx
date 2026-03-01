import { Shield } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t-4 border-red-600" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="h-8 w-8 text-red-600" aria-hidden="true" />
              <span className="text-white text-xl font-black tracking-wider">UNDER ARMOUR</span>
            </div>
            <p className="text-gray-400 font-bold">Empowering athletes to push beyond limits since 1996.</p>
          </div>

          <nav aria-label="Products navigation">
            <h3 className="font-black text-white uppercase mb-4 tracking-wide">Products</h3>
            <ul className="space-y-2">
              <li><Link href="/men" className="text-gray-400 hover:text-red-600 font-bold transition-colors">Men</Link></li>
              <li><Link href="/women" className="text-gray-400 hover:text-red-600 font-bold transition-colors">Women</Link></li>
              <li><Link href="/kids" className="text-gray-400 hover:text-red-600 font-bold transition-colors">Kids</Link></li>
              <li><Link href="/shoes" className="text-gray-400 hover:text-red-600 font-bold transition-colors">Shoes</Link></li>
              <li><Link href="/accessories" className="text-gray-400 hover:text-red-600 font-bold transition-colors">Accessories</Link></li>
            </ul>
          </nav>

          <nav aria-label="Sports navigation">
            <h3 className="font-black text-white uppercase mb-4 tracking-wide">Sports</h3>
            <ul className="space-y-2">
              <li><Link href="/sports#basketball" className="text-gray-400 hover:text-red-600 font-bold transition-colors">Basketball</Link></li>
              <li><Link href="/sports#football" className="text-gray-400 hover:text-red-600 font-bold transition-colors">Football</Link></li>
              <li><Link href="/sports#running" className="text-gray-400 hover:text-red-600 font-bold transition-colors">Running</Link></li>
              <li><Link href="/sports#training" className="text-gray-400 hover:text-red-600 font-bold transition-colors">Training</Link></li>
              <li><Link href="/sports#golf" className="text-gray-400 hover:text-red-600 font-bold transition-colors">Golf</Link></li>
            </ul>
          </nav>

          <nav aria-label="Support navigation">
            <h3 className="font-black text-white uppercase mb-4 tracking-wide">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/support/size-guide" className="text-gray-400 hover:text-red-600 font-bold transition-colors">Size Guide</Link></li>
              <li><Link href="/support/returns" className="text-gray-400 hover:text-red-600 font-bold transition-colors">Returns</Link></li>
              <li><Link href="/support/shipping" className="text-gray-400 hover:text-red-600 font-bold transition-colors">Shipping</Link></li>
              <li><Link href="/support/contact" className="text-gray-400 hover:text-red-600 font-bold transition-colors">Contact</Link></li>
              <li><Link href="/support/faq" className="text-gray-400 hover:text-red-600 font-bold transition-colors">FAQ</Link></li>
            </ul>
          </nav>
        </div>

        <div className="sketchy-divider-horizontal bg-red-600 h-1 my-8" aria-hidden="true"></div>

        <div className="text-center">
          <p className="text-gray-400 font-bold">
            © 2021 - {new Date().getFullYear()} Under Armour, Inc By{' '}
            <a 
              href="https://m-said-portfolio.netlify.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-500 transition-colors underline"
            >
              M.Said
            </a>
            . All rights reserved. Protect This House.
          </p>
        </div>
      </div>
    </footer>
  )
}
