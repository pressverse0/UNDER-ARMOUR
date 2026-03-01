import { Package, RefreshCw, Clock } from "lucide-react"
import Link from "next/link"
import type { Metadata } from 'next'
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: 'Returns & Exchanges | Under Armour',
  description: 'Easy returns and exchanges. 60-day return policy on all Under Armour products.',
}

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl lg:text-6xl font-black uppercase text-black mb-8 text-center">
            Returns & <span className="text-red-600">Exchanges</span>
          </h1>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white sketchy-card border-4 border-black p-6 text-center">
              <Clock className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-black text-xl uppercase mb-2">60 Days</h3>
              <p className="font-bold">Return window for all products</p>
            </div>
            <div className="bg-white sketchy-card border-4 border-black p-6 text-center">
              <RefreshCw className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-black text-xl uppercase mb-2">Free Returns</h3>
              <p className="font-bold">No restocking fees</p>
            </div>
            <div className="bg-white sketchy-card border-4 border-black p-6 text-center">
              <Package className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-black text-xl uppercase mb-2">Easy Process</h3>
              <p className="font-bold">Simple online returns</p>
            </div>
          </div>

          <div className="bg-white sketchy-card border-4 border-black p-8 mb-8">
            <h2 className="text-3xl font-black uppercase mb-6">Return Policy</h2>
            <div className="space-y-4 text-lg">
              <p className="font-bold">We want you to be completely satisfied with your purchase. If you're not, we'll make it right.</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>60-day return window from date of purchase</li>
                <li>Items must be unworn and in original condition</li>
                <li>Original tags must be attached</li>
                <li>Proof of purchase required</li>
                <li>Free return shipping on all orders</li>
              </ul>
            </div>
          </div>

          <div className="bg-white sketchy-card border-4 border-black p-8">
            <h2 className="text-3xl font-black uppercase mb-6">How to Return</h2>
            <ol className="list-decimal list-inside space-y-4 text-lg font-bold ml-4">
              <li>Log into your account and go to Order History</li>
              <li>Select the item(s) you want to return</li>
              <li>Print your prepaid return label</li>
              <li>Pack items securely in original packaging</li>
              <li>Drop off at any authorized shipping location</li>
              <li>Refund processed within 5-7 business days</li>
            </ol>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
