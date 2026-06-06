import { useEffect, useRef } from 'react'
import { aboutCards, skills, timeline } from '../data/portfolio'

export default function About({ theme }) {
  const dark = theme === 'dark'
  const sectionRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.07 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const SectionHead = ({ label, title }) => (
    <div className="mb-12 reveal">
      <div className="flex items-center gap-3 font-display text-[0.66rem] uppercase tracking-[0.22em] text-green-DEFAULT mb-3">
        <span className="w-7 h-px bg-green-DEFAULT opacity-60" />
        {label}
      </div>
      <h2 className="font-display font-bold text-[clamp(1.8rem,4vw,2.8rem)] tracking-[0.03em]">{title}</h2>
    </div>
  )

  return (
    <section id="about" ref={sectionRef}
      className={`py-28 relative z-10
        ${dark
          ? 'bg-gradient-to-b from-transparent via-dark-surface/70 to-transparent text-dark-text'
          : 'bg-gradient-to-b from-transparent via-light-surface/80 to-transparent text-light-text'}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <SectionHead label="Who I Am" title="About Me" />

        {/* About cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {aboutCards.map((c, i) => (
            <div key={c.title} style={{ animationDelay: `${i * 0.08}s` }}
              className={`reveal rounded-2xl p-8 border transition-all duration-300 relative overflow-hidden
                hover:-translate-y-1 group
                before:absolute before:inset-x-0 before:top-0 before:h-px
                before:bg-gradient-to-r before:from-transparent before:via-green-DEFAULT before:to-transparent
                before:opacity-0 before:transition-opacity hover:before:opacity-100
                ${dark
                  ? 'bg-dark-bg border-dark-border hover:border-green-border'
                  : 'bg-light-bg border-light-border hover:border-[rgba(0,150,90,0.35)] shadow-sm'}`}>
              <h3 className="font-display text-[0.85rem] font-semibold text-green-DEFAULT uppercase tracking-[0.12em] mb-3">{c.title}</h3>
              <p className={`font-body font-light text-[0.95rem] leading-[1.8]
                ${dark ? 'text-[#7a9e94]' : 'text-[#3a5e52]'}`}>{c.text}</p>
            </div>
          ))}
        </div>

        <SectionHead label="Expertise" title="Skills & Tools" />

        <div className="mb-20 reveal">
          {Object.entries(skills).map(([group, list]) => (
            <div key={group} className="mb-6">
              <p className={`font-display text-[0.65rem] uppercase tracking-[0.18em] mb-3
                ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
                {group === 'development' ? 'Development' : group === 'database' ? 'Database & Backend' : 'Soft Skills'}
              </p>
              <div className="flex flex-wrap gap-2">
                {list.map(s => (
                  <span key={s} className={`font-display text-[0.62rem] uppercase tracking-[0.08em]
                    text-green-DEFAULT border border-green-border rounded-full px-3.5 py-1
                    transition-all duration-200 hover:-translate-y-0.5 cursor-default
                    ${dark ? 'bg-green-dim' : 'bg-[rgba(0,200,130,0.08)]'}`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <SectionHead label="Journey" title="Education & Experience" />

        <div className="max-w-2xl">
          {timeline.map((item, i) => (
            <div key={i} className="reveal flex gap-6">
              <div className="flex flex-col items-center w-4 shrink-0">
                <div className={`w-3.5 h-3.5 rounded-full border-2 border-green-DEFAULT mt-1 shrink-0
                  shadow-[0_0_12px_rgba(0,229,160,0.4)]
                  ${dark ? 'bg-dark-bg' : 'bg-light-bg'}`} />
                {i < timeline.length - 1 && (
                  <div className="w-px flex-1 my-2 bg-gradient-to-b from-green-border to-transparent min-h-[30px]" />
                )}
              </div>
              <div className="pb-10">
                <h4 className="font-display font-semibold text-[0.95rem] tracking-[0.04em] mb-1">{item.title}</h4>
                <span className="font-display text-[0.68rem] uppercase tracking-[0.08em] text-green-DEFAULT">{item.date}</span>
                <p className={`font-body font-light text-[0.9rem] leading-[1.8] mt-2
                  ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
