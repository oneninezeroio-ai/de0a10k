// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(mins: number): string {
  if (mins < 60) return `${mins} min`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

export function getModuleColor(color: string | null) {
  const map: Record<string, { bg: string; text: string; border: string; badge: string }> = {
    purple: { bg: 'bg-brand-50', text: 'text-brand-700', border: 'border-brand-200', badge: 'bg-brand-100 text-brand-700' },
    teal:   { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-700' },
    amber:  { bg: 'bg-gold-50', text: 'text-gold-700', border: 'border-gold-200', badge: 'bg-gold-100 text-gold-700' },
    blue:   { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700' },
    coral:  { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', badge: 'bg-red-100 text-red-700' },
    green:  { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', badge: 'bg-green-100 text-green-700' },
    pink:   { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200', badge: 'bg-pink-100 text-pink-700' },
  }
  return map[color ?? 'purple'] ?? map.purple
}
