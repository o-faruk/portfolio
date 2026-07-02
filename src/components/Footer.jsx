export default function Footer() {
  return (
    <footer style={{ position: 'relative', borderTop: '1px solid rgba(168,85,247,.15)' }}>
      <div style={{ position: 'absolute', insetInline: 0, top: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(168,85,247,.45) 8%,rgba(168,85,247,.45) 92%,transparent)' }} />
      <div style={{ maxWidth: 'min(94vw,1800px)', margin: '0 auto', padding: '32px 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(239,236,229,.5)' }}>
          <div style={{ color: 'rgba(239,236,229,.7)' }}>omar_faruk.system</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <span className="relative inline-flex" style={{ width: 6, height: 6 }}>
              <span className="animate-ping-ring absolute inset-0 rounded-full bg-signal opacity-70" />
              <span className="relative rounded-full bg-signal" style={{ width: 6, height: 6 }} />
            </span>
            <span>▮ system_idle · omar faruk · {new Date().getFullYear()}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontFamily: '"JetBrains Mono",monospace', fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase' }}>
          {[['github','https://github.com/o-faruk'],['linkedin','https://www.linkedin.com/in/omar-faruko/'],['contact','mailto:omarfarukk108@gmail.com']].map(([label, href]) => (
            <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" style={{ color: 'rgba(239,236,229,.55)', textDecoration: 'none', transition: 'color .2s' }}
              onMouseEnter={e => e.currentTarget.style.color='#efece5'}
              onMouseLeave={e => e.currentTarget.style.color='rgba(239,236,229,.55)'}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
