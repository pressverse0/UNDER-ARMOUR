
import { useState } from "react"
import { User, Package, Heart, Settings, LogOut, Lock, Bell, CreditCard, Globe, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Link } from "wouter"
import PageLayout from "@/components/layout/page-layout"
import { useAuth } from "@/context/auth-context"

export default function SettingsPage() {
  const { toast } = useToast()
  const { user, isAuthenticated, logout, updateProfile } = useAuth()
  const [profileForm, setProfileForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    address: user?.address ?? '',
    city: user?.city ?? '',
    state: user?.state ?? '',
    zip_code: (user as any)?.zip_code ?? '',
    country: user?.country ?? '',
  })
  const [saving, setSaving] = useState(false)

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateProfile(profileForm)
      toast({ title: "Profile Updated", description: "Your changes have been saved.", variant: "success" as any })
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to save profile.", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    toast({ title: "Logged Out Successfully", description: "You have been logged out of your account", variant: "success" as any })
  }

  return (
    <PageLayout>
      <main className="flex-1 bg-gray-100">

      {/* Hero Section */}
      <section className="relative bg-black text-white py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight mb-6">
              Account <span className="text-red-600">Settings</span>
            </h1>
            <p className="text-xl text-gray-300 font-bold">
              Manage your preferences and security settings.
            </p>
          </div>
        </div>
      </section>

      {/* Settings Content */}
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
                    <h2 className="text-2xl font-black uppercase mt-4">{user?.name || 'Guest'}</h2>
                    <p className="text-gray-600 font-bold text-sm">{user?.email || ''}</p>
                  </div>

                  {/* Navigation Menu */}
                  <nav className="space-y-2">
                    <Link href="/account" className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded transition-colors font-bold uppercase text-gray-700">
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    <Link href="/account/orders" className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded transition-colors font-bold uppercase text-gray-700">
                      <Package className="h-5 w-5" />
                      <span>Orders</span>
                    </Link>
                    <Link href="/account/wishlist" className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded transition-colors font-bold uppercase text-gray-700">
                      <Heart className="h-5 w-5" />
                      <span>Wishlist</span>
                    </Link>
                    <Link href="/account/settings" className="flex items-center space-x-3 p-3 bg-red-600 text-white rounded sketchy-border font-bold uppercase">
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
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
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Information */}
              <Card className="sketchy-card bg-white border-4 border-black">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="h-8 w-8 text-red-600" />
                    <h3 className="text-3xl font-black uppercase">Personal Information</h3>
                  </div>
                  <form onSubmit={handleProfileSave} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="font-black uppercase text-sm mb-2 block">Full Name</Label>
                        <Input value={profileForm.name} onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                          className="border-2 border-gray-300 focus:border-red-600 font-bold" placeholder="John Doe" />
                      </div>
                      <div>
                        <Label className="font-black uppercase text-sm mb-2 block"><Mail className="h-4 w-4 inline mr-1" />Email</Label>
                        <Input type="email" value={profileForm.email} onChange={e => setProfileForm({...profileForm, email: e.target.value})}
                          className="border-2 border-gray-300 focus:border-red-600 font-bold" placeholder="you@example.com" />
                      </div>
                      <div>
                        <Label className="font-black uppercase text-sm mb-2 block"><Phone className="h-4 w-4 inline mr-1" />Phone</Label>
                        <Input value={profileForm.phone} onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                          className="border-2 border-gray-300 focus:border-red-600 font-bold" placeholder="+1 (555) 123-4567" />
                      </div>
                    </div>
                    <div>
                      <Label className="font-black uppercase text-sm mb-2 block"><MapPin className="h-4 w-4 inline mr-1" />Street Address</Label>
                      <Input value={profileForm.address} onChange={e => setProfileForm({...profileForm, address: e.target.value})}
                        className="border-2 border-gray-300 focus:border-red-600 font-bold" placeholder="123 Main Street" />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label className="font-black uppercase text-sm mb-2 block">City</Label>
                        <Input value={profileForm.city} onChange={e => setProfileForm({...profileForm, city: e.target.value})}
                          className="border-2 border-gray-300 focus:border-red-600 font-bold" placeholder="New York" />
                      </div>
                      <div>
                        <Label className="font-black uppercase text-sm mb-2 block">State</Label>
                        <Input value={profileForm.state} onChange={e => setProfileForm({...profileForm, state: e.target.value})}
                          className="border-2 border-gray-300 focus:border-red-600 font-bold" placeholder="NY" />
                      </div>
                      <div>
                        <Label className="font-black uppercase text-sm mb-2 block">ZIP Code</Label>
                        <Input value={profileForm.zip_code} onChange={e => setProfileForm({...profileForm, zip_code: e.target.value})}
                          className="border-2 border-gray-300 focus:border-red-600 font-bold" placeholder="10001" />
                      </div>
                    </div>
                    <Button type="submit" disabled={saving} className="sketchy-btn bg-red-600 text-white hover:bg-red-700 font-black uppercase">
                      {saving ? 'Saving...' : 'Save Profile'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card className="sketchy-card bg-white border-4 border-black">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Lock className="h-8 w-8 text-red-600" />
                    <h3 className="text-3xl font-black uppercase">Security</h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label className="font-black uppercase text-sm mb-2 block">Current Password</Label>
                      <Input
                        type="password"
                        placeholder="Enter current password"
                        className="border-2 border-gray-300 focus:border-red-600 font-bold"
                      />
                    </div>
                    <div>
                      <Label className="font-black uppercase text-sm mb-2 block">New Password</Label>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        className="border-2 border-gray-300 focus:border-red-600 font-bold"
                      />
                    </div>
                    <div>
                      <Label className="font-black uppercase text-sm mb-2 block">Confirm New Password</Label>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        className="border-2 border-gray-300 focus:border-red-600 font-bold"
                      />
                    </div>
                    <Button 
                      onClick={() => {
                        toast({
                          title: "Password Updated",
                          description: "Your password has been changed successfully",
                          variant: "success" as any,
                        })
                      }}
                      className="sketchy-btn bg-red-600 text-white hover:bg-red-700 font-black uppercase"
                    >
                      Update Password
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card className="sketchy-card bg-white border-4 border-black">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Bell className="h-8 w-8 text-red-600" />
                    <h3 className="text-3xl font-black uppercase">Notifications</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded sketchy-border">
                      <div>
                        <p className="font-black uppercase">Order Updates</p>
                        <p className="text-sm text-gray-600 font-bold">Get notified about your order status</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-6 h-6 accent-red-600" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded sketchy-border">
                      <div>
                        <p className="font-black uppercase">Promotions</p>
                        <p className="text-sm text-gray-600 font-bold">Receive exclusive deals and offers</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-6 h-6 accent-red-600" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded sketchy-border">
                      <div>
                        <p className="font-black uppercase">New Arrivals</p>
                        <p className="text-sm text-gray-600 font-bold">Be first to know about new products</p>
                      </div>
                      <input type="checkbox" className="w-6 h-6 accent-red-600" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded sketchy-border">
                      <div>
                        <p className="font-black uppercase">Newsletter</p>
                        <p className="text-sm text-gray-600 font-bold">Weekly updates and training tips</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-6 h-6 accent-red-600" />
                    </div>
                  </div>

                  <Button 
                    onClick={() => {
                      toast({
                        title: "Preferences Saved",
                        description: "Your notification preferences have been updated",
                        variant: "success" as any,
                      })
                    }}
                    className="sketchy-btn bg-red-600 text-white hover:bg-red-700 font-black uppercase mt-6"
                  >
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card className="sketchy-card bg-white border-4 border-black">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="h-8 w-8 text-red-600" />
                    <h3 className="text-3xl font-black uppercase">Payment Methods</h3>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="p-4 border-2 border-gray-200 rounded sketchy-border flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-gray-900 rounded flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-black">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-600 font-bold">Expires 12/2027</p>
                        </div>
                      </div>
                      <Button 
                        onClick={() => {
                          toast({
                            title: "Payment Method Removed",
                            description: "Your payment method has been removed successfully",
                            variant: "success" as any,
                          })
                        }}
                        variant="outline" 
                        className="border-2 border-black font-bold uppercase"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>

                  <Button 
                    onClick={() => {
                      toast({
                        title: "Payment Method Added",
                        description: "New payment method has been added to your account",
                        variant: "success" as any,
                      })
                    }}
                    className="sketchy-btn-outline border-2 border-black text-black hover:bg-black hover:text-white font-black uppercase"
                  >
                    + Add Payment Method
                  </Button>
                </CardContent>
              </Card>

              {/* Language & Region */}
              <Card className="sketchy-card bg-white border-4 border-black">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Globe className="h-8 w-8 text-red-600" />
                    <h3 className="text-3xl font-black uppercase">Language & Region</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="font-black uppercase text-sm mb-2 block">Language</Label>
                      <select className="w-full border-2 border-gray-300 rounded px-4 py-3 font-bold appearance-none cursor-pointer focus:border-red-600">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div>
                      <Label className="font-black uppercase text-sm mb-2 block">Currency</Label>
                      <select className="w-full border-2 border-gray-300 rounded px-4 py-3 font-bold appearance-none cursor-pointer focus:border-red-600">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>CAD ($)</option>
                      </select>
                    </div>
                  </div>

                  <Button 
                    onClick={() => {
                      toast({
                        title: "Settings Saved",
                        description: "Your language and region preferences have been updated",
                        variant: "success" as any,
                      })
                    }}
                    className="sketchy-btn bg-red-600 text-white hover:bg-red-700 font-black uppercase mt-6"
                  >
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="sketchy-card bg-white border-4 border-red-600">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-black uppercase text-red-600 mb-6">Danger Zone</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded sketchy-border">
                      <p className="font-black uppercase mb-2">Delete Account</p>
                      <p className="text-sm text-gray-600 font-bold mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button 
                        onClick={() => {
                          toast({
                            title: "Account Deletion Requested",
                            description: "Your account deletion request has been submitted",
                            variant: "destructive" as any,
                          })
                        }}
                        className="sketchy-btn bg-red-600 text-white hover:bg-red-700 font-black uppercase"
                      >
                        Delete My Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      </main>

    </PageLayout>
  )
}
