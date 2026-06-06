'use client'

import { useState, createContext, useContext } from 'react'
import CartDrawer from './cartdrawer'

const CartContext = createContext({ openCart: () => {} })
export const useCart = () => useContext(CartContext)

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <CartContext.Provider value={{ openCart: () => setOpen(true) }}>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
      {children}
    </CartContext.Provider>
  )
}