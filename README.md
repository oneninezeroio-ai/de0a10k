# De 0 a 10K — Plataforma de Curso Interactiva

Plataforma web para el curso "De 0 a 10K", construida con Next.js 14, Supabase y Tailwind CSS.

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 14 (App Router) |
| Estilos | Tailwind CSS |
| Fuentes | Instrument Serif + Plus Jakarta Sans |
| Animaciones | Framer Motion |
| Backend | Supabase (Auth + PostgreSQL) |
| Deploy | Vercel |
| Formularios | React Hook Form + Zod |
| Notificaciones | Sonner |

## Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Estilos globales
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── callback/route.ts       # OAuth callback
│   ├── dashboard/
│   │   ├── layout.tsx              # Dashboard con sidebar
│   │   └── page.tsx                # Home del dashboard
│   └── courses/
│       └── [slug]/
│           ├── page.tsx            # Lista de lecciones
│           ├── workbook/page.tsx   # Workbook del módulo
│           └── lessons/
│               └── [lessonId]/
│                   └── page.tsx    # Reproductor de lección
├── components/
│   ├── course/
│   │   ├── DashboardSidebar.tsx
│   │   ├── LessonContent.tsx
│   │   └── LessonSidebar.tsx
│   ├── quiz/
│   │   └── QuizModal.tsx
│   └── workbook/
│       └── WorkbookPreview.tsx     # Formulario dinámico
├── lib/
│   ├── supabase.ts                 # Cliente browser
│   ├── supabase-server.ts          # Cliente SSR
│   └── utils.ts
├── middleware.ts                   # Auth middleware
└── types/
```

## Setup Paso a Paso

### 1. Clonar e instalar dependencias

```bash
git clone <tu-repo>
cd de0a10k
npm install
```

### 2. Crear proyecto en Supabase

1. Ir a [supabase.com](https://supabase.com) y crear un proyecto
2. En **SQL Editor**, ejecutar el archivo `supabase_schema.sql` completo
3. En **Authentication > URL Configuration**, agregar:
   - Site URL: `https://tu-dominio.vercel.app`
   - Redirect URLs: `https://tu-dominio.vercel.app/auth/callback`

### 3. Variables de entorno

Copiar `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Llenar con tus credenciales de Supabase (en **Project Settings > API**):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5...
```

### 4. Desarrollo local

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

### 5. Deploy en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variables en Vercel Dashboard:
# Settings > Environment Variables
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
```

O conectar el repositorio directamente en vercel.com para deploy automático en cada push.

## Tablas de Supabase

| Tabla | Descripción |
|-------|------------|
| `profiles` | Perfiles de usuarios (auto-creado al registrarse) |
| `modules` | Los 7 módulos del curso |
| `lessons` | Lecciones dentro de cada módulo |
| `lesson_resources` | Recursos adicionales por lección |
| `user_progress` | Progreso de cada usuario |
| `workbook_responses` | Respuestas a los workbooks (JSONB flexible) |
| `quizzes` | Definición de pop-quizes |
| `quiz_questions` | Preguntas de cada quiz |
| `quiz_options` | Opciones de respuesta |
| `quiz_results` | Resultados de quizzes por usuario |
| `user_notes` | Notas personales del usuario |
| `user_bookmarks` | Lecciones guardadas |
| `achievements` | Logros disponibles |
| `user_achievements` | Logros obtenidos por usuario |

## Agregar Contenido

### Agregar un módulo
```sql
INSERT INTO modules (slug, order_index, title, subtitle, description, icon, color, is_published)
VALUES ('modulo-6-delivery', 6, 'Delivery y Operación', 'Entregar sin ahogarte', '...', '⚙️', 'green', true);
```

### Agregar una lección
```sql
INSERT INTO lessons (module_id, slug, order_index, title, content_html, duration_mins, has_workbook, has_quiz, is_published)
VALUES ('[module-uuid]', 'leccion-6-1', 1, 'Título de la lección', '<p>Contenido HTML...</p>', 15, true, false, true);
```

### Agregar un quiz
```sql
-- 1. Crear el quiz
INSERT INTO quizzes (lesson_id, title, pass_score) 
VALUES ('[lesson-uuid]', 'Quiz del Módulo 1', 70);

-- 2. Agregar preguntas
INSERT INTO quiz_questions (quiz_id, order_index, question_text, explanation)
VALUES ('[quiz-uuid]', 1, '¿Cuál es el primer paso para facturar en dólares?', 'La LLC es el primer paso porque te da estructura legal...');

-- 3. Agregar opciones
INSERT INTO quiz_options (question_id, order_index, option_text, is_correct) VALUES
('[question-uuid]', 1, 'Crear una cuenta en Fiverr', false),
('[question-uuid]', 2, 'Formar una LLC en USA', true),
('[question-uuid]', 3, 'Aprender inglés', false),
('[question-uuid]', 4, 'Comprar un dominio', false);
```

## Personalización del Diseño

El sistema de diseño usa variables CSS en `globals.css`. Los colores principales:

- **Brand**: `#7233FF` (violeta)
- **Stone**: Grises cálidos para texto y fondos
- **Gold**: `#F59E0B` para acentos premium
- **Emerald**: `#10B981` para éxito/completado

Las fuentes son **Instrument Serif** (italic para headings) + **Plus Jakarta Sans** (para texto).

## Features

- ✅ Auth completo (registro, login, email confirmation)
- ✅ Dashboard con progreso por módulo
- ✅ Reproductor de lecciones con video + contenido
- ✅ Tracking automático de progreso
- ✅ Workbooks interactivos con auto-guardado
- ✅ Pop-quizes con retroalimentación inmediata
- ✅ Sistema de logros/badges
- ✅ Sidebar de navegación responsive
- ✅ RLS en todas las tablas (seguridad)
- ✅ Middleware de protección de rutas
- ✅ Mobile-first design
- ✅ Animaciones fluidas

## Próximos Pasos (To-Do)

- [ ] Página de perfil de usuario
- [ ] Página de logros
- [ ] Notas por lección
- [ ] Búsqueda de contenido
- [ ] Panel de admin para gestionar contenido
- [ ] Notificaciones push
- [ ] Integración con Stripe para pagos
