'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, Trophy, User, LogOut, Menu, X } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface Props {
  profile: { full_name: string | null; email: string; avatar_url: string | null } | null
  modules: Array<{ id: string; slug: string; order_index: number; title: string; icon: string | null; color: string | null; is_published: boolean }>
}

export default function DashboardSidebar({ profile, modules }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Sesión cerrada')
    router.push('/auth/login')
  }

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').slice(0,2).toUpperCase()
    : profile?.email?.[0].toUpperCase() ?? 'U'

  const SidebarContent = () => (
    <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>

      {/* Logo */}
      <div style={{ padding:'24px 20px 20px', borderBottom:'1px solid var(--border)' }}>
        <Link href="/dashboard" style={{ textDecoration:'none' }} onClick={() => setMobileOpen(false)}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'15px', fontWeight:700, color:'var(--text-1)' }}>
            <span style={{ color:'var(--accent)' }}>&lt;</span>de0a10k<span style={{ color:'var(--accent)' }}>&gt;</span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex:1, overflowY:'auto', padding:'16px 12px' }}>

        <div style={{ marginBottom:'4px' }}>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', fontWeight:700, color:'var(--text-5)', letterSpacing:'0.14em', textTransform:'uppercase', padding:'0 12px', marginBottom:'8px' }}>
            Principal
          </p>
          <Link href="/dashboard" onClick={() => setMobileOpen(false)} className={`nav-item ${pathname === '/dashboard' ? 'active' : ''}`}>
            <LayoutDashboard size={14} /> Dashboard
          </Link>
          <Link href="/dashboard/logros" onClick={() => setMobileOpen(false)} className={`nav-item ${pathname === '/dashboard/logros' ? 'active' : ''}`}>
            <Trophy size={14} /> Mis logros
          </Link>
          <Link href="/dashboard/perfil" onClick={() => setMobileOpen(false)} className={`nav-item ${pathname === '/dashboard/perfil' ? 'active' : ''}`}>
            <User size={14} /> Mi perfil
          </Link>
        </div>

        <div style={{ marginTop:'20px' }}>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', fontWeight:700, color:'var(--text-5)', letterSpacing:'0.14em', textTransform:'uppercase', padding:'0 12px', marginBottom:'8px' }}>
            Módulos
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
            {modules.map((mod, i) => {
              const isActive = pathname.includes(mod.slug)
              return (
                <Link key={mod.id} href={`/courses/${mod.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  style={{ gap:'8px' }}
                >
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', color:'var(--text-5)', minWidth:'18px' }}>
                    {String(mod.order_index).padStart(2,'0')}
                  </span>
                  <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {mod.icon} {mod.title}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* User */}
      <div style={{ padding:'12px', borderTop:'1px solid var(--border)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px 12px', borderRadius:'4px', background:'var(--bg-2)' }}>
          <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'var(--bg-3)', border:'1px solid var(--border-2)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:'10px', fontWeight:700, color:'var(--text-2)', flexShrink:0 }}>
            {initials}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'11px', fontWeight:700, color:'var(--text-1)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              {profile?.full_name ?? profile?.email}
            </p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color:'var(--text-4)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              {profile?.email}
            </p>
          </div>
          <button onClick={signOut} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-4)', padding:'4px', borderRadius:'4px', transition:'color 0.15s', flexShrink:0 }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-4)'}
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside style={{ width:'220px', background:'var(--bg-1)', borderRight:'1px solid var(--border)', height:'100vh', position:'sticky', top:0, flexShrink:0, display:'none' }}
        className="dash-sidebar">
        <style>{`.dash-sidebar { display: block !important; } @media (max-width: 1024px) { .dash-sidebar { display: none !important; } .mob-toggle { display: flex !important; } }`}</style>
        <SidebarContent />
      </aside>

      {/* Mobile toggle */}
      <button className="mob-toggle" onClick={() => setMobileOpen(true)}
        style={{ display:'none', position:'fixed', top:'16px', left:'16px', zIndex:50, width:'40px', height:'40px', borderRadius:'4px', background:'var(--bg-1)', border:'1px solid var(--border-2)', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
        <Menu size={16} color="var(--text-1)" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{ position:'fixed', inset:0, zIndex:100, display:'flex' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.3)' }} onClick={() => setMobileOpen(false)} />
          <aside style={{ position:'relative', width:'220px', background:'var(--bg-1)', borderRight:'1px solid var(--border)', height:'100%', zIndex:1 }}>
            <button onClick={() => setMobileOpen(false)}
              style={{ position:'absolute', top:'16px', right:'16px', background:'none', border:'none', cursor:'pointer', color:'var(--text-3)', padding:'4px' }}>
              <X size={16} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  )
}
