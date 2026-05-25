
import { useState, useEffect } from "react"
import { User, Package, Heart, Settings, LogOut, Truck, Clock, CheckCircle, X, MapPin, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Link } from "wouter"
import PageLayout from "@/components/layout/page-layout"
import { useAuth } from "@/context/auth-context"
import { orders as ordersApi, type Order } from "@/lib/api"

function statusColor(status: string) {
  const s = status?.toLowerCase()
  if (s === 'delivered') return 'bg-green-600'
  if (s === 'shipped' || s === 'in transit') return 'bg-blue-600'
  if (s === 'processing') return 'bg-yellow-600'
  if (s === 'cancelled') return 'bg-gray-600'
  return 'bg-gray-500'
}

function statusIcon(status: string) {
  const s = status?.toLowerCase()
  if (s === 'delivered') return <CheckCircle className="h-4 w-4 mr-1" />
  if (s === 'shipped' || s === 'in transit') return <Truck className="h-4 w-4 mr-1" />
  return <Clock className="h-4 w-4 mr-1" />
}

export default function OrdersClient() {
  const { toast } = useToast()
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth()
  const [orderList, setOrderList] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) { setLoading(false); return }
    ordersApi.getAll()
      .then(res => setOrderList(res.data ?? []))
      .catch(() => setOrderList([]))
      .finally(() => setLoading(false))
  }, [isAuthenticated])

  const handleLogout = async () => {
    await logout()
    toast({ title: "Logged Out", description: "You have been signed out.", variant: "success" as any })
  }

  if (authLoading || loading) {
    return (
      <PageLayout>
        <main className="flex-1 bg-gray-100 flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-600 mb-4" />
            <p className="font-black uppercase text-gray-600">Loading Orders...</p>
          </div>
        </main>
      </PageLayout>
    )
  }

  if (!isAuthenticated) {
    return (
      <PageLayout>
        <main className="flex-1 bg-gray-100 flex items-center justify-center min-h-96">
          <div className="text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-black uppercase mb-4">Sign In Required</h2>
            <p className="text-gray-600 font-bold mb-6">Please sign in to view your orders.</p>
            <Link href="/account"><Button className="ua-btn-primary">Sign In</Button></Link>
          </div>
        </main>
      </PageLayout>
    )
  }

  return (
    <PageLayout seoTitle="My Orders | Under Armour®">
      <main className="flex-1 bg-gray-100">
        <section className="relative bg-black text-white py-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight mb-6">
                My <span className="text-red-600">Orders</span>
              </h1>
              <p className="text-xl text-gray-300 font-bold">Track and manage your Under Armour orders.</p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8 relative">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 self-start">
                  <Card className="sketchy-card bg-white border-4 border-black">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center sketchy-border mx-auto">
                          <User className="h-12 w-12 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-black uppercase mt-4">{user?.name}</h2>
                        <p className="text-gray-600 font-bold text-sm">{user?.email}</p>
                      </div>
                      <nav className="space-y-2">
                        <Link href="/account" className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded transition-colors font-bold uppercase text-gray-700">
                          <User className="h-5 w-5" /><span>Profile</span>
                        </Link>
                        <Link href="/account/orders" className="flex items-center space-x-3 p-3 bg-red-600 text-white rounded sketchy-border font-bold uppercase">
                          <Package className="h-5 w-5" /><span>Orders</span>
                        </Link>
                        <Link href="/account/wishlist" className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded transition-colors font-bold uppercase text-gray-700">
                          <Heart className="h-5 w-5" /><span>Wishlist</span>
                        </Link>
                        <Link href="/account/settings" className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded transition-colors font-bold uppercase text-gray-700">
                          <Settings className="h-5 w-5" /><span>Settings</span>
                        </Link>
                        <button onClick={handleLogout} className="flex items-center space-x-3 p-3 hover:bg-red-50 rounded transition-colors font-bold uppercase text-red-600 w-full">
                          <LogOut className="h-5 w-5" /><span>Logout</span>
                        </button>
                      </nav>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Orders */}
              <div className="lg:col-span-2 space-y-6">
                {orderList.length === 0 ? (
                  <Card className="sketchy-card bg-white border-4 border-black">
                    <CardContent className="p-12 text-center">
                      <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-2xl font-black uppercase mb-3">No Orders Yet</h3>
                      <p className="text-gray-600 font-bold mb-6">Looks like you haven't placed any orders. Start shopping!</p>
                      <Link href="/men"><Button className="ua-btn-primary">Shop Now</Button></Link>
                    </CardContent>
                  </Card>
                ) : (
                  orderList.map((order) => (
                    <Card key={order.id} className="sketchy-card bg-white border-4 border-black">
                      <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b-2 border-gray-200">
                          <div>
                            <h3 className="text-2xl font-black uppercase mb-2">#{order.order_number}</h3>
                            <p className="text-gray-600 font-bold flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                          <div className="mt-4 md:mt-0 text-left md:text-right">
                            <Badge className={`font-black uppercase mb-2 flex items-center ${statusColor(order.status)}`}>
                              {statusIcon(order.status)}{order.status}
                            </Badge>
                            <p className="text-3xl font-black text-red-600">${Number(order.total).toFixed(2)}</p>
                          </div>
                        </div>
                        {order.items && order.items.length > 0 && (
                          <div className="space-y-3 mb-6">
                            {order.items.map((item, i) => (
                              <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <div>
                                  <p className="font-black">{item.name}</p>
                                  <p className="text-sm text-gray-600 font-bold">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-black text-red-600">${Number(item.price).toFixed(2)}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button onClick={() => { setSelectedOrder(order); setShowModal(true) }}
                            className="sketchy-btn bg-red-600 text-white hover:bg-red-700 font-black uppercase flex-1">
                            <Truck className="h-4 w-4 mr-2" />Track Order
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Tracking Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black bg-opacity-70" onClick={() => setShowModal(false)}></div>
          <Card className="sketchy-card bg-white border-4 border-black relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-black uppercase">Order Details</h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded sketchy-border">
                <div>
                  <p className="text-sm font-black uppercase text-gray-600 mb-1">Order Number</p>
                  <p className="text-xl font-black">#{selectedOrder.order_number}</p>
                </div>
                <div>
                  <p className="text-sm font-black uppercase text-gray-600 mb-1">Status</p>
                  <Badge className={`font-black uppercase flex items-center w-fit ${statusColor(selectedOrder.status)}`}>
                    {statusIcon(selectedOrder.status)}{selectedOrder.status}
                  </Badge>
                </div>
                {selectedOrder.tracking_number && (
                  <div>
                    <p className="text-sm font-black uppercase text-gray-600 mb-1">Tracking #</p>
                    <p className="font-black">{selectedOrder.tracking_number}</p>
                  </div>
                )}
                {selectedOrder.carrier && (
                  <div>
                    <p className="text-sm font-black uppercase text-gray-600 mb-1">Carrier</p>
                    <p className="font-black">{selectedOrder.carrier}</p>
                  </div>
                )}
                {selectedOrder.shipping_address && (
                  <div className="md:col-span-2">
                    <p className="text-sm font-black uppercase text-gray-600 mb-1">Shipping Address</p>
                    <p className="font-bold text-sm flex items-start gap-1">
                      <MapPin className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>
                        {selectedOrder.shipping_address.address}, {selectedOrder.shipping_address.city},&nbsp;
                        {selectedOrder.shipping_address.state} {selectedOrder.shipping_address.zip_code}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              {selectedOrder.items && (
                <div className="mb-6">
                  <h4 className="text-2xl font-black uppercase mb-4">Order Items</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded">
                        <div>
                          <p className="font-black">{item.name}</p>
                          <p className="text-sm text-gray-600 font-bold">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-black text-red-600">${Number(item.price).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t-2 border-gray-200 flex justify-between items-center">
                    <p className="text-xl font-black uppercase">Total</p>
                    <p className="text-3xl font-black text-red-600">${Number(selectedOrder.total).toFixed(2)}</p>
                  </div>
                </div>
              )}
              <Button onClick={() => setShowModal(false)} className="ua-btn-primary w-full">Close</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </PageLayout>
  )
}
