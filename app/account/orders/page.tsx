import type { Metadata } from 'next'
import OrdersClient from './orders-client'

export const metadata: Metadata = {
  title: 'My Orders | Under Armour',
  description: 'View and track your Under Armour orders.',
}

export default function OrdersPage() {
  return <OrdersClient />
}
