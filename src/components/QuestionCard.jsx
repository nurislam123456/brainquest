const LEVEL_META = {
  1: { color: 'text-duo-green', bg: 'bg-green-50', border: 'border-duo-green', icon: '➕', label: 'Уровень 1' },
  2: { color: 'text-duo-blue', bg: 'bg-blue-50', border: 'border-duo-blue', icon: '✖️', label: 'Уровень 2' },
  3: { color: 'text-duo-orange', bg: 'bg-orange-50', border: 'border-duo-orange', icon: '🔢', label: 'Уровень 3' },
  4: { color: 'text-duo-purple', bg: 'bg-purple-50', border: 'border-duo-purple', icon: '📐', label: 'Уровень 4' },
  5: { color: 'text-duo-red', bg: 'bg-red-50', border: 'border-duo-red', icon: '🏆', label: 'Уровень 5' },
};

export default function QuestionCard({ question, level, shake }) {
  const meta = LEVEL_META[level] || LEVEL_META[1];

  return (
    <div className={`duo-card mb-4 ${shake ? 'animate-shake' : ''}`}>
      {/* Level badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full border-2 ${meta.bg} ${meta.color} ${meta.border}`}>
          <span>{meta.icon}</span>
          {meta.label}
        </span>
      </div>

      {/* Question text */}
      <div className="text-center py-4">
        <p className="text-xl sm:text-2xl font-extrabold text-duo-dark leading-snug">
          {question?.question || ''}
        </p>
      </div>
    </div>
  );
}
