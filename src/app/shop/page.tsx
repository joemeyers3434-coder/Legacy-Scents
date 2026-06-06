import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ShopPage() {
  const supabase = createClient(
    'https://dvbxgfpfcnmermovftqc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2YnhnZnBmY25tZXJtb3ZmdHFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2OTk0MDAsImV4cCI6MjA5NjI3NTQwMH0.ayoAEGdK8Bv7e6407Fv3yPnzRbj390urWwZQGz-g3fk'
  )

  const { data: fragrances } = await supabase
    .from('fragrances')
    .select('*, variants(*)')
    .order('name')

  return (
    <main style={{ fontFamily: 'Georgia, serif', background: '#0A0A0A', minHeight: '100vh' }}>

      {/* FREE SHIPPING BANNER */}
      <div style={{ background: '#C9A84C', color: '#0A0A0A', textAlign: 'center', padding: '0.6rem', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        ✦ Free Shipping on All Orders $75+ ✦
      </div>

      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 3rem', borderBottom: '0.5px solid rgba(201,168,76,0.2)', position: 'sticky', top: 0, background: '#0A0A0A', zIndex: 100 }}>
        <Link href="/" style={{ fontSize: '1.3rem', letterSpacing: '0.18em', color: '#C9A84C', textTransform: 'uppercase', textDecoration: 'none' }}>Legacy Scents</Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/shop" style={{ color: '#C9A84C', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Shop</Link>
          <Link href="/cart" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Cart</Link>
        </div>
      </nav>

      <div style={{ textAlign: 'center', padding: '4rem 2rem 2rem', color: '#ffffff' }}>
        <span style={{ fontSize: '0.63rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A84C', display: 'block', marginBottom: '0.75rem' }}>The Collection</span>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, marginBottom: '0.75rem' }}>All Fragrances</h1>
        <p style={{ fontSize: '0.87rem', color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}>Available in 1ml · 2ml · 5ml · 10ml · 30ml sizes</p>
      </div>

      <div style={{ padding: '2rem 3rem 5rem', background: '#ffffff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1px', background: 'rgba(0,0,0,0.1)' }}>
          {fragrances?.map((f: any) => (
            <Link key={f.id} href={`/shop/${f.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#F9F9F9', padding: '2rem 1.75rem', cursor: 'pointer', height: '100%', transition: 'background 0.22s' }}>
                <div style={{ height: '200px', marginBottom: '1.25rem', overflow: 'hidden', background: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {f.image_url ? (
                    <img src={f.image_url} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ color: 'rgba(201,168,76,0.4)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{f.brand}</span>
                  )}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{f.brand}</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: '#0A0A0A', marginBottom: '0.4rem' }}>{f.name}</div>
                <div style={{ fontSize: '0.72rem', color: '#555555', marginBottom: '0.75rem', lineHeight: 1.6 }}>{f.scent_notes}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.78rem', color: '#C9A84C', fontWeight: 500 }}>
                    {f.variants?.length > 0 ? `From $${Math.min(...f.variants.map((v: any) => Number(v.price)))}` : 'View sizes'}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#888888', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {f.variants?.length || 0} sizes
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}