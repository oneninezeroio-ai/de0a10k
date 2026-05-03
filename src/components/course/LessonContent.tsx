'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, FileText, HelpCircle, ExternalLink, ClipboardList } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase'
import QuizModal from '@/components/quiz/QuizModal'
import RichLessonRenderer from '@/components/course/RichLessonRenderer'
import { LESSON_CONTENT_MAP } from '@/lib/lesson-content'

interface Props {
  lesson: {
    id: string; title: string; subtitle: string | null; content_html: string | null;
    video_url: string | null; duration_mins: number | null; has_workbook: boolean;
    has_quiz: boolean; key_concepts: string[] | null; order_index: number;
    lesson_resources: Array<{ id: string; title: string; type: string; url: string; description: string | null }>
  }
  module: { id: string; title: string; icon: string | null; color: string | null }
  userId: string
  progress: { status: string; progress_pct: number } | null
  nextLesson: { id: string; title: string } | null
  moduleSlug: string
  quiz: { id: string; title: string; pass_score: number } | null
}

const resourceIcon: Record<string, string> = { pdf:'📄', link:'🔗', tool:'🛠️', template:'📋', checklist:'✅' }

export default function LessonContent({ lesson, module, userId, progress, nextLesson, moduleSlug, quiz }: Props) {
  const [completed, setCompleted] = useState(progress?.status === 'completed')
  const [showQuiz, setShowQuiz] = useState(false)
  const [markingDone, setMarkingDone] = useState(false)

  useEffect(() => {
    if (progress?.status === 'not_started' || !progress) {
      const supabase = createClient()
      supabase.from('user_progress').upsert({
        user_id: userId, lesson_id: lesson.id, module_id: module.id,
        status: 'in_progress', started_at: new Date().toISOString(), progress_pct: 10,
      }, { onConflict: 'user_id,lesson_id' })
    }
  }, [])

  async function markComplete() {
    setMarkingDone(true)
    const supabase = createClient()
    const { error } = await supabase.from('user_progress').upsert({
      user_id: userId, lesson_id: lesson.id, module_id: module.id,
      status: 'completed', progress_pct: 100, completed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,lesson_id' })
    if (!error) {
      setCompleted(true)
      toast.success('¡Lección completada!', { description: nextLesson ? `Siguiente: ${nextLesson.title}` : '¡Módulo terminado!' })
    }
    setMarkingDone(false)
  }

  // Get rich content blocks
  const moduleContent = LESSON_CONTENT_MAP[moduleSlug]
  const richBlocks = moduleContent
    ? Object.values(moduleContent)[Math.max(0, lesson.order_index - 1) % Object.keys(moduleContent).length]
    : null

  return (
    <div style={{ padding: 'clamp(24px,4vw,48px)', maxWidth: '720px', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span style={{ fontSize: '16px' }}>{module.icon}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-4)', letterSpacing: '0.04em' }}>{module.title}</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(22px,3vw,30px)', fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: '8px' }}>
          {lesson.title}
        </h1>
        {lesson.subtitle && (
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-3)', fontSize: '15px', lineHeight: 1.6 }}>{lesson.subtitle}</p>
        )}
        {lesson.key_concepts && lesson.key_concepts.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
            {lesson.key_concepts.map(c => (
              <span key={c} className="badge badge-muted">{c}</span>
            ))}
          </div>
        )}
      </div>

      {/* Video */}
      {lesson.video_url && (
        <div style={{ aspectRatio: '16/9', borderRadius: '4px', overflow: 'hidden', background: '#000', marginBottom: '40px', border: '1px solid var(--border)' }}>
          <iframe src={lesson.video_url} style={{ width: '100%', height: '100%' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
      )}

      {/* Rich content */}
      {richBlocks && richBlocks.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <RichLessonRenderer blocks={richBlocks} />
        </div>
      )}

      {/* HTML content fallback */}
      {lesson.content_html && (
        <div className="prose-lesson" style={{ marginBottom: '40px' }}
          dangerouslySetInnerHTML={{ __html: lesson.content_html }} />
      )}

      {/* Resources */}
      {lesson.lesson_resources && lesson.lesson_resources.length > 0 && (
        <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-5)', marginBottom: '16px' }}>
            Recursos
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {lesson.lesson_resources.map(r => (
              <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', background: 'var(--bg-1)', textDecoration: 'none', transition: 'background 0.12s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-1)'}>
                <span style={{ fontSize: '14px', flexShrink: 0 }}>{resourceIcon[r.type] ?? '🔗'}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '2px' }}>{r.title}</p>
                  {r.description && <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-4)' }}>{r.description}</p>}
                </div>
                <ExternalLink size={13} style={{ color: 'var(--text-5)', flexShrink: 0 }} />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Workbook CTA */}
      {lesson.has_workbook && (
        <div style={{ marginTop: '32px', padding: '20px 24px', background: 'var(--bg-1)', border: '1px solid var(--border)', borderLeft: '2px solid var(--text-1)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <FileText size={18} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '4px' }}>Workbook de esta lección</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-3)', lineHeight: 1.5 }}>Completá los ejercicios para consolidar lo aprendido.</p>
          </div>
          <Link href={`/courses/${moduleSlug}/workbook?lesson=${lesson.id}`} className="btn-primary" style={{ padding: '8px 16px', fontSize: '10px', flexShrink: 0 }}>
            Abrir →
          </Link>
        </div>
      )}

      {/* Checklist CTA */}
      <div style={{ marginTop: '12px', padding: '16px 20px', background: 'var(--bg-1)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <ClipboardList size={16} style={{ color: 'var(--text-4)', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '2px' }}>¿Ejecutaste todo del módulo?</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-4)' }}>Revisá el checklist antes de avanzar.</p>
        </div>
        <Link href={`/courses/${moduleSlug}/checklist`} className="btn-ghost" style={{ flexShrink: 0, fontSize: '10px' }}>
          Ver checklist →
        </Link>
      </div>

      {/* Quiz CTA */}
      {lesson.has_quiz && quiz && (
        <div style={{ marginTop: '12px', padding: '20px 24px', background: 'var(--gold-lt)', border: '1px solid rgba(180,83,9,0.15)', borderLeft: '2px solid var(--gold)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <HelpCircle size={18} style={{ color: 'var(--gold)', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '4px' }}>Pop-quiz: {quiz.title}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-3)' }}>Necesitás {quiz.pass_score}% para aprobarlo.</p>
          </div>
          <button onClick={() => setShowQuiz(true)} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '10px', flexShrink: 0 }}>
            Hacer quiz →
          </button>
        </div>
      )}

      {/* Complete button */}
      <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
        {completed ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', background: 'var(--green-lt)', border: '1px solid rgba(45,122,58,0.2)' }}>
            <CheckCircle2 size={20} style={{ color: 'var(--green)', flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: 'var(--green)', marginBottom: '2px' }}>Lección completada</p>
              {nextLesson && (
                <Link href={`/courses/${moduleSlug}/lessons/${nextLesson.id}`}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--green)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Siguiente: {nextLesson.title} <ArrowRight size={12} />
                </Link>
              )}
            </div>
          </div>
        ) : (
          <button onClick={markComplete} disabled={markingDone} className="btn-primary"
            style={{ padding: '14px 32px', fontSize: '11px' }}>
            {markingDone
              ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '13px', height: '13px', border: '2px solid rgba(245,243,239,0.3)', borderTopColor: 'var(--bg)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  Guardando...
                </span>
              : <><CheckCircle2 size={15} /> Marcar como completada</>
            }
          </button>
        )}
      </div>

      {showQuiz && quiz && (
        <QuizModal quizId={quiz.id} lessonId={lesson.id} userId={userId} passScore={quiz.pass_score} onClose={() => setShowQuiz(false)} />
      )}
    </div>
  )
}
