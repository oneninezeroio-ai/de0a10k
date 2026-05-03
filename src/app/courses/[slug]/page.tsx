// src/app/courses/[slug]/page.tsx — Server Component, no event handlers
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, Clock, FileText, HelpCircle, ArrowLeft, ClipboardList, ArrowRight, Lock } from 'lucide-react'
import { MODULE_CHECKLISTS } from '@/lib/module-checklists'

interface PageProps { params: { slug: string } }

export async function generateMetadata({ params }: PageProps) {
  const supabase = createServerSupabaseClient()
  const { data } = await supabase.from('modules').select('title').eq('slug', params.slug).single()
  return { title: data?.title ?? 'Módulo' }
}

export default async function CoursePage({ params }: PageProps) {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) notFound()

  const { data: module } = await supabase.from('modules').select('*').eq('slug', params.slug).single()
  if (!module) notFound()

  const { data: lessonsRaw } = await supabase.from('lessons').select('*').eq('module_id', module.id).eq('is_published', true).order('order_index')
  const { data: progressRaw } = await supabase.from('user_progress').select('*').eq('user_id', user.id)
  const { data: workbookData } = await supabase.from('workbook_responses').select('is_complete,updated_at').eq('user_id', user.id).eq('module_id', module.id).single()

  const lessons = lessonsRaw ?? []
  const progressMap = new Map(progressRaw?.map(p => [p.lesson_id, p]) ?? [])
  const checklist = MODULE_CHECKLISTS[params.slug]
  const completedCount = lessons.filter(l => progressMap.get(l.id)?.status === 'completed').length
  const pct = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0
  const totalMins = lessons.reduce((sum, l) => sum + (l.duration_mins ?? 0), 0)

  return (
    <div style={{ padding: 'clamp(24px,4vw,48px)', maxWidth: '800px', paddingBottom: '80px' }}>

      <Link href="/dashboard" className="btn-ghost" style={{ marginBottom: '32px', display: 'inline-flex' }}>
        <ArrowLeft size={14} /> Dashboard
      </Link>

      {/* Module header */}
      <div className="animate-up" style={{ marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid var(--border)' }}>
        <p className="eyebrow">Módulo {module.order_index}</p>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(26px,4vw,36px)', fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.0, letterSpacing: '-0.025em', marginBottom: '10px' }}>
          {module.icon} {module.title}
        </h1>
        {module.subtitle && (
          <p style={{ color: 'var(--text-3)', fontSize: '15px', marginBottom: '16px', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
            {module.subtitle}
          </p>
        )}
        {module.description && (
          <p style={{ color: 'var(--text-3)', lineHeight: 1.7, fontSize: '14px', maxWidth: '560px', marginBottom: '24px', fontFamily: 'var(--font-body)' }}>
            {module.description}
          </p>
        )}

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-4)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <FileText size={12} />{lessons.length} lecciones
          </span>
          {totalMins > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={12} />{totalMins} min total
            </span>
          )}
          {lessons.some(l => l.has_quiz) && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <HelpCircle size={12} />Incluye quizzes
            </span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-5)', letterSpacing: '0.04em' }}>
            {completedCount}/{lessons.length} lecciones
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: pct === 100 ? 'var(--green)' : 'var(--text-1)' }}>
            {pct}%
          </span>
        </div>
        <div className="progress-bar" style={{ height: '3px' }}>
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Quick access — CSS hover via .quick-link */}
      <div className="animate-up delay-1" style={{ display: 'grid', gridTemplateColumns: checklist ? '1fr 1fr' : '1fr', gap: '1px', background: 'var(--border)', marginBottom: '40px' }}>
        {checklist && (
          <Link href={`/courses/${params.slug}/checklist`} className="quick-link">
            <ClipboardList size={16} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '2px' }}>Checklist</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-4)' }}>{checklist.items.length} tareas</p>
            </div>
            <ArrowRight size={13} style={{ color: 'var(--text-5)' }} />
          </Link>
        )}
        <Link href={`/courses/${params.slug}/workbook`} className="quick-link">
          <FileText size={16} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '2px' }}>Workbook</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-4)' }}>
              {workbookData?.is_complete ? '✓ Completado' : workbookData ? 'En progreso' : 'Sin empezar'}
            </p>
          </div>
          <ArrowRight size={13} style={{ color: 'var(--text-5)' }} />
        </Link>
      </div>

      {/* Lessons list — CSS hover via .lesson-row */}
      <div className="animate-up delay-2">
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-5)', marginBottom: '16px' }}>
          Lecciones
        </p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {lessons.map((lesson, i) => {
            const progress = progressMap.get(lesson.id)
            const isDone = progress?.status === 'completed'
            const isStarted = progress?.status === 'in_progress'

            return (
              <Link
                key={lesson.id}
                href={`/courses/${params.slug}/lessons/${lesson.id}`}
                className="lesson-row"
                style={{ gridTemplateColumns: '36px 1fr auto', gap: '12px' }}
              >
                {/* Status */}
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2px' }}>
                  {isDone
                    ? <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--green-lt)', border: '1px solid rgba(45,122,58,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle2 size={11} color="var(--green)" />
                      </div>
                    : <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `1px solid ${isStarted ? 'var(--text-2)' : 'var(--border-2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {isStarted && <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--text-2)' }} />}
                      </div>
                  }
                </div>

                {/* Info */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-5)' }}>
                      {module.order_index}.{lesson.order_index}
                    </span>
                    {isDone && <span className="badge badge-green">✓</span>}
                    {isStarted && !isDone && <span className="badge badge-muted">En curso</span>}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.2, marginBottom: '4px', letterSpacing: '-0.01em' }}>
                    {lesson.title}
                  </div>
                  {lesson.subtitle && (
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lesson.subtitle}
                    </p>
                  )}
                  <div style={{ display: 'flex', gap: '12px', marginTop: '5px', flexWrap: 'wrap' }}>
                    {lesson.duration_mins && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-5)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={9} />{lesson.duration_mins}m
                      </span>
                    )}
                    {lesson.has_workbook && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FileText size={9} />Workbook
                      </span>
                    )}
                    {lesson.has_quiz && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <HelpCircle size={9} />Quiz
                      </span>
                    )}
                  </div>
                </div>

                <ArrowRight size={14} style={{ color: 'var(--text-5)', flexShrink: 0 }} />
              </Link>
            )
          })}
        </div>
      </div>

    </div>
  )
}
