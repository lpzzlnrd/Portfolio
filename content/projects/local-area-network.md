# Local_Area_Network

## Contexto

Simulador de Red de Área Local (LAN) a través de CLI.

## Problemáticas

- Simular comportamiento de red y dispositivos desde terminal con comandos consistentes.
- Modelar transmisión de paquetes con control de TTL y procesamiento por ticks.
- Mantener estructuras de datos explícitas para colas, historial y operaciones de red.
- Guardar y recuperar configuración operativa de forma reproducible.

## Cómo lo afronté (decisiones y tradeoffs)

- Implementé una CLI con modos profesionales (`>`, `#`, `(config)#`) para reflejar experiencia de equipos de red.
- Separé dominio de dispositivos/red, comunicación de paquetes, TDAs y persistencia.
- Usé JSON para persistencia de `running-config` y recuperación de estado.
- Tradeoff: enfoque CLI prioriza control y trazabilidad sobre interfaz visual.

## Solución (arquitectura, módulos, flujos)

### Dispositivos/red

- `router` / `switch` / `host` / `firewall`
- interfaces `ip address`, `shutdown/no shutdown`
- `connect/disconnect`

### Paquetes/comunicación

- `send` con TTL
- `tick/process`
- `show history`

### TDAs

- listas enlazadas
- stack
- queue

### CLI profesional

- modos `>`, `#`, `(config)#`
- `enable`, `configure terminal`, `interface`, `exit`, `end`

### Estadísticas

- `show statistics`
- `show queue <device>`

### Persistencia

- `save running-config`
- `load config` (JSON)

### Instalación (README)

- `git clone`
- switch `Develop`
- `pull`
- branch `Feature_...`

## Stack

- CLI
- TDAs (listas enlazadas, stack, queue)
- JSON

## Mi rol

Autor principal (todo el sistema).

## Links

- Repositorio: https://github.com/lpzzlnrd/Local_Area_Network
- Demo: no disponible
- Docs: no disponible
