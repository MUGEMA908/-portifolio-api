import { useState, useEffect } from 'react'
import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import Projects from './components/Projects'
import About    from './components/About'
import Contact  from './components/Contact'
import Modal    from './components/Modal'

export default function App() {
  const [theme, setTheme]       = useState(() => localStorage.getItem('ne-theme') || 'dark')
  const [caseKey, setCaseKey]   = useState(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('ne-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <div className={`min-h-screen transition-colors duration-300
      ${theme === 'dark'
        ? 'bg-dark-bg text-dark-text'
        : 'bg-light-bg text-light-text'}`}>

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero     theme={theme} />
        <Divider  theme={theme} />
        <Projects theme={theme} onCaseStudy={setCaseKey} />
        <Divider  theme={theme} />
        <About    theme={theme} />
        <Divider  theme={theme} />
        <Contact  theme={theme} />
      </main>

      <footer className={`border-t py-8 text-center font-display text-[0.68rem]
        uppercase tracking-[0.1em] transition-colors
        ${theme === 'dark'
          ? 'border-dark-border text-dark-muted'
          : 'border-light-border text-light-muted'}`}>
        Designed &amp; built by{' '}
        <a href="#home"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="text-green-DEFAULT hover:opacity-75 transition-opacity cursor-pointer">
          NIYONSABA Eugene
        </a>{' '}
        · IT Engineer · Kigali, Rwanda · 2026
      </footer>

      <Modal theme={theme} caseKey={caseKey} onClose={() => setCaseKey(null)} />
    </div>
  )
}

function Divider({ theme }) {
  return (
    <div className={`h-px max-w-6xl mx-auto
      ${theme === 'dark'
        ? 'bg-gradient-to-r from-transparent via-dark-border to-transparent'
        : 'bg-gradient-to-r from-transparent via-light-border to-transparent'}`} />
  )
}
