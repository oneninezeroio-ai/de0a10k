// src/app/courses/[slug]/checklist/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ModuleChecklist from '@/components/course/ModuleChecklist'
import { MODULE_CHECKLISTS } from '@/lib/module-checklists'

interface PageProps { params: { slug: string } }

export async function generateMetadata({ params }: PageProps) {
  return { title: 'Checklist' }
}

export default async function ChecklistPage({ params }: PageProps) {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: moduleData } = await supabase
    .from('modules')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!moduleData) notFound()

  const { data: checklistData } = await supabase
    .from('checklist_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('module_id', moduleData.id)

  const checklist = MODULE_CHECKLISTS[params.slug]

  return (
    <div style={{ padding: 'clamp(24px,4vw,48px)', maxWidth: '800px', paddingBottom: '80px' }}>
      <Link href={`/courses/${params.slug}`} className="btn-ghost" style={{ marginBottom: '32px', display: 'inline-flex' }}>
        <ArrowLeft size={14} /> {moduleData.title}
      </Link>

      <div style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid var(--border)' }}>
        <p className="eyebrow">Checklist de ejecución</p>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(24px,4vw,36px)', fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em', marginBottom: '8px' }}>
          {moduleData.icon} {moduleData.title}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-3)', fontSize: '14px', lineHeight: 1.65 }}>
          Marcá cada tarea completada antes de avanzar al siguiente módulo.
        </p>
      </div>

      {!checklist ? (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-4)', textAlign: 'center', padding: '48px 0' }}>
          El checklist de este módulo estará disponible próximamente.
        </p>
      ) : (
        <ModuleChecklist
          checklist={checklist}
          userId={user.id}
          moduleId={moduleData.id}
          savedProgress={checklistData ?? []}
        />
      )}
    </div>
  )
}
