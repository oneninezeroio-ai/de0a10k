import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: { default: 'De 0 a 10K', template: '%s — De 0 a 10K' },
  description: 'La ruta exacta para montar un negocio digital en USA y facturar en dólares desde Latinoamérica.',
}
export const viewport: Viewport = { themeColor: '#f5f3ef', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--bg)',
              border: '1px solid var(--border-2)',
              color: 'var(--text-1)',
              fontFamily: "'Space Mono', monospace",
              borderRadius: '4px',
              fontSize: '12px',
            }
          }}
        />
      </body>
    </html>
  )
}
