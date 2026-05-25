
import { useState } from "react"
import { User, Package, Heart, Settings, LogOut, Truck, Clock, CheckCircle, X, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Link } from "wouter"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface Order {
  id: string
  date: string
  status: string
  total: string
  items: { name: string; qty: number; price: string }[]
  trackingNumber?: string
  carrier?: string
  estimatedDelivery?: string
  shippingAddress?: {
    street: string
    city: string
    state: string
    zip: string
  }
  trackingHistory?: {
    date: string
    time: string
    status: string
    location: string
  }[]
}

export default function OrdersClient() {
  const { toast } = useToast()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showTrackingModal, setShowTrackingModal] = useState(false)

  const orders: Order[] = [
    { 
      id: "#UA-2026-001", 
      date: "Feb 28, 2026", 
      status: "Delivered", 
      total: "$215.00",
      items: [
        { name: "HeatGear Training Shirt", qty: 2, price: "$70.00" },
        { name: "HOVR Phantom 3", qty: 1, price: "$140.00" },
      ],
      trackingNumber: "1Z999AA10123456784",
      carrier: "UPS",
      estimatedDelivery: "Feb 28, 2026",
      shippingAddress: {
        street: "123 Champion Street",
        city: "Baltimore",
        state: "MD",
        zip: "21201"
      },
      trackingHistory: [
        { date: "Feb 28", time: "10:30 AM", status: "Delivered", location: "Baltimore, MD" },
        { date: "Feb 28", time: "8:15 AM", status: "Out for Delivery", location: "Baltimore, MD" },
        { date: "Feb 27", time: "6:45 PM", status: "Arrived at Facility", location: "Baltimore, MD" },
        { date: "Feb 26", time: "2:20 PM", status: "In Transit", location: "Philadelphia, PA" },
        { date: "Feb 25", time: "9:00 AM", status: "Shipped", location: "Warehouse" },
      ]
    },
    { 
      id: "#UA-2026-002", 
      date: "Feb 15, 2026", 
      status: "In Transit", 
      total: "$140.00",
      items: [
        { name: "HOVR Phantom 3", qty: 1, price: "$140.00" },
      ],
      trackingNumber: "1Z999AA10123456785",
      carrier: "UPS",
      estimatedDelivery: "Mar 5, 2026",
      shippingAddress: {
        street: "123 Champion Street",
        city: "Baltimore",
        state: "MD",
        zip: "21201"
      },
      trackingHistory: [
        { date: "Mar 2", time: "3:45 PM", status: "In Transit", location: "Chicago, IL" },
        { date: "Mar 1", time: "11:20 AM", status: "In Transit", location: "Denver, CO" },
        { date: "Feb 28", time: "7:30 AM", status: "In Transit", location: "Los Angeles, CA" },
        { date: "Feb 15", time: "2:00 PM", status: "Shipped", location: "Warehouse" },
      ]
    },
    { 
      id: "#UA-2026-003", 
      date: "Jan 30, 2026", 
      status: "Delivered", 
      total: "$95.00",
      items: [
        { name: "Tech 2.0 Shorts", qty: 2, price: "$60.00" },
        { name: "HeatGear Compression Shirt", qty: 1, price: "$35.00" },
      ],
      trackingNumber: "1Z999AA10123456786",
      carrier: "UPS",
      estimatedDelivery: "Jan 30, 2026",
      shippingAddress: {
        street: "123 Champion Street",
        city: "Baltimore",
        state: "MD",
        zip: "21201"
      },
      trackingHistory: [
        { date: "Jan 30", time: "2:15 PM", status: "Delivered", location: "Baltimore, MD" },
        { date: "Jan 30", time: "9:00 AM", status: "Out for Delivery", location: "Baltimore, MD" },
        { date: "Jan 29", time: "5:30 PM", status: "Arrived at Facility", location: "Baltimore, MD" },
        { date: "Jan 28", time: "1:00 PM", status: "In Transit", location: "Washington, DC" },
        { date: "Jan 27", time: "10:00 AM", status: "Shipped", location: "Warehouse" },
      ]
    },
    { 
      id: "#UA-2026-004", 
      date: "Jan 15, 2026", 
      status: "Delivered", 
      total: "$180.00",
      items: [
        { name: "Project Rock Gym Bag", qty: 1, price: "$75.00" },
        { name: "Rival Fleece Hoodie", qty: 1, price: "$55.00" },
        { name: "Play Up 3.0 Shorts", qty: 2, price: "$50.00" },
      ],
      trackingNumber: "1Z999AA10123456787",
      carrier: "UPS",
      estimatedDelivery: "Jan 15, 2026",
      shippingAddress: {
        street: "123 Champion Street",
        city: "Baltimore",
        state: "MD",
        zip: "21201"
      },
      trackingHistory: [
        { date: "Jan 15", time: "11:45 AM", status: "Delivered", location: "Baltimore, MD" },
        { date: "Jan 15", time: "7:30 AM", status: "Out for Delivery", location: "Baltimore, MD" },
        { date: "Jan 14", time: "8:00 PM", status: "Arrived at Facility", location: "Baltimore, MD" },
        { date: "Jan 13", time: "3:15 PM", status: "In Transit", location: "Richmond, VA" },
        { date: "Jan 12", time: "9:30 AM", status: "Shipped", location: "Warehouse" },
      ]
    },
  ]

  const handleTrackOrder = (order: Order) => {
    setSelectedOrder(order)
    setShowTrackingModal(true)
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-100">

      {/* Hero Section */}
      <section className="relative bg-black text-white py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight mb-6">
              My <span className="text-red-600">Orders</span>
            </h1>
            <p className="text-xl text-gray-300 font-bold">
              Track and manage your Under Armour orders.
            </p>
          </div>
        </div>
      </section>

      {/* Orders Content */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 relative">
            {/* Sidebar - Sticky within container */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 self-start">
              <Card className="sketchy-card bg-white border-4 border-black">
                <CardContent className="p-6">
                  {/* Profile Picture */}
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center sketchy-border mx-auto">
                        <User className="h-12 w-12 text-red-600" />
                      </div>
                      <button className="absolute bottom-0 right-0 bg-red-600 text-white rounded-full p-2 sketchy-border hover:bg-red-700 transition-colors">
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                    <h2 className="text-2xl font-black uppercase mt-4">M.Said</h2>
                    <p className="text-gray-600 font-bold">Champion Athlete</p>
                  </div>

                  {/* Navigation Menu */}
                  <nav className="space-y-2">
                    <Link href="/account" className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded transition-colors font-bold uppercase text-gray-700">
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    <Link href="/account/orders" className="flex items-center space-x-3 p-3 bg-red-600 text-white rounded sketchy-border font-bold uppercase">
                      <Package className="h-5 w-5" />
                      <span>Orders</span>
                    </Link>
                    <Link href="/account/wishlist" className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded transition-colors font-bold uppercase text-gray-700">
                      <Heart className="h-5 w-5" />
                      <span>Wishlist</span>
                    </Link>
                    <Link href="/account/settings" className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded transition-colors font-bold uppercase text-gray-700">
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                    <button 
                      onClick={() => {
                        toast({
                          title: "Logged Out Successfully",
                          description: "You have been logged out of your account",
                          variant: "success" as any,
                        })
                      }}
                      className="flex items-center space-x-3 p-3 hover:bg-red-50 rounded transition-colors font-bold uppercase text-red-600 w-full"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </nav>
                </CardContent>
              </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {orders.map((order, index) => (
                <Card key={index} className="sketchy-card bg-white border-4 border-black">
                  <CardContent className="p-8">
                    {/* Order Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b-2 border-gray-200">
                      <div>
                        <h3 className="text-2xl font-black uppercase mb-2">{order.id}</h3>
                        <p className="text-gray-600 font-bold flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {order.date}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0 text-left md:text-right">
                        <Badge className={`font-black uppercase mb-2 ${
                          order.status === 'Delivered' 
                            ? 'bg-green-600' 
                            : order.status === 'In Transit'
                            ? 'bg-blue-600'
                            : 'bg-yellow-600'
                        }`}>
                          {order.status === 'Delivered' && <CheckCircle className="h-4 w-4 mr-1" />}
                          {order.status === 'In Transit' && <Truck className="h-4 w-4 mr-1" />}
                          {order.status}
                        </Badge>
                        <p className="text-3xl font-black text-red-600">{order.total}</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3 mb-6">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div>
                            <p className="font-black">{item.name}</p>
                            <p className="text-sm text-gray-600 font-bold">Qty: {item.qty}</p>
                          </div>
                          <p className="font-black text-red-600">{item.price}</p>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        onClick={() => handleTrackOrder(order)}
                        className="sketchy-btn bg-red-600 text-white hover:bg-red-700 font-black uppercase flex-1"
                      >
                        <Truck className="h-4 w-4 mr-2" />
                        Track Order
                      </Button>
                      <Button 
                        onClick={() => {
                          toast({
                            title: "Order Details",
                            description: `Viewing details for order ${order.id}`,
                            variant: "default" as any,
                          })
                        }}
                        className="sketchy-btn-outline border-2 border-black text-black hover:bg-black hover:text-white font-black uppercase flex-1"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer />

      {/* Tracking Modal */}
      {showTrackingModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black bg-opacity-70" onClick={() => setShowTrackingModal(false)}></div>
          <Card className="sketchy-card bg-white border-4 border-black relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-black uppercase">Track Order</h3>
                <button 
                  onClick={() => setShowTrackingModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Order Info */}
              <div className="grid md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded sketchy-border">
                <div>
                  <p className="text-sm font-black uppercase text-gray-600 mb-1">Order Number</p>
                  <p className="text-xl font-black">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm font-black uppercase text-gray-600 mb-1">Status</p>
                  <Badge className={`font-black uppercase ${
                    selectedOrder.status === 'Delivered' 
                      ? 'bg-green-600' 
                      : 'bg-blue-600'
                  }`}>
                    {selectedOrder.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-black uppercase text-gray-600 mb-1">Tracking Number</p>
                  <p className="font-black">{selectedOrder.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-black uppercase text-gray-600 mb-1">Carrier</p>
                  <p className="font-black">{selectedOrder.carrier}</p>
                </div>
                <div>
                  <p className="text-sm font-black uppercase text-gray-600 mb-1">Estimated Delivery</p>
                  <p className="font-black">{selectedOrder.estimatedDelivery}</p>
                </div>
                <div>
                  <p className="text-sm font-black uppercase text-gray-600 mb-1">Shipping Address</p>
                  <p className="font-bold text-sm">
                    {selectedOrder.shippingAddress?.street}<br />
                    {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zip}
                  </p>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="mb-6">
                <h4 className="text-2xl font-black uppercase mb-6">Tracking History</h4>
                <div className="space-y-4">
                  {selectedOrder.trackingHistory?.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${
                          index === 0 ? 'bg-red-600' : 'bg-gray-300'
                        }`}></div>
                        {index !== selectedOrder.trackingHistory!.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-300 my-1"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-black uppercase">{event.status}</p>
                          <p className="text-sm font-bold text-gray-600">{event.date} {event.time}</p>
                        </div>
                        <p className="text-sm font-bold text-gray-600 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="text-2xl font-black uppercase mb-4">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center p-4 bg-gray-50 rounded">
                      <div>
                        <p className="font-black">{item.name}</p>
                        <p className="text-sm text-gray-600 font-bold">Quantity: {item.qty}</p>
                      </div>
                      <p className="font-black text-red-600">{item.price}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t-2 border-gray-200 flex justify-between items-center">
                  <p className="text-xl font-black uppercase">Total</p>
                  <p className="text-3xl font-black text-red-600">{selectedOrder.total}</p>
                </div>
              </div>

              <div className="mt-8">
                <Button 
                  onClick={() => setShowTrackingModal(false)}
                  className="sketchy-btn bg-red-600 text-white hover:bg-red-700 font-black uppercase w-full"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
