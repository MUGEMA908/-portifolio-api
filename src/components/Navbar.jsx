import { useState, useEffect } from 'react'

const links = ['home', 'projects', 'about', 'contact']

export default function Navbar({ theme, toggleTheme }) {
  const [active, setActive]     = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
      const secs = document.querySelectorAll('section[id]')
      let cur = 'home'
      secs.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleAdmin = () => {
    sessionStorage.removeItem('ne_token')
    sessionStorage.removeItem('ne_admin')
    window.location.href = 'https://portifolio-api-1iqy.vercel.app/'
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300
      ${theme === 'dark'
        ? 'bg-dark-bg/90 border-dark-border text-dark-text'
        : 'bg-light-bg/90 border-light-border text-light-text'}
      backdrop-blur-2xl border-b
      ${scrolled ? 'shadow-[0_2px_40px_rgba(0,0,0,0.4)]' : ''}`}>

      <div className="max-w-6xl mx-auto px-6 md:px-12 h-[68px] flex items-center justify-between">

        <button onClick={() => handleNav('home')}
          className="flex items-center gap-3 group cursor-pointer">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300
            group-hover:shadow-[0_0_28px_rgba(0,229,160,0.4)] group-hover:rotate-6
            ${theme === 'dark'
              ? 'bg-gradient-to-br from-[#0f5534] to-[#041208] border-green-border shadow-[0_0_18px_rgba(0,229,160,0.18)]'
              : 'bg-gradient-to-br from-[#d4f5e8] to-[#a8ecd2] border-[rgba(0,150,90,0.35)] shadow-[0_0_18px_rgba(0,150,90,0.15)]'}`}>
            <span className="font-display text-[0.6rem] font-bold text-green-DEFAULT tracking-widest">NE</span>
          </div>
          <span className={`font-display text-[0.85rem] font-semibold tracking-[0.06em] hidden sm:block
            ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>
            NIYONSABA Eugene
          </span>
        </button>

        <ul className="hidden md:flex gap-1 list-none">
          {links.map(id => (
            <li key={id}>
              <button onClick={() => handleNav(id)}
                className={`font-display text-[0.72rem] uppercase tracking-[0.12em] px-5 py-2 rounded-lg transition-all duration-200 cursor-pointer
                  ${active === id
                    ? 'text-green-DEFAULT bg-green-dim'
                    : theme === 'dark'
                      ? 'text-dark-muted hover:text-green-DEFAULT hover:bg-green-dim'
                      : 'text-light-muted hover:text-green-DEFAULT hover:bg-green-dim'}`}>
                {id}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme}
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 text-lg
              ${theme === 'dark'
                ? 'border-dark-border bg-dark-surface2 hover:border-green-border hover:bg-green-dim text-dark-muted hover:text-green-DEFAULT'
                : 'border-light-border bg-light-surface2 hover:border-[rgba(0,150,90,0.4)] hover:bg-[rgba(0,150,90,0.08)] text-light-muted hover:text-green-DEFAULT'}`}
            aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button onClick={handleAdmin}
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 text-lg cursor-pointer
              ${theme === 'dark'
                ? 'border-dark-border bg-dark-surface2 hover:border-green-border hover:bg-green-dim text-dark-muted hover:text-green-DEFAULT'
                : 'border-light-border bg-light-surface2 hover:border-[rgba(0,150,90,0.4)] hover:bg-[rgba(0,150,90,0.08)] text-light-muted hover:text-green-DEFAULT'}`}
            title="Admin Login"
            aria-label="Admin">
            🔐
          </button>

          <button onClick={() => setOpen(o => !o)}
            className="md:hidden flex flex-col gap-[5px] p-1.5 cursor-pointer"
            aria-label="Toggle menu">
            {[0,1,2].map(i => (
              <span key={i} className={`block w-[22px] h-[2px] rounded transition-all duration-300
                ${theme === 'dark' ? 'bg-dark-text' : 'bg-light-text'}`} />
            ))}
          </button>
        </div>
      </div>

      {open && (
        <div className={`md:hidden border-t px-6 py-4 flex flex-col gap-2
          ${theme === 'dark' ? 'bg-dark-bg border-dark-border' : 'bg-light-bg border-light-border'}`}>
          {links.map(id => (
            <button key={id} onClick={() => handleNav(id)}
              className={`font-display text-[0.72rem] uppercase tracking-[0.12em] px-4 py-2.5 rounded-lg text-left transition-all
                ${active === id
                  ? 'text-green-DEFAULT bg-green-dim'
                  : theme === 'dark' ? 'text-dark-muted' : 'text-light-muted'}`}>
              {id}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
