// src/app/page.tsx — Landing page OneAway-inspired light theme
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Globe, Shield, TrendingUp } from 'lucide-react'

const stats = [
  { value: '$174K', label: 'Facturado en 6 meses' },
  { value: '$40K',  label: 'Ingreso mensual recurrente' },
  { value: '6 m',   label: 'Para llegar al resultado' },
  { value: '2–3h',  label: 'Trabajo al día' },
]

const modules = [
  { n:'01', title:'Mentalidad y Realidad' },
  { n:'02', title:'Elige Tu Nicho' },
  { n:'03', title:'Diseña Tu Oferta' },
  { n:'04', title:'Incorporación en USA' },
  { n:'05', title:'Primeros Clientes' },
  { n:'06', title:'Delivery y Operación' },
  { n:'07', title:'Escala Simple' },
]

const included = [
  '7 módulos del nicho a la primera venta',
  'Workbooks interactivos con auto-guardado',
  'Pop-quizzes de refuerzo por lección',
  'Guía paso a paso: LLC en Florida',
  'Scripts exactos de cold email y follow-ups',
  'Framework de llamadas de ventas',
  'Checklists de ejecución por módulo',
  'Sistema de tracking de progreso',
]

const steps = [
  { n:'01', title:'Elegís tu nicho y diseñás tu oferta.', desc:'Investigás tu mercado, analizás la competencia y elegís el nicho con demanda real. Sin adivinar. Sin teorías.' },
  { n:'02', title:'Incorporás tu empresa en USA.', desc:'LLC en Florida, cuenta bancaria americana y Stripe. 100% legal sin pisar USA. Guía completa incluida.' },
  { n:'03', title:'Conseguís tus primeros clientes.', desc:'Scripts exactos de cold email, DMs de LinkedIn y frameworks de ventas para cerrar contratos en dólares.' },
]

