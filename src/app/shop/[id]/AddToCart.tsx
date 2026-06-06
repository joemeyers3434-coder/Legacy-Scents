'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useCart } from '@/componets/CartProvider'

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
  const { openCart } = useCart()

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
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247,249,252,0.5)', marginBottom: '1rem' }}>Select Size</div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {variants.map((v) => (
            <div
              key={v.id}
              onClick={() => setSelectedVariant(v)}
              style={{
                padding: '0.75rem 1.25rem',
                border: selectedVariant.id === v.id ? '1px solid #C9A84C' : '0.5px solid rgba(201,168,76,0.3)',
                cursor: 'pointer',
                textAlign: 'center',
                minWidth: '80px',
                background: selectedVariant.id === v.id ? 'rgba(201,168,76,0.1)' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#F7F9FC', marginBottom: '0.25rem' }}>{v.size}</div>
              <div style={{ fontSize: '0.75rem', color: '#C9A84C' }}>${v.price}</div>
              <div style={{ fontSize: '0.6rem', color: 'rgba(247,249,252,0.3)', marginTop: '0.25rem' }}>{v.stock_quantity} left</div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleAdd}
        style={{
          padding: '1rem 2.5rem',
          background: added ? '#2D5A3D' : '#C9A84C',
          color: added ? '#F7F9FC' : '#0B1F3A',
          border: 'none',
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
      >
        {added ? '✓ Added to Cart!' : 'Add to Cart'}
      </button>
    </div>
  )
}