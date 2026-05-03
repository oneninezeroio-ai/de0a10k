// src/lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr'

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
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
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      modules: {
        Row: {
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
      }
      lessons: {
        Row: {
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
      }
      lesson_resources: {
        Row: {
          id: string
          lesson_id: string
          title: string
          type: string
          url: string
          description: string | null
          order_index: number
          created_at: string
        }
      }
      user_progress: {
        Row: {
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
        Insert: Omit<Database['public']['Tables']['user_progress']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['user_progress']['Insert']>
      }
      workbook_responses: {
        Row: {
          id: string
          user_id: string
          module_id: string
          lesson_id: string | null
          responses: Record<string, unknown>
          is_complete: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['workbook_responses']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['workbook_responses']['Insert']>
      }
      checklist_progress: {
        Row: {
          id: string
          user_id: string
          module_id: string
          item_id: string
          completed: boolean
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['checklist_progress']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['checklist_progress']['Insert']>
      }
      quizzes: {
        Row: {
          id: string
          lesson_id: string
          title: string
          pass_score: number
          time_limit_secs: number | null
          created_at: string
          updated_at: string
        }
      }
      quiz_questions: {
        Row: {
          id: string
          quiz_id: string
          question_text: string
          question_type: string
          explanation: string | null
          order_index: number
          created_at: string
        }
      }
      quiz_options: {
        Row: {
          id: string
          question_id: string
          option_text: string
          is_correct: boolean
          order_index: number
        }
      }
      quiz_results: {
        Row: {
          id: string
          user_id: string
          quiz_id: string
          lesson_id: string
          score: number
          passed: boolean
          answers: Record<string, string[]>
          attempt_num: number
          time_secs: number | null
          completed_at: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['quiz_results']['Row'], 'id' | 'completed_at' | 'created_at'>
        Update: Partial<Database['public']['Tables']['quiz_results']['Insert']>
      }
      achievements: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          icon: string | null
          color: string | null
          condition: string | null
          points: number
          created_at: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          earned_at: string
        }
      }
    }
    Views: {
      module_progress_summary: {
        Row: {
          user_id: string
          module_id: string
          module_title: string
          module_order: number
          total_lessons: number
          completed_lessons: number
          completion_pct: number
        }
      }
    }
  }
}

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
