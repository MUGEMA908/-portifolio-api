import { heroSkills, stats } from '../data/portfolio'

export default function Hero({ theme }) {
  const dark = theme === 'dark'

  return (
    <section id="home" className={`min-h-screen flex items-center relative z-10
      px-6 md:px-12 pt-24 pb-20
      ${dark ? 'text-dark-text' : 'text-light-text'}`}>

      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 left-0 w-[60%] h-[60%] rounded-full blur-[120px] opacity-30
          ${dark ? 'bg-[rgba(0,229,160,0.06)]' : 'bg-[rgba(0,180,110,0.08)]'}`} />
        <div className={`absolute bottom-0 right-0 w-[50%] h-[50%] rounded-full blur-[120px] opacity-20
          ${dark ? 'bg-[rgba(121,192,255,0.06)]' : 'bg-[rgba(0,150,200,0.06)]'}`} />
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-20 items-center">

        {/* Content */}
        <div>
          {/* Tag */}
          <div className={`inline-flex items-center gap-2.5 font-display text-[0.68rem] uppercase tracking-[0.14em]
            text-green-DEFAULT border border-green-border rounded-full px-4 py-1.5 mb-7
            ${dark ? 'bg-green-dim' : 'bg-[rgba(0,200,130,0.08)]'}
            animate-[fadeUp_0.7s_ease_both]`}>
            <span className="w-2 h-2 rounded-full bg-green-DEFAULT shadow-[0_0_10px_#00e5a0] animate-[pulseDot_2.5s_infinite]" />
            Open to opportunities
          </div>

          {/* Name */}
          <h1 className="font-display font-black leading-[1.05] tracking-[0.02em] mb-2
            text-[clamp(2.8rem,6.5vw,5rem)]
            animate-[fadeUp_0.7s_0.1s_ease_both]">
            NIYONSABA<br />
            <span className="text-green-DEFAULT">Eugene</span>
          </h1>

          <p className={`font-body italic text-[clamp(1.1rem,2.2vw,1.35rem)] mb-6 tracking-[0.02em]
            animate-[fadeUp_0.7s_0.2s_ease_both]
            ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
            IT Engineer · Kigali, Rwanda
          </p>

          <p className={`font-body font-light text-[1.02rem] leading-[1.9] max-w-[570px] mb-8
            animate-[fadeUp_0.7s_0.3s_ease_both]
            ${dark ? 'text-[#9ab5aa]' : 'text-[#3a5e52]'}`}>
            Motivated and detail-oriented Information Technology student at Rwanda
            Polytechnic, with practical skills in web development (HTML, CSS, Java)
            and database management (MySQL). Experienced in real-world projects
            including smart agriculture systems and multi-page web applications.
            Passionate about using ICT to create impactful community solutions.
          </p>

          {/* Skill pills */}
          <div className="flex flex-wrap gap-2 mb-9 animate-[fadeUp_0.7s_0.4s_ease_both]">
            {heroSkills.map(s => (
              <span key={s} className={`font-display text-[0.65rem] uppercase tracking-[0.08em]
                text-green-DEFAULT border border-green-border rounded-full px-3.5 py-1
                transition-all duration-200 hover:-translate-y-0.5 cursor-default
                ${dark ? 'bg-green-dim hover:bg-[rgba(0,229,160,0.18)]' : 'bg-[rgba(0,200,130,0.08)] hover:bg-[rgba(0,200,130,0.15)]'}`}>
                {s}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-9 animate-[fadeUp_0.7s_0.5s_ease_both]">
            <a href="#contact"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center gap-2 font-display text-[0.72rem] uppercase tracking-[0.12em]
                bg-green-DEFAULT text-[#060a08] font-bold px-6 py-3 rounded-xl
                shadow-[0_4px_20px_rgba(0,229,160,0.25)]
                transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#11ffb8] hover:shadow-[0_10px_30px_rgba(0,229,160,0.4)] cursor-pointer">
              Get In Touch
            </a>
            <a href="https://github.com/MUGEMA908" target="_blank" rel="noopener"
              className={`inline-flex items-center gap-2 font-display text-[0.72rem] uppercase tracking-[0.12em]
                px-6 py-3 rounded-xl border transition-all duration-200 hover:-translate-y-0.5
                ${dark
                  ? 'border-dark-border text-dark-text hover:border-green-border hover:text-green-DEFAULT hover:bg-green-dim'
                  : 'border-light-border text-light-text hover:border-[rgba(0,150,90,0.4)] hover:text-green-DEFAULT hover:bg-[rgba(0,200,130,0.08)]'}`}>
              GitHub ↗
            </a>
            <a href="#projects"
              onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              className={`inline-flex items-center gap-2 font-display text-[0.72rem] uppercase tracking-[0.12em]
                px-6 py-3 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer
                ${dark
                  ? 'border-dark-border text-dark-text hover:border-green-border hover:text-green-DEFAULT hover:bg-green-dim'
                  : 'border-light-border text-light-text hover:border-[rgba(0,150,90,0.4)] hover:text-green-DEFAULT hover:bg-[rgba(0,200,130,0.08)]'}`}>
              View Projects
            </a>

            {/* CV Download button */}
            <a href="/cv-niyonsaba-eugene.pdf" download
              className={`inline-flex items-center gap-2 font-display text-[0.72rem] uppercase tracking-[0.12em]
                px-6 py-3 rounded-xl border transition-all duration-200 hover:-translate-y-0.5
                border-green-border text-green-DEFAULT hover:bg-green-dim`}>
              ↓ Download CV
            </a>
          </div>

          {/* Stats */}
          <div className={`flex gap-10 pt-7 border-t animate-[fadeUp_0.7s_0.6s_ease_both]
            ${dark ? 'border-dark-border' : 'border-light-border'}`}>
            {stats.map(({ num, lbl }) => (
              <div key={lbl}>
                <div className="font-display text-[2rem] font-bold text-green-DEFAULT leading-none">{num}</div>
                <div className={`font-body text-[0.78rem] mt-1 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div className="flex justify-center lg:justify-end animate-[fadeUp_0.9s_0.25s_ease_both]">
          <div className="relative">
            {/* Spinning conic border */}
            <div className="absolute inset-[-3px] rounded-[22px] z-[-1] opacity-60 spin-slow
              bg-[conic-gradient(from_0deg,#00e5a0,transparent_40%,#79c0ff_60%,transparent_80%,#00e5a0)]" />
            {/* Glow */}
            <div className="absolute inset-[-14px] rounded-[30px] z-[-2]
              bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,160,0.12)_0%,transparent_70%)]
              animate-[breathe_4s_ease-in-out_infinite]" />

            <img
              src="/profile.jpg"
              alt="NIYONSABA Eugene"
              className="w-[230px] h-[290px] md:w-[260px] md:h-[320px] object-cover rounded-[20px]
                border-2 border-[rgba(0,229,160,0.2)] block
                shadow-[0_30px_70px_rgba(0,0,0,0.5),0_0_50px_rgba(0,229,160,0.1)]"
            />

            {/* Corner accents */}
            <div className="absolute top-[-10px] left-[-10px] w-7 h-7 border-t-2 border-l-2 border-green-DEFAULT rounded-tl opacity-50" />
            <div className="absolute bottom-[-10px] right-[-10px] w-7 h-7 border-b-2 border-r-2 border-green-DEFAULT rounded-br opacity-50" />
          </div>
        </div>

      </div>
    </section>
  )
}
