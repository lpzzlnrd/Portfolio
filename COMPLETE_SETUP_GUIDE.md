# Portfolio Case Studies System - Setup Completo

## ¿Qué se implementó?

Se han creado las siguientes características para tu portfolio:

✅ **Página de Case Studies** - Detalle expandido de cada proyecto  
✅ **Página de Contacto** - Página dedicada con formulario y opciones de contacto directo  
✅ **Componente Galería** - Galería de imágenes reutilizable con lightbox  
✅ **Formulario de Contacto** - Componente interactivo para capturar leads  
✅ **Datos extendidos de proyectos** - Información de desafíos, soluciones y gallery

---

## Setup Manual Requerido

### Paso 1: Crear la estructura de directorios dinámicos

Debido a limitaciones técnicas, necesitas crear manualmente estos directorios:

```
C:\Users\leoco\Portfolio\app\projects\[id]\
```

**Instrucciones:**
1. Abre el Explorador de Archivos
2. Ve a `C:\Users\leoco\Portfolio\app\projects\`
3. Crea una nueva carpeta (Clic derecho → Nueva carpeta)
4. Nómbrala: `[id]`
5. Mueve el archivo `detail.tsx` (en `app/projects/`) a esta carpeta
6. Renombra `detail.tsx` a `page.tsx`
7. Elimina el archivo original `app/projects/detail.tsx`

**Resultado esperado:**
```
app/projects/
├── page.tsx (projects list)
└── [id]/
    └── page.tsx (case study detail)
```

### Paso 2: Crear la página de contacto

1. Crea el directorio: `C:\Users\leoco\Portfolio\app\contact\`
2. Dentro, crea un archivo `page.tsx`
3. Copia el contenido del template (ver TEMPLATE_CONTACT.md)

**Resultado esperado:**
```
app/
├── projects/
├── about/
├── contact/
│   └── page.tsx (NEW)
└── ...
```

### Paso 3: Crear estructura de imágenes

1. Crea el directorio: `public/images/projects/`
2. Dentro, crea carpetas por cada proyecto (si quieres mostrar galería):

```
public/images/projects/
├── botinfy-auth/
│   ├── 1.jpg
│   ├── 2.jpg
│   └── 3.jpg
├── los-sauces/
│   ├── 1.jpg
│   └── 2.jpg
├── herbaplant/
│   └── 1.jpg
└── ... (otros proyectos)
```

---

## Ficheros Creados / Modificados

### ✨ Nuevos Componentes

**`components/Gallery.tsx`**
- Componente galería reutilizable
- Soporta lightbox modal
- Navegación entre imágenes
- Responsivo

**`components/ContactForm.tsx`**
- Formulario de contacto interactivo
- Validación básica
- Estados: idle, loading, success, error
- Integración con Formspree (configurable)

### 📄 Nuevas Páginas (Templates)

**`app/projects/[id]/page.tsx`** (actualmente en `app/projects/detail.tsx`)
- Detalle completo de cada case study
- Muestra: desafíos, soluciones, stack, galería
- Links a GitHub y demostración en vivo
- CTA para contacto

**`app/contact/page.tsx`** (necesita ser creada)
- Página de contacto dedicada
- Formulario + opciones de contacto directo
- FAQ
- Información de disponibilidad

### 🔧 Archivos Modificados

**`lib/projects.ts`**
- Extendido tipo `Project` con campos:
  - `description`: Descripción expandida
  - `challenges`: Array de desafíos
  - `solutions`: Array de soluciones
  - `gallery`: Array de imágenes
- Añadidos datos de case study para todos los proyectos

**`lib/i18n.tsx`**
- Añadidas nuevas strings para las páginas de contacto y case studies

**`components/Navbar.tsx`**
- Actualizado botón de contacto para apuntar a `/contact` en lugar de `/about#contact`

### 📋 Scripts de Setup

