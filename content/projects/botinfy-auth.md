# Botinfy Auth

## Contexto

Microservicio de autenticación basado en JWT + OTP (WhatsApp) + sesiones en Redis.

## Problemáticas

- Requerimiento de doble validación con OTP sin sacrificar tiempos de operación.
- Necesidad de revocación y control de sesión en tiempo real.
- Control de abuso en endpoints sensibles de autenticación.
- Permisos granulares por usuario más allá de autenticación básica.

## Cómo lo afronté (decisiones y tradeoffs)

- Implementé flujo de autenticación en dos pasos (`/api/auth/login` + `/api/auth/otp`) con sesión temporal y OTP de 6 dígitos.
- Integré Redis para sesiones con TTL y validación de `jti` para reforzar control de tokens.
- Apliqué throttling global y específico en auth para reducir superficie de abuso.
- Añadí auditoría fire-and-forget para trazabilidad sin bloquear request-response.

## Solución (arquitectura, módulos, flujos)

### Estructura del proyecto

- `src/main.ts` (CORS, Swagger, prefijo `/api`)
- `app.module.ts`
- `auth` (controllers/services/strategies/guards/decorators/dto)
- `redis`
- `audit` (fire-and-forget)
- `supabase`
- `frontend`
- `supabase/migrations`
- `docs`
- `skills`
- `docker-compose.yml`
- `Dockerfile`

### Endpoints

- `POST /api/auth/login` (Public) → `OTP_REQUIRED` + `session_id`
- `POST /api/auth/otp` (Public) → `access_token` + `refresh_token`
- `POST /api/auth/recover` (Public) → OTP y recovery
- `POST /api/auth/register` (JWT + `MANAGE_USERS`)
- `POST /api/auth/refresh` (Public, `refresh_token` cookie httpOnly)
- `POST /api/auth/logout` (JWT)

Swagger: `http://localhost:3000/api/docs`

### Flujo auth

1. `login` valida credenciales con Supabase, genera OTP 6 dígitos, envía por WhatsApp (webhook Botinfy), retorna `session_id`.
2. `otp` valida (max 3 intentos, bloqueo 15 min), crea sesión en Redis (30 min TTL), retorna access + refresh cookie.
3. Requests autenticados: `JwtStrategy` verifica firma + Supabase + sesión Redis + `jti`, renueva TTL en cada request.

### Seguridad

- rate limiting `120 req/min` global y `10 req/min` en auth
- anti-enumeración
- OTP attempts/lock
- JWT `jti` rotation
- recovery tokens SHA-256 hash TTL 10 min
- permisos granulares `user_permissions` consultada por `PermissionGuard`
- cookies httpOnly

### DB tablas

- `auth.users`
- `public.users`
- `public.user_permissions`
- `public.recovery_tokens`
- `public.audit_log`

## Stack

| Componente | Tecnología |
| --- | --- |
| Backend framework | NestJS ^11 |
| JWT/Auth | @nestjs/jwt + passport-jwt ^11 |
| Data/Auth provider | Supabase ^2 |
| Session store | Redis ioredis ^5 |
| Rate limiting | @nestjs/throttler ^6.5 |
| API docs | Swagger ^11 |
| Frontend prueba | React+Vite 18/5 |
| Entorno local | Docker Compose |

## Mi rol

Autor principal full-stack (hice todo).

## Links

- Repositorio: https://github.com/Botinfy/botinfy-auth
- Demo: no disponible
- Docs: no disponible
