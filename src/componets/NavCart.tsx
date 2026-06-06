'use client'

import { useCart } from '@/componets/CartProvider'
import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'

export default function NavCart() {
  const { openCart } = useCart()
  const { count } = useCartStore()

  return (
    <button
      onClick={openCart}
      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
    >
      Cart
      {count() > 0 && (
        <span style={{ background: '#C9A84C', color: '#0A0A0A', borderRadius: '50%', width: '18px', height: '18px', fontSize: '0.6rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {count()}
        </span>
      )}
    </button>
  )
}