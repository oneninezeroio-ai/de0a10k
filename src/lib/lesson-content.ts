// src/lib/lesson-content.ts
// Contenido enriquecido de lecciones con imágenes, ejemplos reales, callouts y ejercicios

export interface LessonBlock {
  type:
    | 'heading'
    | 'paragraph'
    | 'callout'
    | 'example'
    | 'image'
    | 'stat_grid'
    | 'comparison'
    | 'timeline'
    | 'tool_card'
    | 'quote'
    | 'warning'
    | 'checklist_inline'
    | 'number_breakdown'
    | 'divider'
  content?: string
  level?: 2 | 3
  variant?: 'info' | 'warning' | 'success' | 'brand'
  items?: string[]
  stats?: Array<{ value: string; label: string; sub?: string }>
  sides?: { left: { title: string; items: string[] }; right: { title: string; items: string[] } }
  steps?: Array<{ step: string; title: string; detail: string; time?: string }>
  tool?: { name: string; url: string; price: string; why: string; icon: string }
  author?: string
  role?: string
  src?: string
  alt?: string
  caption?: string
  numbers?: Array<{ num: string; label: string; detail: string }>
}

export type ModuleLessonContent = Record<string, LessonBlock[]>

// ─────────────────────────────────────────────
// MÓDULO 1 — MENTALIDAD Y REALIDAD
// ─────────────────────────────────────────────
export const MODULE_1_CONTENT: ModuleLessonContent = {

  'leccion-1-1': [
    { type: 'quote', content: 'No soy guru. No soy coach motivacional. Soy un operador que construyó algo real y te está mostrando exactamente cómo lo hizo.', author: 'Jose Angel', role: 'Fundador, Freedom AI' },
    { type: 'heading', level: 2, content: 'Los números reales, sin filtros' },
    { type: 'paragraph', content: 'Antes de enseñarte cualquier cosa, necesitás saber exactamente qué se logró y cómo. No versiones embellecidas. Los números reales.' },
    {
      type: 'stat_grid',
      stats: [
        { value: '$174K', label: 'Facturado en 6 meses', sub: 'Desde Honduras, sin inversión externa' },
        { value: '$40K', label: 'MRR al mes 6', sub: 'Ingreso mensual recurrente' },
        { value: '$2K', label: 'Primer cliente', sub: 'Semana 3, primer cold email' },
        { value: '$200', label: 'Inversión inicial', sub: 'Solo LLC en Florida' },
      ]
    },
    { type: 'heading', level: 2, content: 'El timeline exacto' },
    { type: 'paragraph', content: 'Esto no pasó de un día para el otro. Pero tampoco tardó años. Acá el desglose mes a mes:' },
    {
      type: 'timeline',
      steps: [
        { step: 'Mes 1', title: 'Estructura legal', detail: 'LLC en Florida por menos de $200. Cuenta bancaria americana. Stripe configurado. Sin clientes, sin oferta clara todavía.', time: 'Costo: $200 inversión' },
        { step: 'Mes 2', title: 'Primeros correos y primer cliente', detail: 'Creé la oferta de servicios digitales. Mandé 500 cold emails. Los primeros 500 no generaron nada. Ajusté el mensaje. En la semana 3, primer cliente: $2,000 USD.', time: 'Primer ingreso: $2,000' },
        { step: 'Mes 3', title: 'Primer contratista en Filipinas', detail: 'Contraté asistente en Filipinas a $5/hora para el fulfillment. Eso me liberó tiempo para vender más. Volumen de outreach subió 3x.', time: 'MRR: ~$8,000' },
        { step: 'Mes 4', title: 'Sistema funcionando', detail: '$25,000 al mes. Ya no dependía de que yo cerrara cada cliente. El proceso era replicable. El sistema estaba probado.', time: 'MRR: $25,000' },
        { step: 'Mes 6', title: 'Escala real', detail: '$40,000 mensuales recurrentes. Equipo remoto en Filipinas. 2-3 horas de trabajo al día. Total acumulado en 6 meses: $174,000.', time: 'MRR: $40,000' },
      ]
    },
    { type: 'heading', level: 2, content: '¿Por qué te cuento esto?' },
    { type: 'paragraph', content: 'No para impresionarte. Te lo cuento porque necesitás entender algo fundamental: yo no soy especial. No tenía conexiones en USA. No hablaba inglés perfecto. No tenía experiencia previa en agencias digitales.' },
    {
      type: 'callout',
      variant: 'brand',
      content: 'La única diferencia entre donde estás hoy y donde llegué yo es una sola cosa: yo ejecuté. Tomé el sistema, lo apliqué uno a uno, y no paré cuando las cosas se pusieron difíciles. Eso es todo.'
    },
    { type: 'heading', level: 2, content: 'Lo que vas a aprender en este curso' },
    { type: 'paragraph', content: 'Este curso no es teoría. Es el sistema exacto que usé, documentado paso a paso. Al terminar vas a tener:' },
    {
      type: 'checklist_inline',
      items: [
        'Un nicho definido con un cliente ideal claro y alcanzable',
        'Una oferta que sea difícil de rechazar con precio basado en valor',
        'Una LLC formada en Florida, cuenta bancaria americana y Stripe configurado',
        'Un sistema de cold email funcionando con 100+ emails/día',
        'Scripts de llamadas de ventas para cerrar clientes',
        'Tu primer cliente pagando en dólares',
      ]
    },
    {
      type: 'warning',
      content: 'Este curso no es para todo el mundo. Si buscás hacerte rico sin trabajar, cerrá esto ahora. Si no estás dispuesto a sentirte incómodo, a que te rechacen, y a mandar 500 correos sin respuesta — esto no es para vos.'
    },
  ],

  'leccion-1-2': [
    { type: 'heading', level: 2, content: 'El ejercicio más importante antes de empezar' },
    { type: 'paragraph', content: 'Antes de aprender a conseguir clientes, necesitamos saber dónde estás parado. La diferencia entre "quiero ganar más dinero" y "necesito generar $3,000 dólares mensuales en los próximos 90 días para dejar mi trabajo" es enorme. Una es un deseo vago. La otra es una misión.' },
    {
      type: 'callout',
      variant: 'brand',
      content: 'Este curso solo funciona si tenés una misión clara. No un sueño. Una misión con número, con fecha, con razón.'
    },
    { type: 'heading', level: 2, content: 'Paso 1: Tu número real de libertad' },
    { type: 'paragraph', content: 'Libertad para mí es poder llevar a mi hijo al parque un martes a las 10 de la mañana sin pedirle permiso a nadie. Es poder pagar las cuentas sin que el estómago se apriete. Eso no requiere ser millonario. Requiere un sistema que genere ingresos predecibles en una moneda fuerte.' },
    {
      type: 'example',
      content: 'Ejemplo concreto de cálculo de libertad:\n\nRenta: $400/mes\nComida: $300/mes\nServicios: $100/mes\nTransporte: $150/mes\nDeudas: $200/mes\nMargen de respirar: $350/mes\n─────────────────\nTotal real: $1,500/mes\n\nEso son $1,500 USD. Para un negocio digital en USA, eso es 1-2 clientes medianos. No es un número imposible. Es tu punto de partida.'
    },
    { type: 'heading', level: 2, content: 'Paso 2: Inventario de realidad' },
    { type: 'paragraph', content: 'Las preguntas que nadie quiere hacerse pero que definen si esto funciona:' },
    {
      type: 'checklist_inline',
      items: [
        '¿Tenés una habilidad que alguien pagaría por usar? (diseño, escritura, ventas, redes, automatización)',
        '¿Tenés computadora y acceso a internet estable?',
        '¿Tenés 2-3 horas al día que puedas proteger como si tu futuro dependiera de ellas?',
        '¿Tenés $200-500 USD para invertir en tu empresa?',
        '¿Estás dispuesto a hacer cosas incómodas por 90 días seguidos?',
      ]
    },
    {
      type: 'callout',
      variant: 'info',
      content: 'Si no tenés habilidad vendible todavía: las más rápidas de aprender en 2-3 semanas son manejo de redes sociales, diseño básico con Canva, configuración de automatizaciones con IA, y cold email outreach.'
    },
    { type: 'heading', level: 2, content: 'Paso 3: Tu meta de 90 días' },
    {
      type: 'comparison',
      sides: {
        left: { title: 'Arrancando de cero (sin experiencia)', items: ['Meta: $1,000 - $3,000 en 90 días', 'Enfoque: conseguir el primer cliente', 'No mensual — total en 90 días', 'Ese primer cliente cambia todo'] },
        right: { title: 'Con experiencia o habilidad previa', items: ['Meta: $3,000 - $10,000 en 90 días', 'Enfoque: primeros 2-3 clientes', 'Puede aspirar a recurrente', 'Precio más alto desde el inicio'] },
      }
    },
    {
      type: 'warning',
      content: 'Hay un momento en los próximos 90 días donde vas a querer dejarlo. Donde vas a mandar correos y nadie va a responder. En ese momento, volvé a lo que escribiste hoy. Tu definición de libertad. Tu número. Tu razón. El sistema funciona. Pero solo si no parás.'
    },
  ],

  'leccion-1-3': [
    { type: 'heading', level: 2, content: '¿Por qué no vender solo en tu país?' },
    { type: 'paragraph', content: 'Esta es la pregunta que mucha gente se hace y nunca dice en voz alta. La respuesta es matemática, no moral.' },
    {
      type: 'number_breakdown',
      numbers: [
        { num: '25:1', label: 'Tasa de cambio Honduras', detail: '$2,000 USD = más de 50,000 lempiras. Para ganar lo mismo con clientes locales, necesitarías cobrar 50,000 lempiras por proyecto.' },
        { num: '18:1', label: 'Tasa de cambio Colombia', detail: '$2,000 USD = ~8,000,000 COP. ¿Cuántos negocios colombianos pagan eso por un servicio digital?' },
        { num: '17:1', label: 'Tasa de cambio México', detail: '$2,000 USD = ~35,000 MXN. Posible, pero el mercado es mucho más competitivo y los precios más bajos.' },
      ]
    },
    { type: 'heading', level: 2, content: 'El mercado americano en números' },
    {
      type: 'stat_grid',
      stats: [
        { value: '33M+', label: 'Pequeñas empresas en USA', sub: 'Cada una necesita servicios digitales' },
        { value: '5M+', label: 'Empresas de dueños hispanos', sub: 'Prefieren trabajar con alguien que habla español' },
        { value: '$1,500', label: 'Precio promedio/mes aceptable', sub: 'Para un negocio americano, es un gasto normal' },
        { value: '0', label: 'Dólares en publicidad pagada', sub: 'Para conseguir tus primeros clientes con cold email' },
      ]
    },
    { type: 'heading', level: 2, content: 'Matando las excusas una por una' },
    {
      type: 'callout',
      variant: 'warning',
      content: '❌ Excusa #1: "No tengo experiencia"\n\nLa experiencia no se consigue estudiando. Se consigue ejecutando. Tu primer cliente no te va a contratar por tu currículum. Te va a contratar porque le presentaste una solución clara a un problema real.\n\nHay gente en USA cobrando $5,000/mes por hacer cosas que podés aprender en dos semanas. No porque sean genios. Porque se atrevieron a ofrecer el servicio.'
    },
    {
      type: 'callout',
      variant: 'warning',
      content: '❌ Excusa #2: "No sé inglés"\n\nPrimero: hay 5M+ de negocios hispanos en USA que prefieren trabajar con alguien que habla su idioma.\n\nSegundo: las herramientas de IA hoy te permiten escribir correos en inglés perfecto en segundos.\n\nTercero: lo que importa es resolver problemas y cumplir lo que prometés. Eso paga las cuentas, no tu acento.'
    },
    {
      type: 'callout',
      variant: 'warning',
      content: '❌ Excusa #3: "No tengo dinero para empezar"\n\nLLC: menos de $200. Herramientas básicas: $30-50/mes. Sin oficina. Sin inventario. Sin empleados al inicio.\n\nCompará eso con abrir cualquier negocio físico: local, inventario, empleados, permisos = miles de dólares antes de generar un centavo.\n\nUn negocio digital de servicios es el modelo con menor barrera de entrada que existe.'
    },
    {
      type: 'callout',
      variant: 'warning',
      content: '❌ Excusa #4: "No es el momento adecuado"\n\n¿Sabés cuándo va a ser el momento perfecto? Nunca. Siempre va a haber algo. Siempre va a haber una razón para esperar.\n\nLa gente que construye cosas no espera a que las condiciones sean ideales. Construye con lo que tiene, donde está, ahora.'
    },
    {
      type: 'quote',
      content: 'Lo difícil es el filtro. Las excusas son el filtro. La incomodidad es el filtro. Y vos estás aquí porque decidiste pasar ese filtro.',
      author: 'Jose Angel'
    },
  ],
}

