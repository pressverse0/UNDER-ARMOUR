const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Database = require('better-sqlite3')
const path = require('path')
const { allProducts } = require('./products-data')

const app = express()
const PORT = 8000
const JWT_SECRET = 'ua_secret_key_2024_secure'
const DB_PATH = path.join(__dirname, 'data.db')

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

// ─── Database Setup ────────────────────────────────────────────────────────
const db = new Database(DB_PATH)

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT DEFAULT '',
    address TEXT DEFAULT '',
    city TEXT DEFAULT '',
    state TEXT DEFAULT '',
    zip TEXT DEFAULT '',
    country TEXT DEFAULT 'US',
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    order_number TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'processing',
    total REAL NOT NULL,
    subtotal REAL NOT NULL,
    shipping REAL DEFAULT 5.99,
    shipping_address TEXT NOT NULL,
    tracking_number TEXT,
    carrier TEXT DEFAULT 'UPS',
    estimated_delivery TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    image TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id)
  );

  CREATE TABLE IF NOT EXISTS wishlists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    UNIQUE(user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`)

// ─── Auth Middleware ────────────────────────────────────────────────────────
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

// ─── Auth Routes ────────────────────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(422).json({ message: 'Name, email, and password are required' })
    }
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
    if (existing) {
      return res.status(422).json({ message: 'Email already in use' })
    }
    const hashed = await bcrypt.hash(password, 10)
    const result = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)').run(name, email, hashed)
    const user = db.prepare('SELECT id, name, email, phone, address, city, state, zip, country, created_at FROM users WHERE id = ?').get(result.lastInsertRowid)
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
    res.status(201).json({ user, token })
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(422).json({ message: 'Email and password are required' })
    }
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    const { password: _, ...safeUser } = user
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ user: safeUser, token })
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message })
  }
})

app.post('/api/auth/logout', authMiddleware, (req, res) => {
  res.json({ message: 'Logged out successfully' })
})

app.get('/api/user', authMiddleware, (req, res) => {
  const user = db.prepare('SELECT id, name, email, phone, address, city, state, zip, country, created_at FROM users WHERE id = ?').get(req.user.id)
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json(user)
})

app.put('/api/user', authMiddleware, (req, res) => {
  const { name, phone, address, city, state, zip, country } = req.body
  db.prepare('UPDATE users SET name=?, phone=?, address=?, city=?, state=?, zip=?, country=? WHERE id=?')
    .run(name || '', phone || '', address || '', city || '', state || '', zip || '', country || 'US', req.user.id)
  const user = db.prepare('SELECT id, name, email, phone, address, city, state, zip, country, created_at FROM users WHERE id = ?').get(req.user.id)
  res.json(user)
})

// ─── Product Routes ─────────────────────────────────────────────────────────
app.get('/api/products', (req, res) => {
  let products = allProducts.filter(p => p.inStock !== false || req.query.include_out_of_stock)
  const { gender, category, min_price, max_price, search, sort, is_new, is_sale } = req.query

  if (gender) products = products.filter(p => p.gender && p.gender.toLowerCase() === gender.toLowerCase())
  if (category) products = products.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase())
  if (min_price) products = products.filter(p => p.price >= parseFloat(min_price))
  if (max_price) products = products.filter(p => p.price <= parseFloat(max_price))
  if (is_new === 'true') products = products.filter(p => p.isNew)
  if (is_sale === 'true') products = products.filter(p => p.isSale)
  if (search) {
    const q = search.toLowerCase()
    products = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
  }

  switch (sort) {
    case 'price_asc': products.sort((a, b) => a.price - b.price); break
    case 'price_desc': products.sort((a, b) => b.price - a.price); break
    case 'rating': products.sort((a, b) => b.rating - a.rating); break
    default: products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
  }

  const page = parseInt(req.query.page) || 1
  const perPage = parseInt(req.query.per_page) || 15
  const total = products.length
  const data = products.slice((page - 1) * perPage, page * perPage)

  res.json({ data, meta: { total, page, per_page: perPage, last_page: Math.ceil(total / perPage) } })
})

app.get('/api/products/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase()
  if (!q || q.length < 2) return res.status(422).json({ message: 'Query must be at least 2 characters' })
  const results = allProducts.filter(p =>
    p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  )
  res.json({ data: results, meta: { total: results.length } })
})

app.get('/api/products/new-arrivals', (req, res) => {
  const limit = parseInt(req.query.limit) || 10
  const products = allProducts.filter(p => p.isNew).slice(0, limit)
  res.json({ data: products })
})

app.get('/api/products/sale', (req, res) => {
  const limit = parseInt(req.query.limit) || 10
  const products = allProducts.filter(p => p.isSale).slice(0, limit)
  res.json({ data: products })
})

app.get('/api/products/:id', (req, res) => {
  const product = allProducts.find(p => p.id === parseInt(req.params.id))
  if (!product) return res.status(404).json({ message: 'Product not found' })
  res.json(product)
})

app.get('/api/products/:id/sizes', (req, res) => {
  const product = allProducts.find(p => p.id === parseInt(req.params.id))
  if (!product) return res.status(404).json({ message: 'Product not found' })
  res.json({ sizes: product.size || [] })
})

app.get('/api/products/:id/colors', (req, res) => {
  const product = allProducts.find(p => p.id === parseInt(req.params.id))
  if (!product) return res.status(404).json({ message: 'Product not found' })
  res.json({ colors: product.color || [] })
})

// ─── Order Routes ────────────────────────────────────────────────────────────
app.get('/api/orders', authMiddleware, (req, res) => {
  const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id)
  const result = orders.map(o => ({
    ...o,
    items: db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(o.id),
    shipping_address: JSON.parse(o.shipping_address || '{}')
  }))
  res.json({ data: result })
})

app.get('/api/orders/:orderId', authMiddleware, (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE id = ? AND user_id = ?').get(req.params.orderId, req.user.id)
  if (!order) return res.status(404).json({ message: 'Order not found' })
  const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id)
  res.json({ ...order, items, shipping_address: JSON.parse(order.shipping_address || '{}') })
})

app.post('/api/orders/track', authMiddleware, (req, res) => {
  const { order_number } = req.body
  if (!order_number) return res.status(422).json({ message: 'Order number is required' })

  const order = db.prepare('SELECT * FROM orders WHERE order_number = ? AND user_id = ?').get(order_number, req.user.id)
  if (!order) return res.status(404).json({ message: 'Order not found' })

  const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id)
  res.json({
    ...order,
    items,
    shipping_address: JSON.parse(order.shipping_address || '{}'),
    tracking_history: buildTrackingHistory(order)
  })
})

function buildTrackingHistory(order) {
  const created = new Date(order.created_at)
  const events = [{ date: formatDate(created), time: formatTime(created), status: 'Order Placed', location: 'Online', completed: true }]
  if (['shipped', 'delivered'].includes(order.status)) {
    const shipped = new Date(created.getTime() + 86400000)
    events.push({ date: formatDate(shipped), time: '09:00 AM', status: 'Shipped', location: 'Warehouse', completed: true })
  }
  if (order.status === 'delivered') {
    const delivered = new Date(created.getTime() + 3 * 86400000)
    events.push({ date: formatDate(delivered), time: '02:30 PM', status: 'Delivered', location: 'Your Door', completed: true })
  }
  return events
}

function formatDate(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
function formatTime(d) {
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

function generateOrderNumber() {
  const year = new Date().getFullYear()
  const rand = Math.floor(Math.random() * 900000) + 100000
  return `UA-${year}-${rand}`
}

function generateTrackingNumber() {
  return '1Z' + Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16)
}

function getEstimatedDelivery() {
  const d = new Date()
  d.setDate(d.getDate() + 5)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

// ─── Wishlist Routes ─────────────────────────────────────────────────────────
app.get('/api/wishlist', authMiddleware, (req, res) => {
  const items = db.prepare('SELECT product_id FROM wishlists WHERE user_id = ?').all(req.user.id)
  const products = items.map(i => allProducts.find(p => p.id === i.product_id)).filter(Boolean)
  res.json({ data: products })
})

app.post('/api/wishlist', authMiddleware, (req, res) => {
  const { product_id } = req.body
  if (!product_id) return res.status(422).json({ message: 'product_id is required' })
  const product = allProducts.find(p => p.id === product_id)
  if (!product) return res.status(404).json({ message: 'Product not found' })
  try {
    db.prepare('INSERT OR IGNORE INTO wishlists (user_id, product_id) VALUES (?, ?)').run(req.user.id, product_id)
    res.status(201).json({ message: 'Added to wishlist', product })
  } catch (err) {
    res.status(500).json({ message: 'Failed to add to wishlist' })
  }
})

app.delete('/api/wishlist/:productId', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM wishlists WHERE user_id = ? AND product_id = ?').run(req.user.id, parseInt(req.params.productId))
  res.json({ message: 'Removed from wishlist' })
})

app.get('/api/wishlist/:productId/check', authMiddleware, (req, res) => {
  const item = db.prepare('SELECT id FROM wishlists WHERE user_id = ? AND product_id = ?').get(req.user.id, parseInt(req.params.productId))
  res.json({ in_wishlist: !!item })
})

// ─── Checkout Routes ─────────────────────────────────────────────────────────
app.post('/api/checkout/validate', authMiddleware, (req, res) => {
  const { address, city, state, zip_code, country, items } = req.body
  if (!address || !city || !state || !zip_code) {
    return res.status(422).json({ message: 'All address fields are required' })
  }
  const subtotal = (items || []).reduce((sum, item) => {
    const product = allProducts.find(p => p.id === item.id)
    return sum + (product ? product.price * item.quantity : 0)
  }, 0)
  const shipping = 5.99
  res.json({ valid: true, totals: { subtotal, shipping, total: subtotal + shipping } })
})

app.post('/api/checkout/process', authMiddleware, (req, res) => {
  try {
    const { address, city, state, zip_code, country, items, full_name, email } = req.body
    if (!address || !city || !state || !zip_code) {
      return res.status(422).json({ message: 'All address fields are required' })
    }
    if (!items || items.length === 0) {
      return res.status(422).json({ message: 'Cart is empty' })
    }

    const cartItems = items.map(item => {
      const product = allProducts.find(p => p.id === item.id)
      if (!product) return null
      return { ...product, quantity: item.quantity }
    }).filter(Boolean)

    if (cartItems.length === 0) return res.status(422).json({ message: 'No valid items in cart' })

    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const shipping = 5.99
    const total = subtotal + shipping
    const orderNumber = generateOrderNumber()
    const trackingNumber = generateTrackingNumber()
    const estimatedDelivery = getEstimatedDelivery()
    const shippingAddress = JSON.stringify({ address, city, state, zip_code, country: country || 'US' })

    const order = db.prepare(`
      INSERT INTO orders (user_id, order_number, status, total, subtotal, shipping, shipping_address, tracking_number, carrier, estimated_delivery)
      VALUES (?, ?, 'processing', ?, ?, ?, ?, ?, 'UPS', ?)
    `).run(req.user.id, orderNumber, total, subtotal, shipping, shippingAddress, trackingNumber, estimatedDelivery)

    const orderId = order.lastInsertRowid
    const insertItem = db.prepare('INSERT INTO order_items (order_id, product_id, name, price, quantity, image) VALUES (?, ?, ?, ?, ?, ?)')
    for (const item of cartItems) {
      insertItem.run(orderId, item.id, item.name, item.price, item.quantity, item.image)
    }

    const createdOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId)
    const orderItems = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(orderId)

    res.status(201).json({
      ...createdOrder,
      items: orderItems,
      shipping_address: JSON.parse(shippingAddress),
      message: 'Order created successfully'
    })
  } catch (err) {
    res.status(500).json({ message: 'Checkout failed', error: err.message })
  }
})

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, 'localhost', () => {
  console.log(`Under Armour API running on http://localhost:${PORT}`)
})
