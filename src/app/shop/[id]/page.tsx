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

  if (!fragrance) return <div style={{ color: 'white', padding: '2rem' }}>Fragrance not found</div>

  const variants = fragrance.variants?.sort((a: any, b: any) => a.price - b.price) || []

  return (
    <main style={{ fontFamily: 'Georgia, serif', background: '#0B1F3A', minHeight: '100vh' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 3rem', borderBottom: '0.5px solid rgba(201,168,76,0.2)', position: 'sticky', top: 0, background: '#0B1F3A', zIndex: 100 }}>
        <Link href="/" style={{ fontSize: '1.3rem', letterSpacing: '0.18em', color: '#C9A84C', textTransform: 'uppercase', textDecoration: 'none' }}>Legacy Scents</Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/shop" style={{ color: 'rgba(247,249,252,0.6)', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Shop</Link>
          <NavCart />
        </div>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '80vh' }}>
        <div style={{ background: '#162D50', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem' }}>
          {fragrance.image_url ? (
            <img src={fragrance.image_url} alt={fragrance.name} style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }} />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '24px', height: '16px', background: '#C9A84C', borderRadius: '2px 2px 0 0' }}></div>
              <div style={{ width: '18px', height: '24px', background: '#1E3D6B' }}></div>
              <div style={{ width: '100px', height: '200px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '3px 3px 6px 6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'rgba(201,168,76,0.4)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{fragrance.brand}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '4rem', color: '#F7F9FC', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Link href="/shop" style={{ color: 'rgba(201,168,76,0.6)', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block' }}>← Back to Shop</Link>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '0.5rem', display: 'block' }}>{fragrance.brand}</span>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, marginBottom: '1rem', lineHeight: 1.1 }}>{fragrance.name}</h1>
          <p style={{ fontSize: '0.85rem', color: 'rgba(247,249,252,0.55)', lineHeight: 1.9, marginBottom: '1.5rem', fontWeight: 300 }}>{fragrance.description}</p>
          <div style={{ fontSize: '0.75rem', color: 'rgba(247,249,252,0.4)', marginBottom: '2rem', letterSpacing: '0.05em' }}>
            <span style={{ color: '#C9A84C', marginRight: '0.5rem' }}>Notes:</span>{fragrance.scent_notes}
          </div>
          <AddToCart fragrance={{ id: fragrance.id, name: fragrance.name, brand: fragrance.brand, image_url: fragrance.image_url }} variants={variants} />
        </div>
      </div>
    </main>
  )
}