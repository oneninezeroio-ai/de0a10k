'use client'

import { useState, useEffect, useCallback } from 'react'
import { CheckCircle2, Circle, ChevronDown, ChevronUp, AlertCircle, Clock, Wrench, Trophy, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import type { ModuleChecklist, ChecklistItem } from '@/lib/module-checklists'

interface Props {
  checklist: ModuleChecklist
  userId: string
  moduleId: string
  savedProgress: Array<{ item_id?: string; [key: string]: unknown }>
  moduleSlug?: string
  nextModuleSlug?: string
}

export default function ModuleChecklistComponent({ checklist, userId, moduleId, savedProgress, moduleSlug, nextModuleSlug }: Props) {
  const storageKey = `checklist_${moduleId}`
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const [showCompleted, setShowCompleted] = useState(false)
  const [justCompleted, setJustCompleted] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) setChecked(new Set(JSON.parse(saved)))
    } catch {}
  }, [storageKey])

  const persist = useCallback((next: Set<string>) => {
    try { localStorage.setItem(storageKey, JSON.stringify(Array.from(next))) } catch {}
  }, [storageKey])

  function toggle(id: string, critical: boolean) {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
        if (critical) toast.success('¡Tarea crítica completada!', { duration: 2000 })
      }
      persist(next)
      if (next.size === checklist.items.length && prev.size < checklist.items.length) {
        setJustCompleted(true)
        toast.success('¡Checklist completado! 🎉', { description: checklist.completionMessage, duration: 5000 })
      }
      return next
    })
  }

  function toggleCollapse(cat: string) {
    setCollapsed(prev => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })
  }

  const byCategory: Record<string, ChecklistItem[]> = {}
  for (const item of checklist.items) {
    const cat = item.category ?? 'General'
    if (!byCategory[cat]) byCategory[cat] = []
    byCategory[cat].push(item)
  }

  const total = checklist.items.length
  const done = checked.size
  const pct = Math.round((done / total) * 100)
  const criticalItems = checklist.items.filter(i => i.critical)
  const criticalDone = criticalItems.filter(i => checked.has(i.id)).length
  const allCriticalDone = criticalDone === criticalItems.length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header */}
      <div className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.02em', marginBottom: '6px' }}>
              {checklist.title}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.65 }}>
              {checklist.description}
            </p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em', lineHeight: 1 }}>
              {pct}%
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-5)', marginTop: '2px' }}>
              {done}/{total} tareas
            </div>
          </div>
        </div>

        <div className="progress-bar" style={{ marginBottom: '12px' }}>
          <div className="progress-fill" style={{ width: `${pct}%`, transition: 'width 0.7s ease' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertCircle size={12} style={{ color: allCriticalDone ? 'var(--green)' : 'var(--gold)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-4)' }}>
            Tareas críticas: {criticalDone}/{criticalItems.length}
            {allCriticalDone ? ' — ¡todas completadas!' : ' — completá estas para avanzar'}
          </span>
        </div>
      </div>

      {/* Completion banner */}
      {(pct === 100 || justCompleted) && (
        <div style={{ padding: '24px', background: 'var(--green-lt)', border: '1px solid rgba(45,122,58,0.2)', borderLeft: '3px solid var(--green)', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(45,122,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Trophy size={22} style={{ color: 'var(--green)' }} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', fontWeight: 700, color: 'var(--green)', marginBottom: '6px', letterSpacing: '-0.01em' }}>
              ¡Módulo completado! 🎉
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.65, marginBottom: nextModuleSlug ? '16px' : 0 }}>
              {checklist.completionMessage}
            </p>
            {nextModuleSlug && (
              <Link href={`/courses/${nextModuleSlug}`} className="btn-primary" style={{ padding: '8px 18px', fontSize: '11px' }}>
                {checklist.nextAction ?? 'Siguiente módulo'} <ArrowRight size={13} />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Show completed toggle */}
      {done > 0 && (
        <button onClick={() => setShowCompleted(!showCompleted)} className="btn-ghost" style={{ alignSelf: 'flex-start' }}>
          {showCompleted ? 'Ocultar completadas' : `Mostrar completadas (${done})`}
        </button>
      )}

      {/* Categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {Object.entries(byCategory).map(([category, items]) => {
          const catDone = items.filter(i => checked.has(i.id)).length
          const catTotal = items.length
          const isCollapsed = collapsed.has(category)
          const visibleItems = showCompleted ? items : items.filter(i => !checked.has(i.id))
          if (!showCompleted && catDone === catTotal) return null

          return (
            <div key={category} className="card" style={{ overflow: 'hidden' }}>
              <button onClick={() => toggleCollapse(category)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', transition: 'background 0.12s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: catDone === catTotal ? 'var(--green-lt)' : 'var(--bg-2)', border: `1px solid ${catDone === catTotal ? 'rgba(45,122,58,0.2)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: catDone === catTotal ? 'var(--green)' : 'var(--text-3)', flexShrink: 0 }}>
                    {catDone === catTotal ? '✓' : catDone}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--text-1)' }}>{category}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-5)' }}>{catDone}/{catTotal}</span>
                </div>
                {isCollapsed
                  ? <ChevronDown size={15} style={{ color: 'var(--text-5)' }} />
                  : <ChevronUp size={15} style={{ color: 'var(--text-5)' }} />
                }
              </button>

              {!isCollapsed && (
                <div style={{ borderTop: '1px solid var(--border)' }}>
                  {visibleItems.map(item => (
                    <ChecklistRow key={item.id} item={item} isDone={checked.has(item.id)} onToggle={() => toggle(item.id, item.critical ?? false)} />
                  ))}
                  {!showCompleted && catDone > 0 && (
                    <div style={{ padding: '8px 20px', background: 'var(--bg-1)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-5)' }}>
                        {catDone} {catDone === 1 ? 'tarea completada' : 'tareas completadas'}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Reset */}
      {done > 0 && (
        <button
          onClick={() => { if (confirm('¿Reiniciar checklist? Perderás el progreso.')) { setChecked(new Set()); persist(new Set()); setJustCompleted(false) } }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-5)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', alignSelf: 'flex-start', letterSpacing: '0.03em' }}>
          Reiniciar checklist
        </button>
      )}
    </div>
  )
}

function ChecklistRow({ item, isDone, onToggle }: { item: ChecklistItem; isDone: boolean; onToggle: () => void }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{ background: isDone ? 'var(--bg-1)' : 'var(--bg)', borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 20px' }}>
        <button onClick={onToggle}
          style={{ flexShrink: 0, marginTop: '1px', width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${isDone ? 'var(--green)' : item.critical ? 'var(--gold)' : 'var(--border-2)'}`, background: isDone ? 'var(--green)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', padding: 0 }}>
          {isDone && <CheckCircle2 size={11} style={{ color: '#fff' }} />}
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: isDone ? 'var(--text-5)' : 'var(--text-1)', textDecoration: isDone ? 'line-through' : 'none', lineHeight: 1.4 }}>
              {item.text}
            </span>
            {item.critical && !isDone && (
              <span className="badge badge-gold">Crítica</span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {item.time && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-5)' }}>
                <Clock size={10} />{item.time}
              </span>
            )}
            {item.tool && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)' }}>
                <Wrench size={10} />{item.tool}
              </span>
            )}
            {item.detail && (
              <button onClick={() => setExpanded(!expanded)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-4)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                {expanded ? 'Menos detalle' : 'Ver detalle'}
              </button>
            )}
          </div>

          {expanded && item.detail && (
            <div style={{ marginTop: '8px', padding: '10px 12px', background: 'var(--bg-2)', fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.65 }}>
              {item.detail}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
