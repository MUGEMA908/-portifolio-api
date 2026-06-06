import { useEffect, useRef } from 'react'
import { projects } from '../data/portfolio'

const API = 'https://portifolio-api-epr5.onrender.com'

const thumbBg = {
  green: 'bg-gradient-to-br from-[#071f12] via-[#0a3820] to-[#04120a]',
  blue:  'bg-gradient-to-br from-[#07101f] via-[#0a1f38] to-[#040c12]',
  amber: 'bg-gradient-to-br from-[#1f1207] via-[#381f0a] to-[#120804]',
}

const tagStyle = {
  green: 'bg-[rgba(0,229,160,0.13)] text-green-DEFAULT border border-[rgba(0,229,160,0.25)]',
  blue:  'bg-[rgba(121,192,255,0.13)] text-[#79c0ff] border border-[rgba(121,192,255,0.25)]',
  amber: 'bg-[rgba(251,191,36,0.13)] text-[#fbbf24] border border-[rgba(251,191,36,0.25)]',
}

const track = (endpoint, data) => fetch(`${API}${endpoint}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}).catch(() => {})

export default function Projects({ theme, onCaseStudy }) {
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

  return (
    <section id="projects" ref={sectionRef}
      className={`py-28 relative z-10 ${dark ? 'text-dark-text' : 'text-light-text'}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <div className="mb-14 reveal">
          <div className={`flex items-center gap-3 font-display text-[0.66rem] uppercase tracking-[0.22em] text-green-DEFAULT mb-3`}>
            <span className="w-7 h-px bg-green-DEFAULT opacity-60" />
            My Work
          </div>
          <h2 className="font-display font-bold text-[clamp(1.8rem,4vw,2.8rem)] tracking-[0.03em]">Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={p.key}
              style={{ animationDelay: `${i * 0.1}s` }}
              className={`reveal rounded-2xl overflow-hidden border transition-all duration-300
                hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(0,229,160,0.06)]
                ${dark
                  ? 'bg-dark-surface border-dark-border hover:border-[rgba(0,229,160,0.35)]'
                  : 'bg-light-surface border-light-border hover:border-[rgba(0,150,90,0.35)] shadow-sm'}`}>

              <div className={`h-[175px] flex items-center justify-center text-5xl relative ${thumbBg[p.tagType]}`}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
                <span className="relative z-10">{p.emoji}</span>
                <span className={`absolute top-3.5 left-3.5 font-display text-[0.62rem] uppercase tracking-[0.1em]
                  px-3 py-1 rounded-full ${tagStyle[p.tagType]}`}>
                  {p.tag}
                </span>
                {p.featured && (
                  <span className="absolute top-3.5 right-3.5 font-display text-[0.6rem] uppercase tracking-[0.1em]
                    bg-green-DEFAULT text-[#060a08] font-bold px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-display font-semibold text-[1.02rem] tracking-[0.04em] mb-2">{p.title}</h3>
                <p className={`font-body font-light text-[0.9rem] leading-[1.75] mb-4
                  ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{p.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.pills.map(pill => (
                    <span key={pill} className={`font-display text-[0.6rem] uppercase tracking-[0.08em]
                      px-2.5 py-1 rounded-md border
                      ${dark
                        ? 'text-dark-muted bg-dark-surface2 border-dark-border'
                        : 'text-light-muted bg-light-surface2 border-light-border'}`}>
                      {pill}
                    </span>
                  ))}
                </div>

                <div className={`flex gap-2.5 pt-4 border-t ${dark ? 'border-dark-border' : 'border-light-border'}`}>
                  <button onClick={() => { track('/api/track/project-view', { project: p.key }); onCaseStudy(p.key) }}
                    className="inline-flex items-center gap-1.5 font-display text-[0.65rem] uppercase tracking-[0.1em]
                      bg-green-DEFAULT text-[#060a08] font-bold px-4 py-2 rounded-lg
                      transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#11ffb8]
                      hover:shadow-[0_6px_18px_rgba(0,229,160,0.35)] cursor-pointer">
                    🔍 Case Study
                  </button>
                  <a href={p.github} target="_blank" rel="noopener"
                    onClick={() => track('/api/track/github-click', { project: p.key })}
                    className={`inline-flex items-center gap-1.5 font-display text-[0.62rem] uppercase tracking-[0.08em]
                      px-4 py-2 rounded-lg border transition-all duration-200 hover:-translate-y-0.5 text-green-DEFAULT
                      ${dark ? 'border-dark-border hover:bg-green-dim hover:border-green-border' : 'border-light-border hover:bg-[rgba(0,200,130,0.08)] hover:border-[rgba(0,150,90,0.35)]'}`}>
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
