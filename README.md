# Portfolio (Next.js + App Router)

Portfolio profesional en Next.js con diseño minimalista técnico, contenido versionado por proyecto en Markdown y páginas de casos de estudio.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- React Markdown para render de contenido

## Rutas

- `/` Home
- `/projects` listado de proyectos
- `/projects/[slug]` detalle de caso de estudio
- `/about`
- `/setup`
- `/writing` (placeholder)

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Build de producción

```bash
npm run build
npm run start
```

## Deploy en Vercel

1. Importar el repositorio en Vercel.
2. Framework preset: Next.js.
3. Build command: `npm run build`.
4. Output: `.next`.
5. Deploy.

## Contenido

Todos los casos de estudio viven en `content/projects/*.md` y su índice en `content/projects/index.ts`.
