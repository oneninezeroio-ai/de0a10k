// src/app/dashboard/page.tsx — Server Component
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Lock } from 'lucide-react'
import { MODULE_CHECKLISTS } from '@/lib/module-checklists'
import type { Module, Lesson, UserProgress, Profile } from '@/lib/types'

export const metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const [{ data: profileRaw }, { data: modulesRaw }, { data: achievementsRaw }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('modules').select('*').eq('is_published', true).order('order_index'),
    supabase.from('user_achievements').select('*, achievements(*)').eq('user_id', user.id),
  ])

  const profile = profileRaw as Profile | null
  const modules = (modulesRaw ?? []) as Module[]
  const achievements = achievementsRaw ?? []

  const { data: lessonsRaw } = await supabase.from('lessons').select('id, module_id').eq('is_published', true)
  const { data: progressRaw } = await supabase.from('user_progress').select('*').eq('user_id', user.id)

  const lessons = (lessonsRaw ?? []) as Pick<Lesson, 'id' | 'module_id'>[]
  const progressList = (progressRaw ?? []) as UserProgress[]

  const progressMap = new Map<string, UserProgress>(progressList.map((p: UserProgress) => [p.lesson_id, p]))
  const lessonsByModule = new Map<string, string[]>()
  lessons.forEach((l: Pick<Lesson, 'id' | 'module_id'>) => {
    if (!lessonsByModule.has(l.module_id)) lessonsByModule.set(l.module_id, [])
    lessonsByModule.get(l.module_id)!.push(l.id)
  })

  const firstName = profile?.full_name?.split(' ')[0] ?? 'estudiante'
  const totalLessons = lessons.length
  const totalCompleted = progressList.filter((p: UserProgress) => p.status === 'completed').length
  const overallPct = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0

  const nextModule = modules.find((m: Module) => {
    const mLessons = lessonsByModule.get(m.id) ?? []
    return mLessons.some(lid => progressMap.get(lid)?.status !== 'completed')
  })

  const kpis = [
    { label: 'Lecciones', value: `${totalCompleted}/${totalLessons}` },
    { label: 'Logros',    value: `${achievements.length}/13` },
    { label: 'Módulos',   value: `${modules.filter((m: Module) => { const ml = lessonsByModule.get(m.id) ?? []; return ml.length > 0 && ml.every(lid => progressMap.get(lid)?.status === 'completed') }).length}/${modules.length}` },
    { label: 'Progreso',  value: `${overallPct}%` },
  ]

  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(24px,4vw,48px)', paddingBottom: '80px' }}>

      <div className="animate-up" style={{ marginBottom: '48px', paddingBottom: '40px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-5)', marginBottom: '12px' }}>
          Bienvenido de vuelta
        </p>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: '12px' }}>
          Hola, <span style={{ color: 'var(--accent)' }}>{firstName}</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-3)', maxWidth: '480px', lineHeight: 1.65 }}>
          {overallPct === 0
            ? 'Empezá por el Módulo 01. Cada día que no ejecutás es un día regalado a quien sí lo hace.'
            : overallPct < 50
            ? `Vas al ${overallPct}% del curso. El sistema funciona — seguí mandando.`
            : overallPct < 100
            ? `${overallPct}% completado. Estás en la recta final. No pares ahora.`
            : '¡Curso terminado! La diferencia entre vos y quien no llegó es que vos ejecutaste.'}
        </p>
      </div>

      <div className="kpis-grid animate-up delay-1" style={{ marginBottom: '48px' }}>
        {kpis.map(k => (
          <div key={k.label} style={{ padding: '20px 16px', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em', marginBottom: '4px' }}>
              {k.value}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {k.label}
            </div>
          </div>
        ))}
      </div>

      {nextModule && (
        <div className="animate-up delay-2" style={{ marginBottom: '40px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-5)', marginBottom: '16px' }}>
            Continuar
          </p>
          <Link href={`/courses/${nextModule.slug}`} className="continue-link">
            <span style={{ fontSize: '20px', flexShrink: 0 }}>{nextModule.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '3px' }}>
                Continuar donde lo dejaste
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
                {nextModule.title}
              </div>
            </div>
            <span className="btn-primary" style={{ padding: '8px 16px', fontSize: '10px', flexShrink: 0 }}>
              Continuar →
            </span>
          </Link>
        </div>
      )}

      <div className="animate-up delay-3">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-5)' }}>
            Módulos del curso
          </p>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-5)' }}>
            {totalCompleted}/{totalLessons} lecciones
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {modules.map((mod: Module, idx: number) => {
            const mLessons = lessonsByModule.get(mod.id) ?? []
            const mCompleted = mLessons.filter(lid => progressMap.get(lid)?.status === 'completed').length
            const mTotal = mLessons.length
            const mPct = mTotal > 0 ? Math.round((mCompleted / mTotal) * 100) : 0
            const isComplete = mTotal > 0 && mCompleted === mTotal
            const isStarted = mCompleted > 0

            return (
              <Link
                key={mod.id}
                href={`/courses/${mod.slug}`}
                className="link-row animate-up"
                style={{ gridTemplateColumns: '44px 1fr auto', gap: '12px', animationDelay: `${0.05 + idx * 0.04}s`, opacity: 0 }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-5)', letterSpacing: '0.04em' }}>
                  {String(mod.order_index).padStart(2, '0')}
                </span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '14px' }}>{mod.icon}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
                      {mod.title}
                    </span>
                    {isComplete
                      ? <span className="badge badge-green">✓ Listo</span>
                      : isStarted
                      ? <span className="badge badge-accent">En curso</span>
                      : mTotal === 0
                      ? <span className="badge badge-muted"><Lock size={8} style={{ display: 'inline' }} /> Próx.</span>
                      : null}
                  </div>
                  {mTotal > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ flex: 1, maxWidth: '160px' }}>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${mPct}%` }} />
                        </div>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-5)' }}>
                        {mCompleted}/{mTotal}
                      </span>
                    </div>
                  )}
                </div>
                <ChevronRight size={14} style={{ color: 'var(--text-5)', flexShrink: 0 }} />
              </Link>
            )
          })}
        </div>
      </div>

      {profile?.goal_amount && (
        <div className="animate-up delay-4" style={{ marginTop: '48px', paddingTop: '40px', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-5)', marginBottom: '16px' }}>
            Tu meta de 90 días
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(20px,3vw,28px)', fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            Generar{' '}
            <span style={{ color: 'var(--accent)' }}>${profile.goal_amount.toLocaleString()} USD</span>
            {profile.goal_reason && (
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-3)', fontWeight: 400 }}>
                {' '}— &quot;{profile.goal_reason}&quot;
              </span>
            )}
          </p>
        </div>
      )}

    </div>
  )
}
