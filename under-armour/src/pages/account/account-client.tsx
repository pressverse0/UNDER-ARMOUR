
import { useState } from "react"
import { User, Mail, Phone, MapPin, Package, Heart, Settings, LogOut, X, Eye, EyeOff, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Link } from "wouter"
import PageLayout from "@/components/layout/page-layout"
import { useAuth } from "@/context/auth-context"

export default function AccountClient() {
  const { toast } = useToast()
  const { user, isAuthenticated, isLoading, login, register, logout } = useAuth()

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [authLoading, setAuthLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)
    try {
      await login(loginForm.email, loginForm.password)
      toast({ title: "Welcome back!", description: "You have been signed in successfully.", variant: "success" as any })
    } catch (err: any) {
      setAuthError(err.message || 'Invalid email or password')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)
    try {
      await register(registerForm.name, registerForm.email, registerForm.password)
      toast({ title: "Account created!", description: "Welcome to Under Armour.", variant: "success" as any })
    } catch (err: any) {
      setAuthError(err.message || 'Registration failed. Please try again.')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    toast({ title: "Logged Out Successfully", description: "You have been logged out of your account.", variant: "success" as any })
  }

  if (isLoading) {
    return (
      <PageLayout>
        <main className="flex-1 bg-gray-100 flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-600 mb-4" />
            <p className="font-black uppercase text-gray-600">Loading...</p>
          </div>
        </main>
      </PageLayout>
    )
  }

  if (!isAuthenticated) {
    return (
      <PageLayout seoTitle="Sign In | Under Armour®">
        <main className="flex-1 bg-gray-100">
          <section className="relative bg-black text-white py-16">
            <div className="container mx-auto px-4">
              <h1 className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight mb-4">
                My <span className="text-red-600">Account</span>
              </h1>
              <p className="text-xl text-gray-300 font-bold">Sign in to manage your orders and profile.</p>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4 max-w-md">
              <Card className="sketchy-card bg-white border-4 border-black">
                <CardContent className="p-8">
                  {/* Tab switcher */}
                  <div className="flex mb-8 border-b-2 border-gray-200">
                    <button
                      onClick={() => { setAuthMode('login'); setAuthError('') }}
                      className={`flex-1 pb-3 font-black uppercase text-sm transition-colors ${authMode === 'login' ? 'text-red-600 border-b-4 border-red-600 -mb-0.5' : 'text-gray-500 hover:text-gray-700'}`}
                    >Sign In</button>
                    <button
                      onClick={() => { setAuthMode('register'); setAuthError('') }}
                      className={`flex-1 pb-3 font-black uppercase text-sm transition-colors ${authMode === 'register' ? 'text-red-600 border-b-4 border-red-600 -mb-0.5' : 'text-gray-500 hover:text-gray-700'}`}
                    >Create Account</button>
                  </div>

                  {authError && (
                    <div className="mb-4 p-3 bg-red-50 border-2 border-red-400 rounded text-red-700 font-bold text-sm">{authError}</div>
                  )}

                  {authMode === 'login' ? (
                    <form onSubmit={handleLogin} className="space-y-5">
                      <div>
                        <Label className="font-black uppercase text-sm mb-2 block"><Mail className="h-4 w-4 inline mr-1" />Email</Label>
                        <Input type="email" required value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})}
                          className="border-2 border-gray-300 focus:border-red-600 font-bold" placeholder="you@example.com" />
                      </div>
                      <div>
                        <Label className="font-black uppercase text-sm mb-2 block"><Lock className="h-4 w-4 inline mr-1" />Password</Label>
                        <div className="relative">
                          <Input type={showPassword ? 'text' : 'password'} required value={loginForm.password}
                            onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                            className="border-2 border-gray-300 focus:border-red-600 font-bold pr-10" placeholder="••••••••" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 font-bold bg-gray-50 p-2 rounded">
                        Demo: demo@underarmour.com / password
                      </div>
                      <Button type="submit" disabled={authLoading} className="ua-btn-primary w-full py-4 text-base">
                        {authLoading ? 'Signing In...' : 'Sign In'}
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={handleRegister} className="space-y-5">
                      <div>
                        <Label className="font-black uppercase text-sm mb-2 block"><User className="h-4 w-4 inline mr-1" />Full Name</Label>
                        <Input type="text" required value={registerForm.name} onChange={e => setRegisterForm({...registerForm, name: e.target.value})}
                          className="border-2 border-gray-300 focus:border-red-600 font-bold" placeholder="John Doe" />
                      </div>
                      <div>
                        <Label className="font-black uppercase text-sm mb-2 block"><Mail className="h-4 w-4 inline mr-1" />Email</Label>
                        <Input type="email" required value={registerForm.email} onChange={e => setRegisterForm({...registerForm, email: e.target.value})}
                          className="border-2 border-gray-300 focus:border-red-600 font-bold" placeholder="you@example.com" />
                      </div>
                      <div>
                        <Label className="font-black uppercase text-sm mb-2 block"><Lock className="h-4 w-4 inline mr-1" />Password</Label>
                        <div className="relative">
                          <Input type={showPassword ? 'text' : 'password'} required minLength={8} value={registerForm.password}
                            onChange={e => setRegisterForm({...registerForm, password: e.target.value})}
                            className="border-2 border-gray-300 focus:border-red-600 font-bold pr-10" placeholder="Min. 8 characters" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <Button type="submit" disabled={authLoading} className="ua-btn-primary w-full py-4 text-base">
                        {authLoading ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </PageLayout>
    )
  }

  const memberSince = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'

  return (
    <PageLayout seoTitle="My Account | Under Armour®">
      <main className="flex-1 bg-gray-100">
        <section className="relative bg-black text-white py-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight mb-6">
                My <span className="text-red-600">Account</span>
              </h1>
              <p className="text-xl text-gray-300 font-bold">Manage your profile, orders, and preferences.</p>
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
                        <Link href="/account" className="flex items-center space-x-3 p-3 bg-red-600 text-white rounded sketchy-border font-bold uppercase">
                          <User className="h-5 w-5" /><span>Profile</span>
                        </Link>
                        <Link href="/account/orders" className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded transition-colors font-bold uppercase text-gray-700">
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

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <Card className="sketchy-card bg-white border-4 border-black">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-3xl font-black uppercase">Personal Information</h3>
                      <Link href="/account/settings">
                        <Button className="sketchy-btn-outline border-2 border-black text-black hover:bg-black hover:text-white font-black uppercase">Edit</Button>
                      </Link>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-black uppercase text-sm mb-2 text-gray-600">Full Name</label>
                        <div className="p-3 bg-gray-50 rounded sketchy-border font-bold">{user?.name || '—'}</div>
                      </div>
                      <div>
                        <label className="block font-black uppercase text-sm mb-2 text-gray-600">Email</label>
                        <div className="p-3 bg-gray-50 rounded sketchy-border font-bold flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-red-600" />{user?.email || '—'}
                        </div>
                      </div>
                      <div>
                        <label className="block font-black uppercase text-sm mb-2 text-gray-600">Phone</label>
                        <div className="p-3 bg-gray-50 rounded sketchy-border font-bold flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-red-600" />{user?.phone || 'Not set'}
                        </div>
                      </div>
                      <div>
                        <label className="block font-black uppercase text-sm mb-2 text-gray-600">Member Since</label>
                        <div className="p-3 bg-gray-50 rounded sketchy-border font-bold">{memberSince}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="sketchy-card bg-white border-4 border-black">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-3xl font-black uppercase">Shipping Address</h3>
                      <Link href="/account/settings">
                        <Button className="sketchy-btn-outline border-2 border-black text-black hover:bg-black hover:text-white font-black uppercase">Edit</Button>
                      </Link>
                    </div>
                    {user?.address ? (
                      <div className="p-4 bg-gray-50 rounded sketchy-border">
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-red-600 mt-1" />
                          <div className="font-bold">
                            <p>{user.address}</p>
                            <p>{user.city}{user.city && user.state ? ', ' : ''}{user.state} {(user as any).zip_code || ''}</p>
                            <p>{user.country}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 text-center text-gray-500">
                        <MapPin className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                        <p className="font-bold">No shipping address saved yet.</p>
                        <Link href="/account/settings" className="text-red-600 font-black text-sm hover:underline">Add Address →</Link>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="sketchy-card bg-white border-4 border-black">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-3xl font-black uppercase">Quick Links</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Link href="/account/orders">
                        <div className="p-6 border-2 border-gray-200 rounded sketchy-border hover:border-red-600 transition-colors text-center cursor-pointer">
                          <Package className="h-10 w-10 text-red-600 mx-auto mb-3" />
                          <p className="font-black uppercase">My Orders</p>
                        </div>
                      </Link>
                      <Link href="/account/wishlist">
                        <div className="p-6 border-2 border-gray-200 rounded sketchy-border hover:border-red-600 transition-colors text-center cursor-pointer">
                          <Heart className="h-10 w-10 text-red-600 mx-auto mb-3" />
                          <p className="font-black uppercase">Wishlist</p>
                        </div>
                      </Link>
                      <Link href="/account/settings">
                        <div className="p-6 border-2 border-gray-200 rounded sketchy-border hover:border-red-600 transition-colors text-center cursor-pointer">
                          <Settings className="h-10 w-10 text-red-600 mx-auto mb-3" />
                          <p className="font-black uppercase">Settings</p>
                        </div>
                      </Link>
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
