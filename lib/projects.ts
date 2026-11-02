/**
 * lib/projects.ts — single source of truth for project content.
 *
 * Real entries derived from leoco's repos. No fabricated metrics:
 * summaries describe what the system does, not how much it improved.
 */

export type Domain = "auth" | "fullstack" | "data" | "integrations";

export type ProjectChallenge = {
  title: { es: string; en: string };
  description: { es: string; en: string };
};

export type ProjectSolution = {
  title: { es: string; en: string };
  description: { es: string; en: string };
};

export type Project = {
  id: string;                                    // url-safe slug, used in /projects/[id]
  title: { es: string; en: string };
  role:  { es: string; en: string };
  year: string;
  tags: string[];                                // 3–6 stack labels
  domain: Domain;
  private: boolean;                              // if true, hide github URL, show callout
  summary: { es: string; en: string };
  description?: { es: string; en: string };     // detailed description for case study
  challenges?: ProjectChallenge[];               // problems and decisions
  solutions?: ProjectSolution[];                 // approaches and outcomes
  gallery?: { title: string; alt: string }[];    // image metadata (src will be /images/projects/[id]/...)
  github?: string;                               // omit when private:true
  live?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "roda",
    title: {
      es: "Roda · SaaS para talleres mecánicos",
      en: "Roda · Auto repair shop SaaS",
    },
    role: {
      es: "Backend, sync offline y núcleo KMP (contribuidor principal, equipo de 3)",
      en: "Backend, offline sync and KMP core (top contributor, team of 3)",
    },
    year: "2026",
    tags: ["Kotlin Multiplatform", "Jetpack Compose", "Supabase", "PostgreSQL", "PowerSync", "Next.js"],
    domain: "fullstack",
    private: true,
    summary: {
      es: "SaaS móvil para talleres mecánicos en Venezuela: recepción, órdenes, inspección digital, cotización con aprobación del cliente, inventario y caja. Funciona sin señal, con Postgres en Supabase como fuente de verdad, PowerSync para el offline y un núcleo Kotlin Multiplatform compartido.",
      en: "Mobile SaaS for auto repair shops in Venezuela: intake, work orders, digital inspection, quotes with customer approval, inventory and cash register. It works without signal, with Postgres on Supabase as the source of truth, PowerSync for offline and a shared Kotlin Multiplatform core.",
    },
    description: {
      es: "En un taller venezolano la señal se cae a mitad de una petición, los precios van en dólares con una tasa que cambia cada día, y el IGTF depende de con qué paga el cliente, no de lo que compra. Roda separa dos clases de datos. Los documentos que una persona puede reconciliar (orden, inspección, cotización, cliente) se editan sin señal y se sincronizan por Last-Write-Wins. Los contadores (stock, caja) solo los mueve el servidor. Todo monto se guarda como entero en la unidad mínima, con moneda ISO 4217 y la tasa congelada. El núcleo KMP reúne modelos, repositorios sobre watch() de PowerSync, reglas de negocio y ViewModels, y no depende de ningún framework de UI: la misma lógica puede alimentar Compose y SwiftUI, aunque hoy la app construida es la de Android. Cada taller se aísla por un taller_id firmado en el JWT, y cada migración llega con tests SQL que corren en CI contra un Postgres desechable. Un portal en Next.js le muestra al cliente las fotos de recepción con las marcas de daño y lo que encontró la inspección, y ahí mismo califica el servicio, desde un enlace con token y sin login.",
      en: "In a Venezuelan shop the signal drops mid-request, prices are in dollars with an exchange rate that changes daily, and the IGTF tax depends on how the customer pays, not on what they buy. Roda splits data into two kinds. Documents a person can reconcile (order, inspection, quote, customer) are edited offline and synced by Last-Write-Wins. Counters (stock, cash) are moved only by the server. Every amount is stored as an integer in the minor unit, with an ISO 4217 currency and a frozen exchange rate. The KMP core holds the models, repositories built on PowerSync watch(), business rules and ViewModels, and depends on no UI framework: the same logic can feed Compose and SwiftUI, though today only the Android app is built. Each shop is isolated by a taller_id signed into the JWT, and every migration ships with SQL tests that run in CI against a throwaway Postgres. A Next.js portal shows the customer the intake photos with damage marks and what the inspection found, and lets them rate the service, through a tokenized link with no login.",
    },
    challenges: [
      {
        title: { es: "Un rechazo congela la cola de sync", en: "One rejection freezes the sync queue" },
        description: { es: "PowerSync no resuelve conflictos y reintenta cualquier error de la subida. Una escritura que el servidor nunca aceptará —un contador colado por LWW, un salto de etapa que rechaza el gate del pipeline— se queda a la cabeza de la cola para siempre, y detrás se atasca todo lo pendiente del teléfono. Solución: el conector distingue tres casos. Lo transitorio (sin red, 5xx, token vencido) se relanza para que PowerSync reintente. Lo permanente se anota en una bitácora y se descarta, y la cola avanza. Un 23505 sobre la clave primaria de un PUT se da por subido, porque es el reintento de una escritura que llegó y cuya respuesta se perdió.", en: "PowerSync resolves no conflicts and retries any upload error. A write the server will never accept —a counter slipped through LWW, a stage jump rejected by the pipeline gate— stays at the head of the queue forever, and everything else pending on the phone piles up behind it. Solution: the connector tells three cases apart. Transient failures (no network, 5xx, expired token) are rethrown so PowerSync retries. Permanent ones are logged and discarded, and the queue moves on. A 23505 on a PUT's primary key counts as uploaded, because it is the retry of a write that landed but whose response was lost." },
      },
      {
        title: { es: "RLS no ve lo que baja al teléfono", en: "RLS can't see what syncs down" },
        description: { es: "Las policies gobiernan lo que entra por PostgREST, pero el rol de replicación de PowerSync corre con BYPASSRLS: una suite de RLS en verde no dice nada sobre la descarga. Solución: cada Sync Stream repite el predicado de su policy, el taller_id sale del JWT que firma un Custom Access Token Hook —nunca de un parámetro del cliente— y las columnas son explícitas en vez de SELECT *. Un test en CI levanta Supabase y PowerSync self-hosted con dos talleres sembrados y verifica las dos rutas: ninguna fila cruza de taller y el costo/margen no baja a roles no autorizados.", en: "Policies govern what comes in through PostgREST, but PowerSync's replication role runs with BYPASSRLS: a green RLS suite says nothing about downloads. Solution: every Sync Stream repeats its policy's predicate, the taller_id comes from the JWT signed by a Custom Access Token Hook —never from a client parameter— and columns are explicit instead of SELECT *. A CI test brings up Supabase and self-hosted PowerSync with two seeded shops and checks both paths: no row crosses shops, and cost/margin never reaches unauthorized roles." },
      },
      {
        title: { es: "service_role se salta la policy del bucket", en: "service_role skips the bucket policy" },
        description: { es: "El portal no tiene sesión: resuelve el token en el servidor con service_role, que ignora la policy de Storage que ata cada objeto a la carpeta de su taller. Las rutas de las fotos son texto que escribe la app, y nada impedía que una fila del taller A apuntara a un objeto del taller B y el portal lo firmara para quien tuviera el link. Solución: el resolver solo devuelve rutas que empiezan con el taller_id del token y sin segmentos «..»; el portal las firma en el servidor por una hora y el navegador nunca recibe la ruta cruda.", en: "The portal has no session: it resolves the token server-side with service_role, which ignores the Storage policy that ties each object to its shop's folder. Photo paths are text written by the app, and nothing stopped a row from shop A from pointing at an object of shop B, which the portal would then sign for anyone holding the link. Solution: the resolver only returns paths prefixed with the token's taller_id and free of «..» segments; the portal signs them server-side for one hour, and the browser never sees a raw path." },
      },
    ],
    solutions: [
      {
        title: { es: "Stock y caja solo por RPC", en: "Stock and cash only through RPCs" },
        description: { es: "Existencias, kardex, reservas, pagos y arqueos tienen RLS con una sola policy, la de SELECT: el usuario lee y el motor le niega escribir. La única vía de escritura son funciones security definer que filtran el tenant contra el JWT. reservar_stock bloquea la fila con FOR UPDATE para que dos asesores no reserven la última pieza, y registrar_pago exige una clave de idempotencia única por taller: la cola reintenta, y una red que se cae después del cobro no puede cobrar dos veces. Postgres calcula el IGTF en su propia columna y también el esperado del arqueo. Estas tablas no se replican al teléfono.", en: "Stock levels, ledger, reservations, payments and cash counts have RLS with only a SELECT policy: users can read, and the engine denies writes. The only write path is security definer functions that filter the tenant against the JWT. reservar_stock locks the row with FOR UPDATE so two advisors can't reserve the last part, and registrar_pago requires an idempotency key unique per shop: the queue retries, and a network drop after the charge must not charge twice. Postgres computes the IGTF in its own column, along with the expected cash count. None of these tables sync to the phone." },
      },
      {
        title: { es: "LWW acotado por columna", en: "Column-scoped Last-Write-Wins" },
        description: { es: "Un PATCH sube solo las columnas que cambiaron, así que dos técnicos que editan campos distintos de la misma orden no se pisan; los PATCH seguidos a una fila se fusionan antes de subir, porque Postgres evalúa sus CHECK en cada UPDATE. El régimen de escritura de cada tabla (documento, hecho inmutable, solo lectura o server-authoritative) se inyecta desde el mismo AppSchema que define la base local, así que una tabla nueva no puede colarse por LWW por olvido. En CI, un verificador cruza los predicados de sync_rules.yaml con los de las policies y otro, las consultas locales con el AppSchema.", en: "A PATCH uploads only the changed columns, so two technicians editing different fields of the same order don't overwrite each other; consecutive PATCHes to one row are merged before upload, because Postgres evaluates its CHECKs on every UPDATE. Each table's write regime (document, immutable fact, read-only or server-authoritative) is injected from the same AppSchema that defines the local database, so a new table can't slip through LWW by omission. In CI, one checker matches sync_rules.yaml predicates against the policies and another matches local queries against AppSchema." },
      },
    ],
  },
  {
    id: "million-box",
    title: {
      es: "Million Box · ERP y tienda web",
      en: "Million Box · ERP and storefront",
    },
    role: {
      es: "Full-stack (contribuidor principal, equipo de 2)",
      en: "Full-stack (lead contributor, team of 2)",
    },
    year: "2026",
    tags: ["NestJS", "Next.js 16", "Supabase", "PostgreSQL RLS", "Zod", "WhatsApp Cloud API"],
    domain: "fullstack",
    private: true,
    summary: {
      es: "ERP y CRM para una tienda de flores y regalos con dos sedes: inventario, ventas, comandas de taller y delivery, finanzas y bandeja de WhatsApp con agente de IA. Incluye la tienda web, que toma catálogo, franjas, zonas y formas de pago del ERP según la sede.",
      en: "ERP and CRM for a two-branch flower and gift shop: inventory, sales, workshop and delivery orders, finance, and a WhatsApp inbox with an AI agent. Includes the web storefront, which pulls catalog, time slots, zones and payment methods from the ERP per branch.",
    },
    description: {
      es: "Monorepo pnpm con un backend NestJS por capas, un frontend Next.js 16 con Tailwind 4, Postgres en Supabase con RLS por sede y pgvector, y un paquete de contratos en Zod que comparten las dos capas. Cuatro roles —Gerencia, Vendedor, Florista y Delivery— entran cada uno a su pantalla. Una comanda recorre el flujo completo: el vendedor la confirma con fecha y franja, la florista la marca lista con foto de salida, Gerencia asigna el delivery y este la entrega con foto o la cierra como no entregada. WhatsApp llega por el Botinfy Gateway con un número por sede, y un agente de OpenAI responde con RAG sobre el catálogo y herramientas que consultan precio y disponibilidad en vivo. La tienda web vive en un repo aparte: guarda el pedido en la API con un código MB-XXXX, abre el WhatsApp de la sede elegida y ofrece cuenta de cliente con código por correo, historial, direcciones y repetir pedido. Se despliega en Coolify con Docker Compose.",
      en: "pnpm monorepo with a layered NestJS backend, a Next.js 16 frontend with Tailwind 4, Supabase Postgres with per-branch RLS and pgvector, and a Zod contracts package shared by both layers. Four roles —Management, Sales, Florist and Delivery— each land on their own screen. An order runs the whole flow: sales confirms it with a date and time slot, the florist marks it ready with an exit photo, management assigns a driver, and the driver delivers it with a photo or closes it as undelivered. WhatsApp comes in through the Botinfy Gateway with one number per branch, and an OpenAI agent answers using RAG over the catalog plus tools that look up live price and availability. The storefront lives in a separate repo: it saves the order to the API with an MB-XXXX code, opens the chosen branch's WhatsApp, and offers a customer account with email-code login, history, addresses and repeat order. Deployed on Coolify with Docker Compose.",
    },
    challenges: [
      {
        title: { es: "Permisos copiados en cinco sitios", en: "Permissions copied in five places" },
        description: { es: "Qué rol puede qué estaba repetido en RLS, los decoradores de Nest, el menú, el middleware de Next y tres listas de roles, y ya había divergido: un florista o un delivery podía leer el CRM de su sede llamando directo a Supabase. Solución: una matriz única en packages/contracts/rbac con puede(), puedeEntrar() e inicioPara(), que leen backend y frontend. El guard de Nest es fail-closed —un endpoint sin acceso declarado responde 403—, RLS queda cubierta por tests pgTAP por rol, y otros tests recorren controllers y páginas para que nada nuevo llegue a deploy sin declarar su acceso.", en: "Which role can do what was repeated across RLS, Nest decorators, the nav menu, the Next middleware and three role lists, and had already drifted: a florist or driver could read their branch's CRM by calling Supabase directly. Solution: a single matrix in packages/contracts/rbac with puede(), puedeEntrar() and inicioPara(), read by both backend and frontend. The Nest guard is fail-closed —an endpoint with no declared access returns 403—, RLS is covered by per-role pgTAP tests, and other tests walk every controller and page so nothing new ships without declaring its access." },
      },
      {
        title: { es: "Dos números, un mismo cliente", en: "Two numbers, one customer" },
        description: { es: "Cada sede tiene su número de WhatsApp en coexistencia con la app del teléfono: el mismo cliente puede escribirle a los dos, y el historial llega en bloques de cientos de hilos que no caben en los 5 segundos que espera el gateway. Solución: una tabla de líneas por phone_number_id con su sede, una conversación por contacto y por línea, y la respuesta sale del mismo número vía X-Phone-Number-Id. El historial se guarda crudo y se importa después, retomable si el proceso se cae; la marca de último mensaje solo avanza, porque el gateway no garantiza el orden.", en: "Each branch has its own WhatsApp number running in coexistence with the phone app: one customer can message both, and history arrives in blocks of hundreds of threads that don't fit in the gateway's 5-second window. Solution: a lines table keyed by phone_number_id with its branch, one conversation per contact per line, and replies go out from the same number via X-Phone-Number-Id. History is stored raw and imported afterwards, resumable if the process dies; the last-message mark only moves forward, since the gateway doesn't guarantee order." },
      },
      {
        title: { es: "Asignar el delivery sin perder el rastro", en: "Assigning delivery without losing the trail" },
        description: { es: "Cada sede tiene sus propios deliverys y quien asigna conoce las zonas, así que la asignación no podía ser automática; además hacía falta saber en qué tramo se dañan las flores. Solución: Gerencia asigna viendo a cada delivery como bloqueado, con carga o libre según su turno y la franja, en hora de Caracas. Cada transición es una función de Postgres que revalida el estado dentro de la transacción, con CHECK en la tabla, y dos fotos —salida del taller y entrega— separan la responsabilidad de florista, tienda y delivery.", en: "Each branch has its own drivers and whoever assigns knows the zones, so assignment couldn't be automatic; it also had to be clear on which leg the flowers got damaged. Solution: management assigns while seeing each driver as blocked, loaded or free based on their shift and the time slot, in Caracas time. Each transition is a Postgres function that re-validates state inside the transaction, backed by table CHECKs, and two photos —leaving the workshop and at delivery— split responsibility between florist, store and driver." },
      },
    ],
    solutions: [
      {
        title: { es: "Contrato primero", en: "Contract first" },
        description: { es: "Los schemas de Zod viven en packages/contracts: el backend valida cada payload con un ZodValidationPipe y el frontend importa los mismos schemas y tipos. Un cambio de contrato entra en su propia PR antes que la implementación, así que un campo renombrado rompe la compilación de las dos capas en vez de aparecer como bug en staging.", en: "Zod schemas live in packages/contracts: the backend validates every payload with a ZodValidationPipe and the frontend imports the same schemas and types. A contract change lands in its own PR before the implementation, so a renamed field breaks the build in both layers instead of surfacing as a bug in staging." },
      },
      {
        title: { es: "La tienda la configura el ERP", en: "The ERP configures the storefront" },
        description: { es: "La tienda lee de la API pública las sedes con sus franjas y zonas, el catálogo con caché de 60 s, las formas de pago de la sede o comunes a todas, y los productos que Gerencia oculta por sede. Al guardar, el backend comprueba sede, franja y zona y recalcula el total con los precios del ERP. En lugar de captcha hay un límite de 5 pedidos por minuto por IP y un campo trampa: si viene lleno, responde como éxito sin guardar nada.", en: "The storefront reads from the public API the branches with their slots and zones, the catalog with a 60 s cache, payment methods for that branch or shared by all, and the products management hides per branch. On save, the backend checks branch, slot and zone and recomputes the total from ERP prices. Instead of a captcha there's a 5-orders-per-minute IP limit and a honeypot field: if it comes filled, the API answers as success and stores nothing." },
      },
      {
        title: { es: "Portar en vez de reescribir", en: "Port instead of rewrite" },
        description: { es: "El cliente ya había aprobado el prototipo, así que la tienda no se reescribió: un script lo porta y le aplica parches con su motivo, que fallan en voz alta si el prototipo cambia. Un comparador saca capturas de nueve vistas en móvil y escritorio, claro y oscuro, y las compara píxel a píxel; una prueba E2E manda pedidos reales al backend y verifica código, SKU y total.", en: "The client had already approved the prototype, so the storefront wasn't rewritten: a script ports it and applies patches, each with its reason, that fail loudly if the prototype changes. A comparer captures nine views on mobile and desktop, light and dark, and diffs them pixel by pixel; an E2E test sends real orders to the backend and checks code, SKUs and total." },
      },
    ],
  },
  {
    id: "botinfy-gateway",
    title: {
      es: "Botinfy Gateway",
      en: "Botinfy Gateway",
    },
    role: {
      es: "Backend (autor principal)",
      en: "Backend (lead author)",
    },
    year: "2026",
    tags: ["Go", "Meta Graph API", "Embedded Signup", "HMAC", "Docker", "GitHub Actions"],
    domain: "integrations",
    private: true,
    summary: {
      es: "Gateway multi-tenant en Go que recibe los webhooks de una App de Meta en una sola URL y los rutea al CRM de cada cliente, con firma HMAC, deduplicación y cola de fallos persistente. Cero dependencias externas.",
      en: "Multi-tenant Go gateway that receives every webhook of a single Meta App on one URL and routes each event to the right client CRM, with HMAC signing, deduplication and a persistent failure queue. Zero external dependencies.",
    },
    description: {
      es: "Una App de Meta tiene una única URL de webhook. Si esa App tiene varios números de WhatsApp conectados —uno por cliente— Meta manda los eventos de todos al mismo endpoint, mezclados y sin forma de suscribir cada número a un destino distinto. El gateway se para en el medio: recibe todo, mira de qué número o cuenta viene cada evento y lo reenvía al CRM de ese cliente. En el camino de vuelta permite que cada CRM responda por su propio número, sin entregarle nunca el token global de la App. Escrito íntegramente con la librería estándar de Go: sin una sola dependencia externa.",
      en: "A Meta App has a single webhook URL. If that App has several WhatsApp numbers connected —one per client— Meta sends every event to the same endpoint, mixed together and with no way to subscribe each number to a different destination. The gateway sits in the middle: it receives everything, looks at which number or account each event came from, and forwards it to that client's CRM. On the way back it lets each CRM reply from its own number, without ever handing over the App's global token. Written entirely with the Go standard library: not a single external dependency.",
    },
    challenges: [
      {
        title: { es: "Aislamiento entre clientes", en: "Cross-tenant isolation" },
        description: { es: "Los identificadores de WhatsApp, Messenger e Instagram son espacios independientes en Meta: un id de página puede coincidir numéricamente con el phone_number_id de otro cliente sin tener relación. Con un mapa único, ese evento se entregaría al CRM equivocado. Solución: un mapa de identificadores por plataforma, y sesgo conservador — ante cualquier duda gana el destino por defecto, porque mandar al default es recuperable y mandar al CRM ajeno filtra datos.", en: "WhatsApp, Messenger and Instagram identifiers are independent spaces in Meta: a page id can numerically collide with another client's phone_number_id while being unrelated. With a single map, that event would be delivered to the wrong CRM. Solution: one identifier map per platform, plus a conservative bias — when in doubt the default destination wins, because routing to the default is recoverable while routing to another client's CRM leaks data." },
      },
      {
        title: { es: "La firma se rompe al reserializar", en: "Re-serializing breaks the signature" },
        description: { es: "La firma de Meta es un HMAC-SHA256 sobre los bytes exactos del body. Reserializar el JSON cambia el orden de las claves o los espacios, y la firma deja de validar en el destino. Solución: el payload se reenvía byte a byte, sin transformarlo, con la firma original intacta.", en: "Meta's signature is an HMAC-SHA256 over the exact bytes of the body. Re-serializing the JSON changes key order or whitespace, and the signature stops validating downstream. Solution: the payload is forwarded byte for byte, untransformed, with the original signature intact." },
      },
      {
        title: { es: "Un 200 es una promesa", en: "A 200 is a promise" },
        description: { es: "Meta no reintenta un evento que ya recibió 200: desde ese momento el evento existe únicamente dentro del gateway. Solución: todo camino termina en el destino o en la cola de fallos en disco, y el único caso en que se responde 500 es cuando no puede garantizarse ninguna de las dos cosas.", en: "Meta does not retry an event that already got a 200: from that moment the event exists only inside the gateway. Solution: every path ends either at the destination or in the on-disk failure queue, and the only case that returns a 500 is when neither can be guaranteed." },
      },
    ],
    solutions: [
      {
        title: { es: "Reenvío asíncrono con cola de fallos", en: "Async forwarding with a failure queue" },
        description: { es: "La respuesta a Meta no espera al destino: el reenvío corre en su propia goroutine con contexto de vida independiente. Si falla, el evento cae en una cola persistente en disco (.jsonl) que se drena sola cada intervalo y también a pedido. El apagado por SIGTERM drena en orden —servidor HTTP, reenvíos en vuelo, cola— para que un redeploy no pierda eventos.", en: "The response to Meta does not wait for the destination: forwarding runs in its own goroutine with an independent lifetime context. On failure the event lands in a persistent on-disk queue (.jsonl) that drains automatically on an interval and on demand. SIGTERM shutdown drains in order —HTTP server, in-flight forwards, queue— so a redeploy loses no events." },
      },
      {
        title: { es: "Credenciales por cliente, no un token global", en: "Per-tenant credentials, not a global token" },
        description: { es: "El token de la App permite emitir desde cualquier número conectado: dárselo a un cliente es darle la capacidad de suplantar a otro. Por eso el token no sale del gateway. Cada cliente recibe una API key propia, y esa key determina el número; el cuerpo del pedido no puede cambiarlo. Quien pide emitir desde un número ajeno recibe 403 y no se emite nada.", en: "The App token can send from any connected number: handing it to a client is handing them the ability to impersonate another. So the token never leaves the gateway. Each client gets its own API key, and that key resolves the number; the request body cannot override it. Anyone asking to send from a number that isn't theirs gets a 403 and nothing is sent." },
      },
      {
        title: { es: "Splitting y re-firma de payloads mixtos", en: "Splitting and re-signing mixed payloads" },
        description: { es: "Meta puede meter en un solo POST entradas de clientes distintos. Antes eso mandaba el payload completo al destino por defecto, que recibía conversaciones ajenas mientras los otros CRM no recibían nada. Ahora se parte: cada destino recibe un cuerpo con solo sus entradas y el X-Hub-Signature-256 se recalcula sobre ese cuerpo. Un contador en /stats registra cuántas veces ocurrió.", en: "Meta can batch entries from different clients into a single POST. That used to send the whole payload to the default destination, which received other clients' conversations while the other CRMs got nothing. Now it splits: each destination receives a body with only its own entries, and X-Hub-Signature-256 is recomputed over that body. A counter in /stats records how often this happened." },
      },
      {
        title: { es: "Operación sin reinicios", en: "Operating without restarts" },
        description: { es: "La tabla de clientes se recarga en caliente bajo un candado compartido con los cambios de la API de administración, así que dar de alta un cliente no requiere redesplegar. Se suma métricas en memoria con endpoint /stats, health check, middleware de request-ID y checks de despliegue en GitHub Actions.", en: "The client table hot-reloads under a lock shared with admin API changes, so onboarding a client requires no redeploy. On top of that: in-memory metrics with a /stats endpoint, health checks, request-ID middleware and deploy checks in GitHub Actions." },
      },
      {
        title: { es: "Alta de clientes en autoservicio", en: "Self-service client onboarding" },
        description: { es: "Conectar un WhatsApp nuevo ya no pasa por el servidor: el gateway emite un link firmado, de un solo uso y con vencimiento, que abre Embedded Signup de Meta. Al cerrar el popup canjea el código —que vive 30 segundos—, suscribe la App a la WABA del cliente y lo escribe en la tabla. Soporta números en coexistencia con la app de WhatsApp Business, guarda un token por WABA en vez de usar el global y, si el cliente tiene un portafolio de Meta fijado, rechaza con 409 una WABA que pertenezca a otro.", en: "Connecting a new WhatsApp number no longer touches the server: the gateway issues a signed, single-use, expiring link that opens Meta's Embedded Signup. When the popup closes it exchanges the code —which lives 30 seconds—, subscribes the App to the client's WABA and writes the client into the table. It supports numbers in coexistence with the WhatsApp Business app, stores one token per WABA instead of using the global one and, when the client has a pinned Meta portfolio, rejects with a 409 any WABA that belongs to another." },
      },
      {
        title: { es: "Tres canales de salida, cada uno con su permiso", en: "Three outbound channels, each with its own permission" },
        description: { es: "Además de WhatsApp, cada CRM emite por Messenger e Instagram con el token de su propia página o cuenta, y administra sus plantillas de WhatsApp (listar, crear, borrar) con su API key. La comprobación de qué puede emitir cada cliente se hace por canal: como los espacios de ids de Meta son independientes, con una sola lista un cliente podría emitir desde la página de otro nombrándola como si fuera su número.", en: "Besides WhatsApp, each CRM sends through Messenger and Instagram with its own page or account token, and manages its WhatsApp templates (list, create, delete) with its API key. What each client may send from is checked per channel: since Meta's id spaces are independent, a single list would let a client send from another client's page by naming it as if it were their number." },
      },
    ],
  },
  {
    id: "blackout-tracker",
    title: {
      es: "BlackoutTracker · Cortes de luz y agua",
      en: "BlackoutTracker · Power and water outages",
    },
    role: {
      es: "Backend, integración y PWA (equipo de 2)",
      en: "Backend, integration and PWA (2-person team)",
    },
    year: "2026",
    tags: ["NestJS", "PostGIS", "Drizzle ORM", "React PWA", "Supabase", "IndexedDB"],
    domain: "fullstack",
    private: false,
    summary: {
      es: "PWA comunitaria para reportar cortes de agua y luz en la urbanización Guaparo (Valencia, Venezuela). Un sector cambia de estado solo cuando varios residentes distintos coinciden dentro de una ventana de tiempo, sin administrador.",
      en: "Community PWA for reporting water and power outages in the Guaparo neighborhood (Valencia, Venezuela). A sector changes status only when several different residents agree within a time window, with no administrator.",
    },
    description: {
      es: "Proyecto de la cátedra Sistemas de Información (UJAP, 2026). Hoy los vecinos se avisan de los cortes por WhatsApp; BlackoutTracker toma esa información, la estructura y la valida. Cada residente se registra una sola vez con un pin sobre su vivienda, y la API le asigna un sector con ST_Covers contra polígonos de PostGIS: seis sectores trazados sobre calles de OpenStreetMap. Después reporta cuándo empieza y cuándo termina cada corte, también sin conexión: el reporte espera en IndexedDB y se envía con la hora real del evento. El estado del sector se decide por consenso —3 residentes, en una ventana de 30 min para luz y de 180 para agua, todo configurable— y la duración típica de un corte se estima con la mediana de los ciclos cerrados, siempre junto al número de cortes en que se basa. Es un monorepo pnpm con una API en NestJS 11 + Drizzle, una PWA en React + Vite y un paquete de tipos compartido; Supabase solo aporta Postgres/PostGIS, Auth y Realtime.",
      en: "Built for the Information Systems course (UJAP, 2026). Today neighbors tell each other about outages on WhatsApp; BlackoutTracker takes that information, structures it and validates it. Each resident registers once with a pin on their home, and the API assigns them a sector with ST_Covers against PostGIS polygons: six sectors traced along OpenStreetMap streets. From then on they report when each outage starts and ends, offline too: the report waits in IndexedDB and is sent with the real time of the event. A sector's status is decided by consensus —3 residents within a 30-minute window for power and 180 for water, all configurable— and the typical outage length is estimated as the median of closed cycles, always shown next to the number of outages behind it. It's a pnpm monorepo with a NestJS 11 + Drizzle API, a React + Vite PWA and a shared types package; Supabase only provides Postgres/PostGIS, Auth and Realtime.",
    },
    challenges: [
      {
        title: { es: "Consenso sin árbitro", en: "Consensus without an arbiter" },
        description: { es: "Como no hay moderador, el sistema decide solo cuándo empezó y cuándo terminó un corte, y dos reportes simultáneos del mismo sector podían abrir dos eventos. Solución: la decisión vive en funciones puras con una ventana deslizante que cuenta un voto por residente, con su marca más antigua. La hora del evento es la mediana de las N horas, así que un reloj desfasado o un vecino que avisa tarde no la mueven. Cada evaluación corre dentro de la transacción del reporte con un pg_advisory_xact_lock por (sector, servicio), y un índice único parcial permite un solo evento abierto por par.", en: "With no moderator, the system decides on its own when an outage started and when it ended, and two simultaneous reports from the same sector could open two events. Solution: the decision lives in pure functions with a sliding window that counts one vote per resident, using that resident's earliest mark. The event time is the median of the N timestamps, so a skewed clock or a neighbor who reports late doesn't shift it. Each evaluation runs inside the report's transaction under a pg_advisory_xact_lock per (sector, service), and a partial unique index allows only one open event per pair." },
      },
      {
        title: { es: "Cortes que nadie cierra", en: "Outages nobody closes" },
        description: { es: "Si nadie avisa que el servicio volvió, el evento queda abierto para siempre y el próximo corte se le suma; y si se le inventa un fin, la mediana recibe una duración que nadie observó. Solución: los reportes abiertos vencen a las 48 h. Si todos vencen sin que nadie cierre, el evento se marca incompleto con fin_en nulo (lo exige un CHECK), así sale del índice de eventos abiertos y queda fuera de la estimación sin filtros extra.", en: "If nobody reports that service came back, the event stays open forever and the next outage gets added to it; and if an end time is made up, the median gets a duration nobody observed. Solution: open reports expire after 48 h. If all of them expire with nobody closing, the event is marked incomplete with a null fin_en (enforced by a CHECK), so it leaves the open-event index and drops out of the estimate without extra filters." },
      },
      {
        title: { es: "Red intermitente", en: "Flaky network" },
        description: { es: "Con la red intermitente, un envío puede cortarse después de que la API ya guardó el reporte, y el reintento lo duplicaría. Solución: el cliente genera el UUID del reporte y la base lo usa como clave primaria. El PUT es idempotente: con el mismo contenido devuelve el mismo reporte y con otro distinto da 409. La cola de Dexie se envía en orden cronológico y se detiene en el primer fallo reintentable, y un test de integración pasa los envíos por un proxy que corta peticiones al azar para verificar que no haya pérdidas ni duplicados.", en: "On a flaky network, a request can drop after the API has already saved the report, and the retry would duplicate it. Solution: the client generates the report's UUID and the database uses it as the primary key. The PUT is idempotent: the same content returns the same report and different content gets a 409. The Dexie queue is sent in chronological order and stops at the first retryable failure, and an integration test routes requests through a proxy that drops them at random to check there are no losses and no duplicates." },
      },
    ],
    solutions: [
      {
        title: { es: "Privacidad en la capa de datos", en: "Privacy enforced at the data layer" },
        description: { es: "Ningún endpoint devuelve coordenadas de residentes, solo agregados por sector, y el mapa colorea polígonos en lugar de dibujar puntos. En Postgres, RLS está en deny-all y se aplica REVOKE a anon y authenticated en todas las tablas, salvo estado_sector, lo único que el front lee directo vía Supabase Realtime. Nest no emite tokens: verifica el JWT de Supabase con jose contra el JWKS.", en: "No endpoint returns resident coordinates, only per-sector aggregates, and the map colors polygons instead of plotting points. In Postgres, RLS is deny-all and anon and authenticated get a REVOKE on every table, except estado_sector, the only thing the front end reads directly through Supabase Realtime. Nest issues no tokens: it verifies the Supabase JWT with jose against the JWKS." },
      },
      {
        title: { es: "Frontend con puertos y adaptadores", en: "Ports-and-adapters front end" },
        description: { es: "La PWA recibe 12 puertos (reloj, conexión, sesión, cola y uno por recurso de la API) que se arman en un solo archivo. Los adaptadores reales (HTTP, Dexie, Supabase) y los mocks son intercambiables, una suite de contrato corre contra los dos y ESLint hace cumplir la frontera. Así el modo demo es un conjunto de adaptadores y no condiciones repartidas por la app, y las pruebas E2E con Playwright corren en Docker sin tocar Supabase.", en: "The PWA receives 12 ports (clock, connectivity, session, queue and one per API resource), assembled in a single file. The real adapters (HTTP, Dexie, Supabase) and the mocks are interchangeable, a contract suite runs against both and ESLint enforces the boundary. That way demo mode is a set of adapters rather than conditionals spread across the app, and the Playwright E2E tests run in Docker without touching Supabase." },
      },
    ],
    github: "https://github.com/lpzzlnrd/BlackoutTracker",
    live: "https://blackout-tracker-nine.vercel.app",
  },
  {
    id: "picko-pdv",
    title: {
      es: "Picko PdV · Pizza de Verdad",
      en: "Picko PdV · Pizza de Verdad",
    },
    role: {
      es: "Full-stack (módulos de delivery de terceros, disciplina y cobranza)",
      en: "Full-stack (third-party delivery, discipline and collections modules)",
    },
    year: "2026",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Vitest", "PowerShell"],
    domain: "fullstack",
    private: true,
    summary: {
      es: "Módulos que construí sobre la plataforma de operación de una cadena de pizzerías multi-sede: delivery con Yummy Rides y Armi detrás de una capa común de adaptadores, una auditoría semanal que puntúa cada sede de 0 a 100 y el backend de cobranza por WhatsApp alimentado desde el sistema administrativo Galac.",
      en: "Modules I built on top of the operations platform of a multi-branch pizza chain: Yummy Rides and Armi delivery behind a common adapter layer, a weekly audit that scores each branch 0–100, and a WhatsApp collections backend fed from the Galac accounting system.",
    },
    description: {
      es: "Picko PdV es el fork de Picko (pedidos por WhatsApp Flows, CRM, cocina y reparto) adaptado a Pizza de Verdad, una cadena de sedes franquiciadas. La plataforma es de un equipo; mi parte fueron tres módulos. Delivery con terceros: desde «¿Quién lo lleva?» la sede pide el viaje a Yummy Rides o Armi, o Picko lo pide solo al pasar el pedido a «Listo»; los estados llegan por webhook y por una reconciliación periódica, y mueven el pedido por el mismo camino que un repartidor propio. Disciplina y Auditoría (en producción): mide cada sede por semana con datos que la plataforma ya registra (respuesta de chats, entregas, pagos, calificaciones), calcula una nota ponderada por regla y le da al auditor excepciones, multas, bitácora y un reporte en PDF. Para Alberca, la distribuidora del grupo, escribí el backend inicial de cobranza sobre su propia base Supabase: un motor que planifica avisos, cobros y recordatorios por días hábiles con feriados de Venezuela, más la ingesta de clientes y facturas desde Galac.",
      en: "Picko PdV is the fork of Picko (WhatsApp Flows ordering, CRM, kitchen and delivery) adapted for Pizza de Verdad, a chain of franchised branches. The platform belongs to a team; my part was three modules. Third-party delivery: from «Who takes it?» a branch requests a Yummy Rides or Armi trip, or Picko requests it automatically when the order moves to «Ready»; statuses arrive by webhook and by periodic reconciliation, and move the order through the same path as an in-house rider. Discipline & Audit (in production): measures each branch weekly from data the platform already records (chat response, deliveries, payments, ratings), computes a rule-weighted score and gives the auditor exceptions, fines, an audit log and a PDF report. For Alberca, the group's distributor, I wrote the initial collections backend on its own Supabase database: an engine that schedules notices, charges and reminders on business days with Venezuelan holidays, plus customer and invoice ingestion from Galac.",
    },
    challenges: [
      {
        title: { es: "Crear un viaje no es idempotente", en: "Creating a trip is not idempotent" },
        description: { es: "Ni Yummy ni Armi tienen idempotencia al crear, y la cuenta de cada uno es prepagada: reintentar tras un timeout puede pagar dos viajes. Solución: el servidor vuelve a cotizar, compara con el precio que vio la sede y escribe una fila «pidiendo» antes de llamar al proveedor; un índice único permite un solo viaje activo por pedido. El create nunca se reintenta: si queda sin respuesta, el webhook adopta el viaje por el id del pedido o la sede lo descarta.", en: "Neither Yummy nor Armi is idempotent on create, and each account is prepaid: retrying after a timeout can pay for two trips. Solution: the server re-quotes, checks the price the branch saw and writes a «requesting» row before calling the provider; a unique index allows one active trip per order. Create is never retried: if it goes unanswered, the webhook adopts the trip by order id or the branch discards it." },
      },
      {
        title: { es: "Yummy no cancela sin conductor", en: "Yummy won't cancel without a driver" },
        description: { es: "Si al minuto nadie tomó el viaje, la sede puede pasar el pedido a un motorizado propio, pero Yummy no deja cancelar mientras busca conductor: el que llegue después iría a buscar un pedido que ya salió. Solución: cada adaptador declara si cancela sin conductor. Armi se cancela en el acto; el viaje de Yummy queda marcado como liberado y se cancela solo en cuanto el proveedor informa un conductor.", en: "If no one takes the trip within a minute, the branch can hand the order to its own rider, but Yummy won't cancel while searching for a driver: whoever arrives later would pick up an order that already left. Solution: each adapter declares whether it can cancel without a driver. Armi cancels on the spot; the Yummy trip is marked as released and cancelled automatically as soon as the provider reports a driver." },
      },
      {
        title: { es: "Una nota que se pueda defender", en: "A score that holds up" },
        description: { es: "El auditor multa a partir de la nota, así que el número y la evidencia no pueden contradecirse. Solución: una función SQL lista cada evento que cuenta para una regla, y de esa misma lista salen la medición y los casos que ve la sede. La semana se congela el sábado para respetar el plazo de excepción, y la multa y el PDF de una semana cerrada usan los números del cierre.", en: "The auditor fines based on the score, so the number and its evidence cannot disagree. Solution: one SQL function lists every event that counts for a rule, and both the measurement and the cases the branch sees come from that same list. The week freezes on Saturday to keep the exception window, and fines and PDFs for a closed week use the frozen numbers." },
      },
    ],
    solutions: [
      {
        title: { es: "Capa común con adaptadores", en: "Common layer with adapters" },
        description: { es: "Un contrato AdaptadorProveedor (conectar, validarParaCrear, cancelaSinConductor, habilitado) aísla lo propio de cada API. La capa común hace el resto: permiso y alcance por sede, interruptor por sede, snapshot del precio en la moneda del proveedor con su tasa, bitácora idempotente de eventos que solo avanza el estado y aviso push a la sede. Así Yummy y Armi se construyeron en paralelo sin tocar lo común.", en: "An AdaptadorProveedor contract (connect, validateForCreate, cancelsWithoutDriver, enabled) isolates each API's specifics. The common layer does the rest: permission and branch scope, per-branch switch, price snapshot in the provider's currency with its rate, an idempotent event log that only moves status forward, and push alerts to the branch. That let Yummy and Armi be built in parallel without touching shared code." },
      },
      {
        title: { es: "No cargar al proveedor", en: "Don't overload the provider" },
        description: { es: "Disyuntor por tenant: tras 3 fallos seguidos corta 30 s y deja salir una sola llamada de prueba. Ningún POST se reintenta; un GET, una vez, con pausa aleatoria de 250 a 750 ms y nunca ante un timeout. La reconciliación corre cada 2 minutos como red de seguridad del webhook: una pasada a la vez, con 40 s de presupuesto y espera creciente por viaje que falla (de 2 a 30 min).", en: "Per-tenant circuit breaker: after 3 consecutive failures it opens for 30 s and lets a single probe call through. No POST is retried; a GET is retried once, with 250–750 ms random jitter and never on timeout. Reconciliation runs every 2 minutes as the webhook's safety net: one pass at a time, a 40 s budget and growing backoff per failing trip (2 to 30 min)." },
      },
      {
        title: { es: "Galac sin abrir puertos", en: "Galac sync without open ports" },
        description: { es: "Un agente en PowerShell 5.1 corre junto a la base de Galac con el Programador de tareas, lee con un usuario de solo lectura y empuja lotes por HTTPS a un endpoint con llave propia. Cada ejecución cierra un run con los totales esperados, que el panel contrasta (ok, con errores o fallida); ante un 5xx reintenta el mismo lote sin duplicar, porque la ingesta es un upsert. El motor solo cobra facturas vistas en la última sincronización buena y nace apagado: planifica, no envía.", en: "A PowerShell 5.1 agent runs next to the Galac database via Task Scheduler, reads with a read-only user and pushes batches over HTTPS to an endpoint with its own key. Each run closes with expected totals that the panel checks (ok, with errors or failed); on a 5xx it retries the same batch without duplicating, since ingestion is an upsert. The engine only bills invoices seen in the last good sync and starts switched off: it plans, it doesn't send." },
      },
    ],
  },
  {
    id: "reino-aromas",
    title: {
      es: "Reino Aromas · CRM omnicanal",
      en: "Reino Aromas · Omnichannel CRM",
    },
    role: {
      es: "Full-stack (autor principal)",
      en: "Full-stack (lead author)",
    },
    year: "2026",
    tags: ["Laravel", "Reverb", "Vue 3", "WebSockets", "MySQL", "Meta Graph API"],
    domain: "fullstack",
    private: false,
    summary: {
      es: "CRM omnicanal que unifica WhatsApp, Messenger e Instagram en una bandeja única, con mensajería en vivo por WebSocket, un tablero Kanban de tickets que se mueve en tiempo real entre agentes y automatizaciones de Instagram configurables desde el propio CRM.",
      en: "Omnichannel CRM unifying WhatsApp, Messenger and Instagram into a single inbox, with live WebSocket messaging, a Kanban ticket board that moves in real time between agents, and Instagram automations configurable from the CRM itself.",
    },
    description: {
      es: "CRM construido sobre Laravel 13 y Vue 3 que centraliza las conversaciones de los tres canales de Meta en una sola bandeja. La capa de tiempo real usa Laravel Reverb con broadcasting: los mensajes entrantes aparecen sin recargar y el tablero Kanban de tickets refleja en vivo los movimientos de cualquier agente. Incluye gestión del ciclo de vida de las cuentas de Meta, reintentos para mensajería fallida y backups automatizados de la base con verificación de integridad.",
      en: "CRM built on Laravel 13 and Vue 3 that centralizes conversations from all three Meta channels into one inbox. The real-time layer uses Laravel Reverb with broadcasting: incoming messages appear without a reload and the Kanban ticket board reflects any agent's moves live. It includes Meta account lifecycle management, retries for failed messaging and automated database backups with integrity verification.",
    },
    challenges: [
      {
        title: { es: "El estado \"En vivo\" mentía", en: "The \"Live\" status was lying" },
        description: { es: "El indicador miraba si Reverb estaba configurado en el build, no si el socket estaba realmente vivo. Con Reverb caído seguía diciendo \"al día\" y ocultaba el botón de actualizar, dejando al agente sin saber que no estaba recibiendo nada. Solución: escuchar el socket real y resincronizar al reconectar.", en: "The indicator checked whether Reverb was configured at build time, not whether the socket was actually alive. With Reverb down it still said \"up to date\" and hid the refresh button, leaving the agent unaware they were receiving nothing. Solution: listen to the real socket and resync on reconnect." },
      },
      {
        title: { es: "Configuración en dos lugares", en: "Configuration in two places" },
        description: { es: "Las credenciales de Meta vivían en .env, pero operación necesitaba cambiarlas sin tocar el servidor. Solución: modelo MetaAccount en base de datos con precedencia sobre .env, y un servicio que unifica ambas fuentes tras una sola interfaz.", en: "Meta credentials lived in .env, but operations needed to change them without touching the server. Solution: a MetaAccount database model taking precedence over .env, plus a service unifying both sources behind a single interface." },
      },
      {
        title: { es: "El bot que pisa la conversación", en: "The bot that talks over the conversation" },
        description: { es: "Responder sola a cada DM entrante suena a mejor servicio y es lo contrario: el cliente escribe \"hola\" y recibe el menú; escribe \"quiero el de Valencia\" y recibe el menú otra vez. Solución: por defecto la automatización responde solo al primer mensaje de la conversación y se aparta en cuanto hay diálogo. Casi todo el servicio son las reglas para callarse, no el envío.", en: "Auto-replying to every incoming DM sounds like better service and is the opposite: the customer writes \"hi\" and gets the menu; writes \"I want the Valencia one\" and gets the menu again. Solution: by default the automation answers only the first message of a conversation and steps aside as soon as there is a dialogue. Most of the service is the rules for staying quiet, not the sending." },
      },
    ],
    solutions: [
      {
        title: { es: "Kanban colaborativo en vivo", en: "Live collaborative Kanban" },
        description: { es: "Tablero de tickets con drag & drop que persiste el movimiento y lo difunde por WebSocket, de modo que dos agentes viendo el mismo tablero ven el mismo estado sin recargar.", en: "Drag & drop ticket board that persists each move and broadcasts it over WebSocket, so two agents looking at the same board see the same state without reloading." },
      },
      {
        title: { es: "Entrega con reintentos y respaldo", en: "Delivery with retries and backups" },
        description: { es: "Mecanismo de reintentos para mensajes fallidos, expuesto por endpoints de API y por comando de consola. En paralelo, backups automatizados de MySQL con rotación, verificación de integridad y procedimiento de restauración documentado.", en: "Retry mechanism for failed messages, exposed through API endpoints and a console command. Alongside it, automated MySQL backups with rotation, integrity verification and a documented restore procedure." },
      },
      {
        title: { es: "Automatizaciones de Instagram desde el CRM", en: "Instagram automations from the CRM" },
        description: { es: "Respuesta automática a DMs, DM más respuesta pública a quien comenta un post, Ice Breakers, Persistent Menu y menús de Quick Replies, todo editable desde la configuración del CRM y cubierto por tests de feature. La respuesta a comentarios es idempotente: el comment_id se reserva en un índice único antes de decidir nada, porque Meta reintenta el webhook y dos entregas del mismo comentario llegan en paralelo. El aviso público sale primero, para que quede dicho que la cuenta responde aunque el DM se frene por los límites de Meta.", en: "DM auto-replies, a DM plus a public reply to whoever comments on a post, Ice Breakers, Persistent Menu and Quick Reply menus, all editable from the CRM settings and covered by feature tests. Comment replies are idempotent: the comment_id is reserved in a unique index before any decision, because Meta retries the webhook and two deliveries of the same comment arrive in parallel. The public reply goes out first, so the account is seen to answer even if the DM is held back by Meta's limits." },
      },
    ],
    github: "https://github.com/lpzzlnrd/Reino-Aromas",
  },
  {
    id: "trinita",
    title: {
      es: "Trinita · E-commerce farmacéutico",
      en: "Trinita · Pharmaceutical e-commerce",
    },
    role: {
      es: "Frontend / full-stack",
      en: "Frontend / full-stack",
    },
    year: "2026",
    tags: ["Next.js 16", "React 19", "Supabase", "Playwright", "Zod"],
    domain: "fullstack",
    private: true,
    summary: {
      es: "Tienda en línea de productos farmacéuticos con catálogo, ficha de producto, retiro en tienda y delivery. Accesibilidad WCAG verificada por tests automatizados de contraste.",
      en: "Online pharmacy storefront with catalog, product detail, in-store pickup and delivery. WCAG accessibility verified by automated contrast tests.",
    },
    description: {
      es: "E-commerce construido sobre Next.js 16 y Supabase para una farmacia. Cubre el recorrido completo de compra: catálogo con precio por unidad, ficha de producto con tabla de atributos y migas de pan, agregado al carrito desde la grilla, mini-carrito animado con gestos táctiles y lógica de entrega con retiro en tienda o delivery. El trabajo incluyó cerrar los huecos de calidad que suelen quedar fuera del alcance: estados de carga, pantallas de error y 404, accesibilidad y comportamiento móvil.",
      en: "E-commerce built on Next.js 16 and Supabase for a pharmacy. It covers the full purchase journey: catalog with unit pricing, product detail with attribute table and breadcrumbs, add-to-cart from the grid, an animated mini-cart with touch gestures, and delivery logic with in-store pickup or home delivery. The work included closing the quality gaps that usually fall outside scope: loading states, error and 404 screens, accessibility and mobile behavior.",
    },
    challenges: [
      {
        title: { es: "Contraste por debajo del mínimo", en: "Contrast below the minimum" },
        description: { es: "El badge de recipe estaba a 2.79:1 y los enlaces a 4.42:1, ambos por debajo del mínimo WCAG. Solución: recalibrar la paleta a valores conformes y dejar tests automatizados que fallan si alguien vuelve a bajarlos.", en: "The prescription badge sat at 2.79:1 and links at 4.42:1, both below the WCAG minimum. Solution: recalibrate the palette to conformant values and leave automated tests that fail if anyone lowers them again." },
      },
      {
        title: { es: "Consistencia lingüística a escala", en: "Linguistic consistency at scale" },
        description: { es: "La interfaz mezclaba voseo y tuteo entre componentes, tests y mensajes de error. Solución: normalizar todo a tuteo (español de Venezuela) y añadir una validación por regex que detecta voseo en el código, convirtiendo un criterio editorial en un test que corre solo.", en: "The interface mixed voseo and tuteo across components, tests and error messages. Solution: normalize everything to tuteo (Venezuelan Spanish) and add a regex validation that detects voseo in the codebase, turning an editorial rule into a test that runs on its own." },
      },
    ],
    solutions: [
      {
        title: { es: "Tests poco convencionales como red de seguridad", en: "Unconventional tests as a safety net" },
        description: { es: "Además de E2E con Playwright y unitarios con Vitest, se añadieron tests de contraste de color, de iconografía del menú y de consistencia lingüística. Son criterios que normalmente se revisan a ojo y se degradan con el tiempo; como test, no.", en: "On top of Playwright E2E and Vitest unit tests, we added color-contrast, menu-iconography and linguistic-consistency tests. These are criteria usually eyeballed in review that decay over time; as tests, they don't." },
      },
      {
        title: { es: "Estados de interfaz completos", en: "Complete UI states" },
        description: { es: "Esqueletos de carga, acuse de acciones sin salto de layout, y pantallas de error y 404 que antes no existían. El objetivo fue que ningún estado dejara al usuario frente a una pantalla ambigua.", en: "Loading skeletons, action acknowledgements without layout shift, and error and 404 screens that previously did not exist. The goal was that no state leaves the user staring at an ambiguous screen." },
      },
    ],
  },
  {
    id: "novax-bot",
    title: {
      es: "Novax · Bot de ventas con IA",
      en: "Novax · AI sales bot",
    },
    role: {
      es: "Backend (colaborador: reportes de Meta Ads y reparto de chats)",
      en: "Backend (contributor: Meta Ads reporting and chat distribution)",
    },
    year: "2026",
    tags: ["Python", "FastAPI", "LangChain", "PostgreSQL", "Meta Insights API", "Google Sheets API"],
    domain: "integrations",
    private: true,
    summary: {
      es: "Bot de atención con IA (FastAPI + LangChain) que cubre WhatsApp, Instagram y Facebook para un distribuidor de equipos eléctricos. Sobre el bot ya en producción construí el reporte automático de Meta Ads a Google Sheets y el reparto equitativo de chats entre vendedores.",
      en: "AI customer-service bot (FastAPI + LangChain) covering WhatsApp, Instagram and Facebook for an electrical equipment distributor. On top of the bot already in production I built the automated Meta Ads report to Google Sheets and the even distribution of chats across sales reps.",
    },
    description: {
      es: "Bot de Inversiones Novax portado de n8n a Python por otro integrante del equipo: atiende por uChat, junta los mensajes en un buffer de Redis, consulta el catálogo en pgvector y, en WhatsApp, responde fuera del horario de los asesores. Mi trabajo fue sobre ese bot en producción. Porté a código el reporte de conversaciones por anuncio que vivía en n8n y lo extendí con una pestaña por mes de campañas y una comparativa semanal. Construí el reparto de chats entre asesores para que cada vendedor tenga una meta diaria medible, y una herramienta para limpiar la bandeja de uChat sin agotar el cupo de API que comparte con el bot. También mantuve los prompts del agente y el formato de las fichas de producto.",
      en: "Inversiones Novax's bot, ported from n8n to Python by another team member: it serves customers through uChat, batches messages in a Redis buffer, queries the catalog in pgvector and, on WhatsApp, answers outside the sales reps' hours. My work was on that production bot. I ported the per-ad conversation report that lived in n8n to code and extended it with a monthly campaigns tab and a week-over-week comparison. I built the chat distribution across sales reps so each one has a measurable daily goal, and a tool to clean up the uChat inbox without exhausting the API quota it shares with the bot. I also maintained the agent's prompts and the product sheet formatting.",
    },
    challenges: [
      {
        title: { es: "La Sheet mezclaba semanas", en: "The Sheet mixed up weeks" },
        description: { es: "El flujo de n8n actualizaba solo la columna de hoy por anuncio y nunca limpiaba: el martes seguía mostrando los números del martes anterior. Además la atribución de Meta es de 7 días, así que los días pasados siguen cambiando, y la última corrida del día perdía la última hora. Solución: cada corrida reescribe las pestañas enteras y pide todos los días de la ventana; la pestaña del mes que cerró se sigue reescribiendo hasta el día 7 y después queda fija.", en: "The n8n flow only updated today's column per ad and never cleaned up: on Tuesday it still showed last Tuesday's numbers. On top of that Meta's attribution window is 7 days, so past days keep changing, and the day's last run missed the final hour. Solution: every run rewrites the tabs entirely and requests every day in the window; the tab for the month that just closed keeps being rewritten until day 7 and then stays fixed." },
      },
      {
        title: { es: "Campañas que siempre daban cero", en: "Campaigns that always read zero" },
        description: { es: "Las campañas de interacción en publicaciones, como un concurso, no abren conversaciones, así que con la métrica de mensajes salían siempre en 0. Solución: detectarlas por los datos —objetivo de interacción y ninguna conversación iniciada registrada— y contarles interacciones con la publicación en su lugar, marcadas con un sufijo para que no se confundan con conversaciones.", en: "Post-engagement campaigns, such as a giveaway, don't open conversations, so under the messaging metric they always read 0. Solution: detect them from the data —engagement objective and no started conversation ever recorded— and count post interactions for them instead, tagged with a suffix so they aren't mistaken for conversations." },
      },
      {
        title: { es: "Dos chats a la vez, el mismo asesor", en: "Two chats at once, same rep" },
        description: { es: "Sin coordinación, dos chats que entran en el mismo instante leen el mismo conteo y caen en el mismo asesor, y tres mensajes seguidos de un cliente —tres webhooks— lo asignarían tres veces. Solución: la elección corre dentro de una transacción con pg_advisory_xact_lock, con una clave de texto para no chocar con los otros bots que comparten el mismo Supabase.", en: "Without coordination, two chats arriving at the same instant read the same count and land on the same rep, and three messages in a row from one customer —three webhooks— would assign them three times. Solution: the choice runs inside a transaction under pg_advisory_xact_lock, with a text key so it doesn't collide with the other bots sharing the same Supabase." },
      },
    ],
    solutions: [
      {
        title: { es: "Reparto que sobrevive a un redeploy", en: "Distribution that survives a redeploy" },
        description: { es: "La regla es el asesor que menos chats recibió hoy, desempatando por orden de la lista, en vez de un round robin con puntero que se pierde en cada redeploy. Se reparten chats, no mensajes; un cliente que vuelve dentro de la ventana sigue con el mismo asesor, y un chat que ya tiene asesor en uChat se respeta. Para no consultar uChat en cada mensaje, primero se mira la tabla propia.", en: "The rule is the rep who received the fewest chats today, ties broken by list order, instead of a pointer-based round robin that is lost on every redeploy. Chats are distributed, not messages; a customer returning within the window keeps the same rep, and a chat already assigned in uChat is respected. To avoid calling uChat on every message, the bot's own table is checked first." },
      },
      {
        title: { es: "Limpieza segura por defecto", en: "Safe-by-default cleanup" },
        description: { es: "El script de limpieza de bandeja no cambia nada por defecto: lista los candidatos en un CSV para que el cliente lo apruebe y solo cierra con --aplicar. No cierra chats cuyo último mensaje es del cliente, y respeta el cupo de 1000 pedidos por hora que comparte con el bot con una pausa entre cierres y un tope por corrida.", en: "The inbox cleanup script changes nothing by default: it lists candidates in a CSV for the client to approve and only closes with --aplicar. It never closes chats whose last message came from the customer, and it respects the 1000-requests-per-hour quota it shares with the bot with a pause between closes and a per-run cap." },
      },
      {
        title: { es: "Un cron que no tumba el servicio", en: "A cron that can't take the service down" },
        description: { es: "El reporte corre en un loop que nunca propaga errores: falla, registra y reintenta con backoff exponencial de 5 a 60 minutos. Tiene un piso de 10 minutos entre corridas para no agotar el rate limit del token de Meta, y expone su último éxito y error en /admin/estado, porque un token vencido congelaría la Sheet sin aviso.", en: "The report runs in a loop that never propagates errors: it fails, logs and retries with exponential backoff from 5 to 60 minutes. It has a 10-minute floor between runs so it can't exhaust the Meta token's rate limit, and exposes its last success and error on /admin/estado, because an expired token would freeze the Sheet silently." },
      },
    ],
  },
  {
    id: "botinfy-auth",
    title: {
      es: "Botinfy Auth",
      en: "Botinfy Auth",
    },
    role: {
      es: "Full-stack (autor principal)",
      en: "Full-stack (sole author)",
    },
    year: "2025",
    tags: ["NestJS", "Supabase", "Redis", "JWT", "Docker"],
    domain: "auth",
    private: false,
    summary: {
      es: "Microservicio de autenticación con flujo de dos pasos: credenciales + OTP por WhatsApp, sesiones en Redis con rotación de jti y permisos granulares por usuario.",
      en: "Authentication microservice with a two-step flow: credentials plus WhatsApp OTP, Redis-backed sessions with jti rotation, and per-user granular permissions.",
    },
    description: {
      es: "Microservicio desarrollado desde cero para Botinfy que centraliza toda la autenticación y autorización. Implementa un flujo seguro de dos factores (2FA) usando WhatsApp como canal de verificación, integrando Twilio. Las sesiones se almacenan en Redis con rotación automática de tokens (jti) y soporte para permisos granulares. El servicio está completamente dockerizado y documentado con OpenAPI.",
      en: "Authentication microservice built from scratch for Botinfy that centralizes all auth and authorization logic. Implements a secure 2FA flow using WhatsApp as verification channel via Twilio. Sessions stored in Redis with automatic token rotation (jti) and support for fine-grained permissions. Service is fully containerized and OpenAPI documented.",
    },
    challenges: [
      {
        title: { es: "Seguridad de sesiones", en: "Session security" },
        description: { es: "Implementar renovación de tokens sin exponer el usuario a replay attacks. Solución: jti (JWT ID) único por sesión, almacenado en Redis con TTL automático.", en: "Implementing token renewal without exposing users to replay attacks. Solution: unique jti (JWT ID) per session, stored in Redis with automatic TTL." },
      },
      {
        title: { es: "Integración con WhatsApp", en: "WhatsApp integration" },
        description: { es: "Sincronizar OTP con TTL del mensaje. Solución: Twilio SDK + Redis pipeline con TTL paralelos.", en: "Syncing OTP with message TTL. Solution: Twilio SDK + Redis pipeline with parallel TTLs." },
      },
    ],
    solutions: [
      {
        title: { es: "Arquitectura de servicios", en: "Service architecture" },
        description: { es: "Separación clara entre auth-core (lógica), auth-sessions (Redis) y auth-delivery (WhatsApp). Esto permite escalar cada componente independientemente.", en: "Clear separation between auth-core (logic), auth-sessions (Redis), and auth-delivery (WhatsApp). Allows independent scaling of each component." },
      },
      {
        title: { es: "Observabilidad", en: "Observability" },
        description: { es: "Logs estructurados en JSON, métricas de latencia por operación y traces distribuidos. Implementado con Pino + OpenTelemetry.", en: "Structured JSON logging, per-operation latency metrics, and distributed traces. Implemented with Pino + OpenTelemetry." },
      },
    ],
    github: "https://github.com/Botinfy/botinfy-auth",
  },
  {
    id: "herbaplant",
    title: {
      es: "Herbaplant Platform",
      en: "Herbaplant Platform",
    },
    role: {
      es: "Full-stack (auth + backend + frontend + DB)",
      en: "Full-stack (auth + backend + frontend + DB)",
    },
    year: "2025",
    tags: ["React 19", "NestJS", "Supabase", "TypeScript", "Tailwind"],
    domain: "fullstack",
    private: true,
    summary: {
      es: "Plataforma de trazabilidad sanitaria y comercial que unifica inventario por lotes, logística y operación en terreno bajo un mismo control de roles y rutas protegidas.",
      en: "Health and commercial traceability platform that unifies batch inventory, logistics and field operations under a single role-based access layer with protected routes.",
    },
    description: {
      es: "Sistema integral de gestión para operaciones agrícolas que necesitaban trazabilidad desde cultivo hasta distribución. Implementé capas de autenticación, módulos de inventario por lotes, asignación dinámica de rutas de logística y control de campo con React 19 + TypeScript. Todo bajo RLS (Row Level Security) en Supabase para máxima seguridad de datos.",
      en: "Comprehensive management system for agricultural operations requiring traceability from cultivation to distribution. Implemented auth layers, batch inventory modules, dynamic logistics route assignment, and field operations with React 19 + TypeScript. All protected with Supabase RLS (Row Level Security) for maximum data safety.",
    },
    challenges: [
      {
        title: { es: "Sincronización offline", en: "Offline synchronization" },
        description: { es: "Equipos en terreno sin conectividad consistente. Solución: arquitectura con caché local + sync en background cuando hay conexión.", en: "Field teams working without consistent connectivity. Solution: architecture with local cache + background sync when online." },
      },
      {
        title: { es: "Permisos granulares", en: "Granular permissions" },
        description: { es: "Diferentes roles ven diferentes datos según jurisdicción. Solución: RLS + context claims en JWT + middleware de autorización por recurso.", en: "Different roles see different data based on jurisdiction. Solution: RLS + context claims in JWT + per-resource authorization middleware." },
      },
    ],
    solutions: [
      {
        title: { es: "Arquitectura modular", en: "Modular architecture" },
        description: { es: "Separé cada dominio (inventario, logística, terreno) en módulos NestJS independientes con sus propios schemas y servicios. Facilita mantenimiento y testing.", en: "Separated each domain (inventory, logistics, field) into independent NestJS modules with their own schemas and services. Simplifies maintenance and testing." },
      },
      {
        title: { es: "Interfaz intuitiva", en: "Intuitive interface" },
        description: { es: "React 19 con Server Components para formularios complejos. Tailwind para UX consistente. Validación end-to-end con Zod.", en: "React 19 with Server Components for complex forms. Tailwind for consistent UX. End-to-end validation with Zod." },
      },
    ],
    gallery: [
      { title: "Dashboard de Inventario", alt: "Vista principal de gestión de lotes" },
      { title: "Control de Logística", alt: "Asignación de rutas y conductores" },
      { title: "Operación en Campo", alt: "Interfaz optimizada para dispositivos móviles" },
      { title: "Trazabilidad Comercial", alt: "Seguimiento de productos finalizados" },
    ],
  },
  {
    id: "los-sauces",
    title: {
      es: "Clínica Los Sauces",
      en: "Clínica Los Sauces",
    },
    role: {
      es: "Full-stack (autor principal)",
      en: "Full-stack (sole author)",
    },
    year: "2025",
    tags: ["Next.js", "NestJS", "Postgres", "MSSQL", "TypeORM", "RBAC"],
    domain: "fullstack",
    private: false,
    summary: {
      es: "Monorepo clínico-administrativo con módulos por dominio (admisión, casos, facturación, CRM) y un sync/ETL desacoplado que consolida un sistema legado en SQL Server hacia Postgres vía cron.",
      en: "Clinical and administrative monorepo with domain-driven modules (admissions, cases, billing, CRM) and a decoupled sync/ETL that consolidates a legacy SQL Server system into Postgres via cron.",
    },
    description: {
      es: "Migración y modernización completa de un sistema clínico heredado. Diseñé un monorepo Next.js + NestJS que coexiste con el legacy (SQL Server) mediante un ETL cron que sincroniza datos de forma segura. Cada módulo (admisión, casos clínicos, facturación, CRM) es independiente pero comparte una capa de autenticación centralizada con RBAC.",
      en: "Complete migration and modernization of a legacy clinical system. Designed a Next.js + NestJS monorepo that coexists with the legacy SQL Server through a cron ETL that safely syncs data. Each module (admissions, clinical cases, billing, CRM) is independent but shares a centralized auth layer with RBAC.",
    },
    challenges: [
      {
        title: { es: "Migración incremental", en: "Incremental migration" },
        description: { es: "No podía pausar el sistema legacy. Solución: ETL bidireccional que sincroniza en tiempo real, permitiendo fase-out gradual.", en: "Couldn't pause the legacy system. Solution: bidirectional ETL that syncs in real-time, allowing gradual phase-out." },
      },
      {
        title: { es: "Integridad de datos", en: "Data integrity" },
        description: { es: "Modelos diferentes entre SQL Server y Postgres. Solución: mapping layer con validación + auditoría de cambios.", en: "Different models between SQL Server and Postgres. Solution: mapping layer with validation + change audit log." },
      },
    ],
    solutions: [
      {
        title: { es: "Domain-Driven Design", en: "Domain-Driven Design" },
        description: { es: "Cada dominio (admisión, facturación, CRM) vive en su propio módulo NestJS con schemas Postgres independientes. Facilita escalar y mantener cada pieza.", en: "Each domain (admissions, billing, CRM) lives in its own NestJS module with independent Postgres schemas. Scales and maintains cleanly." },
      },
      {
        title: { es: "ETL resiliente", en: "Resilient ETL" },
        description: { es: "Job cron con reintentos exponenciales, alertas en fallos, y dead-letter queue para registros problemáticos. Implementado con Bull + Redis.", en: "Cron job with exponential retries, failure alerts, and dead-letter queue for problematic records. Implemented with Bull + Redis." },
      },
    ],
    gallery: [
      { title: "Panel Administrativo", alt: "Gestión de admisiones y pacientes" },
      { title: "Sincronización ETL", alt: "Vista de logs y estado del sistema legado" },
    ],
    github: "https://github.com/Botinfy/los-sauces",
  },
  {
    id: "mahle-dayton",
    title: {
      es: "MAHLE Dayton — Líneas de Producción",
      en: "MAHLE Dayton — Production Lines",
    },
    role: {
      es: "Backend (autor principal)",
      en: "Backend (sole author)",
    },
    year: "2024",
    tags: ["NestJS", "MySQL", "Angular.js", "SCRUM"],
    domain: "integrations",
    private: true,
    summary: {
      es: "Backend de monitoreo y control para las líneas de producción Norte y Sur de MAHLE Behr Dayton: visualización en tiempo real, control de lotes (pausar / reanudar / cancelar) y análisis por lote.",
      en: "Monitoring and control backend for MAHLE Behr Dayton's North and South production lines: real-time visibility, batch control (pause / resume / cancel) and per-batch analysis.",
    },
    description: {
      es: "Sistema de supervisión industrial que monitorea dos líneas de producción en tiempo real. Implementé endpoints REST que capturan telemetría de PLCs (máquinas industriales), almaceno en MySQL y expongo dashboards en Angular.js. Soporte para control de batches (pausar, reanudar, cancelar) y análisis post-producción.",
      en: "Industrial monitoring system that tracks two production lines in real-time. Implemented REST endpoints that capture telemetry from PLCs (industrial controllers), store in MySQL, and expose dashboards in Angular.js. Support for batch control (pause, resume, cancel) and post-production analysis.",
    },
    challenges: [
      {
        title: { es: "Latencia y sincronización", en: "Latency and sync" },
        description: { es: "PLCs envían datos a ráfagas inconsistentes. Solución: buffer en memoria con flush a BD cada N segundos y EventEmitter para actualizaciones en tiempo real.", en: "PLCs send data in inconsistent bursts. Solution: in-memory buffer with flush to DB every N seconds and EventEmitter for real-time updates." },
      },
      {
        title: { es: "Confiabilidad del control", en: "Control reliability" },
        description: { es: "Comandos a PLCs deben ser idempotentes y auditados. Solución: request deduplication + event log inmutable.", en: "Commands to PLCs must be idempotent and audited. Solution: request deduplication + immutable event log." },
      },
    ],
    solutions: [
      {
        title: { es: "Arquitectura de eventos", en: "Event-driven architecture" },
        description: { es: "WebSockets para pushes en tiempo real a los dashboards. Backend emite eventos de cambio de estado de batches. Permite dashboards reactivos sin polling.", en: "WebSockets for real-time pushes to dashboards. Backend emits batch state-change events. Enables reactive dashboards without polling." },
      },
      {
        title: { es: "Auditoría completa", en: "Full audit trail" },
        description: { es: "Cada acción (sensor reading, batch control) registrada en tabla de eventos con timestamp y usuario. Trazabilidad 100%.", en: "Every action (sensor reading, batch control) logged in event table with timestamp and user. 100% traceability." },
      },
    ],
    gallery: [
      { title: "Monitoreo en Tiempo Real", alt: "Dashboard de telemetría industrial" },
      { title: "Control de Batches", alt: "Interfaz de gestión de líneas de producción" },
    ],
  },
  {
    id: "khalil-landing",
    title: {
      es: "Khalil Landing",
      en: "Khalil Landing",
    },
    role: {
      es: "Full-stack end-to-end",
      en: "End-to-end full-stack",
    },
    year: "2025",
    tags: ["Next.js", "Supabase", "Resend", "Google Calendar", "Zod"],
    domain: "integrations",
    private: false,
    summary: {
      es: "Landing con captación de leads y agendamiento integrado: formularios validados con react-hook-form + zod y endpoints serverless que orquestan Supabase, Resend y Google Calendar API.",
      en: "Landing page with lead capture and built-in scheduling: react-hook-form + zod validated forms and serverless endpoints orchestrating Supabase, Resend and the Google Calendar API.",
    },
    description: {
      es: "Landing page moderno que integra captura de leads con agendamiento directo en Google Calendar. Los visitantes rellenan un formulario, se valida con Zod, se guardan en Supabase y reciben un email de confirmación vía Resend. Luego pueden elegir un slot disponible que se sincroniza automáticamente con Google Calendar del cliente.",
      en: "Modern landing page integrating lead capture with direct Google Calendar scheduling. Visitors fill a form, validated with Zod, stored in Supabase and receive a confirmation email via Resend. They can then book an available slot that auto-syncs to the client's Google Calendar.",
    },
    challenges: [
      {
        title: { es: "Validación de formularios", en: "Form validation" },
        description: { es: "Validar en cliente y servidor sin duplicar código. Solución: esquemas Zod compartidos entre Next.js client y server actions.", en: "Validate on client and server without duplicating code. Solution: shared Zod schemas between Next.js client and server actions." },
      },
      {
        title: { es: "Sincronización de calendarios", en: "Calendar sync" },
        description: { es: "Mantener slots disponibles sincronizados con Google Calendar. Solución: polling cada 5 min + WebHook de Google Calendar cuando hay cambios.", en: "Keep available slots synced with Google Calendar. Solution: 5-min polling + Google Calendar WebHook on changes." },
      },
    ],
    solutions: [
      {
        title: { es: "Server Actions", en: "Server Actions" },
        description: { es: "Uso total de Next.js Server Actions para forms. Elimina boilerplate de API routes. Validación con Zod en el servidor.", en: "Full use of Next.js Server Actions for forms. Eliminates API route boilerplate. Zod validation on server." },
      },
      {
        title: { es: "Automatización de emails", en: "Email automation" },
        description: { es: "Resend para transactional emails (confirmación, recordatorio). Templates React componentes. Personalización por user sin hardcode.", en: "Resend for transactional emails (confirmation, reminder). React component templates. Per-user customization without hardcoding." },
      },
    ],
    github: "https://github.com/lpzzlnrd/Khalil-Landing",
    live: "https://khalil-landing.vercel.app",
  },
  {
    id: "local-area-network",
    title: {
      es: "Local Area Network — CLI",
      en: "Local Area Network — CLI",
    },
    role: {
      es: "Autor principal (todo el sistema)",
      en: "Sole author (entire system)",
    },
    year: "2024",
    tags: ["CLI", "Data structures", "JSON"],
    domain: "data",
    private: false,
    summary: {
      es: "Simulador de LAN por CLI con modos al estilo Cisco (>, #, (config)#), modelado de routers/switches/hosts, transmisión de paquetes con TTL por ticks y persistencia de running-config en JSON.",
      en: "CLI LAN simulator with Cisco-style modes (>, #, (config)#), routers/switches/hosts modelling, tick-based packet transmission with TTL, and running-config persistence in JSON.",
    },
    description: {
      es: "Simulador educativo de redes LAN que replica la interfaz de un switch Cisco real. Implementé una arquitectura basada en ticks donde los paquetes viajan por la red con TTL decremento, soporte completo para spanning-tree simplificado, y persistencia de configuración en JSON. Ideal para estudiantes que necesitan practicar comandos Cisco sin hardware.",
      en: "Educational LAN simulator replicating a real Cisco switch interface. Implemented tick-based architecture where packets travel the network with TTL decrement, simplified spanning-tree support, and configuration persistence in JSON. Ideal for students practicing Cisco commands without hardware.",
    },
    challenges: [
      {
        title: { es: "Modelado de topología", en: "Topology modeling" },
        description: { es: "Representar una red compleja con routers, switches y hosts. Solución: graph con adjacency lists + state per device.", en: "Modeling a complex network with routers, switches, and hosts. Solution: graph with adjacency lists + per-device state." },
      },
      {
        title: { es: "Simulación de paquetes", en: "Packet simulation" },
        description: { es: "Transmitir paquetes con latencia y colisiones realistas. Solución: event loop por ticks, cada tick procesa transiciones de estado.", en: "Transmitting packets with realistic latency and collisions. Solution: tick-based event loop, each tick processes state transitions." },
      },
    ],
    solutions: [
      {
        title: { es: "CLI interactivo", en: "Interactive CLI" },
        description: { es: "Interfaz readline que emula modos Cisco (>, #, config#). Parser de comandos con completado y validación.", en: "Readline interface emulating Cisco modes (>, #, config#). Command parser with completion and validation." },
      },
      {
        title: { es: "Persistencia", en: "Persistence" },
        description: { es: "Exportar/importar running-config en JSON. Permite guardar topologías y reutilizarlas. Ideal para labs predefinidos.", en: "Export/import running-config in JSON. Save and reuse topologies. Perfect for predefined labs." },
      },
    ],
    github: "https://github.com/lpzzlnrd/Local_Area_Network",
  },
  {
    id: "pickop",
    title: {
      es: "Pickop",
      en: "Pickop",
    },
    role: {
      es: "Full-stack (backend NestJS + frontend Next.js)",
      en: "Full-stack (NestJS backend + Next.js frontend)",
    },
    year: "2026",
    tags: ["NestJS", "TypeORM", "Supabase", "Redis", "Next.js"],
    domain: "integrations",
    private: true,
    summary: {
      es: "SaaS multi-tenant para que restaurantes reciban y gestionen pedidos por WhatsApp Flows nativos de Meta, con RBAC dinámico por permisos, gating de módulos por plan y facturación de la suscripción con múltiples pasarelas.",
      en: "Multi-tenant SaaS for restaurants to receive and manage orders through native Meta WhatsApp Flows, with dynamic permission-based RBAC, plan-based module gating, and subscription billing across multiple payment providers.",
    },
    description: {
      es: "Rewrite completo desde cero de una plataforma de pedidos por WhatsApp. Diseñé el backend NestJS con una cadena de guards explícita (rate limiting → JWT → entitlements → permisos) y un sistema RBAC con wildcards que resuelve permisos por rol y por addon contratado. Los pedidos llegan cifrados end-to-end vía WhatsApp Flows (RSA-OAEP-256 + AES-GCM) y el panel se actualiza en tiempo real por Supabase Broadcast sin pasar por el backend. La facturación de la suscripción soporta Stripe, PayPal y Binance Pay detrás de una interfaz común de proveedor de pago.",
      en: "Complete rewrite from scratch of a WhatsApp ordering platform. I designed the NestJS backend with an explicit guard chain (rate limiting → JWT → entitlements → permissions) and a wildcard-based RBAC system that resolves permissions by role and by purchased addon. Orders arrive end-to-end encrypted via WhatsApp Flows (RSA-OAEP-256 + AES-GCM) and the dashboard updates in real time through Supabase Broadcast without touching the backend. Subscription billing supports Stripe, PayPal, and Binance Pay behind a common payment provider interface.",
    },
    challenges: [
      {
        title: { es: "Cifrado de WhatsApp Flows", en: "WhatsApp Flows encryption" },
        description: { es: "Meta exige que el payload de los formularios interactivos viaje cifrado end-to-end y que la clave pública rote sin downtime. Solución: envoltura RSA-OAEP-256 de una clave AES-GCM efímera por request, con manejo explícito del código 421 para servir la nueva clave pública sin interrumpir flujos en curso.", en: "Meta requires interactive form payloads to travel end-to-end encrypted and the public key to rotate without downtime. Solution: RSA-OAEP-256 wrapping of an ephemeral per-request AES-GCM key, with explicit handling of the 421 status code to serve the new public key without breaking in-flight flows." },
      },
      {
        title: { es: "Multi-tenancy y planes por addon", en: "Multi-tenancy and per-addon plans" },
        description: { es: "Cada restaurante contrata módulos distintos (finanzas, reviews, warehouse) y el acceso debe evaluarse en cada request sin penalizar latencia. Solución: EntitlementsGuard que cachea en Redis los addons activos por tenant y distingue en la respuesta si el 403 es por addon no comprado o por módulo fuera de plan.", en: "Each restaurant contracts different modules (finance, reviews, warehouse) and access must be evaluated on every request without hurting latency. Solution: an EntitlementsGuard that caches active addons per tenant in Redis and distinguishes in the response whether the 403 is due to an unpurchased addon or a module outside the current plan." },
      },
    ],
    solutions: [
      {
        title: { es: "Cadena de guards explícita", en: "Explicit guard chain" },
        description: { es: "Throttler → JwtAuth → Entitlements → Permission, registrados globalmente y documentados en el orden exacto en que se ejecutan, cada uno actuando solo si el handler lleva el decorator correspondiente. El restaurant_id siempre se resuelve desde el JWT, nunca se acepta desde el body o query del cliente.", en: "Throttler → JwtAuth → Entitlements → Permission, registered globally and documented in the exact order they run, each only acting if the handler carries the matching decorator. restaurant_id is always resolved from the JWT, never accepted from the client's body or query." },
      },
      {
        title: { es: "Pasarelas de pago intercambiables", en: "Interchangeable payment providers" },
        description: { es: "Interfaz PaymentProvider (createCharge/queryCharge/verifyWebhook/parseWebhook) implementada por Stripe, PayPal y Binance Pay y registrada en un PaymentProviderRegistry, de forma que el servicio de facturación nunca conoce el proveedor concreto. Cada webhook se verifica por firma antes de procesarse de forma asíncrona.", en: "A PaymentProvider interface (createCharge/queryCharge/verifyWebhook/parseWebhook) implemented by Stripe, PayPal, and Binance Pay and registered in a PaymentProviderRegistry, so the billing service never knows the concrete provider. Every webhook is signature-verified before being processed asynchronously." },
      },
    ],
  },
  {
    id: "coworking",
    title: {
      es: "Coworking Platform",
      en: "Coworking Platform",
    },
    role: {
      es: "Backend (microservicio de reservas, autor principal)",
      en: "Backend (reservations microservice, sole author)",
    },
    year: "2026",
    tags: ["Rust", "Axum", "SQLx", "Python", "FastAPI", "PostgreSQL"],
    domain: "data",
    private: false,
    summary: {
      es: "Plataforma de gestión de espacios de coworking construida como microservicios poliglotas (Rust/Axum, Python/FastAPI, Node/Express) sobre una única base Postgres, con detección de solapamiento de reservas garantizada a nivel de base de datos.",
      en: "Coworking space management platform built as polyglot microservices (Rust/Axum, Python/FastAPI, Node/Express) over a single Postgres database, with reservation overlap detection guaranteed at the database level.",
    },
    description: {
      es: "Motor de reservas escrito en Rust con arquitectura hexagonal (Ports & Adapters) explícita: el dominio define traits como ReservationRepository y AuthVerifier, implementados por adaptadores concretos e inyectados con Arc<dyn Trait>, lo que permite testear la lógica de negocio sin tocar la base de datos real. El solapamiento de reservas se resuelve con una constraint EXCLUDE USING gist sobre un rango temporal (TSTZRANGE) con índice GiST, garantizando atomicidad sin condiciones de carrera posibles en la capa de aplicación. Cada transición de estado de una reserva queda auditada con actor y motivo en una tabla de historial.",
      en: "Reservations engine written in Rust with an explicit hexagonal (Ports & Adapters) architecture: the domain defines traits like ReservationRepository and AuthVerifier, implemented by concrete adapters and injected via Arc<dyn Trait>, allowing business logic to be tested without touching a real database. Reservation overlap is resolved with a PostgreSQL EXCLUDE USING gist constraint over a time range (TSTZRANGE) with a GiST index, guaranteeing atomicity with no race conditions possible at the application layer. Every reservation state transition is audited with actor and reason in a history table.",
    },
    challenges: [
      {
        title: { es: "Solapamiento de reservas sin condiciones de carrera", en: "Reservation overlap without race conditions" },
        description: { es: "Dos usuarios podían intentar reservar el mismo espacio en el mismo rango horario simultáneamente. Solución: constraint EXCLUDE USING gist sobre (space_id, time_range) resuelto atómicamente por Postgres en O(log n), en vez de validarlo en la capa de aplicación.", en: "Two users could try to book the same space in the same time window simultaneously. Solution: an EXCLUDE USING gist constraint on (space_id, time_range) resolved atomically by Postgres in O(log n), instead of validating it at the application layer." },
      },
      {
        title: { es: "Autenticación descentralizada entre servicios", en: "Decentralized cross-service authentication" },
        description: { es: "Cada microservicio necesita verificar identidad sin acoplarse al servicio de auth para cada request. Solución: JWT compartido con issuer/audience explícitos verificado localmente en cada servicio, con una única llamada HTTP al auth-service solo quando hace falta confirmar existencia del usuario.", en: "Each microservice needs to verify identity without coupling to the auth service on every request. Solution: a shared JWT with explicit issuer/audience verified locally by each service, with a single HTTP call to the auth service only when user existence needs confirming." },
      },
    ],
    solutions: [
      {
        title: { es: "Hexagonal en Rust con DI manual", en: "Hexagonal architecture in Rust with manual DI" },
        description: { es: "domain/application/infrastructure/api como crates conceptualmente separados dentro del servicio: los casos de uso dependen de traits (ports), nunca de implementaciones concretas, inyectadas vía Arc<dyn Trait> en el ReservationService. Permite mockear el repositorio en tests sin levantar Postgres.", en: "domain/application/infrastructure/api as conceptually separate layers within the service: use cases depend on traits (ports), never on concrete implementations, injected via Arc<dyn Trait> in the ReservationService. Enables mocking the repository in tests without spinning up Postgres." },
      },
      {
        title: { es: "Auditoría de estados como event sourcing parcial", en: "State auditing as partial event sourcing" },
        description: { es: "Cada creación, confirmación o cancelación de una reserva escribe una fila en reservation_status_history con from/to status, actor y motivo, dando trazabilidad completa sin necesidad de un event store completo.", en: "Every reservation creation, confirmation, or cancellation writes a row in reservation_status_history with from/to status, actor, and reason, giving full traceability without needing a full event store." },
      },
    ],
    github: "https://github.com/lpzzlnrd/Coworking",
  },
  {
    id: "encuentralos",
    title: {
      es: "Encuentra un Niño",
      en: "Encuentra un Niño",
    },
    role: {
      es: "Full-stack (frontend + modelo de seguridad en base de datos)",
      en: "Full-stack (frontend + database security model)",
    },
    year: "2026",
    tags: ["React", "TypeScript", "Supabase", "PostgreSQL RLS", "PWA"],
    domain: "data",
    private: false,
    summary: {
      es: "PWA de emergencia para reportar y reunificar menores extraviados, con modo offline, y un modelo de seguridad de datos sensibles implementado casi enteramente a nivel de base de datos (RLS, grants por columna, funciones security definer/invoker).",
      en: "Emergency PWA to report and reunite missing children, with offline support, and a sensitive-data security model implemented almost entirely at the database level (RLS, column-level grants, security definer/invoker functions).",
    },
    description: {
      es: "Aplicación construida en contexto de emergencia (sismo en Venezuela) para que cualquier persona pueda publicar o buscar reportes de menores extraviados, revelando el teléfono de contacto solo bajo demanda. El foco del proyecto no es el frontend sino el modelo de datos: los teléfonos están protegidos por revoke/grant a nivel de columna, una vista pública con security_invoker expone solo los campos no sensibles, y una única Supabase Edge Function en Deno controla el revelado de contacto con rate limiting por hash de IP. La app funciona offline: si no hay conexión, el reporte se encola en IndexedDB y se reenvía automáticamente al reconectar.",
      en: "Application built in an emergency context (earthquake in Venezuela) so anyone can publish or search reports of missing children, revealing the contact phone only on demand. The project's focus isn't the frontend but the data model: phone numbers are protected through column-level revoke/grant, a public view with security_invoker exposes only non-sensitive fields, and a single Deno-based Supabase Edge Function gates contact reveal with IP-hash rate limiting. The app works offline: with no connection, the report queues in IndexedDB and auto-retries once reconnected.",
    },
    challenges: [
      {
        title: { es: "Proteger datos sensibles sin backend propio", en: "Protecting sensitive data without a dedicated backend" },
        description: { es: "El frontend consume Supabase directamente con la clave anónima; exponer teléfonos de contacto sería trivial para cualquier cliente. Solución: revoke de la columna de teléfono para el rol anon, vista pública sin esos campos, y una Edge Function con service role que es la única vía para revelarlos.", en: "The frontend consumes Supabase directly with the anon key; exposing contact phone numbers would be trivial for any client. Solution: revoking the phone column for the anon role, a public view without those fields, and an Edge Function with service role as the only path to reveal them." },
      },
      {
        title: { es: "Abuso del revelado de contacto", en: "Contact-reveal abuse" },
        description: { es: "Sin control, un actor malicioso podría enumerar todos los teléfonos del sistema. Solución: rate limiting de 15 solicitudes/minuto por IP, hasheada con SHA-256 antes de loguearla, implementado dentro de la propia Edge Function.", en: "Without control, a malicious actor could enumerate every phone number in the system. Solution: rate limiting of 15 requests/minute per IP, SHA-256 hashed before logging, implemented inside the Edge Function itself." },
      },
    ],
    solutions: [
      {
        title: { es: "Row Level Security como capa de autorización", en: "Row Level Security as the authorization layer" },
        description: { es: "En vez de validar permisos en el cliente o en un backend intermedio, las policies de Postgres deciden qué fila puede insertar/leer/actualizar cada rol, con una función es_admin() security definer en un schema privado no expuesto por la API REST.", en: "Instead of validating permissions on the client or an intermediate backend, Postgres policies decide which row each role can insert/read/update, with a security definer es_admin() function in a private schema not exposed by the REST API." },
      },
      {
        title: { es: "PWA offline-first", en: "Offline-first PWA" },
        description: { es: "Service worker con Workbox (precache de app shell, StaleWhileRevalidate para fotos, NetworkFirst para el listado) y una cola en IndexedDB que reintenta el envío de reportes al recuperar conexión.", en: "Service worker with Workbox (app shell precache, StaleWhileRevalidate for photos, NetworkFirst for the listing) and an IndexedDB queue that retries report submissions once connectivity returns." },
      },
    ],
    github: "https://github.com/Botinfy/encuentralos",
  },
  {
    id: "xpresapp",
    title: {
      es: "XpresApp — Plataforma Bancaria/Cooperativa",
      en: "XpresApp — Banking/Cooperative Platform",
    },
    role: {
      es: "Backend (extensión de módulo financiero)",
      en: "Backend (financial module extension)",
    },
    year: "2026",
    tags: ["Laravel", "PHP", "MySQL", "Multi-guard auth"],
    domain: "integrations",
    private: true,
    summary: {
      es: "Plataforma bancaria/cooperativa multi-panel (usuarios, sucursales, admin) sobre una base Laravel existente, donde diseñé desde cero el módulo de Certificados de Depósito: inversión, cuotas mensuales, retiro anticipado con penalización y maduración automática.",
      en: "Multi-panel banking/cooperative platform (users, branches, admin) on top of an existing Laravel codebase, where I designed the Certificate of Deposit module from scratch: investment, monthly installments, early withdrawal with penalty, and automatic maturity processing.",
    },
    description: {
      es: "Trabajé sobre una plataforma financiera con paneles separados para usuarios, personal de sucursal y administradores, cada uno con sus propios guards de autenticación. Mi contribución central fue el módulo de Certificados de Depósito (CD): un CdService que encapsula toda la lógica financiera dentro de transacciones de base de datos, validando monto mínimo y balance suficiente antes de crear la inversión, generando cuotas mensuales automáticamente, calculando penalización por retiro anticipado, y procesando la maduración con envío de notificación por correo. Extendí el esquema con excepciones de dominio propias (InsufficientBalanceException, InvalidCdOperationException) en vez de errores genéricos.",
      en: "Worked on a financial platform with separate panels for end users, branch staff, and administrators, each with its own auth guards. My core contribution was the Certificate of Deposit (CD) module: a CdService that encapsulates all financial logic inside database transactions, validating minimum amount and sufficient balance before creating the investment, auto-generating monthly installments, calculating early-withdrawal penalties, and processing maturity with email notifications. I extended the schema with dedicated domain exceptions (InsufficientBalanceException, InvalidCdOperationException) instead of generic errors.",
    },
    challenges: [
      {
        title: { es: "Consistencia financiera bajo concurrencia", en: "Financial consistency under concurrency" },
        description: { es: "Crear una inversión, generar cuotas y descontar balance debe ser todo o nada. Solución: toda la operación envuelta en DB::transaction, con validaciones de negocio (plan activo, balance suficiente) antes de cualquier escritura.", en: "Creating an investment, generating installments, and deducting balance must be all-or-nothing. Solution: the entire operation wrapped in DB::transaction, with business validations (active plan, sufficient balance) before any write." },
      },
      {
        title: { es: "Maduración y penalizaciones automáticas", en: "Automatic maturity and penalties" },
        description: { es: "Los CDs deben madurar y pagar intereses sin intervención manual, y un retiro anticipado debe penalizarse de forma justa. Solución: comandos Artisan programados (ProcessMaturedCds) más un cálculo de penalización encapsulado en el propio modelo del plan (cdPlan->calPenalty).", en: "CDs must mature and pay interest without manual intervention, and early withdrawal must be penalized fairly. Solution: scheduled Artisan commands (ProcessMaturedCds) plus a penalty calculation encapsulated in the plan model itself (cdPlan->calPenalty)." },
      },
    ],
    solutions: [
      {
        title: { es: "Excepciones de dominio explícitas", en: "Explicit domain exceptions" },
        description: { es: "InsufficientBalanceException e InvalidCdOperationException en vez de errores genéricos, permitiendo que la capa HTTP traduzca cada caso a una respuesta clara sin lógica condicional dispersa.", en: "InsufficientBalanceException and InvalidCdOperationException instead of generic errors, letting the HTTP layer translate each case into a clear response without scattered conditional logic." },
      },
      {
        title: { es: "Jobs configurables desde base de datos", en: "Database-configurable jobs" },
        description: { es: "Además del scheduler nativo de Artisan, un registro de CronJob/CronJobLog en base de datos permite ajustar la periodicidad de los procesos de maduración desde el panel admin sin tocar código ni redeploy.", en: "Beyond the native Artisan scheduler, a CronJob/CronJobLog database registry lets maturity-process timing be adjusted from the admin panel without touching code or redeploying." },
      },
    ],
  },
  {
    id: "windeingio",
    title: {
      es: "Whatbox Cloud",
      en: "Whatbox Cloud",
    },
    role: {
      es: "Backend (integraciones y arquitectura modular)",
      en: "Backend (integrations and modular architecture)",
    },
    year: "2026",
    tags: ["Laravel", "PHP", "Modular architecture", "Meta Graph API", "OpenAI"],
    domain: "integrations",
    private: true,
    summary: {
      es: "SaaS multi-tenant para gestión de conversaciones y marketing por WhatsApp Business, Instagram y Messenger, empaquetado como más de 40 módulos independientes que pueden activarse, desactivarse o venderse por separado.",
      en: "Multi-tenant SaaS for conversation management and marketing across WhatsApp Business, Instagram, and Messenger, packaged as 40+ independent modules that can be enabled, disabled, or sold separately.",
    },
    description: {
      es: "Plataforma de mensajería multi-canal donde el núcleo del producto vive en un handler de webhooks unificado que normaliza payloads heterogéneos de WhatsApp, Instagram y Messenger a un modelo interno único, con detección de mensajes 'echo' (enviados desde la app móvil) para no duplicar lógica de UI. La arquitectura modular (cada feature como paquete independiente con sus propias rutas, modelos y migraciones) permite empaquetar subconjuntos de módulos como productos vendibles por separado. El multi-tenancy se aplica de forma consistente por company_id, con límites de uso (mensajes, contactos, campañas) evaluados en cada request contra el plan contratado.",
      en: "Multi-channel messaging platform where the product's core lives in a unified webhook handler that normalizes heterogeneous WhatsApp, Instagram, and Messenger payloads into a single internal model, with 'echo' message detection (sent from the mobile app) to avoid duplicating UI logic. The modular architecture (each feature as an independent package with its own routes, models, and migrations) allows bundling subsets of modules as separately sellable products. Multi-tenancy is applied consistently via company_id, with usage limits (messages, contacts, campaigns) evaluated on every request against the contracted plan.",
    },
    challenges: [
      {
        title: { es: "Condiciones de carrera al crear contactos", en: "Race conditions on contact creation" },
        description: { es: "Mensajes concurrentes del mismo contacto podían crear duplicados. Solución: lockForUpdate() combinado con double-check locking en findOrCreateContact antes de insertar.", en: "Concurrent messages from the same contact could create duplicates. Solution: lockForUpdate() combined with double-check locking in findOrCreateContact before inserting." },
      },
      {
        title: { es: "Normalizar tres proveedores heterogéneos", en: "Normalizing three heterogeneous providers" },
        description: { es: "WhatsApp, Instagram y Messenger envían webhooks con estructuras completamente distintas. Solución: un MetaWebhookHandler central que despacha según el campo 'object' del payload y traduce todo a un modelo interno común (Contact, Message, SocialNotification).", en: "WhatsApp, Instagram, and Messenger send webhooks with completely different structures. Solution: a central MetaWebhookHandler that dispatches based on the payload's 'object' field and translates everything into a common internal model (Contact, Message, SocialNotification)." },
      },
    ],
    solutions: [
      {
        title: { es: "Arquitectura modular empaquetable", en: "Packageable modular architecture" },
        description: { es: "Más de 40 módulos independientes (namespace, rutas, modelos y migraciones propios) que pueden combinarse y empaquetarse selectivamente para distribución como productos separados, sin tocar el núcleo de la aplicación.", en: "40+ independent modules (own namespace, routes, models, and migrations) that can be selectively combined and packaged for distribution as separate products, without touching the application core." },
      },
      {
        title: { es: "Gating de planes en tiempo real", en: "Real-time plan gating" },
        description: { es: "Un middleware de negocio calcula el consumo mensual/anual de mensajes, campañas y contactos por empresa contra los límites del plan contratado, bloqueando o redirigiendo antes de que la request llegue al controller.", en: "A business middleware calculates monthly/yearly consumption of messages, campaigns, and contacts per company against the contracted plan's limits, blocking or redirecting before the request reaches the controller." },
      },
    ],
  },
  {
    id: "pagoexpres",
    title: {
      es: "Pago Today — Remesas y Logística",
      en: "Pago Today — Remittances & Logistics",
    },
    role: {
      es: "Backend (integraciones fintech)",
      en: "Backend (fintech integrations)",
    },
    year: "2025",
    tags: ["Laravel", "PHP", "MySQL", "Livewire", "Fintech"],
    domain: "integrations",
    private: true,
    summary: {
      es: "Plataforma fintech de remesas hacia Venezuela con billetera multi-moneda, verificación KYC y un módulo adicional de logística de encomiendas, integrada con una API externa de terceros para liquidar retiros en USDT y bancos venezolanos.",
      en: "Fintech remittance platform to Venezuela with a multi-currency wallet, KYC verification, and an additional parcel-logistics module, integrated with a third-party external API to settle USDT and Venezuelan bank withdrawals.",
    },
    description: {
      es: "Plataforma de envío de dinero internacional con billetera virtual segmentada por país (USD/EUR/COP), donde cada recarga de saldo pasa por un flujo de aprobación manual con comprobante de pago, y cada envío se liquida mediante integración HTTP con una API externa (CBPay) que resuelve tasas y ejecuta retiros por pago móvil o transferencia bancaria en Venezuela. Implementé el flujo de verificación de identidad (KYC) con selfie y documento, la generación de comprobantes en PDF, y el manejo de errores alrededor de integraciones externas para que un fallo del proveedor no bloquee toda la operación.",
      en: "International money transfer platform with a country-segmented virtual wallet (USD/EUR/COP), where every balance top-up goes through a manual approval flow with a payment proof, and every remittance is settled through an HTTP integration with an external API (CBPay) that resolves exchange rates and executes withdrawals via mobile payment or bank transfer in Venezuela. I implemented the identity verification (KYC) flow with selfie and document upload, PDF receipt generation, and error handling around external integrations so a provider failure doesn't block the entire operation.",
    },
    challenges: [
      {
        title: { es: "Dependencia de una API financiera de terceros", en: "Dependency on a third-party financial API" },
        description: { es: "Los retiros dependen de un proveedor externo (CBPay) que puede fallar o responder lento. Solución: manejo defensivo con try/catch alrededor de cada llamada, logging estructurado de ingresos/egresos, y transacciones de base de datos (DB::beginTransaction/commit/rollBack) en los flujos financieros críticos.", en: "Withdrawals depend on an external provider (CBPay) that can fail or respond slowly. Solution: defensive try/catch handling around every call, structured logging of inflows/outflows, and database transactions (DB::beginTransaction/commit/rollBack) in critical financial flows." },
      },
      {
        title: { es: "Verificación de identidad y cumplimiento", en: "Identity verification and compliance" },
        description: { es: "El servicio maneja transferencias de dinero real y requiere verificar identidad antes de operar. Solución: flujo KYC con selfie + documento frontal/trasero, revisado manualmente por un administrador antes de habilitar operaciones sensibles.", en: "The service handles real money transfers and requires identity verification before operating. Solution: a KYC flow with selfie plus front/back document, manually reviewed by an administrator before enabling sensitive operations." },
      },
    ],
    solutions: [
      {
        title: { es: "Balances segmentados por país y moneda", en: "Country and currency-segmented balances" },
        description: { es: "Cada usuario opera con un balance específico según su país de origen, con conversión automática de divisas y tasa inversa cuando no existe una tasa directa registrada entre dos monedas.", en: "Each user operates with a balance specific to their country of origin, with automatic currency conversion and an inverse rate calculation when no direct rate is registered between two currencies." },
      },
      {
        title: { es: "Notificaciones transaccionales multicanal", en: "Multi-channel transactional notifications" },
        description: { es: "Integración con Twilio para SMS y WhatsApp, incluyendo un chatbot que responde automáticamente la tasa de cambio del día, y un observer que dispara notificaciones al cambiar el estado de un envío.", en: "Twilio integration for SMS and WhatsApp, including a chatbot that automatically replies with the day's exchange rate, and an observer that fires notifications when a transfer's status changes." },
      },
    ],
  },
  {
    id: "pokemon-api",
    title: {
      es: "PokeNext",
      en: "PokeNext",
    },
    role: {
      es: "Colaborador (features de búsqueda)",
      en: "Contributor (search features)",
    },
    year: "2026",
    tags: ["Next.js", "TypeScript", "React", "SSR"],
    domain: "data",
    private: false,
    summary: {
      es: "Pokedex web con Next.js App Router y Server Components que consume la PokéAPI pública; contribuí los filtros de búsqueda por tipo/generación y el autocompletado con endpoint propio de sugerencias.",
      en: "Web Pokedex built with Next.js App Router and Server Components consuming the public PokéAPI; I contributed the type/generation search filters and the autocomplete with a dedicated suggestions endpoint.",
    },
    description: {
      es: "Proyecto colaborativo de curso donde aporté las funcionalidades de búsqueda: filtrado server-side por tipo y generación de Pokémon vía query params resueltos en Server Components, y un buscador con autocompletado que consume un endpoint propio (/api/pokemon/suggestions) construido para reempaquetar datos de la PokéAPI sin exponer al cliente el detalle de la integración externa. La capa de acceso a datos (lib/pokemon.ts) normaliza las respuestas crudas de la API externa a tipos de dominio propios antes de llegar a los componentes de presentación.",
      en: "Collaborative course project where I contributed the search features: server-side filtering by Pokémon type and generation via query params resolved in Server Components, and a search box with autocomplete consuming a dedicated endpoint (/api/pokemon/suggestions) built to repackage PokéAPI data without exposing the external integration's details to the client. The data-access layer (lib/pokemon.ts) normalizes raw external API responses into domain-specific types before they reach presentation components.",
    },
    challenges: [
      {
        title: { es: "Autocompletado sin backend propio", en: "Autocomplete without an owned backend" },
        description: { es: "Cargar todos los nombres de Pokémon (2000+) para el buscador sin penalizar la carga inicial. Solución: un endpoint propio que resuelve la lista completa una sola vez al montar el header, cacheada por Next.js, y filtrada localmente en cliente por nombre o número.", en: "Loading all Pokémon names (2000+) for the search box without penalizing initial load. Solution: a dedicated endpoint that resolves the full list once on header mount, cached by Next.js, and filtered client-side by name or number." },
      },
    ],
    solutions: [
      {
        title: { es: "Filtrado resiliente en paralelo", en: "Resilient parallel filtering" },
        description: { es: "Al filtrar por tipo o generación, cada detalle de Pokémon se resuelve en paralelo con Promise.allSettled, descartando resultados individuales fallidos sin romper el listado completo.", en: "When filtering by type or generation, each Pokémon's detail is resolved in parallel with Promise.allSettled, discarding individually failed results without breaking the whole listing." },
      },
    ],
    github: "https://github.com/KumaDeveloperVZLA/Pokemon-API",
  },
];
