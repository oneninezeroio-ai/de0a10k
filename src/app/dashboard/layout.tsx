import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import DashboardSidebar from '@/components/course/DashboardSidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: modules } = await supabase.from('modules').select('*').eq('is_published', true).order('order_index')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <DashboardSidebar profile={profile} modules={modules ?? []} />
      <main style={{ flex: 1, minHeight: '100vh', overflowY: 'auto', paddingTop: 0 }}>
        <style>{`@media (max-width: 1024px) { main { paddingTop: 64px !important; } }`}</style>
        {children}
      </main>
    </div>
  )
}
