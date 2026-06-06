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
    <main style={{ fontFamily: 'Georgia, serif', background: '#0A0A0A', minHeight: '100vh' }}>

      {/* FREE SHIPPING BANNER */}
      <div style={{ background: '#C9A84C', color: '#0A0A0A', textAlign: 'center', padding: '0.6rem', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        ✦ Free Shipping on All Orders $75+ ✦
      </div>

      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 3rem', borderBottom: '0.5px solid rgba(201,168,76,0.2)', position: 'sticky', top: 0, background: '#0A0A0A', zIndex: 100 }}>
        <Link href="/" style={{ fontSize: '1.3rem', letterSpacing: '0.18em', color: '#C9A84C', textTransform: 'uppercase', textDecoration: 'none' }}>Legacy Scents</Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/shop" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Shop</Link>
          <Link href="/cart" style={{ color: '#C9A84C', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Cart ({count()})</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2.5rem', fontWeight: 300, color: '#ffffff', marginBottom: '3rem' }}>Your Cart</h1>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', marginBottom: '2rem' }}>Your cart is empty</p>
            <Link href="/shop" style={{ padding: '0.85rem 2rem', background: '#C9A84C', color: '#0A0A0A', textDecoration: 'none', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Shop the Collection
            </Link>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '2rem' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem 0', borderBottom: '0.5px solid rgba(201,168,76,0.15)' }}>
                  <div style={{ width: '60px', height: '80px', background: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '0.5px solid rgba(201,168,76,0.2)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                      <div style={{ width: '8px', height: '6px', background: '#C9A84C', borderRadius: '1px 1px 0 0' }}></div>
                      <div style={{ width: '6px', height: '8px', background: '#1A1A1A' }}></div>
                      <div style={{ width: '24px', height: '36px', border: '0.5px solid rgba(201,168,76,0.3)', borderRadius: '1px 1px 3px 3px' }}></div>
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.65rem', color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{item.brand}</div>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: '#ffffff', marginBottom: '0.25rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{item.size} · ${item.price}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '28px', height: '28px', background: 'none', border: '0.5px solid rgba(201,168,76,0.3)', color: '#ffffff', cursor: 'pointer', fontSize: '1rem' }}>−</button>
                    <span style={{ color: '#ffffff', fontSize: '0.9rem', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '28px', height: '28px', background: 'none', border: '0.5px solid rgba(201,168,76,0.3)', color: '#ffffff', cursor: 'pointer', fontSize: '1rem' }}>+</button>
                  </div>
                  <div style={{ fontSize: '1rem', color: '#C9A84C', fontWeight: 500, minWidth: '60px', textAlign: 'right' }}>${(item.price * item.quantity).toFixed(2)}</div>
                  <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '1.1rem', padding: '0.25rem' }}>✕</button>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '0.5px solid rgba(201,168,76,0.2)', paddingTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Subtotal</span>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', fontWeight: 300, color: '#ffffff' }}>${total().toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                style={{ width: '100%', padding: '1.1rem', background: '#C9A84C', color: '#0A0A0A', border: 'none', fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer' }}>
                Proceed to Checkout
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '1rem' }}>Shipping & taxes calculated at checkout</p>
            </div>
          </>
        )}
      </div>
    </main>
  )
}