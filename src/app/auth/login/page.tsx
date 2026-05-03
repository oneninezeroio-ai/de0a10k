'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { toast.error('Credenciales incorrectas.'); setLoading(false); return }
    toast.success('Bienvenido de vuelta')
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column' }}>

      {/* Nav */}
      <div style={{ padding:'20px clamp(16px,4vw,48px)', borderBottom:'1px solid var(--border)' }}>
        <Link href="/" style={{ fontFamily:'var(--font-mono)', fontSize:'14px', fontWeight:700, color:'var(--text-1)', textDecoration:'none' }}>
          <span style={{ color:'var(--accent)' }}>&lt;</span>de0a10k<span style={{ color:'var(--accent)' }}>&gt;</span>
        </Link>
      </div>

      {/* Content */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'60px 24px' }}>
        <div style={{ width:'100%', maxWidth:'400px' }}>

          <div className="animate-up" style={{ marginBottom:'40px' }}>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'10px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>
              Acceder
            </p>
            <h1 style={{ fontFamily:'var(--font-mono)', fontSize:'clamp(28px,4vw,36px)', fontWeight:700, color:'var(--text-1)', letterSpacing:'-0.025em', marginBottom:'8px', lineHeight:1.05 }}>
              Bienvenido de vuelta.
            </h1>
            <p style={{ fontFamily:'var(--font-body)', color:'var(--text-3)', fontSize:'14px' }}>
              Continuá donde lo dejaste.
            </p>
          </div>

          <form onSubmit={handleLogin} className="animate-up delay-1" style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

            <div>
              <label className="workbook-label">Email</label>
              <div style={{ position:'relative' }}>
                <Mail size={14} style={{ position:'absolute', left:'13px', top:'50%', transform:'translateY(-50%)', color:'var(--text-5)' }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com" required className="input-base"
                  style={{ paddingLeft:'38px' }} />
              </div>
            </div>

            <div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px' }}>
                <label className="workbook-label" style={{ marginBottom:0 }}>Contraseña</label>
                <Link href="/auth/forgot-password" style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--accent)', textDecoration:'none', letterSpacing:'0.02em' }}>
                  ¿Olvidaste la contraseña?
                </Link>
              </div>
              <div style={{ position:'relative' }}>
                <Lock size={14} style={{ position:'absolute', left:'13px', top:'50%', transform:'translateY(-50%)', color:'var(--text-5)' }} />
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required className="input-base"
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
                    Entrando...
                  </span>
                : 'Entrar al curso →'}
            </button>

            <p style={{ fontFamily:'var(--font-body)', textAlign:'center', fontSize:'13px', color:'var(--text-3)' }}>
              ¿No tenés cuenta?{' '}
              <Link href="/auth/register" style={{ color:'var(--accent)', fontWeight:600, textDecoration:'none' }}>
                Registrate gratis
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
