import { motion } from 'framer-motion'

const GHIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)
const LIIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

function PingDot({ size = 6 }) {
  return (
    <span className="relative inline-flex" style={{ width: size, height: size }}>
      <span className="animate-ping-ring absolute inset-0 rounded-full bg-signal opacity-70" />
      <span className="relative rounded-full bg-signal" style={{ width: size, height: size }} />
    </span>
  )
}

const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 } }

export default function Contact() {
  return (
    <section id="contact" style={{ position: 'relative', padding: '112px 24px 128px' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <motion.div {...reveal} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, marginBottom: 48, borderBottom: '1px solid rgba(168,85,247,.15)', paddingBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
            <span style={{ fontFamily: 'Fraunces,serif', fontStyle: 'italic', color: '#a855f7', fontSize: 'clamp(28px,4vw,40px)', lineHeight: 1 }}>IV.</span>
            <div>
              <p style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.32em', color: 'rgba(168,85,247,.7)', textTransform: 'uppercase', margin: '0 0 8px' }}>// encrypted_channel</p>
              <h2 style={{ fontFamily: 'Fraunces,serif', fontStyle: 'italic', fontVariationSettings: '"opsz" 144', letterSpacing: '-.03em', color: '#efece5', margin: 0, fontSize: 'clamp(3rem,9vw,8rem)', lineHeight: .88 }}>let&apos;s talk.</h2>
            </div>
          </div>
          <div style={{ textAlign: 'right', fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(239,236,229,.45)' }}>
            <div>◆ hartford, ct</div>
            <div style={{ marginTop: 4 }}>⏵ open to internships</div>
          </div>
        </motion.div>

        <motion.p {...reveal} style={{ fontFamily: 'Newsreader,serif', fontStyle: 'italic', fontSize: 'clamp(16px,2vw,20px)', color: 'rgba(239,236,229,.75)', maxWidth: '40rem', margin: '0 0 40px' }}>
          Open to internships, collabs, and interesting problems.
        </motion.p>

        <motion.div {...reveal} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', border: '1px solid rgba(239,236,229,.1)' }}>
          {/* Mail channels */}
          <div style={{ padding: 32, borderBottom: '1px solid rgba(239,236,229,.1)' }}>
            <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.32em', textTransform: 'uppercase', color: 'rgba(168,85,247,.7)', marginBottom: 24 }}>// mail_channels</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { label: 'primary', email: 'omarfarukk108@gmail.com', active: true },
                { label: 'school',  email: 'omar.faruk@uconn.edu', active: false },
              ].map(({ label, email, active }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: active ? '#a855f7' : 'rgba(239,236,229,.55)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: 'rgba(168,85,247,.7)' }}>▶</span>
                    {active && <span className="relative inline-flex" style={{ width: 4, height: 4 }}><span className="animate-signal-ping absolute inset-0 rounded-full bg-signal" /><span className="relative rounded-full bg-signal" style={{ width: 4, height: 4 }} /></span>}
                    {label}
                  </span>
                  <a href={`mailto:${email}`} style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 14, color: '#efece5', borderBottom: '1px solid transparent', textDecoration: 'none', width: 'fit-content', transition: 'color .2s,border-color .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color='#a855f7'; e.currentTarget.style.borderBottomColor='#a855f7' }}
                    onMouseLeave={e => { e.currentTarget.style.color='#efece5'; e.currentTarget.style.borderBottomColor='transparent' }}>
                    {email}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Presence nodes */}
          <div style={{ padding: 32 }}>
            <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.32em', textTransform: 'uppercase', color: 'rgba(168,85,247,.7)', marginBottom: 24 }}>// presence_nodes</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: <GHIcon />, label: 'GitHub',   href: 'https://github.com/o-faruk' },
                { icon: <LIIcon />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/omar-faruko/' },
              ].map(({ icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: '1px solid rgba(168,85,247,.25)', textDecoration: 'none', transition: 'border-color .2s,background .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='#a855f7'; e.currentTarget.style.background='rgba(168,85,247,.05)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(168,85,247,.25)'; e.currentTarget.style.background='transparent' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: '#a855f7', display: 'flex', alignItems: 'center' }}>{icon}</span>
                    <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 13, letterSpacing: '.2em', textTransform: 'uppercase', color: '#efece5' }}>{label}</span>
                  </span>
                  <span style={{ color: 'rgba(239,236,229,.4)' }}>→</span>
                </a>
              ))}
              <a href="mailto:omarfarukk108@gmail.com" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: '2px solid #a855f7', background: '#a855f7', color: '#0e0d14', textDecoration: 'none', transition: 'background .2s,color .2s' }}
                onMouseEnter={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#a855f7' }}
                onMouseLeave={e => { e.currentTarget.style.background='#a855f7'; e.currentTarget.style.color='#0e0d14' }}>
                <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 13, letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 700 }}>▶ send_a_message</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
