# Herbaplant Platform

## Contexto

Dashboard centralizado de trazabilidad integral (sanitaria y comercial) para Herbaplant.

## Problemáticas

- Información operativa distribuida entre inventario, logística y comercial.
- Necesidad de trazabilidad completa sobre quién/qué/cuándo/a través de quién en transferencias y actividad comercial.
- Riesgo operativo por quiebres, sobreinventario y productos estancados.
- Dependencia de múltiples vías de integración (API, archivos y carga manual).

## Cómo lo afronté (decisiones y tradeoffs)

- Diseñé una propuesta técnica para unificar inventario (laboratorio + droguerías) y actividad comercial en una sola plataforma.
- Implementé autenticación y autorización por roles con JWT + Supabase Auth.
- Estructuré rutas protegidas frontend dentro de `/(protected)` con `ProtectedRoute`.
- Definí integración de datos por niveles: API, archivos (CSV/XML/Excel) via SFTP y carga manual.
- Mantuve visibles inconsistencias detectadas para no ocultar deuda técnica antes de cambios de esquema.

## Solución (arquitectura, módulos, flujos)

### Arquitectura y runtime

- Frontend: React 19 + TypeScript + Vite + Tailwind CSS.
- Backend: NestJS + TypeScript.
- Base de datos: Supabase (PostgreSQL).
- Autenticación: JWT + Supabase Auth.

### Manual de instalación / guía de usuario (hechos)

- Backend corre en `http://localhost:3200/api`.
- Health: `http://localhost:3200/api/auth/health`.
- Swagger: `http://localhost:3200/api/docs` si aplica.
- Frontend en `http://localhost:3000`, login `/login`.
- API URL por `NEXT_PUBLIC_API_URL` o default `http://localhost:3200/api`.
- JWT guardado en localStorage (`auth_token`) y `user_data`.

### Roles

- Roles frontend: `ADMIN`, `ALMACEN`, `LOGISTICA`, `VENDEDOR`, `VISITADOR`.
- Roles adicionales backend: `VISITADORA`, `PROMOTORA`.

### Rutas backend consumidas (prefijo `/api`)

- Auth: `/auth/*`
- Users: `/users/*`
- Inventory: `/inventory/*`
- Sales: `/orders/*`, `/pharmacies/*`, `/commissions/*`, `/zones/*`
- Field ops: `/field-ops/doctors/*`, `/medical-visits/*`, `/promoter-reports/*`, `/attendants/*`
- Logistics: `/logistics/dispatches/*`, `/shipments/*`
- Suppliers: `/suppliers/*`
- Notifications: `/notifications/*`
- Analytics: `/analytics/kpi/*`
- Bank: `/bank/*`
- Sync: `/sync/*`

### Tablas Supabase esperadas

- `admin_notifications`
- `attendant`
- `commissions`
- `dispatches`
- `distributors`
- `doctors`
- `inventory_batches`
- `medical_visits`
- `order_items`
- `orders`
- `payment_receipts`
- `pharmacies`
- `pop_materials`
- `product_categories`
- `products`
- `promoter_reports`
- `shipments`
- `sync_jobs`
- `users`
- `zones`

### Módulos backend activos

- `auth`
- `users`
- `inventory`
- `sales`
- `profit-plus`
- `field-ops`
- `analytics`
- `logistics`
- `suppliers`
- `notifications`
- `bank`
- `supabase`

### Módulos funcionales propuestos

- Inventario (lotes/vencimientos, stock disponible/comprometido, integración externa).
- Trazabilidad comercial (tracking transferencias, variables quién/qué/cuándo/a través de quién).
- Inteligencia y alertas (quiebres, sobreinventario, estancados).

> Inconsistencias detectadas (no ocultar): `suppliers` usa `distributors`; referencias a tabla `providers` desde getter pero no siempre está en esquema; campos `items/notes`, `email/pop_material`, `transport_info` deben validarse en DB real antes de cambios.

## Stack

- React 19 + TypeScript + Vite + Tailwind CSS
- NestJS + TypeScript
- Supabase (PostgreSQL)
- JWT + Supabase Auth

## Mi rol

Autor principal full-stack (auth + backend + frontend + database).

## Links

- Repositorio: Privado (Botinfy/herbaplant-platform)
- Demo: no disponible
- Docs: no disponible
