import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import NavCart from '../componets/NavCart'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createClient(
    'https://dvbxgfpfcnmermovftqc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2YnhnZnBmY25tZXJtb3ZmdHFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2OTk0MDAsImV4cCI6MjA5NjI3NTQwMH0.ayoAEGdK8Bv7e6407Fv3yPnzRbj390urWwZQGz-g3fk'
  )

  const { data: fragrances } = await supabase
    .from('fragrances')
    .select('*, variants(*)')
    .order('name')

  const featured = fragrances?.slice(0, 1)[0]
  const designer = fragrances?.filter((f: any) => f.category === 'designer') ?? fragrances ?? []
  const niche = fragrances?.filter((f: any) => f.category === 'niche') ?? []

  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>

      {/* ANNOUNCEMENT BAR */}
      <div style={{ background: '#111', color: '#fff', textAlign: 'center', padding: '8px', fontSize: '12px', letterSpacing: '0.05em' }}>
        Free shipping on orders $75+
      </div>

      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', borderBottom: '1px solid #e5e5e5', position: 'sticky', top: 0, background: '#fff', zIndex: 100 }}>
        <Link href="/" style={{ fontSize: '18px', fontWeight: 700, color: '#111', textDecoration: 'none', letterSpacing: '-0.02em' }}>Legacy Scents</Link>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#111', textDecoration: 'none', fontSize: '14px' }}>Home</Link>
          <Link href="/shop" style={{ color: '#111', textDecoration: 'none', fontSize: '14px' }}>Catalog</Link>
          <NavCart />
        </div>
      </nav>

      {/* HERO */}
      {featured && (
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '500px', borderBottom: '1px solid #e5e5e5' }}>
          <div style={{ background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
            {featured.image_url ? (
              <img src={featured.image_url} alt={featured.name} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
            ) : (
              <div style={{ width: '200px', height: '300px', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#999' }}>{featured.brand}</div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px' }}>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{featured.brand}</p>
            <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#111', marginBottom: '16px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{featured.name}</h1>
            <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.7, marginBottom: '24px', maxWidth: '380px' }}>{featured.description || featured.scent_notes}</p>
            <p style={{ fontSize: '16px', fontWeight: 600, color: '#111', marginBottom: '24px' }}>
              From ${featured.variants?.length > 0 ? Math.min(...featured.variants.map((v: any) => Number(v.price))) : '—'}
            </p>
            <Link href={`/shop/${featured.id}`} style={{ display: 'inline-block', padding: '12px 28px', background: '#111', color: '#fff', textDecoration: 'none', fontSize: '13px', fontWeight: 600, letterSpacing: '0.03em' }}>
              Shop Now
            </Link>
          </div>
        </section>
      )}

      {/* ALL PRODUCTS */}
      <section style={{ padding: '48px 32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111', marginBottom: '24px', letterSpacing: '-0.01em' }}>Shop the Collection</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
          {fragrances?.map((f: any) => (
            <ProductCard key={f.id} f={f} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #e5e5e5', padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: '#fff' }}>
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

function ProductCard({ f }: { f: any }) {
  const minPrice = f.variants?.length > 0 ? Math.min(...f.variants.map((v: any) => Number(v.price))) : null
  return (
    <Link href={`/shop/${f.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ border: '1px solid #e5e5e5', overflow: 'hidden', transition: 'box-shadow 0.2s' }}>
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
}
