import type { Metadata } from 'next'
import AccountClient from "./account-client"

export const metadata: Metadata = {
  title: 'My Account | Under Armour',
  description: 'Manage your Under Armour account, orders, and preferences.',
}

export default function AccountPage() {
  return <AccountClient />
}
