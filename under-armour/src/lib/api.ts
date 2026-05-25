const API_BASE = '/api'

function getToken(): string | null {
  return localStorage.getItem('ua_token')
}

function setToken(token: string) {
  localStorage.setItem('ua_token', token)
}

function clearToken() {
  localStorage.removeItem('ua_token')
  localStorage.removeItem('ua_user')
}

function getHeaders(auth = false): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  auth = false
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: getHeaders(auth),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  const contentType = res.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const data = isJson ? await res.json() : null
  if (!res.ok) {
    const msg = data?.message || data?.error || `Request failed (${res.status})`
    throw new Error(msg)
  }
  return data as T
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip_code: string
  country: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: number
  product_id: number
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: number
  order_number: string
  status: string
  total: number
  subtotal: number
  shipping: number
  shipping_address: { address: string; city: string; state: string; zip_code: string; country: string }
  tracking_number: string
  carrier: string
  estimated_delivery: string
  created_at: string
  items: OrderItem[]
  tracking_history?: { date: string; time: string; status: string; location: string; completed: boolean }[]
}

// ─── Auth ──────────────────────────────────────────────────────────────────
export const auth = {
  register: (data: { name: string; email: string; password: string }) =>
    request<{ user: User; token: string }>('POST', '/auth/register', data),

  login: (data: { email: string; password: string }) =>
    request<{ user: User; token: string }>('POST', '/auth/login', data),

  logout: () => request<{ message: string }>('POST', '/auth/logout', {}, true),

  getUser: () => request<User>('GET', '/auth/me', undefined, true),

  updateUser: (data: Partial<User>) =>
    request<{ user: User }>('PUT', '/auth/profile', data, true),
}

// ─── Orders ────────────────────────────────────────────────────────────────
export const orders = {
  getAll: () => request<{ data: Order[] }>('GET', '/orders', undefined, true),
  getById: (id: number) => request<Order>('GET', `/orders/${id}`, undefined, true),
  track: (orderNumber: string) =>
    request<Order>('POST', '/orders/track', { order_number: orderNumber }, true),
}

// ─── Wishlist ──────────────────────────────────────────────────────────────
export const wishlist = {
  getAll: () => request<{ data: unknown[] }>('GET', '/wishlist', undefined, true),
  add: (productId: number) =>
    request<{ message: string }>('POST', '/wishlist', { product_id: productId }, true),
  remove: (productId: number) =>
    request<{ message: string }>('DELETE', `/wishlist/${productId}`, undefined, true),
  check: (productId: number) =>
    request<{ in_wishlist: boolean }>('GET', `/wishlist/${productId}/check`, undefined, true),
}

// ─── Checkout ─────────────────────────────────────────────────────────────
export const checkout = {
  validate: (data: { address: string; city: string; state: string; zip_code: string; country: string; items: { id: number; quantity: number }[] }) =>
    request<{ valid: boolean; totals: { subtotal: number; shipping: number; total: number } }>('POST', '/checkout/validate', data, true),

  process: (data: {
    address: string; city: string; state: string; zip_code: string; country: string;
    items: { id: number; quantity: number }[]; full_name?: string; email?: string
  }) =>
    request<Order>('POST', '/checkout/process', data, true),
}

// ─── Token helpers ────────────────────────────────────────────────────────
export { getToken, setToken, clearToken }
