'use client'

import { Home, Search, AlertTriangle, ArrowRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
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
      {/* Header */}
      <header className="bg-black border-b-4 border-red-600 sketchy-border" role="banner">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-red-600" aria-hidden="true" />
            <span className="text-white text-2xl font-black tracking-wider">UNDER ARMOUR</span>
          </Link>
          <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
            <Link href="/men" className="text-gray-300 hover:text-red-600 font-bold uppercase tracking-wide transition-colors">
              Men
            </Link>
            <Link href="/women" className="text-gray-300 hover:text-red-600 font-bold uppercase tracking-wide transition-colors">
              Women
            </Link>
            <Link href="/shoes" className="text-gray-300 hover:text-red-600 font-bold uppercase tracking-wide transition-colors">
              Shoes
            </Link>
            <Link href="/sports" className="text-gray-300 hover:text-red-600 font-bold uppercase tracking-wide transition-colors">
              Sports
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-gray-100">
      {/* 404 Content */}
      <section className="relative bg-black text-white py-20 lg:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-red-600 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-red-600 rounded-full opacity-10 blur-2xl animate-bounce"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            {/* Animated Warning Icon */}
            <div className={`inline-block transition-all duration-1000 ${mounted ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-180'}`}>
              <div className="relative">
                <AlertTriangle className="h-24 w-24 text-red-600 mx-auto animate-pulse" />
                <div className="absolute inset-0 h-24 w-24 text-red-600 mx-auto animate-ping opacity-20">
                  <AlertTriangle className="h-24 w-24" />
                </div>
              </div>
            </div>

            {/* Animated 404 Badge */}
            <div className={`transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
              <div className="sketchy-border bg-red-600 inline-block px-8 py-4 transform hover:rotate-2 transition-transform duration-300 animate-wiggle">
                <span className="text-white font-black text-4xl lg:text-5xl uppercase tracking-widest">404</span>
              </div>
            </div>
            
            {/* Animated Heading */}
            <h1 className={`text-6xl lg:text-8xl font-black uppercase leading-none tracking-tight transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <span className="inline-block hover:scale-110 transition-transform duration-300">Page</span>{' '}
              <span className="inline-block hover:scale-110 transition-transform duration-300">Not</span>{' '}
              <span className="text-red-600 inline-block hover:scale-110 transition-transform duration-300 animate-pulse">Found</span>
            </h1>
            
            {/* Animated Description */}
            <p className={`text-xl lg:text-2xl text-gray-300 font-bold max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Looks like you've hit a wall. But champions don't quit. Let's get you back on track.
            </p>

            {/* Animated Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center pt-8 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              <Link href="/" className="group">
                <Button className="sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black text-lg px-8 py-4 uppercase tracking-wide transform hover:scale-110 hover:-rotate-2 transition-all duration-300 shadow-lg hover:shadow-2xl">
                  <Home className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Go Home
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/sports" className="group">
                <Button
                  variant="outline"
                  className="sketchy-btn-outline border-2 border-white text-white hover:bg-white hover:text-black font-black text-lg px-8 py-4 uppercase tracking-wide bg-transparent transform hover:scale-110 hover:rotate-2 transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  <Search className="mr-2 h-5 w-5 group-hover:animate-spin" />
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
            </div>

            {/* Animated Quote */}
            <div className={`pt-12 transition-all duration-1000 delay-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
              <blockquote className="text-xl lg:text-2xl font-black uppercase italic text-gray-400 animate-pulse">
                "The only way is through"
              </blockquote>
            </div>
          </div>
        </div>

        {/* Animated Sketchy divider */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-red-600 sketchy-divider animate-pulse" aria-hidden="true"></div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl lg:text-5xl font-black uppercase text-black mb-4 tracking-tight">
              Popular <span className="text-red-600 animate-pulse">Categories</span>
            </h2>
            <div className="sketchy-underline mx-auto animate-wiggle" aria-hidden="true"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Link 
              href="/men" 
              className={`relative overflow-hidden bg-white sketchy-card border-4 border-black p-8 text-center transform hover:scale-110 hover:-rotate-2 transition-all duration-300 hover:shadow-2xl hover:border-red-600 group ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity duration-300 group-hover:scale-110" style={{ backgroundImage: "url('/intense-athlete-training-sketch.png')" }}></div>
              <div className="relative z-10">
                <h3 className="font-black text-2xl text-white uppercase mb-2 group-hover:text-red-600 transition-colors duration-300">Men</h3>
                <p className="text-gray-300 font-bold group-hover:text-white transition-colors duration-300">Shop Men's Gear</p>
                <ArrowRight className="h-6 w-6 mx-auto mt-4 text-red-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </Link>
            
            <Link 
              href="/women" 
              className={`relative overflow-hidden bg-white sketchy-card border-4 border-black p-8 text-center transform hover:scale-110 hover:rotate-2 transition-all duration-300 hover:shadow-2xl hover:border-red-600 group ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity duration-300 group-hover:scale-110" style={{ backgroundImage: "url('/athletic-gear-display.png')" }}></div>
              <div className="relative z-10">
                <h3 className="font-black text-2xl text-white uppercase mb-2 group-hover:text-red-600 transition-colors duration-300">Women</h3>
                <p className="text-gray-300 font-bold group-hover:text-white transition-colors duration-300">Shop Women's Gear</p>
                <ArrowRight className="h-6 w-6 mx-auto mt-4 text-red-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </Link>
            
            <Link 
              href="/shoes" 
              className={`relative overflow-hidden bg-white sketchy-card border-4 border-black p-8 text-center transform hover:scale-110 hover:-rotate-2 transition-all duration-300 hover:shadow-2xl hover:border-red-600 group ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity duration-300 group-hover:scale-110" style={{ backgroundImage: "url('/athletic-gear-display.png')" }}></div>
              <div className="relative z-10">
                <h3 className="font-black text-2xl text-white uppercase mb-2 group-hover:text-red-600 transition-colors duration-300">Shoes</h3>
                <p className="text-gray-300 font-bold group-hover:text-white transition-colors duration-300">Shop Footwear</p>
                <ArrowRight className="h-6 w-6 mx-auto mt-4 text-red-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </Link>
            
            <Link 
              href="/sports" 
              className={`relative overflow-hidden bg-white sketchy-card border-4 border-black p-8 text-center transform hover:scale-110 hover:rotate-2 transition-all duration-300 hover:shadow-2xl hover:border-red-600 group ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity duration-300 group-hover:scale-110" style={{ backgroundImage: "url('/intense-athlete-training-sketch.png')" }}></div>
              <div className="relative z-10">
                <h3 className="font-black text-2xl text-white uppercase mb-2 group-hover:text-red-600 transition-colors duration-300">Sports</h3>
                <p className="text-gray-300 font-bold group-hover:text-white transition-colors duration-300">Shop By Sport</p>
                <ArrowRight className="h-6 w-6 mx-auto mt-4 text-red-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </Link>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </>
  )
}
