'use client'

import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, count } = useCartStore()

  async function handleCheckout() {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else alert('Checkout error: ' + data.error)
  }

  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>

      <div style={{ background: '#111', color: '#fff', textAlign: 'center', padding: '8px', fontSize: '12px', letterSpacing: '0.05em' }}>
        Free shipping on orders $75+
      </div>

      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', borderBottom: '1px solid #e5e5e5', background: '#fff' }}>
        <Link href="/" style={{ fontSize: '18px', fontWeight: 700, color: '#111', textDecoration: 'none' }}>Legacy Scents</Link>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link href="/" style={{ color: '#111', textDecoration: 'none', fontSize: '14px' }}>Home</Link>
          <Link href="/shop" style={{ color: '#111', textDecoration: 'none', fontSize: '14px' }}>Catalog</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111', marginBottom: '32px', letterSpacing: '-0.02em' }}>Your Cart</h1>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px' }}>Your cart is empty</p>
            <Link href="/shop" style={{ padding: '12px 28px', background: '#111', color: '#fff', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
              Browse Catalog
            </Link>
          </div>
        ) : (
          <>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ width: '80px', height: '96px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '8px' }}>
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontSize: '10px', color: '#aaa' }}>LS</span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>{item.brand}</p>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#111', marginBottom: '2px' }}>{item.name}</p>
                  <p style={{ fontSize: '13px', color: '#888' }}>{item.size} · ${item.price}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e5e5' }}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '32px', height: '32px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>−</button>
                  <span style={{ width: '32px', textAlign: 'center', fontSize: '13px' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '32px', height: '32px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>+</button>
                </div>
                <span style={{ fontSize: '15px', fontWeight: 600, minWidth: '64px', textAlign: 'right' }}>${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#aaa' }}>✕</button>
              </div>
            ))}

            <div style={{ paddingTop: '24px', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '280px' }}>
                <span style={{ fontSize: '14px', color: '#888' }}>Subtotal</span>
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#111' }}>${total().toFixed(2)} USD</span>
              </div>
              <p style={{ fontSize: '12px', color: '#aaa' }}>Shipping & taxes calculated at checkout</p>
              <button onClick={handleCheckout} style={{ width: '280px', padding: '14px', background: '#111', color: '#fff', border: 'none', fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer' }}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
