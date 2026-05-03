'use client'

import { useState, useEffect, useCallback } from 'react'
import { Save, CheckCircle2, Loader2, ChevronDown } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase'

const WORKBOOK_DEFINITIONS: Record<string, Array<{
  id: string; label: string; hint?: string;
  type: 'text' | 'textarea' | 'number' | 'select';
  placeholder?: string; options?: string[]; section?: string;
}>> = {
  'modulo-1-mentalidad': [
    { id: 'libertad_descripcion', section: 'Mi Definición de Libertad', type: 'textarea', label: '¿Qué haría con mi tiempo si el dinero no fuera problema?', placeholder: 'Ej: Pasar las tardes con mis hijos sin revisar el teléfono. Trabajar 4-5 horas al día...', hint: 'Sé específico. No lo que suena bonito, lo que de verdad querés.' },
    { id: 'meta_mensual_usd', type: 'number', label: '¿Cuánto dinero necesito al mes para vivir sin estrés? (USD)', placeholder: '3000', hint: 'El número real. Incluye renta, comida, servicios, deudas, y un margen para respirar.' },
    { id: 'para_que_libertad', type: 'textarea', label: '¿Para qué querés esa libertad?', placeholder: 'Ej: Para estar presente con mi familia. Para dejar de sobrevivir y empezar a construir...' },
    { id: 'tiene_habilidad', section: 'Inventario de Realidad', type: 'select', label: '¿Tenés una habilidad que alguien pagaría por usar?', options: ['Sí, tengo una habilidad clara', 'No estoy seguro/a', 'No, y necesito encontrar una'] },
    { id: 'habilidad', type: 'text', label: 'Si la tenés, ¿cuál es?', placeholder: 'Ej: Diseño gráfico, manejo de redes sociales, escritura...' },
    { id: 'horas_disponibles', type: 'select', label: '¿Cuántas horas al día podés dedicar a esto?', options: ['1-2 horas', '2-3 horas', '4+ horas'] },
    { id: 'tiene_inversion', type: 'select', label: '¿Tenés $200-500 USD para invertir en tu empresa?', options: ['Sí, los tengo ahora', 'No, pero puedo reunirlos', 'No sé cómo conseguirlos'] },
    { id: 'meta_90_dias_usd', section: 'Mi Meta de 90 Días', type: 'number', label: 'Mi meta de ingresos en 90 días (USD)', placeholder: '3000', hint: 'Arrancando de cero: $1,000-$3,000. Con habilidades: $3,000-$5,000. Ya vendés algo: $5,000-$10,000' },
    { id: 'por_que_no_puedo_seguir', type: 'textarea', label: '¿Por qué no podés seguir como estás?', placeholder: 'Sé honesto/a. Esta es tu razón más importante.' },
    { id: 'compromiso', type: 'textarea', label: 'Mi compromiso en una frase', placeholder: 'Ej: Voy a construir esto porque mi familia merece más de lo que les puedo dar hoy. Y yo también.' },
  ],
  'modulo-2-nicho': [
    { id: 'resumen_icp', section: 'Mi Cliente Ideal', type: 'textarea', label: 'Describí a tu cliente ideal en 1-2 frases específicas', placeholder: 'Ej: Dentistas hispanos en ciudades medianas de USA que abrieron su consultorio hace menos de 2 años...', hint: 'Tiene que ser tan específico que si alguien lo lee, sepa exactamente de quién hablás.' },
    { id: 'industria', type: 'text', label: 'Industria o nicho (solo uno)', placeholder: 'Ej: Restaurantes hispanos en USA / Clínicas dentales / Coaches de fitness online' },
    { id: 'dolor_1', section: 'Sus Dolores', type: 'textarea', label: 'Dolor principal', placeholder: 'En las palabras de tu cliente, como si se estuviera desahogando con un amigo a las 11 de la noche...' },
    { id: 'dolor_2', type: 'textarea', label: 'Segundo dolor', placeholder: 'Otro problema que siente esta persona...' },
    { id: 'resultado_deseado', section: 'Su Resultado', type: 'textarea', label: '¿Qué quiere más que nada?', placeholder: 'Ej: Ver la sala de espera llena y dejar de preocuparse por si va a poder pagar la renta del local.' },
    { id: 'urgencia', type: 'textarea', label: '¿Por qué necesita resolverlo ahora y no en 6 meses?', placeholder: 'Ej: Está perdiendo dinero cada mes / Se le acerca una temporada importante...' },
    { id: 'plataforma_1', section: 'Dónde lo Encontrás', type: 'text', label: 'Plataforma principal', placeholder: 'Ej: Google Maps — Buscando restaurantes hispanos en Miami' },
    { id: 'plataforma_2', type: 'text', label: 'Plataforma secundaria', placeholder: 'Ej: LinkedIn — Business owner + industria' },
    { id: 'icp_alcanzable', type: 'select', label: '¿Puedo encontrar a esta persona mañana en al menos una plataforma?', options: ['Sí, ya lo busqué y aparecen resultados', 'No estoy seguro/a', 'No, necesito ajustar mi ICP'] },
  ],
  'modulo-3-oferta': [
    { id: 'para_quien', section: 'Mi Oferta Completa', type: 'textarea', label: '¿Para quién es?', placeholder: 'Ej: Dueños de restaurantes hispanos en USA que llevan menos de 2 años operando y tienen mesas vacías.' },
    { id: 'problema', type: 'textarea', label: 'El problema que resolvés', placeholder: 'En las palabras del cliente. Como si él lo dijera...' },
    { id: 'resultado', type: 'textarea', label: 'El resultado que prometés', placeholder: 'No lo que hacés. Lo que el cliente obtiene. Específico y medible.' },
    { id: 'frase_oferta', section: 'Tu Frase de Oferta', type: 'text', label: '"Yo ayudo a ___ a lograr ___ sin ___"', placeholder: 'Ayudo a restaurantes hispanos en USA a llenar mesas entre semana sin depender del boca a boca...' },
    { id: 'precio_lanzamiento', section: 'Precio', type: 'number', label: 'Precio de lanzamiento (USD)', placeholder: '1000', hint: 'Para tus primeros 2-3 clientes. Después sube.' },
    { id: 'precio_regular', type: 'number', label: 'Precio regular (USD)', placeholder: '1500' },
    { id: 'objecion_1', section: 'Objeciones Resueltas', type: 'textarea', label: 'Primera objeción y tu respuesta', placeholder: 'Objeción: "Es muy caro". Respuesta: "Si te genera 5 clientes nuevos a $500 cada uno..."' },
    { id: 'objecion_2', type: 'textarea', label: 'Segunda objeción y tu respuesta', placeholder: '"No tengo tiempo". Respuesta: "No necesitás tiempo, yo me encargo de todo..."' },
  ],
  'modulo-4-incorporacion': [
    { id: 'estado_llc', section: 'Mi LLC', type: 'select', label: '¿En qué estado está tu proceso de incorporación?', options: ['No empecé todavía', 'Investigando opciones', 'En proceso de registro', 'LLC registrada ✓'] },
    { id: 'nombre_empresa', type: 'text', label: 'Nombre de tu empresa (LLC)', placeholder: 'Ej: Marketing Solutions LLC' },
    { id: 'estado_registro', type: 'select', label: 'Estado de registro', options: ['Florida', 'Wyoming', 'Delaware', 'Texas', 'Otro'] },
    { id: 'ein', section: 'Documentos', type: 'select', label: '¿Ya tenés tu EIN (Tax ID)?', options: ['Sí, ya lo tengo', 'En proceso', 'Todavía no'] },
    { id: 'cuenta_bancaria', type: 'select', label: '¿Ya abriste tu cuenta bancaria en USA?', options: ['Sí, en Relay/Mercury', 'Sí, en otro banco', 'En proceso', 'Todavía no'] },
    { id: 'stripe', type: 'select', label: '¿Ya configuraste Stripe?', options: ['Sí, está activo', 'En proceso de verificación', 'Todavía no'] },
    { id: 'notas_proceso', section: 'Notas', type: 'textarea', label: 'Notas del proceso / bloqueadores', placeholder: 'Ej: Esperando el EIN, la aplicación tardó 3 semanas...' },
  ],
  'modulo-5-clientes': [
    { id: 'lista_prospectos', section: 'Mi Lista de Prospectos', type: 'number', label: '¿Cuántos prospectos tenés en tu lista ahora?', placeholder: '0' },
    { id: 'fuente_lista', type: 'select', label: '¿De dónde sacás tus prospectos?', options: ['Google Maps', 'LinkedIn Sales Navigator', 'Apollo.io', 'Búsqueda manual', 'Combinación de varias'] },
    { id: 'asunto_email', section: 'Mi Script de Cold Email', type: 'text', label: 'Asunto de tu primer email', placeholder: 'Ej: Pregunta rápida sobre [nombre restaurante]' },
    { id: 'primer_email', type: 'textarea', label: 'Cuerpo del primer email (máx 5 oraciones)', placeholder: 'Hola [Nombre], vi que tenés [negocio] en [ciudad]...' },
    { id: 'followup_1', type: 'textarea', label: 'Follow-up #1 (3 días después)', placeholder: 'Hola de nuevo, [nombre]. Quería asegurarme que viste mi email anterior...' },
    { id: 'emails_enviados', section: 'Tracking', type: 'number', label: '¿Cuántos emails enviaste esta semana?', placeholder: '0' },
    { id: 'respuestas', type: 'number', label: '¿Cuántas respuestas recibiste?', placeholder: '0' },
    { id: 'llamadas_agendadas', type: 'number', label: '¿Cuántas llamadas agendaste?', placeholder: '0' },
  ],
  'modulo-6-delivery': [
    { id: 'onboarding_doc', section: 'Proceso de Onboarding', type: 'select', label: '¿Tenés un documento de onboarding para clientes?', options: ['Sí, está listo', 'En construcción', 'Todavía no'] },
    { id: 'contrato', type: 'select', label: '¿Tenés tu contrato de servicio listo?', options: ['Sí, revisado por un abogado', 'Sí, template propio', 'En proceso', 'Todavía no'] },
    { id: 'herramientas', type: 'textarea', label: 'Herramientas que usás para entregar el servicio', placeholder: 'Ej: Notion para reportes, Slack para comunicación, Loom para videos...' },
    { id: 'primer_cliente', section: 'Mi Primer Cliente', type: 'text', label: 'Nombre del primer cliente (o prospecto más avanzado)', placeholder: 'Ej: Restaurante El Rincón / Juan García' },
    { id: 'resultado_comprometido', type: 'textarea', label: '¿Qué resultado le prometiste?', placeholder: 'Ej: 20 leads calificados en 30 días...' },
    { id: 'semanas_entrega', type: 'number', label: '¿En cuántas semanas vas a entregar?', placeholder: '4' },
    { id: 'blockers', section: 'Bloqueadores', type: 'textarea', label: '¿Qué te está frenando?', placeholder: 'Ej: No sé cómo medir los resultados / el cliente no responde...' },
  ],
  'modulo-7-escala': [
    { id: 'mrr_actual', section: 'Mi Situación Actual', type: 'number', label: 'MRR actual (USD/mes)', placeholder: '0', hint: 'Monthly Recurring Revenue — lo que entra fijo cada mes.' },
    { id: 'clientes_activos', type: 'number', label: '¿Cuántos clientes activos tenés?', placeholder: '0' },
    { id: 'precio_promedio', type: 'number', label: 'Precio promedio por cliente (USD)', placeholder: '0' },
    { id: 'meta_mrr_6m', section: 'Mi Meta de Escala', type: 'number', label: 'MRR que quiero tener en 6 meses (USD)', placeholder: '10000' },
    { id: 'palanca_escala', type: 'select', label: '¿Cuál es tu principal palanca de escala?', options: ['Subir precios', 'Conseguir más clientes', 'Contratar equipo', 'Automatizar procesos', 'Todas las anteriores'] },
    { id: 'primer_hire', type: 'textarea', label: '¿Cuál sería tu primera contratación?', placeholder: 'Ej: Un VA para manejo de redes / Un copywriter para los emails...' },
    { id: 'sistema_ventas', section: 'Sistema de Ventas', type: 'select', label: '¿Tenés un sistema de ventas repetible?', options: ['Sí, funciona solo', 'Parcialmente', 'Todavía no'] },
    { id: 'cac', type: 'number', label: 'Costo de adquisición por cliente (USD)', placeholder: '0', hint: 'Cuánto te cuesta en tiempo/dinero conseguir un cliente nuevo.' },
  ],
}

