// src/components/course/RichLessonRenderer.tsx
'use client'

import { useState } from 'react'
import {
  AlertCircle, Info, CheckCircle2, Zap, ExternalLink,
  ChevronDown, ChevronUp, Quote, AlertTriangle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LessonBlock } from '@/lib/lesson-content'

interface Props {
  blocks: LessonBlock[]
}

export default function RichLessonRenderer({ blocks }: Props) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </div>
  )
}

function BlockRenderer({ block }: { block: LessonBlock }) {
  switch (block.type) {
    case 'heading':
      return <HeadingBlock block={block} />
    case 'paragraph':
      return <ParagraphBlock block={block} />
    case 'callout':
      return <CalloutBlock block={block} />
    case 'example':
      return <ExampleBlock block={block} />
    case 'quote':
      return <QuoteBlock block={block} />
    case 'warning':
      return <WarningBlock block={block} />
    case 'stat_grid':
      return <StatGridBlock block={block} />
    case 'comparison':
      return <ComparisonBlock block={block} />
    case 'timeline':
      return <TimelineBlock block={block} />
    case 'tool_card':
      return <ToolCardBlock block={block} />
    case 'checklist_inline':
      return <ChecklistBlock block={block} />
    case 'number_breakdown':
      return <NumberBreakdownBlock block={block} />
    case 'divider':
      return <div className="border-t border-stone-100 my-2" />
    default:
      return null
  }
}

function HeadingBlock({ block }: { block: LessonBlock }) {
  if (block.level === 2) {
    return (
      <h2 className="font-serif italic text-2xl text-stone-900 mt-10 mb-1 leading-snug">
        {block.content}
      </h2>
    )
  }
  return (
    <h3 className="font-semibold text-lg text-stone-900 mt-8 mb-1">
      {block.content}
    </h3>
  )
}

function ParagraphBlock({ block }: { block: LessonBlock }) {
  return (
    <p className="text-stone-600 leading-[1.85] text-[1.0625rem]">
      {block.content}
    </p>
  )
}

const calloutConfig = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: <Info size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />,
    text: 'text-blue-900',
  },
  warning: {
    bg: 'bg-gold-50',
    border: 'border-gold-200',
    icon: <AlertCircle size={18} className="text-gold-600 flex-shrink-0 mt-0.5" />,
    text: 'text-gold-900',
  },
  success: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />,
    text: 'text-emerald-900',
  },
  brand: {
    bg: 'bg-brand-50',
    border: 'border-brand-200',
    icon: <Zap size={18} className="text-brand-600 flex-shrink-0 mt-0.5" />,
    text: 'text-brand-900',
  },
}