// ─────────────────────────────────────────────
// MÓDULO 2 — ELIGE TU NICHO
// ─────────────────────────────────────────────
export const MODULE_2_CONTENT: ModuleLessonContent = {

  'leccion-2-1': [
    { type: 'heading', level: 2, content: 'El problema que nadie te dice' },
    { type: 'paragraph', content: 'Si estás mandando mensajes y nadie responde, si publicás contenido y nadie compra — el problema probablemente no es lo que vendés. El problema es a quién se lo estás vendiendo.' },
    {
      type: 'comparison',
      sides: {
        left: { title: '❌ Mensaje genérico (nadie responde)', items: ['"Hago logos profesionales para tu negocio"', '"Precios accesibles. Resultados garantizados."', 'Le estás hablando a todo el mundo', 'Cuando le hablás a todos, no le hablás a nadie'] },
        right: { title: '✅ Mensaje específico (genera respuestas)', items: ['"Ayudo a restaurantes nuevos en Miami a tener logo y menú profesional en 72 horas"', '"Para que puedan abrir sin retrasos"', 'Una persona específica con un problema urgente', 'Eso genera respuestas'] }
      }
    },
    { type: 'paragraph', content: 'Mismo servicio. Misma habilidad. Pero el segundo tiene un cliente específico, un problema específico y un resultado concreto. Eso es lo que genera respuestas.' },
    { type: 'heading', level: 2, content: 'El orden correcto que casi nadie sigue' },
    {
      type: 'timeline',
      steps: [
        { step: 'Primero', title: 'Identificar quién tiene un problema real y urgente', detail: 'No "empresas en general". Una persona específica con un dolor que le quita el sueño y dinero para resolverlo.' },
        { step: 'Segundo', title: 'Entender ese problema profundamente', detail: 'Qué lo causa, qué lo agrava, qué ha intentado antes y por qué no funcionó.' },
        { step: 'Tercero', title: 'Adaptar lo que sabés hacer para resolver ese problema', detail: 'Tu habilidad se moldea al dolor. No al revés.' },
      ]
    },
    {
      type: 'callout',
      variant: 'brand',
      content: 'La mayoría piensa en lo que saben hacer y después busca a quién vendérselo. Es al revés. Primero encontrás el problema, después adaptás la solución.'
    },
    { type: 'heading', level: 2, content: 'Señales de que tu targeting está mal' },
    {
      type: 'checklist_inline',
      items: [
        'Mandás mensajes y te dejan en visto (mensaje llegó a alguien sin ese problema)',
        'Te dicen "interesante" o "déjame pensarlo" pero nunca compran (no hay urgencia)',
        'Bajás tus precios pensando que es un tema de costo (casi nunca lo es)',
        'Cambiás tu oferta cada dos semanas porque "no funciona" (matás una oferta buena antes de tiempo)',
      ]
    },
  ],

  'leccion-2-3': [
    { type: 'heading', level: 2, content: 'Los 5 filtros para elegir a quién le vas a vender' },
    { type: 'paragraph', content: 'No toda persona con un problema es un buen cliente. Estos 5 filtros te ahorran semanas de mandar mensajes a las personas equivocadas.' },
    {
      type: 'number_breakdown',
      numbers: [
        { num: '1', label: 'Dolor activo', detail: 'Esta persona siente el dolor HOY, no lo sabe teóricamente. El dueño del restaurante que VE las mesas vacías cada noche. No alguien que "debería" mejorar su marketing.' },
        { num: '2', label: 'Urgencia', detail: '¿Necesita resolverlo ahora o "algún día"? Buscá señales: acaban de abrir, se acerca temporada fuerte, están perdiendo dinero cada mes, el contador les dijo que las cosas no van bien.' },
        { num: '3', label: 'Capacidad de pago', detail: 'Un negocio que factura $30K/mes puede pagarte $1,500 sin pestañear si le resolvés un problema real. Vendele a quien ya invierte en soluciones, no a quien nunca ha pagado por un servicio.' },
        { num: '4', label: 'Autoridad', detail: 'La persona a quien le hablás, ¿puede decir "sí" y pagarte? ¿O tiene que pedirle permiso a alguien? Hablá con el dueño, el fundador, quien firma los cheques. No el gerente.' },
        { num: '5', label: 'Comunidad', detail: '¿Podés encontrar a esta gente? ¿Están en LinkedIn, Google Maps, Instagram, grupos de Facebook, directorios? Si no podés encontrarlos, no importa qué tan perfecto sea tu ICP.' },
      ]
    },
    {
      type: 'example',
      content: 'Ejercicio de puntuación:\n\nCalificá tu ICP del 1 al 5 en cada filtro:\n\nRestaurantes hispanos en Miami:\n• Dolor: 5/5 (mesas vacías = pérdida real cada día)\n• Urgencia: 4/5 (cada semana sin clientes es dinero perdido)\n• Capacidad de pago: 4/5 (facturan $20K-80K/mes)\n• Autoridad: 5/5 (el dueño decide solo)\n• Comunidad: 5/5 (Google Maps, Instagram, grupos FB)\n\nPuntaje total: 23/25 → Excelente candidato'
    },
    {
      type: 'callout',
      variant: 'info',
      content: 'El filtro más olvidado es el de Comunidad. Podés tener el cliente ideal perfecto en tu cabeza pero si no sabés dónde encontrarlo, no te sirve de nada. Antes de comprometerte con un nicho, buscalo en Google Maps, LinkedIn, e Instagram. Si encontrás decenas de resultados en 10 minutos, estás bien.'
    },
  ],

  'leccion-2-4': [
    { type: 'heading', level: 2, content: 'El triángulo que define si tu negocio tiene futuro' },
    { type: 'paragraph', content: 'Podés encontrar gente con dolor y dinero, pero si no podés resolver su problema o demostrarlo, no hay negocio. Las tres esquinas tienen que estar presentes.' },
    {
      type: 'stat_grid',
      stats: [
        { value: '💡', label: 'Habilidad', sub: 'Lo que sabés hacer que tiene valor real' },
        { value: '📋', label: 'Prueba', sub: 'Lo que podés demostrar (no solo decir)' },
        { value: '💰', label: 'Demanda', sub: 'Lo que la gente ya paga por resolver' },
      ]
    },
    { type: 'heading', level: 3, content: '¿Qué pasa cuando falta una esquina?' },
    {
      type: 'callout',
      variant: 'warning',
      content: '⚠️ Habilidad + Demanda sin Prueba: Conseguís atención pero no confianza. La gente dice "suena bien" y desaparece. SOLUCIÓN: conseguí tu primer cliente a como dé lugar, aunque sea barato. Usá ese resultado como prueba.'
    },
    {
      type: 'callout',
      variant: 'warning',
      content: '⚠️ Habilidad + Prueba sin Demanda: Sos bueno, tenés resultados, pero vendés algo que nadie necesita con urgencia. SOLUCIÓN: cambiá de mercado o reposicioná hacia un dolor que sí sea urgente.'
    },
    {
      type: 'callout',
      variant: 'warning',
      content: '⚠️ Demanda + Prueba sin Habilidad: Vas a vender pero no vas a poder entregar. SOLUCIÓN: o aprendés la habilidad rápido, o contratás a alguien que la tenga. Así funcionan las agencias.'
    },
    { type: 'heading', level: 2, content: 'Habilidades vendibles que podés aprender en 2-3 semanas' },
    {
      type: 'checklist_inline',
      items: [
        'Manejo de redes sociales (Instagram, Facebook, LinkedIn para negocios)',
        'Diseño básico con Canva o Figma (logos, posts, menús)',
        'Cold email outreach y configuración de secuencias',
        'Configuración de CRMs (HubSpot, GoHighLevel)',
        'Automatizaciones básicas con Make.com o Zapier',
        'Gestión de Google My Business y reputación online',
        'Edición de video corto para Reels e historias',
        'Configuración de anuncios Facebook/Instagram básicos',
      ]
    },
    {
      type: 'callout',
      variant: 'info',
      content: '¿No tenés prueba todavía? Eso es completamente normal. Opciones para construirla rápido:\n\n1. Hacer un proyecto personal y documentarlo (creá una cuenta de Instagram para un negocio ficticio y mostrá el crecimiento)\n2. Ofrecerle a un amigo o familiar hacer el trabajo gratis o muy barato a cambio de un testimonial\n3. Tu primer cliente real ES tu prueba — cobrá menos, entregá más, y usá ese resultado para los próximos'
    },
  ],
}

