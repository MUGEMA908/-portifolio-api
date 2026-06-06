import { useEffect, useRef, useState } from 'react'

const API = 'https://portifolio-api-epr5.onrender.com'

const track = (data) => fetch(`${API}/api/track/github-click`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}).catch(() => {})

const contactItems = [
  { icon: '✉', label: 'Email', value: 'niyonsabaeugene44@gmail.com', href: 'mailto:niyonsabaeugene44@gmail.com' },
  { icon: '📞', label: 'Phone / WhatsApp', value: '+250 790 299 779', href: 'tel:+250790299779' },
  { icon: '📱', label: 'Phone / WhatsApp', value: '+250 790 633 379', href: 'tel:+250790633379' },
  { icon: '📍', label: 'Location', value: 'Kigali, Rwanda', href: null },
]

const socials = [
  { label: 'GitHub ↗', href: 'https://github.com/MUGEMA908' },
 { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/niyonsaba-eugene-13b4b5408/' },
  { label: 'X (Twitter) ↗', href: 'https://twitter.com/eugeneandyleebom@gmail.com' },
  { label: 'Instagram ↗', href: 'https://instagram.com/bomberboi_originall' },
]

export default function Contact({ theme }) {
  const dark = theme === 'dark'
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [toast, setToast] = useState('')

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.07 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
        setToast('✓ Message sent! Eugene will reply within 24 hours.')
        setTimeout(() => { setToast(''); setStatus('idle') }, 5000)
      } else {
        setStatus('error')
        setToast('✗ Failed to send. Please try again.')
        setTimeout(() => { setToast(''); setStatus('idle') }, 4000)
      }
    } catch {
      setStatus('error')
      setToast('✗ Server error. Please try again later.')
      setTimeout(() => { setToast(''); setStatus('idle') }, 4000)
    }
  }

  const inputClass = `w-full font-body text-[0.95rem] px-4 py-3 rounded-xl border outline-none
    transition-all duration-200 focus:border-green-DEFAULT focus:shadow-[0_0_0_3px_rgba(0,229,160,0.12)]
    ${dark
      ? 'bg-dark-surface2 border-dark-border text-dark-text placeholder:text-dark-muted'
      : 'bg-light-surface2 border-light-border text-light-text placeholder:text-light-muted'}`

  return (
    <section id="contact" ref={sectionRef}
      className={`py-28 pb-36 relative z-10 ${dark ? 'text-dark-text' : 'text-light-text'}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <div className="mb-14 reveal">
          <div className="flex items-center gap-3 font-display text-[0.66rem] uppercase tracking-[0.22em] text-green-DEFAULT mb-3">
            <span className="w-7 h-px bg-green-DEFAULT opacity-60" />
            Reach Out
          </div>
          <h2 className="font-display font-bold text-[clamp(1.8rem,4vw,2.8rem)] tracking-[0.03em] mb-3">Get In Touch</h2>
          <p className={`font-body font-light text-[0.95rem] max-w-[440px] leading-relaxed
            ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
            Available for internships, collaborations, and entry-level IT roles. I respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          <div className="reveal space-y-2">
            {contactItems.map(item => {
              const Wrapper = item.href ? 'a' : 'div'
              return (
                <Wrapper key={item.value} href={item.href}
                  className={`flex items-center gap-4 px-5 py-4 rounded-xl border transition-all duration-200 group
                    ${item.href ? 'cursor-pointer' : 'cursor-default'}
                    ${dark
                      ? 'border-transparent hover:border-green-border hover:bg-green-dim text-dark-text'
                      : 'border-transparent hover:border-[rgba(0,150,90,0.3)] hover:bg-[rgba(0,200,130,0.07)] text-light-text'}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border text-lg shrink-0
                    transition-all duration-200 group-hover:border-green-border group-hover:bg-[rgba(0,229,160,0.15)]
                    ${dark ? 'bg-dark-surface2 border-dark-border' : 'bg-light-surface2 border-light-border'}`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className={`font-display text-[0.62rem] uppercase tracking-[0.1em] mb-0.5
                      ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{item.label}</div>
                    <div className="font-body text-[0.92rem]">{item.value}</div>
                  </div>
                </Wrapper>
              )
            })}

            <div className="grid grid-cols-2 gap-2.5 pt-4">
              <a href="mailto:niyonsabaeugene44@gmail.com"
                onClick={() => track({ project: 'email' })}
                className="col-span-2 flex justify-center font-display text-[0.7rem] uppercase tracking-[0.12em]
                  bg-green-DEFAULT text-[#060a08] font-bold px-5 py-3 rounded-xl
                  transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#11ffb8]
                  shadow-[0_4px_20px_rgba(0,229,160,0.25)]">
                ✉ Send Email
              </a>
              <a href="https://wa.me/250790299779" target="_blank" rel="noopener"
                onClick={() => track({ project: 'whatsapp' })}
                className={`col-span-2 flex justify-center font-display text-[0.7rem] uppercase tracking-[0.12em]
                  px-5 py-3 rounded-xl border transition-all duration-200 hover:-translate-y-0.5
                  ${dark
                    ? 'border-dark-border text-dark-text hover:border-green-border hover:text-green-DEFAULT hover:bg-green-dim'
                    : 'border-light-border text-light-text hover:border-[rgba(0,150,90,0.4)] hover:text-green-DEFAULT hover:bg-[rgba(0,200,130,0.08)]'}`}>
                💬 WhatsApp Me
              </a>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener"
                  onClick={() => track({ project: s.label.replace(' ↗','').toLowerCase() })}
                  className={`flex justify-center font-display text-[0.62rem] uppercase tracking-[0.08em]
                    px-3 py-2.5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5
                    ${dark
                      ? 'border-dark-border text-dark-text hover:border-green-border hover:text-green-DEFAULT hover:bg-green-dim'
                      : 'border-light-border text-light-text hover:border-[rgba(0,150,90,0.4)] hover:text-green-DEFAULT hover:bg-[rgba(0,200,130,0.08)]'}`}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="reveal space-y-4">
            <h3 className="font-display font-semibold text-[1rem] tracking-[0.05em] mb-6">Send a Message</h3>

            <div>
              <label className={`block font-display text-[0.62rem] uppercase tracking-[0.12em] mb-1.5
                ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>Your Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required
                placeholder="Jean Bosco" className={inputClass} />
            </div>

            <div>
              <label className={`block font-display text-[0.62rem] uppercase tracking-[0.12em] mb-1.5
                ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>Email Address *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required
                placeholder="you@example.com" className={inputClass} />
            </div>

            <div>
              <label className={`block font-display text-[0.62rem] uppercase tracking-[0.12em] mb-1.5
                ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>Message *</label>
              <textarea name="message" value={form.message} onChange={handleChange} required rows={6}
                placeholder="Hello Eugene, I would like to discuss..."
                className={`${inputClass} resize-none leading-relaxed`} />
            </div>

            <button type="submit" disabled={status === 'sending' || status === 'sent'}
              className={`w-full font-display text-[0.72rem] uppercase tracking-[0.12em] font-bold
                px-6 py-3.5 rounded-xl transition-all duration-200
                ${status === 'sent'
                  ? 'bg-green-DEFAULT/80 text-[#060a08] cursor-default'
                  : status === 'sending'
                    ? 'bg-green-DEFAULT/60 text-[#060a08] cursor-wait'
                    : status === 'error'
                      ? 'bg-red-500 text-white'
                      : 'bg-green-DEFAULT text-[#060a08] hover:-translate-y-0.5 hover:bg-[#11ffb8] shadow-[0_4px_20px_rgba(0,229,160,0.25)]'}`}>
              {status === 'sent' ? '✓ Message Sent!' : status === 'sending' ? 'Sending...' : status === 'error' ? 'Failed — Try Again' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>

      {toast && (
        <div style={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 9999,
          background: toast.startsWith('✓') ? '#00e5a0' : '#ef4444',
          color: toast.startsWith('✓') ? '#060a08' : '#fff',
          padding: '16px 24px', borderRadius: 12,
          fontFamily: 'Georgia, serif', fontWeight: 'bold',
          fontSize: 14, boxShadow: '0 8px 30px rgba(0,229,160,0.4)'
        }}>
          {toast}
        </div>
      )}
    </section>
  )
}
