# Deploy en Vercel — De 0 a 10K

## Variables de entorno requeridas

En tu dashboard de Vercel → Settings → Environment Variables, agregá:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## Pasos para hacer deploy

### Opción A: Desde GitHub (recomendado)

1. Subí este proyecto a un repositorio GitHub
2. Andá a https://vercel.com/new
3. Importá el repositorio
4. Vercel detecta Next.js automáticamente
5. Agregá las variables de entorno (ver arriba)
6. Click en **Deploy**

### Opción B: Vercel CLI

```bash
npm i -g vercel
cd de0a10k-v2
vercel --prod
```

Seguí las instrucciones. Cuando pida las env vars, ingresalas.

## Configuración ya incluida

El archivo `vercel.json` ya está configurado en el proyecto con:
- Redirects de auth
- Headers de seguridad
- Región óptima

## Checklist post-deploy

- [ ] Variables de entorno configuradas en Vercel
- [ ] Supabase: Auth → URL Configuration → Site URL = tu URL de Vercel
- [ ] Supabase: Auth → URL Configuration → Redirect URLs = `https://tudominio.vercel.app/auth/callback`
- [ ] Probar registro → confirmar email → login → dashboard

## Stack

- Next.js 14 (App Router)
- Supabase (auth + database)
- Tailwind CSS
- Fuentes: Space Mono + DM Sans (Google Fonts)
- Deploy: Vercel