interface Props {
  moduleSlug: string
  moduleId: string
  userId: string
  savedData?: Record<string, string>
}

export default function WorkbookPreview({ moduleSlug, moduleId, userId, savedData = {} }: Props) {
  const fields = WORKBOOK_DEFINITIONS[moduleSlug] ?? []
  const [responses, setResponses] = useState<Record<string, string>>(savedData)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  useEffect(() => {
    async function load() {
      if (Object.keys(savedData).length > 0) return
      const supabase = createClient()
      const { data } = await supabase
        .from('workbook_responses')
        .select('responses')
        .eq('user_id', userId)
        .eq('module_id', moduleId)
        .single()
      if (data?.responses) setResponses(data.responses as Record<string, string>)
    }
    load()
  }, [moduleId, userId])

  const save = useCallback(async (complete = false) => {
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase.from('workbook_responses').upsert({
      user_id: userId,
      module_id: moduleId,
      responses,
      is_complete: complete,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,module_id' })
    if (!error) {
      setLastSaved(new Date())
      if (complete) toast.success('¡Workbook completado!')
      else toast.success('Guardado correctamente')
    } else {
      toast.error('Error al guardar. Intentá de nuevo.')
    }
    setSaving(false)
  }, [responses, userId, moduleId])

  useEffect(() => {
    if (Object.keys(responses).length === 0) return
    const t = setInterval(() => save(false), 30000)
    return () => clearInterval(t)
  }, [save, responses])

  function update(id: string, value: string) {
    setResponses(prev => ({ ...prev, [id]: value }))
  }

  if (fields.length === 0) {
    return (
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-4)', textAlign: 'center', padding: '48px 0' }}>
        No hay workbook disponible para este módulo aún.
      </p>
    )
  }

  const sections: Record<string, typeof fields> = {}
  let currentSection = 'General'
  for (const field of fields) {
    if (field.section) currentSection = field.section
    if (!sections[currentSection]) sections[currentSection] = []
    sections[currentSection].push(field)
  }

  const filledCount = fields.filter(f => responses[f.id]?.trim()).length
  const pct = Math.round((filledCount / fields.length) * 100)

  return (
    <div>
      {/* Progress card */}
      <div className="card" style={{ padding: '20px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text-1)' }}>
            Progreso del workbook
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--accent)' }}>
            {pct}%
          </span>
        </div>
        <div className="progress-bar" style={{ marginBottom: '6px' }}>
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-5)' }}>
          {filledCount} de {fields.length} campos completados
          {lastSaved && ` · Guardado ${lastSaved.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}`}
        </p>
      </div>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {Object.entries(sections).map(([sectionTitle, sectionFields]) => (
          <div key={sectionTitle}>
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ height: '1px', flex: 1, background: 'var(--border)' }} />
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', margin: 0 }}>
                {sectionTitle}
              </h3>
              <div style={{ height: '1px', flex: 1, background: 'var(--border)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {sectionFields.map((field) => (
                <div key={field.id} className="card" style={{ padding: '16px' }}>
                  <label className="workbook-label">{field.label}</label>
                  {field.hint && (
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-4)', marginBottom: '8px', lineHeight: 1.5 }}>
                      {field.hint}
                    </p>
                  )}

                  {field.type === 'textarea' && (
                    <textarea
                      value={responses[field.id] ?? ''}
                      onChange={e => update(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      rows={4}
                      className="textarea-base"
                      style={{ minHeight: '100px' }}
                    />
                  )}

                  {field.type === 'text' && (
                    <input
                      type="text"
                      value={responses[field.id] ?? ''}
                      onChange={e => update(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="input-base"
                    />
                  )}

                  {field.type === 'number' && (
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-4)', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
                        $
                      </span>
                      <input
                        type="number"
                        value={responses[field.id] ?? ''}
                        onChange={e => update(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="input-base"
                        style={{ paddingLeft: '28px' }}
                      />
                    </div>
                  )}

                  {field.type === 'select' && field.options && (
                    <div style={{ position: 'relative' }}>
                      <select
                        value={responses[field.id] ?? ''}
                        onChange={e => update(field.id, e.target.value)}
                        className="input-base"
                        style={{ appearance: 'none', paddingRight: '36px', cursor: 'pointer' }}
                      >
                        <option value="">Seleccioná una opción...</option>
                        {field.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <ChevronDown size={15} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-4)', pointerEvents: 'none' }} />
                    </div>
                  )}

                  {responses[field.id]?.trim() && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '8px' }}>
                      <CheckCircle2 size={12} style={{ color: 'var(--green)' }} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--green)' }}>Completado</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <button onClick={() => save(false)} disabled={saving} className="btn-secondary">
          {saving
            ? <Loader2 size={14} style={{ animation: 'spin 0.7s linear infinite' }} />
            : <Save size={14} />
          }
          {saving ? 'Guardando...' : 'Guardar borrador'}
        </button>

        {pct >= 80 && (
          <button onClick={() => save(true)} disabled={saving} className="btn-primary">
            <CheckCircle2 size={14} />
            Completar workbook
          </button>
        )}

        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-5)', marginLeft: 'auto' }}>
          Auto-guardado cada 30 seg
        </span>
      </div>
    </div>
  )
}
