'use client'

import { useState, useEffect } from 'react'
import { Trophy, Lock, Star } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

const ALL_ACHIEVEMENTS = [
  // Inicio
  { slug: 'bienvenido',       icon: '👋', title: 'Bienvenido al sistema',  desc: 'Iniciaste sesión por primera vez.',                                   points: 10,  cat: 'Inicio' },
  { slug: 'primer-paso',      icon: '🚀', title: 'Primer paso',            desc: 'Completaste tu perfil y definiste tu meta de 90 días.',               points: 50,  cat: 'Inicio' },
  { slug: 'primera-leccion',  icon: '📖', title: 'Primera lección',        desc: 'Completaste tu primera lección del curso.',                           points: 25,  cat: 'Progreso' },
  // Módulos
  { slug: 'modulo-1',         icon: '🧠', title: 'Mentalidad clara',       desc: 'Terminaste el Módulo 01: Mentalidad y Realidad.',                     points: 100, cat: 'Módulos' },
  { slug: 'modulo-2',         icon: '🎯', title: 'Nicho elegido',          desc: 'Terminaste el Módulo 02: Elige Tu Nicho.',                            points: 100, cat: 'Módulos' },
  { slug: 'modulo-3',         icon: '💎', title: 'Oferta diseñada',        desc: 'Terminaste el Módulo 03: Diseña Tu Oferta.',                          points: 100, cat: 'Módulos' },
  { slug: 'modulo-4',         icon: '🏛️', title: 'LLC registrada',         desc: 'Terminaste el Módulo 04: Incorporación en USA.',                      points: 150, cat: 'Módulos' },
  { slug: 'modulo-5',         icon: '📧', title: 'Primeros contactos',     desc: 'Terminaste el Módulo 05: Consigue Tus Primeros Clientes.',            points: 150, cat: 'Módulos' },
  { slug: 'modulo-6',         icon: '⚙️', title: 'Sistema operando',       desc: 'Terminaste el Módulo 06: Delivery y Operación.',                     points: 150, cat: 'Módulos' },
  { slug: 'modulo-7',         icon: '📈', title: 'En escala',              desc: 'Terminaste el Módulo 07: Escala Simple.',                             points: 200, cat: 'Módulos' },
  // Workbooks
  { slug: 'workbook-1',       icon: '📝', title: 'Workbook de Mentalidad', desc: 'Completaste el workbook del Módulo 01.',                              points: 50,  cat: 'Workbooks' },
  { slug: 'workbook-2',       icon: '📝', title: 'Workbook de Nicho',      desc: 'Completaste el workbook del Módulo 02.',                              points: 50,  cat: 'Workbooks' },
  { slug: 'workbook-3',       icon: '📝', title: 'Workbook de Oferta',     desc: 'Completaste el workbook del Módulo 03.',                              points: 50,  cat: 'Workbooks' },
  // Hitos
  { slug: 'mitad-del-camino', icon: '⚡', title: 'Mitad del camino',       desc: 'Completaste el 50% del curso.',                                       points: 75,  cat: 'Hitos' },
  { slug: 'curso-completo',   icon: '🏆', title: 'Curso completo',         desc: 'Terminaste las 7 módulos del programa.',                              points: 500, cat: 'Hitos' },
  { slug: 'racha-7',          icon: '🔥', title: 'Racha de 7 días',        desc: 'Estudiaste 7 días seguidos.',                                         points: 100, cat: 'Hitos' },
  { slug: 'quiz-perfecto',    icon: '🎓', title: 'Quiz perfecto',          desc: 'Obtuviste 100% en cualquier quiz.',                                   points: 75,  cat: 'Hitos' },
]

const CAT_ORDER = ['Inicio', 'Progreso', 'Módulos', 'Workbooks', 'Hitos']

