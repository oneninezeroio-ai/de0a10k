// src/app/courses/[slug]/lessons/[lessonId]/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import LessonContent from '@/components/course/LessonContent'
import LessonSidebar from '@/components/course/LessonSidebar'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface PageProps { params: { slug: string; lessonId: string } }

export default async function LessonPage({ params }: PageProps) {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) notFound()

  const [{ data: lesson }, { data: moduleData }] = await Promise.all([
    supabase.from('lessons').select('*, lesson_resources(*)').eq('id', params.lessonId).single(),
    supabase.from('modules').select('*').eq('slug', params.slug).single(),
  ])
  if (!lesson || !moduleData) notFound()

  const { data: allLessons } = await supabase
    .from('lessons').select('id, title, order_index, slug')
    .eq('module_id', moduleData.id).eq('is_published', true).order('order_index')

  const currentIdx = allLessons?.findIndex(l => l.id === lesson.id) ?? -1
  const prevLesson = currentIdx > 0 ? allLessons?.[currentIdx - 1] : null
  const nextLesson = currentIdx < (allLessons?.length ?? 0) - 1 ? allLessons?.[currentIdx + 1] : null

  const { data: progress } = await supabase.from('user_progress').select('*').eq('user_id', user.id).eq('lesson_id', lesson.id).single()
  const { data: quiz } = await supabase.from('quizzes').select('*').eq('lesson_id', lesson.id).single()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Top nav bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 40, background: 'var(--bg-1)', borderBottom: '1px solid var(--border)', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href={`/courses/${params.slug}`} className="btn-ghost" style={{ padding: '6px 12px', fontSize: '11px', flexShrink: 0 }}>
          <ArrowLeft size={13} /> {moduleData.title}
        </Link>
        <div style={{ flex: 1, textAlign: 'center', overflow: 'hidden' }}>
          <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--text-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {lesson.title}
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {prevLesson && (
            <Link href={`/courses/${params.slug}/lessons/${prevLesson.id}`} className="btn-ghost" style={{ padding: '6px 10px' }}>
              <ArrowLeft size={13} />
            </Link>
          )}
          {nextLesson && (
            <Link href={`/courses/${params.slug}/lessons/${nextLesson.id}`} className="btn-primary" style={{ padding: '6px 14px', fontSize: '10px' }}>
              Siguiente <ArrowRight size={12} />
            </Link>
          )}
        </div>
      </div>

      {/* Main content + sidebar */}
      <div style={{ display: 'flex' }}>
        <LessonContent
          lesson={lesson as any}
          module={moduleData}
          userId={user.id}
          progress={progress ?? null}
          nextLesson={nextLesson ?? null}
          moduleSlug={params.slug}
          quiz={quiz ?? null}
        />
        <LessonSidebar
          lesson={lesson}
          allLessons={allLessons ?? []}
          moduleSlug={params.slug}
          progress={progress ?? null}
        />
      </div>
    </div>
  )
}
