import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createClient(
    'https://dvbxgfpfcnmermovftqc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2YnhnZnBmY25tZXJtb3ZmdHFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2OTk0MDAsImV4cCI6MjA5NjI3NTQwMH0.ayoAEGdK8Bv7e6407Fv3yPnzRbj390urWwZQGz-g3fk'
  )

  const { data: fragrances } = await supabase
    .from('fragrances')
    .select('*, variants(*)')
    .in('name', ['Night Drive', 'Sugar Blast'])

  return (
    <main style={{ fontFamily: 'Georgia, serif', background: '#0A0A0A', minHeight: '100vh' }}>

      {/* FREE SHIPPING BANNER */}
      <div style={{ background: '#C9A84C', color: '#0A0A0A', textAlign: 'center', padding: '0.6rem', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        ✦ Free Shipping on All Orders $75+ ✦
      </div>

      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 3rem', borderBottom: '0.5px solid rgba(201,168,76,0.2)', background: '#0A0A0A', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ fontSize: '1.3rem', letterSpacing: '0.18em', color: '#C9A84C', textTransform: 'uppercase', textDecoration: 'none' }}>Legacy Scents</Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/shop" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Shop</Link>
          <Link href="/cart" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Cart</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: 'linear-gradient(to bottom, transparent, #C9A84C, transparent)' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '3px', height: '100%', background: 'linear-gradient(to bottom, transparent, #C9A84C, transparent)' }} />
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', padding: '4rem 5rem', gap: '4rem' }}>
          <div>
            <div style={{ width: '40px', height: '1px', background: '#C9A84C', marginBottom: '1.5rem' }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', display: 'block', marginBottom: '1rem' }}>Premium Fragrance Decants</span>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, color: '#ffffff', lineHeight: 1.05, marginBottom: '1.5rem' }}>
              Luxury Scents.<br />
              <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Sample First.</em>
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, marginBottom: '2.5rem', maxWidth: '400px', fontWeight: 300 }}>
              Designer and niche fragrances decanted into sample and travel sizes. Experience luxury without the full bottle commitment.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/shop" style={{ padding: '1rem 2.5rem', background: '#C9A84C', color: '#0A0A0A', textDecoration: 'none', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                Shop Collection
              </Link>
              <Link href="/shop" style={{ padding: '1rem 2.5rem', background: 'transparent', color: '#ffffff', textDecoration: 'none', fontSize: '0.72rem', fontWeight: 400, letterSpacing: '0.14em', textTransform: 'uppercase', border: '0.5px solid rgba(255,255,255,0.3)' }}>
                New Arrivals
              </Link>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {fragrances?.map((f: any) => (
              <Link key={f.id} href={`/shop/${f.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#111111', border: '0.5px solid rgba(201,168,76,0.2)', overflow: 'hidden' }}>
                  <div style={{ height: '260px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
                    {f.image_url ? (
                      <img src={f.image_url} alt={f.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    ) : (
                      <span style={{ color: '#999', fontSize: '0.65rem', textTransform: 'uppercase' }}>{f.brand}</span>
                    )}
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <div style={{ fontSize: '0.58rem', color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{f.brand}</div>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', color: '#ffffff', marginBottom: '0.5rem' }}>{f.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#C9A84C' }}>
                      From ${f.variants?.length > 0 ? Math.min(...f.variants.map((v: any) => Number(v.price))) : '—'}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LS LOGO SECTION */}
      <section style={{ padding: '4rem 3rem', background: '#0A0A0A', textAlign: 'center', borderBottom: '0.5px solid rgba(201,168,76,0.15)' }}>
        <div style={{ width: '160px', height: '160px', borderRadius: '50%', border: '1.5px solid #C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
          <div style={{ width: '140px', height: '140px', borderRadius: '50%', border: '0.5px solid rgba(201,168,76,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '3.5rem', fontWeight: 300, color: '#C9A84C', lineHeight: 1 }}>
              <span style={{ display: 'inline-block', transform: 'translateX(4px)' }}>L</span>
              <span style={{ display: 'inline-block', transform: 'translateX(-4px) translateY(8px)' }}>S</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', fontWeight: 300, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#ffffff' }}>Legacy Scents</div>
          <div style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginTop: '0.4rem' }}>Premium Fragrance Decants</div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section style={{ padding: '5rem 3rem', background: '#ffffff' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.63rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A84C', display: 'block', marginBottom: '0.75rem' }}>Just Dropped</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 300, color: '#0A0A0A' }}>New Arrivals</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
          {fragrances?.map((f: any) => (
            <Link key={f.id} href={`/shop/${f.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#111111', border: '0.5px solid rgba(201,168,76,0.15)', overflow: 'hidden' }}>
                <div style={{ height: '380px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                  {f.image_url ? (
                    <img src={f.image_url} alt={f.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  ) : (
                    <span style={{ color: '#999', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{f.brand}</span>
                  )}
                </div>
                <div style={{ padding: '1.75rem' }}>
                  <div style={{ fontSize: '0.62rem', color: '#C9A84C', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{f.brand}</div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', fontWeight: 300, color: '#ffffff', marginBottom: '0.4rem' }}>{f.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem', lineHeight: 1.6 }}>{f.scent_notes}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.85rem', color: '#C9A84C', fontWeight: 500 }}>
                      From ${f.variants?.length > 0 ? Math.min(...f.variants.map((v: any) => Number(v.price))) : '—'}
                    </div>
                    <div style={{ padding: '0.6rem 1.25rem', background: '#C9A84C', color: '#0A0A0A', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Shop Now
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/shop" style={{ padding: '0.9rem 2.5rem', background: 'transparent', color: '#C9A84C', textDecoration: 'none', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', border: '0.5px solid rgba(201,168,76,0.4)' }}>
            View Full Collection
          </Link>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section style={{ padding: '4rem 3rem', background: '#111111', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 300, color: '#ffffff', marginBottom: '1rem' }}>Premium Decants. Authentic Scents.</h2>
        <p style={{ fontSize: '0.87rem', color: 'rgba(255,255,255,0.45)', fontWeight: 300, maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.9 }}>We source full bottles of designer and niche fragrances and decant them into sample and travel sizes — so you can explore the world of fine fragrance without the full bottle commitment.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
          {['100% Authentic', 'Free Shipping $75+', 'Sample Sizes Available', 'Premium Niche Scents'].map(item => (
            <div key={item} style={{ fontSize: '0.72rem', color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>✦ {item}</div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '2rem 3rem', background: '#0A0A0A', borderTop: '0.5px solid rgba(201,168,76,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A84C' }}>Legacy Scents</div>
        <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)' }}>© 2026 Legacy Scents. All rights reserved.</div>
      </footer>

    </main>
  )
}