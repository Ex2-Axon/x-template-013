import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

/* ── Floating particles ── */
function Particles() {
  const [particles, setParticles] = useState<{ id: number; left: string; delay: string; duration: string; size: string; opacity: number }[]>([])

  useEffect(() => {
    const p = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${10 + Math.random() * 15}s`,
      size: `${Math.random() * 4 + 2}px`,
      opacity: Math.random() * 0.5 + 0.2,
    }))
    setParticles(p)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle animate-particle bg-primary/20"
          style={{
            left: p.left,
            bottom: '-20px',
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
            boxShadow: '0 0 10px var(--color-primary)',
          }}
        />
      ))}
    </div>
  )
}

/* ── Animated counter number ── */
function CounterNum({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'scale(1.5) rotate(5deg)'
    el.style.color = 'var(--color-primary)'
    const t = setTimeout(() => {
      el.style.transform = 'scale(1) rotate(0deg)'
      el.style.color = ''
    }, 200)
    return () => clearTimeout(t)
  }, [value])

  return (
    <span
      ref={ref}
      className="inline-block transition-all duration-200 ease-out font-heading ml-2"
    >
      {value}
    </span>
  )
}

/* ── *10 Multiplier Visual ── */
function MultiplierEffect({ x, y, onComplete }: { x: number; y: number; onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div
      className="effect-10"
      style={{ left: x, top: y }}
    >
      *10
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const [effects, setEffects] = useState<{ id: number; x: number; y: number }[]>([])

  const handleCounterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCount((c) => c + 1)
    const newEffect = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    }
    setEffects((prev) => [...prev, newEffect])
  }

  const removeEffect = (id: number) => {
    setEffects((prev) => prev.filter((eff) => eff.id !== id))
  }

  return (
    <div className="relative min-h-screen flex flex-col font-body text-text-base selection:bg-primary/30">
      <div className="aurora-bg" />
      <Particles />

      {/* ── Header Badge ── */}
      <header className="pt-8 px-4 flex justify-center animate-pulse-soft">
        <div className="glass px-4 py-1.5 rounded-full text-xs font-heading font-medium tracking-widest text-primary border border-primary/30 uppercase">
          <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
          New Horizon
        </div>
      </header>

      {/* ── Hero section ── */}
      <main className="flex-grow flex flex-col items-center">
        <section className="hero-container">
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full group-hover:bg-primary/30 transition-all duration-500" />
            <img src={heroImg} className="relative w-40 h-40 object-contain animate-float" alt="Hero" />
            <img src={reactLogo} className="absolute -top-4 -right-4 w-12 h-12 animate-spin [animation-duration:10s]" alt="React logo" />
            <img src={viteLogo} className="absolute -bottom-4 -left-4 w-12 h-12 animate-bounce" alt="Vite logo" />
          </div>

          <h1 className="hero-title">
            ETHEREAL VISION
          </h1>
          
          <p className="hero-subtitle">
            A UI that blends frosted translucency with celestial gradients for a serene and immersive experience.
          </p>

          <button
            type="button"
            className="counter-btn glass-hover"
            onClick={handleCounterClick}
          >
            Explore Dimensions
            <CounterNum value={count} />
          </button>

          <p className="mt-6 text-sm text-text-muted/60 font-mono">
            Edit <code className="text-primary/80">src/App.tsx</code> to start building
          </p>
        </section>

        {/* ── Multiplier Effects ── */}
        {effects.map((eff) => (
          <MultiplierEffect
            key={eff.id}
            x={eff.x}
            y={eff.y}
            onComplete={() => removeEffect(eff.id)}
          />
        ))}

        {/* ── Next steps ── */}
        <section className="grid-container w-full">
          <div className="card glass glass-hover">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2>Documentation</h2>
            </div>
            <p>Your questions, answered by our comprehensive guides.</p>
            <div className="link-list">
              <a href="https://vite.dev/" target="_blank" rel="noreferrer" className="link-item">
                <img src={viteLogo} alt="Vite" />
                <span>Explore Vite Docs</span>
              </a>
              <a href="https://react.dev/" target="_blank" rel="noreferrer" className="link-item">
                <img src={reactLogo} alt="React" />
                <span>Learn React</span>
              </a>
            </div>
          </div>

          <div className="card glass glass-hover">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2>Community</h2>
            </div>
            <p>Join the conversation and connect with developers.</p>
            <div className="link-list">
              <a href="https://github.com/Ex2-Axon/x-template" target="_blank" rel="noreferrer" className="link-item">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                <span>GitHub</span>
              </a>
              <a href="https://discord.gg/8Zeq8VCU" target="_blank" rel="noreferrer" className="link-item">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.68 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128c.125-.094.252-.192.37-.29a.074.074 0 01.077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 01.077.01c.118.098.245.196.37.29a.077.077 0 01-.006.127 12.29 12.29 0 01-1.872.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993.033.047.084.056.12.034a19.876 19.876 0 005.993-3.03.077.077 0 00.032-.057c.492-5.156-.844-9.64-3.477-13.66a.062.062 0 00-.031-.028zM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z"/></svg>
                <span>Discord</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-xs font-mono text-text-muted/40 uppercase tracking-widest">
        // System v1.13.0 — Aurora Glass Protocol Active
      </footer>
    </div>
  )
}

export default App
