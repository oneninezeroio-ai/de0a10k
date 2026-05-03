'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Circle } from 'lucide-react'

interface Props {
  lesson: { id: string; title: string }
  allLessons: Array<{ id: string; title: string; order_index: number; slug: string }>
  moduleSlug: string
  progress: { status: string } | null
}

export default function LessonSidebar({ lesson, allLessons, moduleSlug, progress }: Props) {
  const pathname = usePathname()

  return (
    <aside style={{ width: '256px', borderLeft: '1px solid var(--border)', minHeight: '100vh', background: 'var(--bg-1)', flexShrink: 0, padding: '20px 12px', display: 'none' }}
      className="lesson-sidebar">
      <style>{`@media (min-width: 1280px) { .lesson-sidebar { display: block !important; } }`}</style>

      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-5)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px', padding: '0 8px' }}>
        Lecciones del módulo
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {allLessons.map(l => {
          const isActive = l.id === lesson.id
          return (
            <Link key={l.id} href={`/courses/${moduleSlug}/lessons/${l.id}`}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '8px',
                padding: '8px', borderRadius: '4px', fontSize: '12px',
                fontFamily: 'var(--font-body)',
                background: isActive ? 'var(--bg-2)' : 'transparent',
                color: isActive ? 'var(--text-1)' : 'var(--text-3)',
                fontWeight: isActive ? 600 : 400,
                textDecoration: 'none',
                transition: 'background 0.12s',
                lineHeight: 1.4,
              }}>
              <div style={{ flexShrink: 0, marginTop: '2px' }}>
                {isActive
                  ? <ChevronRight size={12} style={{ color: 'var(--accent)' }} />
                  : <Circle size={12} style={{ color: 'var(--text-5)' }} />
                }
              </div>
              <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {l.title}
              </span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
