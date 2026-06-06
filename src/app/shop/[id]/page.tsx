import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import AddToCart from './AddToCart'
import NavCart from '@/componets/NavCart'

export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const supabase = createClient(
    'https://dvbxgfpfcnmermovftqc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2YnhnZnBmY25tZXJtb3ZmdHFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2OTk0MDAsImV4cCI6MjA5NjI3NTQwMH0.ayoAEGdK8Bv7e6407Fv3yPnzRbj390urWwZQGz-g3fk'
  )

  const { data: fragrance } = await supabase
    .from('fragrances')
    .select('*, variants(*)')
    .eq('id', id)
    .single()

  if (!fragrance) return <div style={{ padding: '2rem' }}>Fragrance not found</div>

  const variants = fragrance.variants?.sort((a: any, b: any) => a.price - b.price) || []

  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>

      <div style={{ background: '#111', color: '#fff', textAlign: 'center', padding: '8px', fontSize: '12px', letterSpacing: '0.05em' }}>
        Free shipping on orders $75+
      </div>

      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', borderBottom: '1px solid #e5e5e5', position: 'sticky', top: 0, background: '#fff', zIndex: 100 }}>
        <Link href="/" style={{ fontSize: '18px', fontWeight: 700, color: '#111', textDecoration: 'none', letterSpacing: '-0.02em' }}>Legacy Scents</Link>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#111', textDecoration: 'none', fontSize: '14px' }}>Home</Link>
          <Link href="/shop" style={{ color: '#111', textDecoration: 'none', fontSize: '14px' }}>Catalog</Link>
          <NavCart />
        </div>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
        {/* IMAGE */}
        <div style={{ background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px', aspectRatio: '1' }}>
          {fragrance.image_url ? (
            <img src={fragrance.image_url} alt={fragrance.name} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
          ) : (
            <div style={{ fontSize: '12px', color: '#aaa', textTransform: 'uppercase' }}>{fragrance.brand}</div>
          )}
        </div>

        {/* DETAILS */}
        <div style={{ paddingTop: '16px' }}>
          <Link href="/shop" style={{ fontSize: '12px', color: '#888', textDecoration: 'none', display: 'block', marginBottom: '16px' }}>← Back to catalog</Link>
          <p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>{fragrance.brand}</p>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111', marginBottom: '12px', letterSpacing: '-0.02em' }}>{fragrance.name}</h1>
          {fragrance.scent_notes && (
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '24px', lineHeight: 1.6 }}>Notes: {fragrance.scent_notes}</p>
          )}
          {fragrance.description && (
            <p style={{ fontSize: '14px', color: '#444', lineHeight: 1.7, marginBottom: '24px' }}>{fragrance.description}</p>
          )}
          <AddToCart
            fragrance={{ id: fragrance.id, name: fragrance.name, brand: fragrance.brand, image_url: fragrance.image_url }}
            variants={variants}
          />
        </div>
      </div>

      <footer style={{ borderTop: '1px solid #e5e5e5', padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '48px' }}>
        <span style={{ fontWeight: 700, fontSize: '16px' }}>Legacy Scents</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link href="/" style={{ color: '#555', textDecoration: 'none', fontSize: '13px' }}>Home</Link>
          <Link href="/shop" style={{ color: '#555', textDecoration: 'none', fontSize: '13px' }}>Catalog</Link>
          <a href="mailto:supportlegacyscent.co@gmail.com" style={{ color: '#555', textDecoration: 'none', fontSize: '13px' }}>Contact</a>
        </div>
        <span style={{ fontSize: '12px', color: '#999' }}>© 2026 Legacy Scents</span>
      </footer>

    </main>
  )
}
