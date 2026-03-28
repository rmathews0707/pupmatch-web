import React from 'react';

const styles = {
  page: { minHeight: '100vh', display: 'flex', flexDirection: 'column' as const },
  hero: {
    position: 'relative' as const, overflow: 'hidden', display: 'flex',
    flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center',
    textAlign: 'center' as const, padding: '120px 24px 80px',
    background: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(249,115,22,.15), transparent)',
  },
  heroGlow: {
    position: 'absolute' as const, top: -200, left: '50%', transform: 'translateX(-50%)',
    width: 600, height: 600, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(249,115,22,.08) 0%, transparent 70%)',
    pointerEvents: 'none' as const,
  },
  badge: {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px',
    borderRadius: 999, background: 'rgba(249,115,22,.1)',
    border: '1px solid rgba(249,115,22,.25)', fontSize: 13, fontWeight: 600,
    color: '#fb923c', marginBottom: 24, letterSpacing: '0.02em',
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.08,
    letterSpacing: '-0.03em', maxWidth: 720, marginBottom: 20,
  },
  heroGradient: {
    background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
  } as React.CSSProperties,
  heroSub: {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 1.6, color: '#94a3b8',
    maxWidth: 540, marginBottom: 40,
  },
  ctaRow: { display: 'flex', gap: 16, flexWrap: 'wrap' as const, justifyContent: 'center' },
  btnPrimary: {
    display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 32px',
    borderRadius: 14, background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff',
    fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer',
    boxShadow: '0 4px 24px rgba(249,115,22,.35)', textDecoration: 'none',
  },
  btnSecondary: {
    display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 32px',
    borderRadius: 14, background: 'rgba(255,255,255,.06)', color: '#f8fafc',
    fontWeight: 600, fontSize: 16, border: '1px solid rgba(255,255,255,.1)',
    cursor: 'pointer', textDecoration: 'none',
  },
  features: { padding: '80px 24px', maxWidth: 1100, margin: '0 auto' },
  sectionLabel: {
    fontSize: 13, fontWeight: 700, textTransform: 'uppercase' as const,
    letterSpacing: '0.1em', color: '#f97316', textAlign: 'center' as const, marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800,
    textAlign: 'center' as const, marginBottom: 48, letterSpacing: '-0.02em',
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 },
  card: { padding: 32, borderRadius: 20, background: '#14141f', border: '1px solid #1e293b' },
  cardIcon: {
    width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: 24, marginBottom: 20, background: 'rgba(249,115,22,.1)',
  },
  cardTitle: { fontSize: 18, fontWeight: 700, marginBottom: 8 },
  cardDesc: { fontSize: 15, lineHeight: 1.6, color: '#94a3b8' },
  howSection: {
    padding: '80px 24px',
    background: 'linear-gradient(180deg, transparent, rgba(249,115,22,.03) 50%, transparent)',
  },
  howGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 32, maxWidth: 900, margin: '0 auto',
  },
  howStep: { textAlign: 'center' as const, padding: '24px 16px' },
  howNumber: {
    width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: 24, fontWeight: 800, margin: '0 auto 16px',
    background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff',
  },
  howStepTitle: { fontSize: 17, fontWeight: 700, marginBottom: 8 },
  howStepDesc: { fontSize: 14, lineHeight: 1.6, color: '#94a3b8' },
  stats: { padding: '60px 24px', display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' as const },
  stat: { textAlign: 'center' as const },
  statNum: {
    fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900,
    background: 'linear-gradient(135deg, #f97316, #ef4444)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
  } as React.CSSProperties,
  statLabel: { fontSize: 14, color: '#64748b', fontWeight: 500, marginTop: 4 },
  cta: { padding: '80px 24px', textAlign: 'center' as const },
  ctaBox: {
    maxWidth: 640, margin: '0 auto', padding: '56px 40px', borderRadius: 24,
    background: 'linear-gradient(135deg, rgba(249,115,22,.12), rgba(239,68,68,.08))',
    border: '1px solid rgba(249,115,22,.2)',
  },
  ctaTitle: { fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: 12 },
  ctaSub: { fontSize: 16, color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 },
  footer: {
    marginTop: 'auto', padding: '32px 24px', textAlign: 'center' as const,
    borderTop: '1px solid #1e293b', fontSize: 13, color: '#64748b',
  },
};

