import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import NavCart from '../../componets/NavCart'

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
    <main style={{ background: '#fff', minHeight: '100vh' }}>

      <div style={{ background: '#111', color: '#fff', textAlign: 'center', padding: '8px', fontSize: '12px', letterSpacing: '0.05em' }}>
        Free shipping on orders $75+
      </div>

      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', borderBottom: '1px solid #e5e5e5', position: 'sticky', top: 0, background: '#fff', zIndex: 100 }}>
        <Link href="/" style={{ fontSize: '18px', fontWeight: 700, color: '#111', textDecoration: 'none', letterSpacing: '-0.02em' }}>Legacy Scents</Link>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#111', textDecoration: 'none', fontSize: '14px' }}>Home</Link>
          <Link href="/shop" style={{ color: '#111', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>Catalog</Link>
          <NavCart />
        </div>
      </nav>

      <div style={{ padding: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111', marginBottom: '32px', letterSpacing: '-0.02em' }}>All Fragrances</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
          {fragrances?.map((f: any) => {
            const minPrice = f.variants?.length > 0 ? Math.min(...f.variants.map((v: any) => Number(v.price))) : null
            return (
              <Link key={f.id} href={`/shop/${f.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ border: '1px solid #e5e5e5', overflow: 'hidden' }}>
                  <div style={{ background: '#f5f5f5', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                    {f.image_url ? (
                      <img src={f.image_url} alt={f.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    ) : (
                      <div style={{ fontSize: '11px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{f.brand}</div>
                    )}
                  </div>
                  <div style={{ padding: '14px' }}>
                    <p style={{ fontSize: '11px', color: '#888', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{f.brand}</p>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#111', marginBottom: '6px' }}>{f.name}</p>
                    <p style={{ fontSize: '13px', color: '#555' }}>{minPrice ? `From $${minPrice} USD` : 'View sizes'}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <footer style={{ borderTop: '1px solid #e5e5e5', padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
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
