'use client'

import { useState, useEffect } from 'react'
import { X, CheckCircle2, XCircle, Trophy, RotateCcw, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase'

interface Question {
  id: string; order_index: number; question_text: string; question_type: string;
  explanation: string | null;
  quiz_options: Array<{ id: string; order_index: number; option_text: string; is_correct: boolean }>
}

interface Props { quizId: string; lessonId: string; userId: string; passScore: number; onClose: () => void }

type Phase = 'loading' | 'quiz' | 'results'

export default function QuizModal({ quizId, lessonId, userId, passScore, onClose }: Props) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [phase, setPhase] = useState<Phase>('loading')
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<Record<string, string>>({})
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [startTime] = useState(Date.now())

  useEffect(() => {
    async function fetchQuiz() {
      const supabase = createClient()
      const { data } = await supabase.from('quiz_questions').select('*, quiz_options(*)').eq('quiz_id', quizId).order('order_index')
      if (data) { setQuestions(data as Question[]); setPhase('quiz') }
    }
    fetchQuiz()
  }, [quizId])

  const question = questions[currentQ]
  const selectedOption = selected[question?.id]
  const isLast = currentQ === questions.length - 1

  function selectOption(optionId: string) { if (!revealed) setSelected(prev => ({ ...prev, [question.id]: optionId })) }

  function checkAnswer() {
    if (!selectedOption) { toast.error('Seleccioná una respuesta primero.'); return }
    setRevealed(true)
  }

  function nextQuestion() {
    if (isLast) finishQuiz()
    else { setCurrentQ(p => p + 1); setRevealed(false) }
  }

  async function finishQuiz() {
    const correct = questions.filter(q => q.quiz_options.find(o => o.id === selected[q.id])?.is_correct).length
    const finalScore = Math.round((correct / questions.length) * 100)
    const passed = finalScore >= passScore
    setScore(finalScore); setPhase('results')
    const supabase = createClient()
    await supabase.from('quiz_results').insert({ user_id: userId, quiz_id: quizId, lesson_id: lessonId, score: finalScore, passed, answers: selected, time_secs: Math.round((Date.now() - startTime) / 1000) })
    if (passed) toast.success(`¡Aprobaste con ${finalScore}%!`)
  }

  const chosenOption = question?.quiz_options.find(o => o.id === selectedOption)
  const isCorrect = chosenOption?.is_correct
  const progPct = questions.length > 0 ? ((currentQ + (revealed ? 1 : 0)) / questions.length) * 100 : 0

  const M: React.CSSProperties = { position:'fixed', inset:0, zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px' }
  const overlay: React.CSSProperties = { position:'absolute', inset:0, background:'rgba(0,0,0,0.35)' }
  const modal: React.CSSProperties = { position:'relative', background:'var(--bg)', border:'1px solid var(--border-2)', borderRadius:'4px', width:'100%', maxWidth:'520px', maxHeight:'90vh', overflowY:'auto' }

  return (
    <div style={M}>
      <div style={overlay} onClick={onClose} />
      <div style={modal}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 24px', borderBottom:'1px solid var(--border)' }}>
          <div>
            <h2 style={{ fontFamily:'var(--font-mono)', fontSize:'14px', fontWeight:700, color:'var(--text-1)' }}>Pop-quiz</h2>
            {phase === 'quiz' && (
              <p style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--text-5)', marginTop:'2px', letterSpacing:'0.04em' }}>
                Pregunta {currentQ + 1} de {questions.length}
              </p>
            )}
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-3)', padding:'4px', borderRadius:'4px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Progress */}
        {phase === 'quiz' && questions.length > 0 && (
          <div style={{ height:'2px', background:'var(--bg-2)', margin:'0 24px' }}>
            <div style={{ height:'100%', background:'var(--text-1)', width:`${progPct}%`, transition:'width 0.4s ease' }} />
          </div>
        )}

        {/* Loading */}
        {phase === 'loading' && (
          <div style={{ padding:'48px', textAlign:'center' }}>
            <div style={{ width:'24px', height:'24px', border:'2px solid var(--bg-3)', borderTopColor:'var(--text-1)', borderRadius:'50%', animation:'spin 0.7s linear infinite', margin:'0 auto 16px' }} />
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--text-4)' }}>Cargando preguntas...</p>
          </div>
        )}

        {/* Quiz */}
        {phase === 'quiz' && question && (
          <div style={{ padding:'24px' }}>
            <h3 style={{ fontFamily:'var(--font-mono)', fontSize:'16px', fontWeight:700, color:'var(--text-1)', marginBottom:'24px', lineHeight:1.3, letterSpacing:'-0.015em' }}>
              {question.question_text}
            </h3>

            <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginBottom:'20px' }}>
              {question.quiz_options.sort((a,b) => a.order_index - b.order_index).map(option => {
                let bg = 'var(--bg)'; let border = 'var(--border-2)'; let color = 'var(--text-1)'
                if (revealed) {
                  if (option.is_correct) { bg = 'var(--green-lt)'; border = 'rgba(45,122,58,0.3)' }
                  else if (option.id === selectedOption) { bg = '#fef2f2'; border = '#fca5a5' }
                } else if (option.id === selectedOption) { border = 'var(--text-1)' }

                return (
                  <button key={option.id} onClick={() => selectOption(option.id)}
                    style={{ display:'flex', alignItems:'center', gap:'12px', padding:'12px 16px', borderRadius:'4px', border:`1px solid ${border}`, background:bg, cursor:revealed?'default':'pointer', textAlign:'left', width:'100%', transition:'all 0.15s' }}>
                    <div style={{ width:'18px', height:'18px', borderRadius:'50%', border:`2px solid ${revealed && option.is_correct ? 'var(--green)' : revealed && option.id===selectedOption && !option.is_correct ? '#dc2626' : option.id===selectedOption ? 'var(--text-1)' : 'var(--border-2)'}`, background: revealed && option.is_correct ? 'var(--green)' : revealed && option.id===selectedOption && !option.is_correct ? '#dc2626' : option.id===selectedOption && !revealed ? 'var(--text-1)' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.15s' }}>
                      {revealed && option.is_correct && <span style={{ color:'#fff', fontSize:'10px', fontWeight:700 }}>✓</span>}
                      {revealed && option.id===selectedOption && !option.is_correct && <span style={{ color:'#fff', fontSize:'10px', fontWeight:700 }}>✕</span>}
                      {!revealed && option.id===selectedOption && <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--bg)' }} />}
                    </div>
                    <span style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'var(--text-1)', lineHeight:1.5 }}>{option.option_text}</span>
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {revealed && question.explanation && (
              <div style={{ padding:'14px 16px', background:isCorrect?'var(--green-lt)':'#fef2f2', border:`1px solid ${isCorrect?'rgba(45,122,58,0.2)':'#fca5a5'}`, borderRadius:'4px', display:'flex', alignItems:'flex-start', gap:'10px', marginBottom:'20px' }}>
                {isCorrect ? <CheckCircle2 size={16} style={{ color:'var(--green)', flexShrink:0, marginTop:'2px' }} /> : <XCircle size={16} style={{ color:'#dc2626', flexShrink:0, marginTop:'2px' }} />}
                <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', lineHeight:1.55, color:isCorrect?'var(--green)':'#991b1b' }}>
                  <strong>{isCorrect ? '¡Correcto! ' : 'Incorrecto. '}</strong>{question.explanation}
                </p>
              </div>
            )}

            {!revealed
              ? <button onClick={checkAnswer} className="btn-primary" style={{ width:'100%', justifyContent:'center', padding:'13px' }}>Verificar respuesta</button>
              : <button onClick={nextQuestion} className="btn-primary" style={{ width:'100%', justifyContent:'center', padding:'13px' }}>
                  {isLast ? 'Ver resultados' : 'Siguiente'} <ChevronRight size={15} />
                </button>
            }
          </div>
        )}

        {/* Results */}
        {phase === 'results' && (
          <div style={{ padding:'40px 32px', textAlign:'center' }}>
            <div style={{ width:'72px', height:'72px', borderRadius:'50%', background:score>=passScore?'var(--green-lt)':'var(--bg-2)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
              {score >= passScore ? <Trophy size={32} style={{ color:'var(--green)' }} /> : <span style={{ fontSize:'32px' }}>📚</span>}
            </div>

            <h2 style={{ fontFamily:'var(--font-mono)', fontSize:'28px', fontWeight:700, color:'var(--text-1)', letterSpacing:'-0.025em', marginBottom:'8px' }}>
              {score >= passScore ? '¡Aprobaste!' : 'Casi lo lográs'}
            </h2>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'var(--text-3)', marginBottom:'32px' }}>
              {score >= passScore ? `Tu puntaje de ${score}% supera el mínimo de ${passScore}%.` : `Obtuviste ${score}%. Necesitás ${passScore}% para aprobar.`}
            </p>

            <div style={{ position:'relative', width:'112px', height:'112px', margin:'0 auto 32px' }}>
              <svg viewBox="0 0 120 120" style={{ width:'100%', height:'100%', transform:'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--bg-2)" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke={score>=passScore?'var(--green)':'var(--gold)'} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(score/100)*314} 314`} style={{ transition:'stroke-dasharray 1s ease' }} />
              </svg>
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'24px', fontWeight:700, color:'var(--text-1)' }}>{score}%</span>
              </div>
            </div>

            <div style={{ display:'flex', gap:'10px' }}>
              {score < passScore && (
                <button onClick={() => { setCurrentQ(0); setSelected({}); setRevealed(false); setPhase('quiz') }}
                  className="btn-secondary" style={{ flex:1, justifyContent:'center' }}>
                  <RotateCcw size={14} /> Reintentar
                </button>
              )}
              <button onClick={onClose} className="btn-primary" style={{ flex:1, justifyContent:'center' }}>
                {score >= passScore ? 'Continuar' : 'Volver'} <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
