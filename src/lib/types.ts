// Tipos de datos de Supabase para usar en páginas
export interface Module {
  id: string
  slug: string
  order_index: number
  title: string
  subtitle: string | null
  description: string | null
  icon: string | null
  color: string | null
  cover_image: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Lesson {
  id: string
  module_id: string
  slug: string
  order_index: number
  title: string
  subtitle: string | null
  content_html: string | null
  video_url: string | null
  duration_mins: number | null
  has_workbook: boolean
  has_quiz: boolean
  cover_image: string | null
  key_concepts: string[] | null
  is_published: boolean
  is_preview: boolean
  created_at: string
  updated_at: string
}

export interface LessonResource {
  id: string
  lesson_id: string
  title: string
  type: string
  url: string
  description: string | null
  order_index: number
  created_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  lesson_id: string
  module_id: string
  status: 'not_started' | 'in_progress' | 'completed'
  progress_pct: number
  started_at: string | null
  completed_at: string | null
  time_spent_secs: number
  created_at: string
  updated_at: string
}

export interface WorkbookResponse {
  id: string
  user_id: string
  module_id: string
  lesson_id: string | null
  responses: Record<string, unknown>
  is_complete: boolean
  created_at: string
  updated_at: string
}

export interface ChecklistProgress {
  id: string
  user_id: string
  module_id: string
  item_id: string
  completed: boolean
  completed_at: string | null
  created_at: string
  updated_at: string
}

export interface Quiz {
  id: string
  lesson_id: string
  title: string
  pass_score: number
  time_limit_secs: number | null
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  full_name: string | null
  email: string
  avatar_url: string | null
  country: string | null
  goal_amount: number | null
  goal_days: number | null
  goal_reason: string | null
  onboarded: boolean
  created_at: string
  updated_at: string
}