const S = {
  page: { minHeight:'100vh', background:'var(--bg)', overflowX:'hidden' } as React.CSSProperties,

  // NAV
  navWrap: { padding:'20px clamp(16px,4vw,56px)', display:'flex', justifyContent:'center' } as React.CSSProperties,
  nav: {
    display:'flex', alignItems:'center', justifyContent:'space-between',
    border:'1px solid var(--border-2)', borderRadius:'999px',
    padding:'10px 10px 10px 24px', gap:'32px',
    background:'var(--bg-1)', width:'100%', maxWidth:'900px',
  } as React.CSSProperties,
  logo: { fontFamily:'var(--font-mono)', fontSize:'15px', fontWeight:700, color:'var(--text-1)', letterSpacing:'-0.01em', display:'flex', gap:'0px' } as React.CSSProperties,
  logoAccent: { color:'var(--accent)' } as React.CSSProperties,
  navLinks: { display:'flex', gap:'24px', alignItems:'center' } as React.CSSProperties,
  navLink: { fontFamily:'var(--font-mono)', fontSize:'10px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase' as const, color:'var(--text-4)' },

  // HERO
  hero: { padding:'clamp(72px,10vh,120px) clamp(16px,5vw,72px) clamp(60px,8vh,100px)' } as React.CSSProperties,
  heroEyebrow: { fontFamily:'var(--font-mono)', fontSize:'10px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase' as const, color:'var(--accent)', marginBottom:'32px', display:'flex', alignItems:'center', gap:'12px' } as React.CSSProperties,
  eyebrowLine: { width:'24px', height:'1px', background:'var(--accent)', display:'inline-block' } as React.CSSProperties,
  heroH1: { fontFamily:'var(--font-mono)', fontSize:'clamp(44px,7vw,80px)', fontWeight:700, lineHeight:1.0, letterSpacing:'-0.035em', color:'var(--text-1)', marginBottom:'28px' } as React.CSSProperties,
  heroSub: { fontSize:'clamp(15px,1.8vw,18px)', color:'var(--text-3)', lineHeight:1.75, maxWidth:'480px', marginBottom:'48px', fontFamily:'var(--font-body)' } as React.CSSProperties,
  heroBtns: { display:'flex', alignItems:'center', gap:'16px', flexWrap:'wrap' as const, marginBottom:'80px' } as React.CSSProperties,

  // STATS GRID (OneAway border-collapse style)
  statsGrid: { display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderTop:'1px solid var(--border)', borderLeft:'1px solid var(--border)' } as React.CSSProperties,
  statCell: { padding:'24px 20px', borderRight:'1px solid var(--border)', borderBottom:'1px solid var(--border)' } as React.CSSProperties,
  statVal: { fontFamily:'var(--font-mono)', fontSize:'clamp(24px,3vw,32px)', fontWeight:700, letterSpacing:'-0.03em', color:'var(--text-1)', lineHeight:1, marginBottom:'6px' } as React.CSSProperties,
  statLabel: { fontFamily:'var(--font-body)', fontSize:'11px', color:'var(--text-4)', fontWeight:400 } as React.CSSProperties,

  // SECTION
  section: { padding:'clamp(60px,8vh,96px) clamp(16px,5vw,72px)', borderTop:'1px solid var(--border)' } as React.CSSProperties,
  sectionH: { fontFamily:'var(--font-mono)', fontSize:'clamp(28px,4vw,44px)', fontWeight:700, letterSpacing:'-0.03em', color:'var(--text-1)', marginBottom:'12px', lineHeight:1.05 } as React.CSSProperties,
  sectionSub: { fontFamily:'var(--font-body)', fontSize:'14px', color:'var(--text-3)', lineHeight:1.7, maxWidth:'420px', marginBottom:'48px' } as React.CSSProperties,

  // MODULES GRID
  modsGrid: { display:'grid', gridTemplateColumns:'repeat(2,1fr)', borderTop:'1px solid var(--border)', borderLeft:'1px solid var(--border)' } as React.CSSProperties,
  modCell: { padding:'20px 24px', borderRight:'1px solid var(--border)', borderBottom:'1px solid var(--border)' } as React.CSSProperties,
  modN: { fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--text-5)', letterSpacing:'0.08em', marginBottom:'8px' } as React.CSSProperties,
  modTitle: { fontFamily:'var(--font-mono)', fontSize:'13px', fontWeight:700, color:'var(--text-1)', letterSpacing:'-0.01em' } as React.CSSProperties,

  // STEPS
  stepList: { display:'flex', flexDirection:'column' as const } as React.CSSProperties,
  step: { display:'grid', gridTemplateColumns:'52px 1fr', gap:'16px', padding:'28px 0', borderTop:'1px solid var(--border)', alignItems:'start' } as React.CSSProperties,
  stepN: { fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-5)', letterSpacing:'0.06em', paddingTop:'3px' } as React.CSSProperties,
  stepTitle: { fontFamily:'var(--font-mono)', fontSize:'clamp(15px,2vw,18px)', fontWeight:700, color:'var(--text-1)', marginBottom:'8px', letterSpacing:'-0.015em', lineHeight:1.2 } as React.CSSProperties,
  stepDesc: { fontFamily:'var(--font-body)', fontSize:'13px', color:'var(--text-3)', lineHeight:1.65 } as React.CSSProperties,

  // INCLUDED GRID
  inclGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', borderTop:'1px solid var(--border)' } as React.CSSProperties,
  inclItem: { padding:'16px 0', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'flex-start', gap:'12px', fontSize:'13px', color:'var(--text-2)', fontFamily:'var(--font-body)' } as React.CSSProperties,
  inclDot: { width:'16px', height:'16px', borderRadius:'50%', border:'1px solid rgba(45,122,58,0.2)', background:'var(--green-lt)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'1px' } as React.CSSProperties,

  // RESULT CARDS
  resultCards: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1px', background:'var(--border)' } as React.CSSProperties,
  resultCard: { background:'var(--bg-1)', padding:'32px 28px', display:'flex', flexDirection:'column' as const } as React.CSSProperties,
  cardIcon: { fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-4)', marginBottom:'28px', width:'28px', height:'28px', border:'1px solid var(--border-2)', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'4px' } as React.CSSProperties,
  cardStat: { fontFamily:'var(--font-mono)', fontSize:'clamp(22px,3vw,28px)', fontWeight:700, lineHeight:1.1, color:'var(--text-1)', letterSpacing:'-0.02em', marginBottom:'14px' } as React.CSSProperties,
  cardDesc: { fontFamily:'var(--font-body)', fontSize:'12px', color:'var(--text-3)', lineHeight:1.65, flex:1 } as React.CSSProperties,
  cardLink: { fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--accent)', letterSpacing:'0.04em', marginTop:'20px', display:'inline-flex', alignItems:'center', gap:'6px' } as React.CSSProperties,

  // CTA
  cta: { padding:'clamp(80px,10vh,120px) clamp(16px,5vw,72px)', borderTop:'1px solid var(--border)', textAlign:'center' as const } as React.CSSProperties,
  ctaH: { fontFamily:'var(--font-mono)', fontSize:'clamp(30px,5vw,52px)', fontWeight:700, color:'var(--text-1)', letterSpacing:'-0.03em', lineHeight:1.05, marginBottom:'16px' } as React.CSSProperties,
  ctaP: { fontFamily:'var(--font-body)', fontSize:'15px', color:'var(--text-3)', maxWidth:'380px', margin:'0 auto 40px', lineHeight:1.75 } as React.CSSProperties,
  ctaNote: { fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--text-5)', marginTop:'16px', letterSpacing:'0.04em' } as React.CSSProperties,

  // FOOTER
  footer: { borderTop:'1px solid var(--border)', padding:'24px clamp(16px,5vw,72px)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap' as const, gap:'12px' } as React.CSSProperties,
  footerLogo: { fontFamily:'var(--font-mono)', fontSize:'13px', fontWeight:700, color:'var(--text-1)' } as React.CSSProperties,
  footerNote: { fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--text-5)', letterSpacing:'0.03em' } as React.CSSProperties,
}

export default function LandingPage() {
  return (
    <div style={S.page}>

      {/* NAV */}
      <div style={S.navWrap}>
        <nav className="landing-nav">
          <div style={S.logo}>
            <span style={S.logoAccent}>&lt;</span>de0a10k<span style={S.logoAccent}>&gt;</span>
          </div>
          <div className="landing-nav-links">
            <span style={S.navLink}>Módulos</span>
            <span style={S.navLink}>Resultados</span>
            <Link href="/auth/login" style={S.navLink}>Entrar</Link>
          </div>
          <Link href="/auth/register" className="btn-accent" style={{ padding:'10px 20px', fontSize:'10px' }}>
            Empezar gratis →
          </Link>
        </nav>
      </div>

      {/* HERO */}
      <section style={S.hero}>
        <div className="animate-up">
          <div style={S.heroEyebrow}>
            <span style={S.eyebrowLine} />
            Basado en $174K facturados · Honduras
          </div>
        </div>

        <div className="animate-up delay-1">
          <h1 style={S.heroH1}>
            De 0 a 10K<br />en dólares.
          </h1>
        </div>

        <div className="animate-up delay-2">
          <p style={S.heroSub}>
            La ruta exacta para montar un negocio digital en USA y facturar en dólares desde cualquier país de Latinoamérica. Sin experiencia previa.
          </p>
        </div>

        <div className="hero-btns animate-up delay-3">
          <Link href="/auth/register" className="btn-primary">
            Empezar el curso — es gratis →
          </Link>
          <Link href="/auth/login" className="btn-secondary">
            Ya tengo cuenta
          </Link>
        </div>

        {/* Stats grid — OneAway border-collapse style */}
        <div className="stats-grid animate-up delay-4">
          {stats.map(s => (
            <div key={s.label} style={S.statCell}>
              <div style={S.statVal}>{s.value}</div>
              <div style={S.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* RESULTADOS */}
      <section style={S.section}>
        <p className="eyebrow">Resultados reales</p>
        <h2 style={S.sectionH}>Números reales.<br />Sin teoría.</h2>
        <p style={S.sectionSub}>Cada número viene de un negocio real construido con este sistema desde Honduras.</p>

        <div style={S.resultCards}>
          <div style={S.resultCard}>
            <div style={S.cardIcon}>[+]</div>
            <div style={S.cardStat}>$174K<br />en 6 meses</div>
            <div style={S.cardDesc}>Negocio de servicios digitales construido desde cero. Sin capital grande. Sin inglés perfecto.</div>
          </div>
          <div style={S.resultCard}>
            <div style={S.cardIcon}>[$]</div>
            <div style={S.cardStat}>$40K<br />MRR alcanzado</div>
            <div style={S.cardDesc}>Ingreso mensual recurrente con clientes en dólares, trabajando 2-3 horas al día.</div>
            <span style={S.cardLink}>Ver el sistema completo →</span>
          </div>
          <div style={S.resultCard}>
            <div style={S.cardIcon}>[~]</div>
            <div style={S.cardStat}>6 meses<br />del cero al dólar</div>
            <div style={S.cardDesc}>El tiempo promedio para conseguir los primeros clientes pagando en USD siguiendo el sistema.</div>
            <Link href="/auth/register" style={S.cardLink}>Empezar ahora →</Link>
          </div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section style={S.section}>
        <p className="eyebrow">El sistema</p>
        <h2 style={S.sectionH}>7 módulos.<br />Un sistema completo.</h2>
        <p style={S.sectionSub}>Cada módulo construye sobre el anterior. Al terminar tenés una empresa real y tus primeros clientes.</p>

        <div className="mods-grid">
          {modules.map(m => (
            <div key={m.n} style={S.modCell}>
              <div style={S.modN}>{m.n}</div>
              <div style={S.modTitle}>{m.title}</div>
            </div>
          ))}
          <div style={{ ...S.modCell, background:'var(--bg-2)' }}>
            <div style={{ ...S.modN, color:'var(--text-5)' }}>META · 90 DÍAS</div>
            <div style={{ ...S.modTitle, color:'var(--text-3)' }}>LLC en USA + primeros clientes en dólares</div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section style={S.section}>
        <p className="eyebrow">Cómo funciona</p>
        <h2 style={S.sectionH}>El camino<br />exacto.</h2>

        <div style={S.stepList}>
          {steps.map((step, i) => (
            <div key={step.n} style={{ ...S.step, ...(i === steps.length - 1 ? { borderBottom:'1px solid var(--border)' } : {}) }}>
              <div style={S.stepN}>{step.n}</div>
              <div>
                <div style={S.stepTitle}>{step.title}</div>
                <div style={S.stepDesc}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INCLUIDO */}
      <section style={S.section}>
        <p className="eyebrow">Incluido en el curso</p>
        <h2 style={S.sectionH}>Todo para ejecutar,<br />no teorizar.</h2>
        <p style={S.sectionSub}>No es otro curso teórico. Cada módulo tiene workbooks interactivos, checklists y quizzes de refuerzo.</p>

        <div className="incl-grid">
          {included.map((item, i) => (
            <div key={item} style={{
              ...S.inclItem,
              ...(i % 2 === 0 ? { paddingRight:'32px' } : { paddingLeft:'24px', borderLeft:'1px solid var(--border)' }),
            }}>
              <div style={S.inclDot}>
                <CheckCircle2 size={9} color="var(--green)" />
              </div>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* PARA QUIÉN */}
      <section style={S.section}>
        <p className="eyebrow">Para quién es</p>
        <h2 style={S.sectionH}>Para latinoamericanos<br />que ejecutan.</h2>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1px', background:'var(--border)', marginTop:'8px' }}>
          {[
            { icon:<Globe size={16} />, title:'Para latinoamericanos', body:'Honduras, Colombia, México, Argentina y más. El sistema funciona desde cualquier país de LATAM.' },
            { icon:<Shield size={16} />, title:'100% legal y en regla', body:'LLC en Florida, cuenta bancaria americana, Stripe. Todo legal sin pisar USA.' },
            { icon:<TrendingUp size={16} />, title:'Resultados documentados', body:'$174,000 en 6 meses desde Honduras. No teoría. Sistema documentado y replicable.' },
          ].map(card => (
            <div key={card.title} style={{ background:'var(--bg-1)', padding:'32px 28px' }}>
              <div style={{ color:'var(--text-3)', marginBottom:'20px' }}>{card.icon}</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'13px', fontWeight:700, color:'var(--text-1)', marginBottom:'10px', letterSpacing:'-0.01em' }}>{card.title}</div>
              <div style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'var(--text-3)', lineHeight:1.65 }}>{card.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={S.cta}>
        <p className="eyebrow" style={{ justifyContent:'center', display:'flex' }}>Tu próximo paso</p>
        <h2 style={S.ctaH}>Tu meta de 90 días<br />empieza hoy.</h2>
        <p style={S.ctaP}>Empresa registrada en USA y primeros clientes pagando en dólares. El sistema está acá. La decisión es tuya.</p>
        <Link href="/auth/register" className="btn-primary" style={{ fontSize:'12px', padding:'16px 40px' }}>
          Empezar ahora — gratis →
        </Link>
        <p style={S.ctaNote}>Sin tarjeta de crédito · Sin compromisos</p>
      </section>

      {/* FOOTER */}
      <footer style={S.footer}>
        <div style={S.footerLogo}>
          <span style={{ color:'var(--accent)' }}>&lt;</span>de0a10k<span style={{ color:'var(--accent)' }}>&gt;</span>
        </div>
        <p style={S.footerNote}>Construido desde Honduras para Latinoamérica</p>
      </footer>

    </div>
  )
}
