'use client'

import { useState, useEffect } from 'react'
import { User, Mail, Globe, Target, Save, Loader2, CheckCircle2, LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

const countries = ['Honduras','México','Colombia','Argentina','Perú','Venezuela','Ecuador','Bolivia','Paraguay','Uruguay','República Dominicana','Guatemala','El Salvador','Nicaragua','Costa Rica','Panamá','Cuba','Puerto Rico','Chile','Otro']

export default function PerfilPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({
    full_name: '', email: '', country: '',
    goal_amount: '', goal_days: '', goal_reason: '',
  })
  const [stats, setStats] = useState({ lessons: 0, totalLessons: 0, achievements: 0, joined: '' })

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      const [{ data: prof }, { data: progress }, { data: achievements }, { data: lessons }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('user_progress').select('id').eq('user_id', user.id).eq('status', 'completed'),
        supabase.from('user_achievements').select('id').eq('user_id', user.id),
        supabase.from('lessons').select('id').eq('is_published', true),
      ])

      if (prof) {
        setProfile({
          full_name: prof.full_name ?? '',
          email: prof.email ?? user.email ?? '',
          country: prof.country ?? '',
          goal_amount: prof.goal_amount?.toString() ?? '',
          goal_days: prof.goal_days?.toString() ?? '',
          goal_reason: prof.goal_reason ?? '',
        })
        setStats({
          lessons: progress?.length ?? 0,
          totalLessons: lessons?.length ?? 0,
          achievements: achievements?.length ?? 0,
          joined: prof.created_at ? new Date(prof.created_at).toLocaleDateString('es', { year: 'numeric', month: 'long' }) : '',
        })
      }
      setLoading(false)
    }
    load()
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('profiles').update({
      full_name: profile.full_name,
      country: profile.country,
      goal_amount: profile.goal_amount ? parseInt(profile.goal_amount) : null,
      goal_days: profile.goal_days ? parseInt(profile.goal_days) : null,
      goal_reason: profile.goal_reason || null,
      updated_at: new Date().toISOString(),
    }).eq('id', user.id)

    if (!error) {
      setSaved(true)
      toast.success('Perfil actualizado')
      setTimeout(() => setSaved(false), 3000)
    } else {
      toast.error('Error al guardar')
    }
    setSaving(false)
  }

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Sesión cerrada')
    router.push('/auth/login')
  }

  const initials = profile.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : profile.email?.[0]?.toUpperCase() ?? 'U'

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '20px', height: '20px', border: '2px solid var(--bg-3)', borderTopColor: 'var(--text-1)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(24px,4vw,48px)', paddingBottom: '80px', maxWidth: '680px' }}>

      {/* Header */}
      <div className="animate-up" style={{ marginBottom: '48px', paddingBottom: '40px', borderBottom: '1px solid var(--border)' }}>
        <p className="eyebrow">Mi perfil</p>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em', lineHeight: 1.0, marginBottom: '24px' }}>
          Tu cuenta.
        </h1>

        {/* Avatar + stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-2)', border: '2px solid var(--border-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 700, color: 'var(--text-1)', flexShrink: 0 }}>
            {initials}
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '4px' }}>
              {profile.full_name || 'Sin nombre'}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-3)' }}>{profile.email}</p>
            {stats.joined && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-5)', marginTop: '2px', letterSpacing: '0.03em' }}>
                Miembro desde {stats.joined}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="animate-up delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid var(--border)', borderLeft: '1px solid var(--border)', marginBottom: '48px' }}>
        {[
          { label: 'Lecciones', value: `${stats.lessons}/${stats.totalLessons}` },
          { label: 'Logros',    value: `${stats.achievements}` },
          { label: 'Progreso',  value: stats.totalLessons > 0 ? `${Math.round((stats.lessons / stats.totalLessons) * 100)}%` : '0%' },
        ].map(s => (
          <div key={s.label} style={{ padding: '16px', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.02em', marginBottom: '3px' }}>{s.value}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="animate-up delay-2">

        {/* Personal info */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-5)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={12} /> Información personal
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="workbook-label">Nombre completo</label>
              <input type="text" value={profile.full_name} onChange={e => setProfile(p => ({ ...p, full_name: e.target.value }))}
                placeholder="Tu nombre completo" className="input-base" />
            </div>
            <div>
              <label className="workbook-label">Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={14} style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-5)' }} />
                <input type="email" value={profile.email} readOnly className="input-base"
                  style={{ paddingLeft: '38px', background: 'var(--bg-1)', cursor: 'not-allowed', color: 'var(--text-3)' }} />
              </div>
              <p className="workbook-hint">El email no se puede cambiar desde aquí.</p>
            </div>
            <div>
              <label className="workbook-label">País</label>
              <div style={{ position: 'relative' }}>
                <Globe size={14} style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-5)' }} />
                <select value={profile.country} onChange={e => setProfile(p => ({ ...p, country: e.target.value }))}
                  className="input-base" style={{ paddingLeft: '38px', appearance: 'none', cursor: 'pointer' }}>
                  <option value="">Seleccioná tu país</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Meta de 90 días */}
        <div style={{ marginBottom: '40px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-5)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={12} /> Meta de 90 días
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="workbook-label">Meta de ingresos (USD)</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>$</span>
                  <input type="number" value={profile.goal_amount} onChange={e => setProfile(p => ({ ...p, goal_amount: e.target.value }))}
                    placeholder="3000" className="input-base" style={{ paddingLeft: '26px' }} />
                </div>
              </div>
              <div>
                <label className="workbook-label">Plazo (días)</label>
                <input type="number" value={profile.goal_days} onChange={e => setProfile(p => ({ ...p, goal_days: e.target.value }))}
                  placeholder="90" className="input-base" />
              </div>
            </div>
            <div>
              <label className="workbook-label">¿Por qué es importante para vos?</label>
              <textarea value={profile.goal_reason} onChange={e => setProfile(p => ({ ...p, goal_reason: e.target.value }))}
                placeholder="Ej: Quiero dejar mi trabajo y estar más tiempo con mi familia..." rows={3}
                className="textarea-base" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
          <button type="submit" disabled={saving} className="btn-primary" style={{ padding: '13px 28px' }}>
            {saving
              ? <><Loader2 size={14} style={{ animation: 'spin 0.7s linear infinite' }} /> Guardando...</>
              : saved
              ? <><CheckCircle2 size={14} /> Guardado</>
              : <><Save size={14} /> Guardar cambios</>
            }
          </button>
          <button type="button" onClick={handleSignOut} className="btn-ghost" style={{ color: 'var(--accent)', marginLeft: 'auto' }}>
            <LogOut size={14} /> Cerrar sesión
          </button>
        </div>
      </form>

    </div>
  )
}
