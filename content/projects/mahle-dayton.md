# Sistema de Optimización de Líneas de Producción MAHLE Dayton

## Contexto

Plataforma integral de monitoreo, control y análisis para MAHLE Behr Dayton L.L.C. orientada a optimizar eficiencia, reducir errores y mejorar trazabilidad en líneas de producción de los edificios Norte y Sur.

## Problemáticas

- Falta de monitoreo en tiempo real.
- Gestión ineficiente de piezas defectuosas.
- Dependencia de sistemas aislados.
- Pérdida de valor financiero por falta de optimización.

## Cómo lo afronté (decisiones y tradeoffs)

- Centralicé lógica backend en Nest.js para desacoplar el control operativo de sistemas aislados previos.
- Priorizé endpoints orientados a operación en planta: visualización, control de lotes y análisis por lote.
- Alineé la entrega con SCRUM + KANBAN para gestionar iteraciones funcionales y prioridades de operación.
- Tradeoff: frontend en Angular.js no fue desarrollado por mí, por lo que la evolución de UX quedó condicionada por ese frente.

## Solución (arquitectura, módulos, flujos)

### Arquitectura

- Frontend: Angular.js (no hecho por mí).
- Backend: Nest.js (hecho por mí).
- Base de datos: MySQL.
- Interfaz centralizada moderna para operación y trazabilidad.

### Capacidades implementadas

- Visualizar datos de producción en tiempo real.
- Pausar, reanudar o cancelar lotes de producción.
- Calcular márgenes de error y tendencia por lote.

### Flujos operativos

- Flujo Norte: Incoming Goods → Injection Molding → Finished Goods → Dock Out.
- Flujo Sur: Incoming Goods → Radiator/Tube Mills/ECM/Injection Molding → Finished Goods → Dock Out.

## Stack

- Angular.js (frontend, no hecho por mí)
- Nest.js (backend, hecho por mí)
- MySQL
- SCRUM + KANBAN

## Mi rol

Autor principal solo backend.

## Links

- Repositorio: Repositorio privado / GitLab
- Demo: no disponible
- Docs: no disponible
