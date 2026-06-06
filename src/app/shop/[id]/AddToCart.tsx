'use client'

import { useState } from 'react'
import { useCartStore } from '../../../store/cartStore'

interface Variant {
  id: string
  size: string
  price: number
  stock_quantity: number
}

interface Props {
  fragrance: {
    id: string
    name: string
    brand: string
    image_url?: string
  }
  variants: Variant[]
}

export default function AddToCart({ fragrance, variants }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0])
  const [added, setAdded] = useState(false)
  const addItem = useCartStore(s => s.addItem)
  const openCart = useCartStore(s => s.openCart)

  function handleAdd() {
    addItem({
      id: selectedVariant.id,
      fragranceId: fragrance.id,
      name: fragrance.name,
      brand: fragrance.brand,
      size: selectedVariant.size,
      price: selectedVariant.price,
      image_url: fragrance.image_url,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    openCart()
  }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Select Size</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {variants.map((v) => (
            <div
              key={v.id}
              onClick={() => setSelectedVariant(v)}
              style={{
                padding: '10px 16px',
                border: selectedVariant.id === v.id ? '2px solid #111' : '1px solid #ddd',
                cursor: 'pointer',
                textAlign: 'center',
                minWidth: '80px',
                background: selectedVariant.id === v.id ? '#111' : '#fff',
                color: selectedVariant.id === v.id ? '#fff' : '#111',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '2px' }}>{v.size}</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>${v.price}</div>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '16px' }}>
        ${selectedVariant?.price} USD
      </p>

      <button
        onClick={handleAdd}
        style={{
          width: '100%',
          padding: '14px',
          background: added ? '#2a7a3b' : '#111',
          color: '#fff',
          border: 'none',
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        {added ? '✓ Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  )
}
