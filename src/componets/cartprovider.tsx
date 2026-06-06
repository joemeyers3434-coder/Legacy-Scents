'use client'

import CartDrawer from './cartdrawer'

export default function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CartDrawer />
      {children}
    </>
  )
}
