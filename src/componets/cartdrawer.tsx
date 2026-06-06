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
        <div onClick={closeCart} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200 }} />
      )}
      <div style={{
        position: 'fixed', top: 0, right: 0, height: '100vh', width: '400px', maxWidth: '100vw',
        background: '#fff', borderLeft: '1px solid #e5e5e5',
        zIndex: 201, transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease', display: 'flex', flexDirection: 'column'
      }}>
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #e5e5e5' }}>
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#111' }}>Cart ({count()})</span>
          <button onClick={closeCart} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#888', lineHeight: 1 }}>✕</button>
        </div>

        {/* ITEMS */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '64px' }}>
              <p style={{ color: '#888', fontSize: '14px' }}>Your cart is empty</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '12px', paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ width: '72px', height: '88px', background: '#f5f5f5', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontSize: '10px', color: '#aaa' }}>LS</span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>{item.brand}</p>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#111', marginBottom: '2px' }}>{item.name}</p>
                  <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>{item.size}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e5e5' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '28px', height: '28px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#111' }}>−</button>
                      <span style={{ width: '28px', textAlign: 'center', fontSize: '13px', color: '#111' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '28px', height: '28px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#111' }}>+</button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#111' }}>${(item.price * item.quantity).toFixed(2)}</span>
                      <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#aaa' }}>✕</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {items.length > 0 && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e5e5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', color: '#888' }}>Subtotal</span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#111' }}>${total().toFixed(2)} USD</span>
            </div>
            <p style={{ fontSize: '11px', color: '#aaa', marginBottom: '16px' }}>Shipping & taxes calculated at checkout</p>
            <button onClick={handleCheckout} style={{ width: '100%', padding: '14px', background: '#111', color: '#fff', border: 'none', fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}
