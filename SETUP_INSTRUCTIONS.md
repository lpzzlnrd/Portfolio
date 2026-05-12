# Instrucciones de Setup Manual

Debido a limitaciones en la creación de directorios con caracteres especiales en Windows, necesitas hacer estos pasos manualmente:

## 1. Mover el archivo de Case Study Detail

El archivo `app/projects/detail.tsx` necesita ser movido a:
```
app/projects/[id]/page.tsx
```

Pasos:
1. Crea manualmente la carpeta `app/projects/[id]`
2. Mueve `detail.tsx` a `app/projects/[id]/page.tsx`
3. Elimina el archivo `detail.tsx`

## 2. Crear la página de Contacto

Crea la estructura de carpeta `app/contact/` y copia el contenido de la plantilla en el archivo `app/contact/page.tsx`:

```typescript
"use client";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { useT, STR } from "@/lib/i18n";
import { ABOUT } from "@/lib/about";

export default function ContactPage() {
  const t = useT();

  return (
    // ... [Ver el contenido completo en la documentación de implementación]
  );
}
```

## 3. Actualizar la Navbar

Cambiar la ruta del botón de contacto de `/about#contact` a `/contact`:

En `components/Navbar.tsx`:
```typescript
<Link href="/contact" className="no-underline">
  <Button kind="ghost">{t(STR.navContact)} →</Button>
</Link>
```

## 4. Crear la carpeta de imágenes

Crea la carpeta `public/images/projects/` para almacenar las imágenes de los case studies.

Estructura esperada:
```
public/images/projects/
  ├── botinfy-auth/
  │   ├── 1.jpg
  │   ├── 2.jpg
  │   └── ...
  ├── los-sauces/
  │   ├── 1.jpg
  │   └── ...
  └── ... [otros proyectos]
```

## 5. Actualizar datos de proyectos con galería

Para mostrar la galería en un case study, añade el array `gallery` al proyecto:

```typescript
gallery: [
  { title: "Dashboard", alt: "Vista principal del dashboard" },
  { title: "Módulo de usuarios", alt: "Gestión de usuarios" },
  // ... más imágenes
]
```

## Verificación

Una vez completados estos pasos:

1. ✅ Navega a `/projects/botinfy-auth` para ver un case study
2. ✅ Navega a `/contact` para ver la página de contacto
3. ✅ Verifica que las imágenes se cargan correctamente (si las añadiste)
4. ✅ Prueba el formulario de contacto
