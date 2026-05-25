import { useState } from "react"
import { Truck, Zap, Globe, Search, Package, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import PageLayout from "@/components/layout/page-layout"

export default function ShippingPage() {
  const [trackingInput, setTrackingInput] = useState("")
  const [tracked, setTracked] = useState(false)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingInput.trim()) setTracked(true)
  }

  return (
    <PageLayout seoTitle="Shipping Information | Under Armour® Delivery" seoDescription="Under Armour shipping options and delivery timelines. Free standard shipping on orders over $35. Expedited and next-day options available.">

      {/* Hero */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-black uppercase mb-4">
            Shipping <span className="text-red-600">Information</span>
          </h1>
          <p className="text-xl text-gray-300 font-bold">Fast, reliable delivery on every order.</p>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Quick Track Widget */}
          <div className="bg-black text-white sketchy-card border-4 border-red-600 p-6 mb-10">
            <h2 className="text-2xl font-black uppercase mb-2 flex items-center gap-2">
              <Package className="h-6 w-6 text-red-600" /> Quick Track
            </h2>
            <p className="text-gray-400 font-bold text-sm mb-4">Have your order number? Track it right here.</p>
            {!tracked ? (
              <form onSubmit={handleTrack} className="flex gap-3">
                <input
                  type="text"
                  value={trackingInput}
                  onChange={e => setTrackingInput(e.target.value)}
                  placeholder="Enter order number (e.g. UA-123456)"
                  className="flex-1 bg-gray-900 text-white border-2 border-gray-700 focus:border-red-600 px-4 py-3 font-bold focus:outline-none transition-colors"
                />
                <Button type="submit" className="sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black uppercase px-6 py-3 flex items-center gap-2">
                  <Search className="h-4 w-4" /> Track
                </Button>
              </form>
            ) : (
              <div className="flex items-center gap-3 bg-gray-900 border-2 border-green-600 p-4 rounded">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div>
                  <p className="font-black uppercase text-green-400">Order {trackingInput} found!</p>
                  <Link href="/track-order" className="text-red-400 hover:text-red-300 font-bold text-sm underline">
                    View full tracking details →
                  </Link>
                </div>
              </div>
            )}
            <p className="text-gray-600 text-xs font-bold mt-3">
              For full tracking details and timeline, visit our{" "}
              <Link href="/track-order" className="text-red-500 hover:underline">Track Order page</Link>.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white sketchy-card border-4 border-black p-6 text-center">
              <Truck className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-black text-xl uppercase mb-2">Free Shipping</h3>
              <p className="font-bold">On orders over $50</p>
              <p className="text-sm text-gray-500 mt-1">Standard delivery included</p>
            </div>
            <div className="bg-white sketchy-card border-4 border-black p-6 text-center">
              <Zap className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-black text-xl uppercase mb-2">Fast Delivery</h3>
              <p className="font-bold">2–3 days Express</p>
              <p className="text-sm text-gray-500 mt-1">Or overnight for next-day</p>
            </div>
            <div className="bg-white sketchy-card border-4 border-black p-6 text-center">
              <Globe className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-black text-xl uppercase mb-2">Worldwide</h3>
              <p className="font-bold">International shipping</p>
              <p className="text-sm text-gray-500 mt-1">7–14 business days</p>
            </div>
          </div>

          {/* Rates Table */}
          <div className="bg-white sketchy-card border-4 border-black p-8 mb-8">
            <h2 className="text-3xl font-black uppercase mb-6">Shipping Options & Rates</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-black bg-gray-50">
                    <th className="p-4 font-black uppercase">Method</th>
                    <th className="p-4 font-black uppercase">Delivery Time</th>
                    <th className="p-4 font-black uppercase">Orders Under $50</th>
                    <th className="p-4 font-black uppercase">Orders $50+</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { method: "Standard", time: "5–7 business days", under: "$5.99", over: "FREE" },
                    { method: "Express", time: "2–3 business days", under: "$12.99", over: "$12.99" },
                    { method: "Overnight", time: "Next business day", under: "$24.99", over: "$24.99" },
                    { method: "International", time: "7–14 business days", under: "Varies", over: "Varies" },
                  ].map(row => (
                    <tr key={row.method} className="border-b border-gray-200 hover:bg-red-50 transition-colors">
                      <td className="p-4 font-black">{row.method}</td>
                      <td className="p-4 font-bold">{row.time}</td>
                      <td className="p-4 font-bold">{row.under}</td>
                      <td className={`p-4 font-black ${row.over === 'FREE' ? 'text-green-600' : ''}`}>{row.over}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm font-bold text-gray-500 mt-4">* Overnight orders must be placed before 1:00 PM EST. Weekend days excluded from delivery counts.</p>
          </div>

          {/* Tracking Info */}
          <div className="bg-white sketchy-card border-4 border-black p-8 mb-8">
            <h2 className="text-3xl font-black uppercase mb-4">Order Tracking</h2>
            <p className="font-bold text-gray-700 mb-4">
              Once your order ships, you'll receive a confirmation email with your tracking number. Track in real-time from your account dashboard or our Track Order page.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "Shipping confirmation email sent within 1 hour of dispatch",
                "Real-time tracking updates via carrier portal",
                "SMS delivery notifications (opt-in at checkout)",
                "Signature required for orders over $200",
              ].map(item => (
                <li key={item} className="flex items-start gap-2 font-bold">
                  <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/track-order">
              <Button className="sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black uppercase px-8 py-3 flex items-center gap-2">
                <Package className="h-4 w-4" /> Track Your Order
              </Button>
            </Link>
          </div>

          {/* International */}
          <div className="bg-white sketchy-card border-4 border-black p-8">
            <h2 className="text-3xl font-black uppercase mb-4">International Shipping</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-black uppercase mb-3 text-red-600">Available Regions</h3>
                <ul className="space-y-1 font-bold text-sm">
                  {["Europe (EU + UK)", "Canada", "Australia & NZ", "Asia Pacific", "Middle East", "Latin America"].map(r => (
                    <li key={r} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" />{r}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-black uppercase mb-3 text-red-600">Important Notes</h3>
                <ul className="space-y-1 font-bold text-sm text-gray-700">
                  <li>• Customs duties and taxes are the buyer's responsibility</li>
                  <li>• Delivery times exclude customs clearance</li>
                  <li>• Some products may not be available internationally</li>
                  <li>• Returns from international orders may take up to 21 days</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  )
}
