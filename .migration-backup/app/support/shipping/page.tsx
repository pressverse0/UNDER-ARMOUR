import { Truck, Zap, Globe } from "lucide-react"
import Link from "next/link"
import type { Metadata } from 'next'
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: 'Shipping Information | Under Armour',
  description: 'Fast and reliable shipping. Free shipping on orders over $50.',
}

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl lg:text-6xl font-black uppercase text-black mb-8 text-center">
            Shipping <span className="text-red-600">Information</span>
          </h1>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white sketchy-card border-4 border-black p-6 text-center">
              <Truck className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-black text-xl uppercase mb-2">Free Shipping</h3>
              <p className="font-bold">On orders over $50</p>
            </div>
            <div className="bg-white sketchy-card border-4 border-black p-6 text-center">
              <Zap className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-black text-xl uppercase mb-2">Fast Delivery</h3>
              <p className="font-bold">2-5 business days</p>
            </div>
            <div className="bg-white sketchy-card border-4 border-black p-6 text-center">
              <Globe className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-black text-xl uppercase mb-2">Worldwide</h3>
              <p className="font-bold">International shipping available</p>
            </div>
          </div>

          <div className="bg-white sketchy-card border-4 border-black p-8 mb-8">
            <h2 className="text-3xl font-black uppercase mb-6">Shipping Options</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="p-3 font-black uppercase">Method</th>
                    <th className="p-3 font-black uppercase">Delivery Time</th>
                    <th className="p-3 font-black uppercase">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="p-3 font-bold">Standard</td>
                    <td className="p-3">5-7 business days</td>
                    <td className="p-3">FREE over $50, otherwise $5.99</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-3 font-bold">Express</td>
                    <td className="p-3">2-3 business days</td>
                    <td className="p-3">$12.99</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-3 font-bold">Overnight</td>
                    <td className="p-3">1 business day</td>
                    <td className="p-3">$24.99</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-3 font-bold">International</td>
                    <td className="p-3">7-14 business days</td>
                    <td className="p-3">Varies by location</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white sketchy-card border-4 border-black p-8">
            <h2 className="text-3xl font-black uppercase mb-6">Order Tracking</h2>
            <p className="text-lg font-bold mb-4">
              Once your order ships, you'll receive a tracking number via email. Track your package in real-time through our website or the carrier's tracking portal.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
              <li>Email confirmation sent when order ships</li>
              <li>Real-time tracking updates</li>
              <li>Delivery notifications</li>
              <li>Signature required for orders over $200</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