// ─────────────────────────────────────────────
// MÓDULO 3 — DISEÑA TU OFERTA
// ─────────────────────────────────────────────
export const MODULE_3_CONTENT: ModuleLessonContent = {

  'leccion-3-2': [
    { type: 'heading', level: 2, content: 'Los 4 pilares de una oferta irresistible' },
    { type: 'paragraph', content: 'Cada vez que alguien ve tu oferta, su cerebro hace un cálculo automático basado en 4 factores. Tu trabajo es maximizar los primeros dos y minimizar los últimos dos.' },
    {
      type: 'number_breakdown',
      numbers: [
        { num: '↑', label: 'Resultado grande (maximizar)', detail: '"Mesas llenas de lunes a jueves" > "Manejo de redes sociales". El resultado tiene que ser específico, deseable y creíble. No exagerado. Grande pero real.' },
        { num: '↑', label: 'Probabilidad alta (maximizar)', detail: 'Si no tenés testimoniales, usá claridad. Explicá tu proceso paso a paso. Mencioná el dolor con sus mismas palabras. Eso genera confianza antes de tener prueba.' },
        { num: '↓', label: 'Tiempo corto (minimizar)', detail: 'Estructurá tu oferta para que haya un "quick win" en la primera semana. Aunque el resultado completo tarde 60 días, el cliente necesita ver algo funcionando rápido.' },
        { num: '↓', label: 'Esfuerzo del cliente (minimizar)', detail: '"Yo me encargo de todo, vos solo me das acceso" > "Te voy a enseñar a hacer esto". Entre menos esfuerzo le pedís, más fácil es que diga que sí.' },
      ]
    },
    { type: 'heading', level: 2, content: 'La fórmula de tu frase de oferta' },
    {
      type: 'callout',
      variant: 'brand',
      content: '"Yo ayudo a [cliente específico] a lograr [resultado concreto] sin [obstáculo o dolor que quieren evitar]."'
    },
    {
      type: 'example',
      content: 'Ejemplos reales por nicho:\n\n🍽️ Restaurantes:\n"Ayudo a restaurantes hispanos en USA a llenar mesas entre semana sin depender del boca a boca ni gastar en publicidad que no funciona."\n\n🦷 Dentistas:\n"Ayudo a dentistas nuevos a conseguir 20+ pacientes al mes sin contratar un equipo de marketing ni gastar miles en agencias."\n\n💪 Coaches de fitness:\n"Ayudo a coaches de fitness online a llenar sus programas con clientes que pagan premium sin vivir pegados a Instagram 8 horas al día."\n\n🏠 Agentes de bienes raíces:\n"Ayudo a agentes hispanos en USA a generar 5-8 citas de compradores por mes sin hacer llamadas en frío ni gastar en leads."'
    },
    { type: 'heading', level: 2, content: 'Value stacking: cómo hacer que $1,500 se sienta como $5,000' },
    { type: 'paragraph', content: 'El value stacking es apilar valor percibido alrededor de tu servicio principal. No relleno. Cosas que le cuestan poco a vos pero que el cliente percibe como muy valioso.' },
    {
      type: 'checklist_inline',
      items: [
        'Reporte mensual de resultados (te toma 2 horas, el cliente lo percibe como premium)',
        'Acceso directo por WhatsApp para preguntas rápidas (sin costo, genera mucha confianza)',
        'Setup de herramientas incluido (lo hacés una vez, parece un servicio extra)',
        'Template o checklist personalizado para su industria',
        'Auditoría inicial gratuita de su situación actual',
        'Garantía de resultados: "Si en 30 días no ves avance, trabajo gratis hasta que lo veas"',
      ]
    },
  ],

  'leccion-3-3': [
    { type: 'heading', level: 2, content: 'Por qué cobrar barato es peor que cobrar caro' },
    { type: 'paragraph', content: 'Parece al revés. Uno pensaría que si cobrás barato, más gente te compra y es más fácil vender. Mentira. Es lo contrario.' },
    {
      type: 'callout',
      variant: 'warning',
      content: '🔴 Cobrar barato atrae malos clientes. Los que buscan lo más barato son los más difíciles: piden más, se quejan más, pagan tarde, cuestionan todo. Los mejores clientes que tuve fueron los que pagaban premium.'
    },
    {
      type: 'callout',
      variant: 'warning',
      content: '🔴 Cobrar barato destruye tu capacidad de entregar. Si cobrás $300 en vez de $1,500, necesitás 5 clientes para ganar lo mismo que con uno. Eso son 5 proyectos, 5 personas, 5 veces más trabajo. La calidad baja. Los clientes se van.'
    },
    {
      type: 'callout',
      variant: 'warning',
      content: '🔴 Cobrar barato le dice al mercado que no valés mucho. Cuando alguien ve dos opciones — una de $500 y una de $2,000 — asume que la de $2,000 es mejor. El precio mismo es la señal.'
    },
    { type: 'heading', level: 2, content: 'Pricing basado en valor — el único que funciona' },
    {
      type: 'example',
      content: 'Cómo calcular tu precio:\n\n1. ¿Cuánto vale el resultado para tu cliente?\n   → Si tu servicio le genera 20 clientes nuevos/mes a un restaurante\n   → Cada cliente gasta $60 en promedio\n   → Eso son $1,200 de ingreso adicional mensual\n   → Al año: $14,400\n\n2. ¿Cuánto deberías cobrar?\n   → $1,500/mes es el 10% del valor que generás\n   → Para el cliente: cada mes paga $1,500 y recibe $1,200 de valor\n   → En 2 meses recuperó la inversión\n\nTu precio no es lo que te sentís cómodo cobrando.\nTu precio es lo que vale el resultado que prometés.'
    },
    {
      type: 'stat_grid',
      stats: [
        { value: '$500-1K', label: 'Precio de lanzamiento', sub: 'Sin clientes ni portafolio. Solo para conseguir prueba.' },
        { value: '$1.5-2.5K', label: 'Precio estándar', sub: 'Con 1-2 clientes y resultados demostrables.' },
        { value: '$2.5-5K', label: 'Precio senior', sub: 'Con 3-5 clientes, testimoniales y proceso probado.' },
      ]
    },
    {
      type: 'callout',
      variant: 'brand',
      content: 'Regla de oro: si nunca nadie te dice que es caro, estás cobrando muy poco. Los buenos clientes negocian pero pagan. Los malos clientes regatean y después son un dolor de cabeza.'
    },
  ],
}

