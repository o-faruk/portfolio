export default function GlitchText({ text, className = '', baseDelay = 0.3, step = 0.04 }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className={`inline-block animate-glitch ${className}`}
          style={{ animationDelay: `${baseDelay + i * step}s`, animationFillMode: 'both' }}
        >
          {ch}
        </span>
      ))}
    </>
  )
}
