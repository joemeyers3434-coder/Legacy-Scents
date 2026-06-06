'use client'

import { useCartStore } from '@/store/cartStore'

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, total, count, isOpen, closeCart } = useCartStore()

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
    <>
      {isOpen && (
        <div onClick={closeCart} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200 }} />
      )}
      <div style={{
        position: 'fixed', top: 0, right: 0, height: '100vh', width: '420px', maxWidth: '100vw',
        background: '#0A0A0A', borderLeft: '0.5px solid rgba(201,168,76,0.2)',
        zIndex: 201, transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s ease', display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '0.5px solid rgba(201,168,76,0.15)' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffffff' }}>
            Cart <span style={{ color: '#C9A84C', fontSize: '0.75rem' }}>({count()})</span>
          </div>
          <button onClick={closeCart} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '1.2rem', padding: '0.25rem' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>Your cart is empty</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '1rem', paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: '0.5px solid rgba(201,168,76,0.1)' }}>
                <div style={{ width: '70px', height: '90px', background: '#ffffff', border: '0.5px solid rgba(201,168,76,0.2)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.25rem' }}>
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  ) : (
                    <div style={{ fontSize: '0.55rem', color: '#C9A84C', textTransform: 'uppercase' }}>LS</div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.58rem', color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{item.brand}</div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.95rem', color: '#ffffff', marginBottom: '0.2rem' }}>{item.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem' }}>{item.size}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '26px', height: '26px', background: 'none', border: '0.5px solid rgba(201,168,76,0.3)', color: '#ffffff', cursor: 'pointer', fontSize: '0.9rem' }}>−</button>
                      <span style={{ color: '#ffffff', fontSize: '0.85rem', minWidth: '16px', textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '26px', height: '26px', background: 'none', border: '0.5px solid rgba(201,168,76,0.3)', color: '#ffffff', cursor: 'pointer', fontSize: '0.9rem' }}>+</button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '0.9rem', color: '#C9A84C' }}>${(item.price * item.quantity).toFixed(2)}</span>
                      <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '0.9rem' }}>✕</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: '1.5rem 2rem', borderTop: '0.5px solid rgba(201,168,76,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Subtotal</span>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', fontWeight: 300, color: '#ffffff' }}>${total().toFixed(2)}</span>
            </div>
            <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginBottom: '1.25rem' }}>Shipping & taxes calculated at checkout</p>
            <button onClick={handleCheckout} style={{ width: '100%', padding: '1rem', background: '#C9A84C', color: '#0A0A0A', border: 'none', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}
