export default function BracketFrame({ children, className = '', size = 8, color = 'rgba(168,85,247,0.65)' }) {
  const s = { position: 'absolute', width: size, height: size }
  const b = `1px solid ${color}`
  return (
    <div style={{ position: 'relative' }} className={className}>
      <span style={{ ...s, top: -1, left: -1, borderTop: b, borderLeft: b }} />
      <span style={{ ...s, top: -1, right: -1, borderTop: b, borderRight: b }} />
      <span style={{ ...s, bottom: -1, left: -1, borderBottom: b, borderLeft: b }} />
      <span style={{ ...s, bottom: -1, right: -1, borderBottom: b, borderRight: b }} />
      {children}
    </div>
  )
}
