import { useAuth } from '../hooks/useAuth';

const LEVEL_COLORS = {
  1: 'bg-duo-green',
  2: 'bg-duo-blue',
  3: 'bg-duo-orange',
  4: 'bg-duo-purple',
  5: 'bg-duo-red',
};

export default function Navbar({ score, streak }) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b-2 border-duo-border sticky top-0 z-50">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🧠</span>
          <span className="font-extrabold text-lg text-duo-dark hidden sm:block">
            Brain<span className="text-duo-green">Quest</span>
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          {/* Streak */}
          <div className="flex items-center gap-1 bg-orange-50 border-2 border-orange-200 rounded-xl px-3 py-1">
            <span className="text-lg">🔥</span>
            <span className="font-extrabold text-duo-orange text-sm">{streak}</span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-1 bg-green-50 border-2 border-green-200 rounded-xl px-3 py-1">
            <span className="text-lg">⭐</span>
            <span className="font-extrabold text-duo-green text-sm">{score}</span>
          </div>

          {/* User + logout */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-duo-purple flex items-center justify-center text-white font-extrabold text-sm shrink-0">
              {user?.username?.[0]?.toUpperCase() || '?'}
            </div>
            <button
              onClick={logout}
              className="text-xs text-duo-gray-1 font-bold hover:text-duo-red transition-colors hidden sm:block"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
