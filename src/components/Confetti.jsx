import { useEffect, useState } from 'react';

const EMOJIS = ['🎉', '⭐', '✨', '🌟', '💫', '🎊'];

export default function Confetti({ active }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) return;
    const ps = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[i % EMOJIS.length],
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      size: 16 + Math.random() * 16,
    }));
    setParticles(ps);
    const t = setTimeout(() => setParticles([]), 1200);
    return () => clearTimeout(t);
  }, [active]);

  if (!particles.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${p.x}%`,
            top: '-20px',
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