const FEATURES = [
  { icon: '\u{1F4F8}', title: 'AI Breed Scanner', desc: 'Point your camera at any dog and instantly identify its breed using advanced AI vision technology.' },
  { icon: '\u{1F4D6}', title: '200+ Breed Profiles', desc: 'Explore detailed profiles with traits, temperament, care needs, and fun facts for every breed.' },
  { icon: '\u2696\uFE0F', title: 'Side-by-Side Compare', desc: 'Compare any two breeds head-to-head across dozens of attributes to find your ideal match.' },
  { icon: '\u2764\uFE0F', title: 'Save Favorites', desc: 'Build your shortlist of favorite breeds and revisit them anytime as you make your decision.' },
  { icon: '\u{1F50D}', title: 'Smart Search', desc: 'Filter breeds by size, energy level, shedding, family friendliness, and more.' },
  { icon: '\u{1F43E}', title: 'Meet Bernard', desc: 'Our charming bulldog mascot delivers witty commentary and fun facts with every scan result.' },
];

export default function HomePage() {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroGlow} />
        <div style={styles.badge}><span>\u{1F415}</span> Now available on iOS</div>
        <h1 style={styles.heroTitle}>Meet Your{' '}<span style={styles.heroGradient}>Perfect Pup</span></h1>
        <p style={styles.heroSub}>Discover 200+ dog breeds, scan any dog to ID its breed with AI, and compare breeds side-by-side \u2014 all in one beautifully crafted app.</p>
        <div style={styles.ctaRow}>
          <a href="https://apps.apple.com/app/pupmatch" target="_blank" rel="noopener noreferrer" style={styles.btnPrimary}><AppleIcon /> Download for iOS</a>
          <a href="#features" style={styles.btnSecondary}>Learn More \u2193</a>
        </div>
      </section>
      <section style={styles.stats}>
        {[['200+','Dog Breeds'],['AI','Breed Scanner'],['50+','Trait Comparisons'],['Free','To Download']].map(([num,label])=>(
          <div key={label} style={styles.stat}><div style={styles.statNum}>{num}</div><div style={styles.statLabel}>{label}</div></div>
        ))}
      </section>
      <section id="features" style={styles.features}>
        <div style={styles.sectionLabel}>Features</div>
        <h2 style={styles.sectionTitle}>Everything You Need</h2>
        <div style={styles.grid}>
          {FEATURES.map((f)=>(<div key={f.title} style={styles.card}><div style={styles.cardIcon}>{f.icon}</div><h3 style={styles.cardTitle}>{f.title}</h3><p style={styles.cardDesc}>{f.desc}</p></div>))}
        </div>
      </section>
      <section style={styles.howSection}>
        <div style={styles.sectionLabel}>How It Works</div>
        <h2 style={{...styles.sectionTitle, maxWidth: 600, margin: '0 auto 48px'}}>Three Steps to Your Dream Dog</h2>
        <div style={styles.howGrid}>
          {[['1','Scan or Browse','Snap a photo of any dog or explore our breed encyclopedia.'],['2','Compare & Learn','Dive into detailed profiles and compare breeds side-by-side.'],['3','Find Your Match','Save your favorites and discover the perfect breed for your lifestyle.']].map(([num,title,desc])=>(
            <div key={title} style={styles.howStep}><div style={styles.howNumber}>{num}</div><h3 style={styles.howStepTitle}>{title}</h3><p style={styles.howStepDesc}>{desc}</p></div>
          ))}
        </div>
      </section>
      <section style={styles.cta}>
        <div style={styles.ctaBox}>
          <h2 style={styles.ctaTitle}>Ready to Find Your Perfect Pup?</h2>
          <p style={styles.ctaSub}>Download PupMatch for free and start exploring the world of dog breeds today.</p>
          <a href="https://apps.apple.com/app/pupmatch" target="_blank" rel="noopener noreferrer" style={styles.btnPrimary}><AppleIcon /> Get PupMatch</a>
        </div>
      </section>
      <footer style={styles.footer}><p>\u00A9 {new Date().getFullYear()} PupMatch. Built with \u2764\uFE0F for dog lovers everywhere.</p></footer>
    </div>
  );
}

function AppleIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>);
}
