const LEVELS = [
  { n: 1, label: '➕', name: 'Легко', color: 'bg-duo-green border-duo-green-dark', textColor: 'text-duo-green' },
  { n: 2, label: '✖️', name: 'Легко', color: 'bg-duo-blue border-blue-500', textColor: 'text-duo-blue' },
  { n: 3, label: '🔢', name: 'Средне', color: 'bg-duo-orange border-orange-600', textColor: 'text-duo-orange' },
  { n: 4, label: '📐', name: 'Сложно', color: 'bg-duo-purple border-purple-700', textColor: 'text-duo-purple' },
  { n: 5, label: '🏆', name: 'Сложно', color: 'bg-duo-red border-red-600', textColor: 'text-duo-red' },
];

export default function LevelSelector({ selected, onSelect }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-extrabold text-duo-gray-1 uppercase tracking-widest mb-3 text-center">
        Уровень сложности
      </p>
      <div className="flex gap-2 justify-center flex-wrap">
        {LEVELS.map(({ n, label, name, color, textColor }) => {
          const isActive = selected === n;
          return (
            <button
              key={n}
              onClick={() => onSelect(n)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl border-2 border-b-4 font-bold transition-all text-sm ${
                isActive
                  ? `${color} text-white border-opacity-80`
                  : 'bg-white border-duo-border text-duo-gray-1 hover:border-current'
              } ${!isActive ? `hover:${textColor}` : ''}`}
              style={!isActive ? undefined : undefined}
            >
              <span className="text-xl leading-none">{label}</span>
              <span className="text-xs font-extrabold leading-none">{name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
