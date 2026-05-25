import { useState } from "react"
import { Package, Truck, CheckCircle, MapPin, AlertCircle, Search, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import PageLayout from "@/components/layout/page-layout"

interface TrackingResult {
  orderNumber: string
  status: 'processing' | 'shipped' | 'out-for-delivery' | 'delivered'
  estimatedDelivery: string
  carrier: string
  trackingNumber: string
  items: { name: string; qty: number }[]
  events: { date: string; time: string; location: string; description: string; completed: boolean }[]
}

const mockTrackingData: Record<string, TrackingResult> = {
  "UA-123456": {
    orderNumber: "UA-123456",
    status: "shipped",
    estimatedDelivery: "May 28, 2026",
    carrier: "UPS",
    trackingNumber: "1Z9999W99999999999",
    items: [{ name: "HOVR Phantom 3", qty: 1 }, { name: "HeatGear Training Shirt", qty: 2 }],
    events: [
      { date: "May 26", time: "2:15 PM", location: "Baltimore, MD", description: "Package picked up", completed: true },
      { date: "May 26", time: "9:30 AM", location: "Baltimore, MD", description: "Order processed and ready", completed: true },
      { date: "May 25", time: "11:45 AM", location: "Baltimore, MD", description: "Order placed", completed: true },
      { date: "May 28", time: "Expected", location: "Your Door", description: "Expected delivery", completed: false },
    ]
  },
  "UA-789012": {
    orderNumber: "UA-789012",
    status: "delivered",
    estimatedDelivery: "May 24, 2026",
    carrier: "FedEx",
    trackingNumber: "7489234895760",
    items: [{ name: "Curry Flow 11", qty: 1 }],
    events: [
      { date: "May 24", time: "2:45 PM", location: "Your Door", description: "Package delivered — left at front door", completed: true },
      { date: "May 24", time: "8:12 AM", location: "Local Hub", description: "Out for delivery", completed: true },
      { date: "May 23", time: "7:30 PM", location: "Regional Facility", description: "Arrived at facility", completed: true },
      { date: "May 22", time: "3:00 PM", location: "Baltimore, MD", description: "Package shipped", completed: true },
    ]
  }
}

const statusConfig = {
  'processing': { label: 'Processing', step: 1, color: 'text-blue-600', bgColor: 'bg-blue-600' },
  'shipped': { label: 'Shipped', step: 2, color: 'text-orange-500', bgColor: 'bg-orange-500' },
  'out-for-delivery': { label: 'Out for Delivery', step: 3, color: 'text-yellow-500', bgColor: 'bg-yellow-500' },
  'delivered': { label: 'Delivered', step: 4, color: 'text-green-600', bgColor: 'bg-green-600' },
}

const steps = [
  { label: 'Order Placed', icon: Package, step: 1 },
  { label: 'Shipped', icon: Truck, step: 2 },
  { label: 'Out for Delivery', icon: MapPin, step: 3 },
  { label: 'Delivered', icon: CheckCircle, step: 4 },
]

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [tracking, setTracking] = useState<TrackingResult | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setNotFound(false)
    setTracking(null)
    setTimeout(() => {
      const result = mockTrackingData[orderNumber.toUpperCase().trim()]
      if (result) {
        setTracking(result)
      } else {
        setNotFound(true)
      }
      setLoading(false)
    }, 1000)
  }

  const currentStatus = tracking ? statusConfig[tracking.status] : null

  return (
    <PageLayout>

      {/* Hero */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-black uppercase mb-4">
            Track Your <span className="text-red-600">Order</span>
          </h1>
          <p className="text-xl text-gray-300 font-bold">
            Real-time updates on your shipment. Know exactly where your gear is.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* Search Form */}
          <div className="bg-white sketchy-card border-4 border-black p-8 mb-8">
            <h2 className="text-2xl font-black uppercase mb-6">Enter Order Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-black uppercase text-sm mb-2">Order Number *</label>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={e => setOrderNumber(e.target.value)}
                    placeholder="e.g. UA-123456"
                    required
                    className="w-full p-3 border-2 border-black font-bold focus:outline-none focus:border-red-600 transition-colors"
                  />
                  <p className="text-xs text-gray-500 font-bold mt-1">Found in your confirmation email</p>
                </div>
                <div>
                  <label className="block font-black uppercase text-sm mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full p-3 border-2 border-black font-bold focus:outline-none focus:border-red-600 transition-colors"
                  />
                  <p className="text-xs text-gray-500 font-bold mt-1">Used when placing your order</p>
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="sketchy-btn bg-red-600 hover:bg-red-700 text-white font-black text-lg px-8 py-4 uppercase tracking-wide w-full"
              >
                {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Tracking...
                  </span>
                ) : (
                  <span className="flex items-center gap-2 justify-center"><Search className="h-5 w-5" /> Track Order</span>
                )}
              </Button>
              <p className="text-center text-xs text-gray-500 font-bold">
                Demo: Try order numbers <strong>UA-123456</strong> (shipped) or <strong>UA-789012</strong> (delivered)
              </p>
            </form>
          </div>

          {/* Not Found */}
          {notFound && (
            <div className="bg-white border-4 border-red-600 p-6 flex gap-4 mb-8">
              <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-black uppercase mb-1">Order Not Found</h3>
                <p className="font-bold text-gray-700 text-sm">
                  We couldn't find an order matching that number and email. Double-check your confirmation email or{" "}
                  <Link href="/support/contact" className="text-red-600 hover:underline">contact support</Link>.
                </p>
              </div>
            </div>
          )}

          {/* Tracking Results */}
          {tracking && currentStatus && (
            <div className="space-y-6">
              {/* Status Header */}
              <div className="bg-white sketchy-card border-4 border-black p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm font-black uppercase text-gray-500 mb-1">Order {tracking.orderNumber}</p>
                    <span className={`inline-flex items-center gap-2 font-black uppercase text-lg ${currentStatus.color}`}>
                      {tracking.status === 'delivered' && <CheckCircle className="h-5 w-5" />}
                      {tracking.status === 'shipped' && <Truck className="h-5 w-5" />}
                      {tracking.status === 'processing' && <Package className="h-5 w-5" />}
                      {tracking.status === 'out-for-delivery' && <MapPin className="h-5 w-5" />}
                      {currentStatus.label}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black uppercase text-gray-500">
                      {tracking.status === 'delivered' ? 'Delivered' : 'Est. Delivery'}
                    </p>
                    <p className="font-black text-lg">{tracking.estimatedDelivery}</p>
                    <p className="text-xs text-gray-500 font-bold">{tracking.carrier} · {tracking.trackingNumber}</p>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="relative">
                  <div className="flex items-start justify-between relative">
                    <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                      <div
                        className={`h-full ${currentStatus.bgColor} transition-all duration-1000`}
                        style={{ width: `${((currentStatus.step - 1) / 3) * 100}%` }}
                      />
                    </div>
                    {steps.map(({ label, icon: Icon, step }) => {
                      const isCompleted = currentStatus.step >= step
                      const isActive = currentStatus.step === step
                      return (
                        <div key={step} className="flex flex-col items-center gap-2 relative z-10" style={{ width: '25%' }}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-colors ${
                            isCompleted ? `${currentStatus.bgColor} border-transparent` : 'bg-white border-gray-300'
                          } ${isActive ? 'ring-4 ring-red-200' : ''}`}>
                            <Icon className={`h-5 w-5 ${isCompleted ? 'text-white' : 'text-gray-400'}`} />
                          </div>
                          <p className={`text-xs font-black uppercase text-center leading-snug ${isCompleted ? 'text-black' : 'text-gray-400'}`}>
                            {label}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="bg-white sketchy-card border-4 border-black p-6">
                <h3 className="font-black uppercase mb-4">Items in This Order</h3>
                <div className="space-y-2">
                  {tracking.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border-2 border-gray-100 rounded hover:border-red-200 transition-colors">
                      <span className="font-bold">{item.name}</span>
                      <span className="text-sm font-black text-gray-500 uppercase">Qty: {item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Event Timeline */}
              <div className="bg-white sketchy-card border-4 border-black p-6">
                <h3 className="font-black uppercase mb-6">Tracking Events</h3>
                <div className="space-y-0">
                  {tracking.events.map((event, i) => (
                    <div key={i} className="flex gap-4 relative pb-6 last:pb-0">
                      {i < tracking.events.length - 1 && (
                        <div className={`absolute left-[19px] top-10 bottom-0 w-0.5 ${event.completed ? 'bg-red-600' : 'bg-gray-200'}`} />
                      )}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-4 ${event.completed ? 'bg-red-600 border-red-600' : 'bg-white border-gray-200'}`}>
                        {event.completed
                          ? <CheckCircle className="h-5 w-5 text-white" />
                          : <Clock className="h-5 w-5 text-gray-300" />
                        }
                      </div>
                      <div className="flex-1 pt-1">
                        <p className={`font-black uppercase text-sm ${event.completed ? 'text-black' : 'text-gray-400'}`}>{event.description}</p>
                        <p className="text-xs text-gray-500 font-bold">{event.location}</p>
                        <p className="text-xs text-gray-400 font-bold mt-0.5">{event.date} · {event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-8 bg-black text-white sketchy-card border-4 border-red-600 p-6">
            <h3 className="font-black uppercase mb-4">Need Help With Your Order?</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link href="/support/contact" className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 p-3 rounded transition-colors">
                <ArrowRight className="h-4 w-4 text-red-600" />
                <span className="text-sm font-black uppercase">Contact Support</span>
              </Link>
              <Link href="/support/returns" className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 p-3 rounded transition-colors">
                <ArrowRight className="h-4 w-4 text-red-600" />
                <span className="text-sm font-black uppercase">Start a Return</span>
              </Link>
              <Link href="/support/faq" className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 p-3 rounded transition-colors">
                <ArrowRight className="h-4 w-4 text-red-600" />
                <span className="text-sm font-black uppercase">View FAQ</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  )
}