function CalloutBlock({ block }: { block: LessonBlock }) {
  const variant = block.variant ?? 'info'
  const config = calloutConfig[variant as keyof typeof calloutConfig]
  const lines = (block.content ?? '').split('\n')

  return (
    <div className={cn('rounded-2xl border p-5 flex items-start gap-3', config.bg, config.border)}>
      {config.icon}
      <div className={cn('text-sm leading-relaxed space-y-1', config.text)}>
        {lines.map((line, i) => (
          line === '' ? <div key={i} className="h-2" /> :
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  )
}

function ExampleBlock({ block }: { block: LessonBlock }) {
  const [expanded, setExpanded] = useState(true)
  const lines = (block.content ?? '').split('\n')

  return (
    <div className="rounded-2xl border border-stone-200 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-3 bg-stone-50 hover:bg-stone-100 transition-colors"
      >
        <span className="text-sm font-semibold text-stone-700 flex items-center gap-2">
          <span className="text-base">📌</span> Ejemplo práctico
        </span>
        {expanded
          ? <ChevronUp size={16} className="text-stone-400" />
          : <ChevronDown size={16} className="text-stone-400" />
        }
      </button>
      {expanded && (
        <div className="p-5 bg-white">
          <pre className="text-sm text-stone-700 leading-relaxed whitespace-pre-wrap font-sans">
            {lines.map((line, i) => {
              if (line.startsWith('──')) return <span key={i} className="block text-stone-300 my-2">{line}</span>
              if (line.startsWith('→') || line.match(/^\d+\./)) return (
                <span key={i} className="block text-brand-700 font-medium">{line}</span>
              )
              if (line === '') return <span key={i} className="block h-2" />
              return <span key={i} className="block">{line}</span>
            })}
          </pre>
        </div>
      )}
    </div>
  )
}

function QuoteBlock({ block }: { block: LessonBlock }) {
  return (
    <div className="relative pl-6 py-2 my-8">
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-brand-400 to-brand-600" />
      <Quote size={20} className="text-brand-300 mb-2" />
      <blockquote className="font-serif italic text-xl text-stone-800 leading-relaxed mb-3">
        "{block.content}"
      </blockquote>
      {block.author && (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-700">
            {block.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <span className="text-sm font-semibold text-stone-700">{block.author}</span>
            {block.role && <span className="text-sm text-stone-400"> — {block.role}</span>}
          </div>
        </div>
      )}
    </div>
  )
}

function WarningBlock({ block }: { block: LessonBlock }) {
  const lines = (block.content ?? '').split('\n')
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-5 flex items-start gap-3">
      <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-red-900 leading-relaxed space-y-1">
        {lines.map((line, i) => (
          line === '' ? <div key={i} className="h-2" /> : <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  )
}

function StatGridBlock({ block }: { block: LessonBlock }) {
  const stats = block.stats ?? []
  return (
    <div className="grid grid-cols-2 gap-4 my-4">
      {stats.map((stat, i) => (
        <div key={i} className="card p-5 text-center">
          <div className="font-serif italic text-3xl text-stone-900 mb-1">{stat.value}</div>
          <div className="font-semibold text-stone-700 text-sm">{stat.label}</div>
          {stat.sub && <div className="text-xs text-stone-400 mt-1">{stat.sub}</div>}
        </div>
      ))}
    </div>
  )
}

function ComparisonBlock({ block }: { block: LessonBlock }) {
  const { left, right } = block.sides ?? { left: { title: '', items: [] }, right: { title: '', items: [] } }
  return (
    <div className="grid md:grid-cols-2 gap-4 my-4">
      <div className="card p-5 border-red-200">
        <h4 className="font-semibold text-sm text-red-700 mb-3">{left.title}</h4>
        <ul className="space-y-2">
          {left.items.map((item, i) => (
            <li key={i} className="text-sm text-stone-600 flex items-start gap-2">
              <span className="text-red-400 flex-shrink-0 mt-0.5">✕</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="card p-5 border-emerald-200 bg-emerald-50/30">
        <h4 className="font-semibold text-sm text-emerald-700 mb-3">{right.title}</h4>
        <ul className="space-y-2">
          {right.items.map((item, i) => (
            <li key={i} className="text-sm text-stone-600 flex items-start gap-2">
              <span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function TimelineBlock({ block }: { block: LessonBlock }) {
  const steps = block.steps ?? []
  return (
    <div className="space-y-0 my-4 relative">
      <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-stone-200" />
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4 relative pb-6 last:pb-0">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-100 border-4 border-white shadow-soft flex items-center justify-center z-10">
            <span className="text-xs font-bold text-brand-700">{step.step}</span>
          </div>
          <div className="flex-1 pt-1.5 pb-2">
            <div className="flex items-start justify-between gap-4">
              <h4 className="font-semibold text-stone-900">{step.title}</h4>
              {step.time && (
                <span className="badge bg-emerald-100 text-emerald-700 text-xs flex-shrink-0">{step.time}</span>
              )}
            </div>
            <p className="text-sm text-stone-500 mt-1 leading-relaxed">{step.detail}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function ToolCardBlock({ block }: { block: LessonBlock }) {
  const tool = block.tool
  if (!tool) return null
  return (
    <div className="card p-5 border-stone-200 hover:shadow-medium transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center text-2xl flex-shrink-0">
          {tool.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-stone-900">{tool.name}</h4>
            <span className="badge bg-stone-100 text-stone-600">{tool.price}</span>
          </div>
          <p className="text-sm text-stone-500 leading-relaxed mb-3">{tool.why}</p>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline"
          >
            Ir a {tool.name} <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  )
}

function ChecklistBlock({ block }: { block: LessonBlock }) {
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const items = block.items ?? []

  function toggle(i: number) {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <div className="card p-5 my-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-stone-900 text-sm">Lista de puntos clave</h4>
        <span className="text-xs text-stone-400">{checked.size}/{items.length} revisados</span>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={cn(
              'w-full flex items-start gap-3 text-left rounded-xl p-3 transition-all duration-150',
              checked.has(i) ? 'bg-emerald-50' : 'hover:bg-stone-50'
            )}
          >
            <div className={cn(
              'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all',
              checked.has(i) ? 'bg-emerald-500 border-emerald-500' : 'border-stone-300'
            )}>
              {checked.has(i) && <CheckCircle2 size={12} className="text-white" />}
            </div>
            <span className={cn(
              'text-sm leading-relaxed transition-colors',
              checked.has(i) ? 'text-emerald-800 line-through decoration-emerald-300' : 'text-stone-700'
            )}>
              {item}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function NumberBreakdownBlock({ block }: { block: LessonBlock }) {
  const numbers = block.numbers ?? []
  return (
    <div className="space-y-3 my-4">
      {numbers.map((item, i) => (
        <div key={i} className="card p-5 flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center flex-shrink-0">
            <span className="font-bold text-xl text-brand-700">{item.num}</span>
          </div>
          <div>
            <h4 className="font-semibold text-stone-900 mb-1">{item.label}</h4>
            <p className="text-sm text-stone-500 leading-relaxed">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
