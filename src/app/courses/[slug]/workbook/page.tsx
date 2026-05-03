// src/app/courses/[slug]/workbook/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import WorkbookPreview from '@/components/workbook/WorkbookPreview'

interface PageProps { params: { slug: string } }

export async function generateMetadata({ params }: PageProps) {
  return { title: 'Workbook' }
}

export default async function WorkbookPage({ params }: PageProps) {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: module } = await supabase.from('modules').select('*').eq('slug', params.slug).single()
  if (!module) notFound()

  const { data: savedData } = await supabase
    .from('workbook_responses')
    .select('*')
    .eq('user_id', user.id)
    .eq('module_id', module.id)
    .single()

  return (
    <div style={{ padding: 'clamp(24px,4vw,48px)', maxWidth: '800px', paddingBottom: '80px' }}>
      <Link href={`/courses/${params.slug}`} className="btn-ghost" style={{ marginBottom: '32px', display: 'inline-flex' }}>
        <ArrowLeft size={14} /> {module.title}
      </Link>

      <div style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid var(--border)' }}>
        <p className="eyebrow">Workbook</p>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(24px,4vw,36px)', fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em', marginBottom: '8px' }}>
          {module.icon} {module.title}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-3)', fontSize: '14px', lineHeight: 1.65 }}>
          Completá los ejercicios de este módulo. Se guardan automáticamente.
        </p>
      </div>

      <WorkbookPreview
        moduleSlug={params.slug}
        moduleId={module.id}
        userId={user.id}
        savedData={savedData?.responses ?? {}}
      />
    </div>
  )
}
