import { User, Mail, Phone, MapPin, Package, Heart, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from 'next'
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: 'My Account | Under Armour',
  description: 'Manage your Under Armour account, orders, and preferences.',
}

export default function AccountPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-100"

      {/* Hero Section */}
      <section className="relative bg-black text-white py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight mb-6">
              My <span className="text-red-600">Account</span>
            </h1>
            <p className="text-xl text-gray-300 font-bold">
              Manage your profile, orders, and preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Account Content */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
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
                    <Link href="/account" className="flex items-center space-x-3 p-3 bg-red-600 text-white rounded sketchy-border font-bold uppercase">
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    <Link href="/account/orders" className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded transition-colors font-bold uppercase text-gray-700">
                      <Package className="h-5 w-5" />
                      <span>Orders</span>
                    </Link>
                    <Link href="/wishlist" className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded transition-colors font-bold uppercase text-gray-700">
                      <Heart className="h-5 w-5" />
                      <span>Wishlist</span>
                    </Link>
                    <Link href="/account/settings" className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded transition-colors font-bold uppercase text-gray-700">
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                    <button className="flex items-center space-x-3 p-3 hover:bg-red-50 rounded transition-colors font-bold uppercase text-red-600 w-full">
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Information */}
              <Card className="sketchy-card bg-white border-4 border-black">
                <CardContent className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-black uppercase">Personal Information</h3>
                    <Button className="sketchy-btn-outline border-2 border-black text-black hover:bg-black hover:text-white font-black uppercase">
                      Edit
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-black uppercase text-sm mb-2 text-gray-600">Full Name</label>
                      <div className="p-3 bg-gray-50 rounded sketchy-border font-bold">
                        Mostafa Said
                      </div>
                    </div>
                    <div>
                      <label className="block font-black uppercase text-sm mb-2 text-gray-600">Email</label>
                      <div className="p-3 bg-gray-50 rounded sketchy-border font-bold flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-red-600" />
                        m.said@example.com
                      </div>
                    </div>
                    <div>
                      <label className="block font-black uppercase text-sm mb-2 text-gray-600">Phone</label>
                      <div className="p-3 bg-gray-50 rounded sketchy-border font-bold flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-red-600" />
                        +1 (555) 123-4567
                      </div>
                    </div>
                    <div>
                      <label className="block font-black uppercase text-sm mb-2 text-gray-600">Member Since</label>
                      <div className="p-3 bg-gray-50 rounded sketchy-border font-bold">
                        January 2021
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="sketchy-card bg-white border-4 border-black">
                <CardContent className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-black uppercase">Shipping Address</h3>
                    <Button className="sketchy-btn-outline border-2 border-black text-black hover:bg-black hover:text-white font-black uppercase">
                      Edit
                    </Button>
                  </div>

                  <div className="p-4 bg-gray-50 rounded sketchy-border">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-red-600 mt-1" />
                      <div className="font-bold">
                        <p>123 Champion Street</p>
                        <p>Baltimore, MD 21201</p>
                        <p>United States</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card className="sketchy-card bg-white border-4 border-black">
                <CardContent className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-black uppercase">Recent Orders</h3>
                    <Link href="/account/orders" className="text-red-600 hover:text-red-700 font-black uppercase text-sm">
                      View All →
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {[
                      { id: "#UA-2026-001", date: "Feb 28, 2026", status: "Delivered", total: "$215.00" },
                      { id: "#UA-2026-002", date: "Feb 15, 2026", status: "In Transit", total: "$140.00" },
                      { id: "#UA-2026-003", date: "Jan 30, 2026", status: "Delivered", total: "$95.00" },
                    ].map((order, index) => (
                      <div key={index} className="p-4 border-2 border-gray-200 rounded sketchy-border hover:border-red-600 transition-colors">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-black text-lg">{order.id}</p>
                            <p className="text-gray-600 font-bold text-sm">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-black uppercase text-sm ${order.status === 'Delivered' ? 'text-green-600' : 'text-blue-600'}`}>
                              {order.status}
                            </p>
                            <p className="text-red-600 font-black text-lg">{order.total}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Account Stats */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="sketchy-card bg-white border-4 border-black text-center">
                  <CardContent className="p-6">
                    <Package className="h-12 w-12 text-red-600 mx-auto mb-4" />
                    <p className="text-4xl font-black text-black">12</p>
                    <p className="text-gray-600 font-bold uppercase text-sm">Total Orders</p>
                  </CardContent>
                </Card>
                <Card className="sketchy-card bg-white border-4 border-black text-center">
                  <CardContent className="p-6">
                    <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
                    <p className="text-4xl font-black text-black">8</p>
                    <p className="text-gray-600 font-bold uppercase text-sm">Wishlist Items</p>
                  </CardContent>
                </Card>
                <Card className="sketchy-card bg-white border-4 border-black text-center">
                  <CardContent className="p-6">
                    <Settings className="h-12 w-12 text-red-600 mx-auto mb-4" />
                    <p className="text-4xl font-black text-black">5</p>
                    <p className="text-gray-600 font-bold uppercase text-sm">Years Member</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </>
  )
}