**`setup.js`**
- Script Node.js para automatizar la creación de directorios
- Ejecutar con: `node setup.js`

**`SETUP_INSTRUCTIONS.md`**
- Instrucciones paso a paso

---

## Cómo Usar

### 1. Ver un Case Study

Navega a cualquiera de estas URLs:
- http://localhost:3000/projects/botinfy-auth
- http://localhost:3000/projects/los-sauces
- http://localhost:3000/projects/herbaplant
- http://localhost:3000/projects/khalil-landing
- http://localhost:3000/projects/mahle-dayton
- http://localhost:3000/projects/local-area-network

### 2. Ver Página de Contacto

- http://localhost:3000/contact

### 3. Añadir Imágenes a la Galería

1. Guarda las imágenes en `public/images/projects/[project-id]/`
2. Actualiza el proyecto en `lib/projects.ts`:

```typescript
{
  id: "botinfy-auth",
  // ... otros campos ...
  gallery: [
    { title: "Dashboard Principal", alt: "Vista del dashboard de autenticación" },
    { title: "Panel de Sesiones", alt: "Gestión de sesiones activas" },
    { title: "Configuración de Permisos", alt: "RBAC interface" },
  ],
}
```

---

## Configuración de Formulario de Contacto

El componente `ContactForm` está configurado para usar **Formspree** por defecto.

### Configurar Formspree:

1. Ve a https://formspree.io
2. Crea una cuenta gratuita
3. Crea un nuevo formulario
4. Copia tu **Form ID**
5. En `components/ContactForm.tsx`, reemplaza `YOUR_FORM_ID`:

```typescript
const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  // ...
})
```

### Alternativas:

Si prefieres otro servicio (Nodemailer, SendGrid, etc.), actualiza el método `handleSubmit` en `ContactForm.tsx`.

---

## Próximos Pasos

- [ ] Crear directorio `app/projects/[id]/`
- [ ] Mover `app/projects/detail.tsx` a `app/projects/[id]/page.tsx`
- [ ] Crear página `app/contact/page.tsx`
- [ ] Crear directorio `public/images/projects/`
- [ ] Añadir imágenes a los case studies
- [ ] Configurar Formspree (o alternativa)
- [ ] Ejecutar `npm run build && npm run dev`
- [ ] Probar las nuevas rutas

---

## Troubleshooting

**Error: Page not found en `/projects/[id]`**
- Verifica que el directorio se llama `[id]` (con corchetes exactos)
- Verifica que el archivo adentro se llama `page.tsx`

**Error: Galería no muestra imágenes**
- Verifica que las imágenes están en `public/images/projects/[project-id]/`
- Verifica que el campo `gallery` en `lib/projects.ts` está configurado
- Abre el navegador DevTools para ver errores 404

**Error: Formulario no envía**
- Verifica que Formspree está configurado con el Form ID correcto
- Revisa la consola del navegador para errores
- Verifica que tienes conexión a internet

---

## Estructura Final Esperada

```
portfolio/
├── app/
│   ├── projects/
│   │   ├── page.tsx (lista de proyectos)
│   │   └── [id]/
│   │       └── page.tsx (detalle del proyecto)
│   ├── contact/
│   │   └── page.tsx (página de contacto)
│   ├── about/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Gallery.tsx (NEW)
│   ├── ContactForm.tsx (NEW)
│   ├── Navbar.tsx (modificado)
│   ├── ProjectCard.tsx
│   └── ...
├── lib/
│   ├── projects.ts (extendido)
│   ├── i18n.tsx (extendido)
│   └── ...
├── public/
│   └── images/
│       └── projects/
│           ├── botinfy-auth/
│           ├── los-sauces/
│           └── ...
├── setup.js (NEW)
└── SETUP_INSTRUCTIONS.md (NEW)
```

---

**¡Listo!** Una vez completes estos pasos, tu portfolio tendrá un sistema completo de case studies, contacto y galería. 🎉
