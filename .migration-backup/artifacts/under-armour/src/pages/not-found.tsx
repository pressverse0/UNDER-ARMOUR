import { Home, Search, AlertTriangle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import { useEffect, useState } from 'react'
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-100">
        <section className="relative bg-black text-white py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90" />
            <div className="absolute top-10 left-10 w-32 h-32 bg-red-600 rounded-full opacity-20 blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-red-600 rounded-full opacity-20 blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className={`inline-block transition-all duration-1000 ${mounted ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-180'}`}>
                <div className="relative">
                  <AlertTriangle className="h-24 w-24 text-red-600 mx-auto animate-pulse" />
                  <div className="absolute inset-0 h-24 w-24 text-red-600 mx-auto animate-ping opacity-20">
                    <AlertTriangle className="h-24 w-24" />
                  </div>
                </div>
              </div>

              <div className={`transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                <div className="sketchy-border bg-red-600 inline-block px-8 py-4 transform hover:rotate-2 transition-transform duration-300">
                  <span className="text-white font-black text-4xl lg:text-5xl uppercase tracking-widest">404</span>
                </div>
              </div>

              <h1 className={`text-6xl lg:text-8xl font-black uppercase leading-none tracking-tight transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                Page Not <span className="text-red-600">Found</span>
              </h1>

              <p className={`text-xl lg:text-2xl text-gray-300 font-bold max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Looks like you've hit a wall. But champions don't quit. Let's get you back on track.
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 justify-center pt-8 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                <Link href="/" className="group">
                  <Button className="sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black text-lg px-8 py-4 uppercase tracking-wide transform hover:scale-110 hover:-rotate-2 transition-all duration-300">
                    <Home className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                    Go Home
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </Link>
                <Link href="/men" className="group">
                  <Button variant="outline" className="sketchy-btn-outline border-2 border-white text-white hover:bg-white hover:text-black font-black text-lg px-8 py-4 uppercase tracking-wide bg-transparent transform hover:scale-110 hover:rotate-2 transition-all duration-300">
                    <Search className="mr-2 h-5 w-5 group-hover:animate-spin" />
                    Browse Products
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>

              <blockquote className={`pt-8 text-xl font-black uppercase italic text-gray-500 transition-all duration-1000 delay-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                "The only way is through"
              </blockquote>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-8 bg-red-600 sketchy-divider animate-pulse" />
        </section>

        {/* Quick Links */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black uppercase text-black mb-4">
                Popular <span className="text-red-600">Categories</span>
              </h2>
              <div className="sketchy-underline mx-auto" />
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {[
                { label: "Men", href: "/men" },
                { label: "Women", href: "/women" },
                { label: "Kids", href: "/kids" },
                { label: "Shoes", href: "/shoes" },
                { label: "Sports", href: "/sports" },
                { label: "Accessories", href: "/accessories" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="bg-white sketchy-card border-4 border-black p-6 text-center transform hover:scale-110 hover:-rotate-2 transition-all duration-300 hover:border-red-600 group"
                >
                  <h3 className="font-black text-xl uppercase group-hover:text-red-600 transition-colors">{label}</h3>
                  <ArrowRight className="h-5 w-5 mx-auto mt-2 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