// ─────────────────────────────────────────────
// MÓDULO 4 — INCORPORACIÓN EN USA
// ─────────────────────────────────────────────
export const MODULE_4_CONTENT: ModuleLessonContent = {

  'leccion-4-2': [
    { type: 'heading', level: 2, content: 'Cómo formar tu LLC en Florida paso a paso' },
    {
      type: 'callout',
      variant: 'warning',
      content: '⚠️ Disclaimer: No soy abogado ni contador. Esto es mi experiencia personal y lo que he visto funcionar. Para decisiones específicas sobre tu situación, consultá con un profesional.'
    },
    { type: 'paragraph', content: 'La plataforma que recomiendo es Doola. Está diseñada específicamente para personas que no viven en USA: no necesitás SSN, no necesitás dirección americana, no necesitás visa.' },
    {
      type: 'tool_card',
      tool: {
        name: 'Doola',
        url: 'https://doola.com',
        price: '$300-500 pago único (incluye LLC + EIN)',
        why: 'Diseñado para no residentes de USA. Te da LLC, EIN, dirección registrada y documentos listos para banco y Stripe. Código de descuento: REFERAFOUNDER10 (10% off)',
        icon: '🏛️'
      }
    },
    { type: 'heading', level: 2, content: '¿Por qué Florida?' },
    {
      type: 'checklist_inline',
      items: [
        'Sin impuesto estatal sobre ingresos (0% state income tax)',
        'Filing fee de los más bajos del país ($125)',
        'Estado amigable para negocios y startups',
        'Comunidad hispana enorme — útil para networking',
        'Muchos servicios bancarios y legales están familiarizados con no residentes',
      ]
    },
    { type: 'heading', level: 2, content: 'Lo que necesitás antes de empezar' },
    {
      type: 'checklist_inline',
      items: [
        'Pasaporte vigente (foto clara, sin vencer)',
        'Email que revisás todos los días',
        'Nombre de tu empresa decidido (podés cambiarlo después)',
        'Recibo público a tu nombre (agua, luz, teléfono) — MUY IMPORTANTE para verificación',
        '$300-500 para el pago',
        'NO agregar socios — hacelo solo para simplificar la apertura bancaria',
      ]
    },
    {
      type: 'callout',
      variant: 'warning',
      content: '⚠️ CRÍTICO sobre el recibo público: Asegurate de tener un recibo de servicios públicos con tu nombre y dirección. Si todo está a nombre de otra persona (cónyuge, familiar), la LLC tendrá que ir a nombre de esa persona. Esto causó muchos dolores de cabeza a quienes no lo supieron de antemano.'
    },
    {
      type: 'timeline',
      steps: [
        { step: 'Día 1', title: 'Completar formulario en Doola', detail: 'Andá a doola.com, hacé clic en "Start a U.S. Company", seleccioná LLC, elegí Florida, completá tus datos y pagá.' },
        { step: 'Días 1-14', title: 'Esperar documentos', detail: 'Doola procesa tu solicitud. Recibirás por email: Articles of Organization, EIN (carta del IRS), Operating Agreement, y dirección registrada.' },
        { step: 'Día 14-15', title: 'Aplicar al banco', detail: 'Con los documentos en mano, aplicás a Mercury o Relay. El proceso es 100% online, toma 15-20 minutos.' },
        { step: 'Día 16-20', title: 'Cuenta bancaria activa', detail: 'Banco aprobado. Configurás Stripe. Hacés un pago de prueba de $1 para verificar que todo funciona.' },
        { step: 'Día 21+', title: 'Listo para cobrar', detail: 'Tu empresa existe legalmente en USA, podés facturar a clientes americanos, recibir pagos y mover dinero a tu país.' },
      ]
    },
  ],

  'leccion-4-4': [
    { type: 'heading', level: 2, content: 'Apertura de cuenta bancaria americana — guía completa' },
    { type: 'paragraph', content: 'Tenés tres opciones principales. Las tres funcionan para no residentes. Las tres son 100% digitales.' },
    {
      type: 'tool_card',
      tool: {
        name: 'Mercury (Recomendado principal)',
        url: 'https://mercury.com',
        price: 'Gratis — sin fees ni mínimos',
        why: 'Banco digital diseñado para empresas y fundadores. Interfaz limpia, se conecta perfecto con Stripe, dashboard profesional. Mi banco principal desde el primer día.',
        icon: '🏦'
      }
    },
    {
      type: 'tool_card',
      tool: {
        name: 'Relay (Plan B)',
        url: 'https://relayfi.com',
        price: 'Gratis — plan básico sin fees',
        why: 'Proceso de aprobación más flexible para no residentes. Permite crear múltiples cuentas (ingresos, gastos, impuestos). Ideal si Mercury rechaza.',
        icon: '🏦'
      }
    },
    {
      type: 'tool_card',
      tool: {
        name: 'Wise (Para mover dinero)',
        url: 'https://wise.com',
        price: '0.5-1.5% por transferencia (mucho menor que bancos)',
        why: 'No reemplaza al banco principal. Es el puente entre tu cuenta americana y tu banco local. Las mejores tasas de cambio del mercado.',
        icon: '💱'
      }
    },
    { type: 'heading', level: 2, content: 'Consejos para que te aprueben a la primera' },
    {
      type: 'checklist_inline',
      items: [
        'Nombre de la LLC exactamente igual en todos los documentos (copia y pega, nunca escribas a mano)',
        'Usar la dirección que te dio Doola — no inventar una',
        'Tener presencia online antes de aplicar (LinkedIn, página simple, Instagram de negocio)',
        'Descripción específica del negocio: "We provide digital marketing services to small businesses in the United States" — nunca solo "consulting"',
        'Tener todos los documentos abiertos antes de empezar (pasaporte escaneado, EIN, Articles of Organization)',
        'El nombre en el banco debe coincidir exactamente con el de tu LLC incluyendo "LLC"',
      ]
    },
    {
      type: 'callout',
      variant: 'info',
      content: '¿Te rechazaron? Revisá estas causas más comunes:\n\n1. El nombre de la LLC no coincide exactamente\n2. No encontraron tu empresa online (crean tu presencia antes)\n3. Descripción del negocio demasiado vaga\n4. Documentos borrosos o incompletos\n\nCorregí y volvé a aplicar. La mayoría se aprueba en el segundo intento.'
    },
  ],

  'leccion-4-5': [
    { type: 'heading', level: 2, content: 'Configurar Stripe — paso a paso' },
    {
      type: 'tool_card',
      tool: {
        name: 'Stripe',
        url: 'https://stripe.com',
        price: '2.9% + $0.30 por transacción (sin fee mensual)',
        why: 'El estándar de pagos para negocios B2B en USA. Los clientes americanos confían en Stripe. Se integra con todo. Tus clientes pagan con tarjeta y el dinero llega a Mercury en 2-3 días.',
        icon: '💳'
      }
    },
    { type: 'heading', level: 2, content: 'El flujo completo del dinero' },
    {
      type: 'timeline',
      steps: [
        { step: '1', title: 'Cliente paga', detail: 'Tu cliente recibe tu link de Stripe, pone su tarjeta de crédito o débito, y paga en segundos. Puede estar en cualquier parte de USA.' },
        { step: '2', title: 'Stripe procesa', detail: 'Stripe retiene el 2.9% + $0.30 de comisión y deposita el resto en tu cuenta de Mercury en 2-3 días hábiles.' },
        { step: '3', title: 'Mercury lo recibe', detail: 'El dinero aterriza en tu cuenta business americana. Acá es donde se queda para operar tu negocio.' },
        { step: '4', title: 'Wise transfiere', detail: 'En fechas fijas (ej: el 1 y 15 de cada mes), transferís tu "salario" de Mercury a tu cuenta local via Wise. Las mejores tasas de cambio del mercado.' },
        { step: '5', title: 'Tu banco local', detail: 'El dinero llega en tu moneda local en 1-3 días hábiles. Sin pasar por cambistas informales, 100% legal y trazable.' },
      ]
    },
    {
      type: 'callout',
      variant: 'brand',
      content: 'Regla de oro: desde el día uno, todo el dinero del negocio pasa por tu cuenta de negocio. Tu cuenta personal es para tu vida personal. Nunca las mezcles — pierdes la protección legal de tu LLC.'
    },
    { type: 'heading', level: 2, content: 'Tu sistema de "salario"' },
    {
      type: 'example',
      content: 'Framework para manejar tu dinero:\n\n📥 TODO lo que entra → cuenta Mercury\n\n💰 Tu "salario" fijo → transferís el mismo monto el 1 y 15 de cada mes via Wise\n   → Ej: $800/mes para vivir en Honduras\n\n🔧 Colchón operativo → dejás siempre 1-2 meses de gastos en Mercury\n   → Ej: si gastas $300/mes en herramientas, dejás $600 siempre\n\n📊 El resto → queda en Mercury para crecer o invertir en el negocio\n\nTratalo como una nómina. Vos sos el empleado de tu empresa. Tu empresa te paga en fechas fijas.'
    },
  ],
}

