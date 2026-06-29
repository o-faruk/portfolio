import { motion } from 'framer-motion'

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
                { label: 'primary', email: 'omar@faruk.dev', active: true },
                { label: 'school',  email: 'faruk.o@uconn.edu', active: false },
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
                { icon: '</>', label: 'GitHub',   href: '#' },
                { icon: 'in',  label: 'LinkedIn', href: '#' },
              ].map(({ icon, label, href }) => (
                <a key={label} href={href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: '1px solid rgba(168,85,247,.25)', textDecoration: 'none', transition: 'border-color .2s,background .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='#a855f7'; e.currentTarget.style.background='rgba(168,85,247,.05)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(168,85,247,.25)'; e.currentTarget.style.background='transparent' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontFamily: '"JetBrains Mono",monospace', color: '#a855f7' }}>{icon}</span>
                    <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 13, letterSpacing: '.2em', textTransform: 'uppercase', color: '#efece5' }}>{label}</span>
                  </span>
                  <span style={{ color: 'rgba(239,236,229,.4)' }}>→</span>
                </a>
              ))}
              <a href="mailto:omar@faruk.dev" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: '2px solid #a855f7', background: '#a855f7', color: '#0e0d14', textDecoration: 'none', transition: 'background .2s,color .2s' }}
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
