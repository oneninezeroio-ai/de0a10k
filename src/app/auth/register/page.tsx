'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase'

const countries = ['Honduras','México','Colombia','Argentina','Perú','Venezuela','Ecuador','Bolivia','Paraguay','Uruguay','República Dominicana','Guatemala','El Salvador','Nicaragua','Costa Rica','Panamá','Cuba','Puerto Rico','Chile','Otro']

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name:'', email:'', password:'', country:'' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'info'|'done'>('info')
  const update = (f: string, v: string) => setForm(p => ({...p,[f]:v}))

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (form.password.length < 8) { toast.error('Mínimo 8 caracteres.'); return }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email: form.email, password: form.password,
      options: { data: { full_name: form.name, country: form.country }, emailRedirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) { toast.error(error.message); setLoading(false); return }
    setStep('done')
  }

  if (step === 'done') return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'20px clamp(16px,4vw,48px)', borderBottom:'1px solid var(--border)' }}>
        <Link href="/" style={{ fontFamily:'var(--font-mono)', fontSize:'14px', fontWeight:700, color:'var(--text-1)' }}>
          <span style={{ color:'var(--accent)' }}>&lt;</span>de0a10k<span style={{ color:'var(--accent)' }}>&gt;</span>
        </Link>
      </div>
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'60px 24px' }}>
        <div style={{ maxWidth:'400px', width:'100%' }}>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'10px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>
            Listo
          </p>
          <h1 style={{ fontFamily:'var(--font-mono)', fontSize:'32px', fontWeight:700, color:'var(--text-1)', marginBottom:'12px', letterSpacing:'-0.025em', lineHeight:1.05 }}>
            Revisá tu email.
          </h1>
          <p style={{ fontFamily:'var(--font-body)', color:'var(--text-3)', fontSize:'14px', lineHeight:1.7, marginBottom:'28px' }}>
            Te mandamos un link de confirmación a{' '}
            <strong style={{ color:'var(--text-1)', fontFamily:'var(--font-mono)', fontSize:'12px' }}>{form.email}</strong>.
            Hacé clic para activar tu cuenta.
          </p>
          <Link href="/auth/login" className="btn-secondary" style={{ display:'inline-flex' }}>
            Ir al login →
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'20px clamp(16px,4vw,48px)', borderBottom:'1px solid var(--border)' }}>
        <Link href="/" style={{ fontFamily:'var(--font-mono)', fontSize:'14px', fontWeight:700, color:'var(--text-1)' }}>
          <span style={{ color:'var(--accent)' }}>&lt;</span>de0a10k<span style={{ color:'var(--accent)' }}>&gt;</span>
        </Link>
      </div>

      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'60px 24px' }}>
        <div style={{ width:'100%', maxWidth:'400px' }}>

          <div className="animate-up" style={{ marginBottom:'40px' }}>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'10px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>
              Crear cuenta
            </p>
            <h1 style={{ fontFamily:'var(--font-mono)', fontSize:'clamp(28px,4vw,36px)', fontWeight:700, color:'var(--text-1)', letterSpacing:'-0.025em', marginBottom:'8px', lineHeight:1.05 }}>
              Empezá gratis.
            </h1>
            <p style={{ fontFamily:'var(--font-body)', color:'var(--text-3)', fontSize:'14px' }}>
              Sin tarjeta de crédito. Sin compromisos.
            </p>
          </div>

          <form onSubmit={handleRegister} className="animate-up delay-1" style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
            <div>
              <label className="workbook-label">Nombre completo</label>
              <div style={{ position:'relative' }}>
                <User size={14} style={{ position:'absolute', left:'13px', top:'50%', transform:'translateY(-50%)', color:'var(--text-5)' }} />
                <input type="text" value={form.name} onChange={e => update('name',e.target.value)}
                  placeholder="Tu nombre" required className="input-base" style={{ paddingLeft:'38px' }} />
              </div>
            </div>
            <div>
              <label className="workbook-label">Email</label>
              <div style={{ position:'relative' }}>
                <Mail size={14} style={{ position:'absolute', left:'13px', top:'50%', transform:'translateY(-50%)', color:'var(--text-5)' }} />
                <input type="email" value={form.email} onChange={e => update('email',e.target.value)}
                  placeholder="tu@email.com" required className="input-base" style={{ paddingLeft:'38px' }} />
              </div>
            </div>
            <div>
              <label className="workbook-label">País</label>
              <select value={form.country} onChange={e => update('country',e.target.value)} required className="input-base"
                style={{ appearance:'none', cursor:'pointer', background:'var(--bg)' }}>
                <option value="">Seleccioná tu país</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="workbook-label">Contraseña</label>
              <div style={{ position:'relative' }}>
                <Lock size={14} style={{ position:'absolute', left:'13px', top:'50%', transform:'translateY(-50%)', color:'var(--text-5)' }} />
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => update('password',e.target.value)}
                  placeholder="Mínimo 8 caracteres" required minLength={8} className="input-base"
                  style={{ paddingLeft:'38px', paddingRight:'44px' }} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'var(--text-4)', padding:0 }}>
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary"
              style={{ width:'100%', justifyContent:'center', padding:'14px', marginTop:'4px' }}>
              {loading
                ? <span style={{ display:'inline-flex', alignItems:'center', gap:'8px' }}>
                    <span style={{ width:'14px', height:'14px', border:'2px solid rgba(245,243,239,0.3)', borderTopColor:'var(--bg)', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
                    Creando cuenta...
                  </span>
                : 'Crear cuenta gratis →'}
            </button>
            <p style={{ fontFamily:'var(--font-body)', textAlign:'center', fontSize:'13px', color:'var(--text-3)' }}>
              ¿Ya tenés cuenta?{' '}
              <Link href="/auth/login" style={{ color:'var(--accent)', fontWeight:600, textDecoration:'none' }}>
                Iniciar sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