// ─────────────────────────────────────────────
// MÓDULO 5 — PRIMEROS CLIENTES
// ─────────────────────────────────────────────
export const MODULE_5_CONTENT: ModuleLessonContent = {

  'leccion-5-2': [
    { type: 'heading', level: 2, content: 'Por qué tu email cae en spam (y cómo evitarlo)' },
    { type: 'paragraph', content: 'Antes de escribir un solo email, necesitás entender cómo funcionan los filtros de spam. Si los ignorás, todo tu trabajo va a ser invisible.' },
    {
      type: 'callout',
      variant: 'info',
      content: 'Los filtros evalúan 3 cosas:\n\n1. ¿Quién manda este email? ¿Dominio nuevo sin historial, o cuenta establecida?\n2. ¿Está bien configurado? ¿Tiene SPF, DKIM y DMARC?\n3. ¿Cómo se comporta? ¿Manda 500 emails el primer día como robot, o gradualmente como persona real?'
    },
    {
      type: 'tool_card',
      tool: {
        name: 'Instantly.ai',
        url: 'https://instantly.ai',
        price: '$30-97/mes según plan',
        why: 'Todo en uno: comprar dominios, crear emails, hacer warmup automático, y lanzar campañas. Evita tener que usar 4 herramientas distintas. Es lo que uso para todo mi outreach.',
        icon: '📧'
      }
    },
    { type: 'heading', level: 2, content: 'Setup paso a paso' },
    {
      type: 'timeline',
      steps: [
        { step: 'Paso 1', title: 'Comprar dominios secundarios', detail: 'NUNCA uses tu dominio principal para cold email. Comprá 3-5 dominios secundarios (ej: si tenés freedomai.com, comprá getfreedomai.com, tryfreedomai.com, meetfreedomai.com). Cuesta ~$10-15 cada uno.' },
        { step: 'Paso 2', title: 'Crear cuentas de email', detail: 'Por cada dominio, creá 1-2 cuentas con nombres reales: jose@getfreedomai.com, maria@tryfreedomai.com. NUNCA info@, sales@, o contact@ — los filtros los detectan.' },
        { step: 'Paso 3', title: 'Verificar autenticación', detail: 'Verificá que SPF, DKIM y DMARC estén en VERDE en Instantly. Sin esto, vas directo a spam aunque tu mensaje sea perfecto. Instantly los configura automáticamente.' },
        { step: 'Paso 4', title: 'Activar warmup', detail: 'Instantly simula conversaciones reales entre tus cuentas. Empezá con 10-20 emails/día e incrementá gradualmente. Durá MÍNIMO 2 semanas antes de mandar campañas.' },
      ]
    },
    {
      type: 'warning',
      content: 'Las 2 semanas de warmup son innegociables. Sé que querés empezar ya. Pero si mandás emails desde cuentas frías, quemás los dominios y empezás de cero. 2 semanas de preparación = meses de campañas funcionando.'
    },
  ],

  'leccion-5-3': [
    { type: 'heading', level: 2, content: 'Cómo construir tu lista de prospectos' },
    {
      type: 'tool_card',
      tool: {
        name: 'Apollo.io',
        url: 'https://apollo.io',
        price: 'Plan gratuito disponible / Pagos desde $49/mes',
        why: 'Base de datos con millones de contactos de negocios. Filtrás por industria, cargo, ubicación, tamaño de empresa y obtenés el email verificado de decisores reales.',
        icon: '🔍'
      }
    },
    {
      type: 'tool_card',
      tool: {
        name: 'MillionVerifier',
        url: 'https://millionverifier.com',
        price: '~$10 por cada 10,000 emails verificados',
        why: 'Verifica si cada email de tu lista existe y está activo. Sin esto, tu tasa de rebote sube y quemás los dominios. Es el paso que más gente se salta y después se arrepiente.',
        icon: '✅'
      }
    },
    { type: 'heading', level: 2, content: 'El proceso de construcción de lista' },
    {
      type: 'timeline',
      steps: [
        { step: '1', title: 'Configurar filtros en Apollo', detail: 'Usá tu Ficha de Cliente Ideal. Título: "Owner" o "Founder". Industria: la tuya. Ubicación: ciudades target en USA. Tamaño: 1-50 empleados.' },
        { step: '2', title: 'Revisar resultados', detail: 'Scrolleá los primeros 50-100 resultados. ¿Se ven como tu cliente ideal? ¿Los títulos son correctos? Si no, ajustá los filtros antes de exportar.' },
        { step: '3', title: 'Exportar 2,500 contactos', detail: 'No más, no menos para empezar. Es suficiente para probar tu mensaje sin quemar toda tu munición si necesitás ajustes.' },
        { step: '4', title: 'Verificar en MillionVerifier', detail: 'Subí el CSV. Quedate SOLO con los marcados como "Good" o "Valid". Vas a perder 10-20% de contactos, pero es mejor 2,000 buenos que 2,500 con rebotes.' },
        { step: '5', title: 'Dividir en batches de 500', detail: 'Batch 1: Restaurantes Miami. Batch 2: Restaurantes Houston. Así podés ver qué ciudad responde mejor y ajustar sin perder toda la lista.' },
      ]
    },
    {
      type: 'callout',
      variant: 'brand',
      content: 'Ley de oro de las listas: 500 emails mandados a las personas correctas generan más clientes que 5,000 emails mandados sin criterio. La precisión siempre gana sobre el volumen.'
    },
  ],

  'leccion-5-4': [
    { type: 'heading', level: 2, content: 'Los 5 principios del cold email que funciona' },
    {
      type: 'number_breakdown',
      numbers: [
        { num: '1', label: 'Parecé persona, no empresa', detail: 'Texto plano. Sin logos, colores, imágenes, ni firmas elaboradas. Un email que cualquier persona normal mandaría desde Gmail. Los filtros odian el HTML de marketing.' },
        { num: '2', label: 'El asunto es todo', detail: 'Corto, específico, personal. "pregunta rápida" > "¡Oferta especial de marketing digital!". Si tu asunto parece que lo escribió un departamento de marketing, reescribílo.' },
        { num: '3', label: 'Primera línea habla de ELLOS', detail: '"Hola, soy Jose Angel y ofrecemos..." → basura. "Vi que tu restaurante tiene pocas reseñas en Google..." → abre conversación. Demostrá que los investigaste.' },
        { num: '4', label: 'Un email, un objetivo', detail: 'Tu cold email no cierra ventas. Solo abre puertas. Una sola acción: ¿están abiertos a conversar? Nada más. No PDFs, no propuestas, no precios.' },
        { num: '5', label: 'CTA de bajo compromiso', detail: '"¿Estarías abierto a una conversación rápida de 15 minutos?" > "Agendá una llamada de 45 minutos para presentación completa". Menos compromiso = más respuestas.' },
      ]
    },
    { type: 'heading', level: 2, content: 'Framework 1: El email de observación' },
    {
      type: 'example',
      content: 'Asunto: {{firstName}}, algo que noté sobre {{companyName}}\n\nHola {{firstName}},\n\nEstaba revisando {{companyName}} y noté que [observación específica: pocas reseñas en Google / perfil de Instagram sin actividad reciente / página web sin versión móvil].\n\nTrabajo con [tipo de negocio] en [ciudad/contexto] y les ayudo a [resultado específico].\n\n¿Estarías abierto a que te cuente cómo funciona? Sin compromiso, solo una conversación rápida.\n\n[Tu nombre]\n\n───────────────────────────────\n¿Por qué funciona?\n• La observación específica prueba que no es spam masivo\n• El resultado habla de lo que quieren, no de lo que vendés\n• El CTA es de mínimo compromiso: solo una conversación'
    },
    { type: 'heading', level: 2, content: 'Framework 2: El email directo' },
    {
      type: 'example',
      content: 'Asunto: idea para {{companyName}}\n\nHola {{firstName}},\n\nTrabajo con [tipo de negocio] en [ciudad] que tienen [problema específico].\n\nLes ayudo a [resultado concreto] usando [método en una frase].\n\n¿Te interesa saber cómo funciona?\n\n[Tu nombre]\n\n───────────────────────────────\n¿Cuándo usar cada uno?\n\n• Email de Observación → listas de menos de 500, cuando podés dedicar 30 seg a mirar cada negocio\n• Email Directo → listas grandes, cuando necesitás escalar. Compensá con dolor muy específico'
    },
    { type: 'heading', level: 2, content: 'Errores que matan tus emails' },
    {
      type: 'checklist_inline',
      items: [
        'Párrafos largos — tu email completo debería tener 50-100 palabras máximo',
        'Lenguaje corporativo — "Me dirijo a usted para presentarle nuestra propuesta de valor" → no',
        'Adjuntos en el primer email — los filtros los detectan y van a spam',
        'Negritas, colores, HTML — parecé persona, no newsletter',
        'Empezar con "Estimado señor" — empezá con "Hola {{firstName}}"',
        'Pedir demasiado en el primer contacto — agenda de 45 min, propuesta completa, etc.',
      ]
    },
  ],
}

// ─────────────────────────────────────────────
// MAPA: slug de módulo → contenido
// ─────────────────────────────────────────────
export const LESSON_CONTENT_MAP: Record<string, ModuleLessonContent> = {
  'modulo-1-mentalidad': MODULE_1_CONTENT,
  'modulo-2-nicho': MODULE_2_CONTENT,
  'modulo-3-oferta': MODULE_3_CONTENT,
  'modulo-4-incorporacion': MODULE_4_CONTENT,
  'modulo-5-clientes': MODULE_5_CONTENT,
}
