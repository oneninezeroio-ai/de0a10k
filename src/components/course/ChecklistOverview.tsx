'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Circle, ChevronRight, ClipboardList } from 'lucide-react'
import { MODULE_CHECKLISTS } from '@/lib/module-checklists'

interface ModuleInfo {
  id: string; slug: string; order_index: number; title: string;
  icon: string | null; color: string | null; is_published: boolean
}
interface Props { modules: ModuleInfo[] }

export default function ChecklistOverview({ modules }: Props) {
  const [progress, setProgress] = useState<Record<string, { done: number; total: number; pct: number }>>({})

  useEffect(() => {
    const result: Record<string, { done: number; total: number; pct: number }> = {}
    for (const mod of modules) {
      const checklist = MODULE_CHECKLISTS[mod.slug]
      if (!checklist) continue
      try {
        const saved = localStorage.getItem(`checklist_${mod.slug}`)
        const checked: string[] = saved ? JSON.parse(saved) : []
        const total = checklist.items.length
        result[mod.slug] = { done: checked.length, total, pct: Math.round((checked.length / total) * 100) }
      } catch {
        result[mod.slug] = { done: 0, total: checklist.items.length, pct: 0 }
      }
    }
    setProgress(result)
  }, [modules])

  const publishedModules = modules.filter(m => m.is_published)
  const totalTasks = publishedModules.reduce((sum, m) => sum + (MODULE_CHECKLISTS[m.slug]?.items.length ?? 0), 0)
  const totalDone = Object.values(progress).reduce((sum, p) => sum + p.done, 0)
  const overallPct = totalTasks > 0 ? Math.round((totalDone / totalTasks) * 100) : 0

  return (
    <div className="card" style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ClipboardList size={16} style={{ color: 'var(--accent)' }} />
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, color: 'var(--text-1)' }}>
            Checklists
          </h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
            {overallPct}%
          </span>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-5)' }}>
            {totalDone}/{totalTasks} tareas
          </p>
        </div>
      </div>

      <div className="progress-bar" style={{ marginBottom: '20px' }}>
        <div className="progress-fill" style={{ width: `${overallPct}%` }} />
      </div>

      {/* Per-module */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {publishedModules.map(mod => {
          const p = progress[mod.slug]
          const checklist = MODULE_CHECKLISTS[mod.slug]
          if (!checklist) return null
          const pct = p?.pct ?? 0
          const done = p?.done ?? 0
          const total = p?.total ?? checklist.items.length
          const isComplete = pct === 100

          return (
            <Link key={mod.slug} href={`/courses/${mod.slug}/checklist`}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 8px', borderRadius: '4px', textDecoration: 'none', transition: 'background 0.12s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: isComplete ? 'var(--green-lt)' : 'var(--bg-2)', border: `1px solid ${isComplete ? 'rgba(45,122,58,0.2)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {isComplete
                  ? <CheckCircle2 size={13} style={{ color: 'var(--green)' }} />
                  : <Circle size={13} style={{ color: 'var(--text-5)' }} />
                }
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <span style={{ color: 'var(--text-5)', marginRight: '6px' }}>{mod.order_index}.</span>
                  {mod.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1, height: '2px', background: 'var(--bg-3)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: isComplete ? 'var(--green)' : 'var(--text-1)', width: `${pct}%`, transition: 'width 0.6s ease', borderRadius: '99px' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-5)', flexShrink: 0 }}>
                    {done}/{total}
                  </span>
                </div>
              </div>

              <ChevronRight size={13} style={{ color: 'var(--text-5)', flexShrink: 0 }} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
