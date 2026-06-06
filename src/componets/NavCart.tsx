'use client'

import { useCartStore } from '../store/cartStore'

export default function NavCart() {
  const { openCart, count } = useCartStore()
  const itemCount = count()

  return (
    <button
      onClick={openCart}
      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}
    >
      Cart
      {itemCount > 0 && (
        <span style={{ background: '#111', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {itemCount}
        </span>
      )}
    </button>
  )
}
