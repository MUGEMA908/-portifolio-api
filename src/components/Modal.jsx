import { useEffect } from 'react'
import { caseStudies } from '../data/portfolio'

export default function Modal({ theme, caseKey, onClose }) {
  const dark  = theme === 'dark'
  const study = caseKey ? caseStudies[caseKey] : null

  useEffect(() => {
    if (!study) return
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [study, onClose])

  if (!study) return null

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6
        bg-[rgba(4,8,6,0.88)] backdrop-blur-xl animate-[fadeUp_0.2s_ease_both]">

      <div className={`relative rounded-[22px] w-full max-w-[740px] max-h-[88vh] overflow-y-auto
        border scrollbar-thin shadow-[0_40px_100px_rgba(0,0,0,0.7)]
        ${dark
          ? 'bg-dark-surface border-dark-border'
          : 'bg-light-surface border-light-border'}`}>

        {/* Header */}
        <div className={`sticky top-0 z-10 flex items-start justify-between gap-4
          px-8 pt-8 pb-6 border-b
          ${dark ? 'bg-dark-surface border-dark-border' : 'bg-light-surface border-light-border'}`}>
          <div>
            <h2 className="font-display font-bold text-[1.3rem] tracking-[0.04em] mb-1">{study.title}</h2>
            <p className={`font-display text-[0.68rem] uppercase tracking-[0.08em]
              ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{study.subtitle}</p>
          </div>
          <button onClick={onClose}
            className={`w-9 h-9 rounded-full flex items-center justify-center border shrink-0 text-[1rem]
              transition-all duration-200 hover:text-green-DEFAULT hover:border-green-border
              ${dark
                ? 'bg-dark-surface2 border-dark-border text-dark-muted hover:bg-green-dim'
                : 'bg-light-surface2 border-light-border text-light-muted hover:bg-[rgba(0,200,130,0.08)]'}`}
            aria-label="Close">✕</button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          {study.sections.map((sec, i) => (
            <div key={i}>
              <div className="font-display text-[0.62rem] uppercase tracking-[0.2em] text-green-DEFAULT mb-2">{sec.label}</div>
              {sec.heading && (
                <h4 className="font-display font-semibold text-[1rem] tracking-[0.03em] mb-3">{sec.heading}</h4>
              )}
              {sec.body && (
                <p className={`font-body font-light text-[0.92rem] leading-[1.85]
                  ${dark ? 'text-[#7a9e94]' : 'text-[#3a5e52]'}`}>{sec.body}</p>
              )}
              {sec.outcomes && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  {sec.outcomes.map(o => (
                    <div key={o.l}
                      className={`rounded-2xl p-5 text-center border transition-all duration-200 hover:-translate-y-1
                        ${dark ? 'bg-dark-surface2 border-dark-border hover:border-green-border' : 'bg-light-surface2 border-light-border hover:border-[rgba(0,150,90,0.35)]'}`}>
                      <div className="font-display font-bold text-[1.7rem] text-green-DEFAULT">{o.n}</div>
                      <div className={`text-[0.72rem] mt-1 leading-snug ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{o.l}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