export default function LogrosPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [earnedSlugs, setEarnedSlugs] = useState<Set<string>>(new Set())
  const [totalPoints, setTotalPoints] = useState(0)
  const [earnedDates, setEarnedDates] = useState<Record<string, string>>({})

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      const { data } = await supabase
        .from('user_achievements')
        .select('*, achievements(slug, points)')
        .eq('user_id', user.id)

      if (data) {
        const slugs = new Set<string>()
        const dates: Record<string, string> = {}
        let pts = 0
        for (const ua of data) {
          const slug = (ua.achievements as any)?.slug
          if (slug) {
            slugs.add(slug)
            dates[slug] = ua.earned_at
            pts += (ua.achievements as any)?.points ?? 0
          }
        }
        setEarnedSlugs(slugs)
        setEarnedDates(dates)
        setTotalPoints(pts)
      }
      setLoading(false)
    }
    load()
  }, [])

  const byCategory = CAT_ORDER.reduce((acc, cat) => {
    acc[cat] = ALL_ACHIEVEMENTS.filter(a => a.cat === cat)
    return acc
  }, {} as Record<string, typeof ALL_ACHIEVEMENTS>)

  const earned = ALL_ACHIEVEMENTS.filter(a => earnedSlugs.has(a.slug))
  const maxPoints = ALL_ACHIEVEMENTS.reduce((s, a) => s + a.points, 0)
  const pct = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '20px', height: '20px', border: '2px solid var(--bg-3)', borderTopColor: 'var(--text-1)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(24px,4vw,48px)', paddingBottom: '80px' }}>

      {/* Header */}
      <div className="animate-up" style={{ marginBottom: '48px', paddingBottom: '40px', borderBottom: '1px solid var(--border)' }}>
        <p className="eyebrow">Mis logros</p>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em', lineHeight: 1.0, marginBottom: '16px' }}>
          {earned.length === 0 ? 'Todavía no tenés logros.' : `${earned.length} logro${earned.length !== 1 ? 's' : ''} desbloqueado${earned.length !== 1 ? 's' : ''}.`}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-3)', maxWidth: '400px', lineHeight: 1.65 }}>
          Cada logro refleja progreso real en el sistema. Seguí ejecutando.
        </p>
      </div>

      {/* Stats */}
      <div className="animate-up delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid var(--border)', borderLeft: '1px solid var(--border)', marginBottom: '48px' }}>
        {[
          { label: 'Logros',   value: `${earned.length}/${ALL_ACHIEVEMENTS.length}` },
          { label: 'Puntos',   value: `${totalPoints}` },
          { label: 'Completado', value: `${pct}%` },
        ].map(s => (
          <div key={s.label} style={{ padding: '20px 16px', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em', marginBottom: '4px' }}>{s.value}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      {earned.length > 0 && (
        <div className="animate-up delay-2" style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-5)' }}>Progreso total</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--text-1)' }}>{totalPoints}/{maxPoints} pts</span>
          </div>
          <div className="progress-bar" style={{ height: '4px' }}>
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      {/* Empty state */}
      {earned.length === 0 && (
        <div className="animate-up delay-2" style={{ padding: '48px 32px', textAlign: 'center', background: 'var(--bg-1)', border: '1px solid var(--border)', marginBottom: '40px' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🏆</div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '8px' }}>
            Todavía no desbloqueaste ningún logro
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-3)', maxWidth: '300px', margin: '0 auto' }}>
            Completá tu primera lección para empezar a desbloquear logros.
          </p>
        </div>
      )}

      {/* Categories */}
      <div className="animate-up delay-3" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {CAT_ORDER.map(cat => {
          const items = byCategory[cat]
          if (!items?.length) return null
          const catEarned = items.filter(a => earnedSlugs.has(a.slug)).length

          return (
            <div key={cat}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-5)' }}>
                  {cat}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-5)' }}>
                  {catEarned}/{items.length}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: 'var(--border)' }}>
                {items.map(a => {
                  const isEarned = earnedSlugs.has(a.slug)
                  const earnedDate = earnedDates[a.slug]

                  return (
                    <div key={a.slug} style={{ background: isEarned ? 'var(--bg)' : 'var(--bg-1)', padding: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start', opacity: isEarned ? 1 : 0.6, transition: 'opacity 0.2s' }}>
                      {/* Icon */}
                      <div style={{ width: '44px', height: '44px', borderRadius: '4px', background: isEarned ? 'var(--bg-1)' : 'var(--bg-2)', border: `1px solid ${isEarned ? 'var(--border-2)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0, filter: isEarned ? 'none' : 'grayscale(100%)' }}>
                        {isEarned ? a.icon : <Lock size={16} style={{ color: 'var(--text-5)' }} />}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: isEarned ? 'var(--text-1)' : 'var(--text-3)', letterSpacing: '-0.01em' }}>
                            {a.title}
                          </span>
                          {isEarned && (
                            <span className="badge badge-green">
                              <Star size={8} style={{ display: 'inline' }} /> +{a.points}
                            </span>
                          )}
                          {!isEarned && (
                            <span className="badge badge-muted">{a.points} pts</span>
                          )}
                        </div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: isEarned ? 'var(--text-3)' : 'var(--text-5)', lineHeight: 1.55 }}>
                          {a.desc}
                        </p>
                        {isEarned && earnedDate && (
                          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-5)', marginTop: '6px', letterSpacing: '0.02em' }}>
                            Desbloqueado {new Date(earnedDate).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
