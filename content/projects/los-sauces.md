# Clínica Los Sauces - Plataforma Interna

## Contexto

Plataforma integral de gestión clínica y administrativa en monorepo frontend+backend con integración con sistemas heredados.

## Problemáticas

- Necesidad de coordinar módulos clínicos y administrativos en una misma plataforma.
- Integración de datos de sistemas legados sin impactar el flujo request-response.
- Requerimientos de seguridad por módulos y operación multiárea.
- Soporte de motores de base de datos distintos según entorno.

## Cómo lo afronté (decisiones y tradeoffs)

- Diseñé un monolito modular inspirado en DDD para mantener cohesión por dominio y límites claros por módulo (`src/modules/`).
- Implementé sync/ETL mediante cron jobs (`@nestjs/schedule`) para leer SQL Server y consolidar en PostgreSQL fuera del ciclo síncrono de requests.
- Apliqué seguridad con JWT + Passport + Bcrypt + RBAC por módulos.
- Tradeoff: mantener soporte simultáneo PostgreSQL y MSSQL incrementa complejidad de configuración y pruebas.

## Solución (arquitectura, módulos, flujos)

### Arquitectura

- Frontend: Next.js 16.2 + React 19, Tailwind 4.2, Recharts, Lucide, Tesseract.js (OCR).
- Backend: NestJS 11 + TS5, TypeORM, soporte PostgreSQL y MSSQL.
- Seguridad: JWT + Passport, Bcrypt, RBAC por módulos.
- Sync/ETL: cron jobs (@nestjs/schedule) que leen SQL Server y consolidan en PostgreSQL sin afectar request-response.

### Patrón y estructura

Patrón: monolito modular inspirado en DDD; módulos en `src/modules/`.

Estructura repo (árbol):

```text
backend/
  src/
    commands
    common
    config
    migrations
    modules
    main.ts
frontend/
  src/
    app
    components
    contexts
    services
    types
skills/
docker.compose.yaml
```

### Módulos core

- admisión/agenda
- casos clínicos/hospitalización
- quirófano
- facturación/presupuestos
- CRM/pacientes
- auditoría/analytics
- módulo sync

### Docker y env (ejemplo de README)

```env
DATABASE_URL=
LEGACY_DB_HOST=
LEGACY_DB_PORT=
LEGACY_DB_NAME=
LEGACY_DB_USER=
LEGACY_DB_PASS=
JWT_SECRET=
JWT_REFRESH_SECRET=
NEXT_PUBLIC_API_URL=
```

## Stack

- Next.js 16.2 + React 19
- Tailwind 4.2
- Recharts
- Lucide
- Tesseract.js (OCR)
- NestJS 11 + TS5
- TypeORM
- PostgreSQL y MSSQL
- JWT + Passport
- Bcrypt
- RBAC
- @nestjs/schedule

## Mi rol

Autor principal full-stack.

## Links

- Repositorio: https://github.com/Botinfy/los-sauces
- Demo: no disponible
- Docs: no disponible
