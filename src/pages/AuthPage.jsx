import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function AuthPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (!username.trim()) return setError('Введи имя пользователя');
    if (!password.trim()) return setError('Введи пароль');
    if (password.length < 4) return setError('Пароль минимум 4 символа');

    setLoading(true);
    try {
      if (mode === 'login') {
        await login(username.trim(), password);
      } else {
        await register(username.trim(), password);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-duo-gray-3 px-4">
      {/* Logo / Hero */}
      <div className="mb-8 text-center animate-slide-up">
        <div className="text-7xl mb-3">🧠</div>
        <h1 className="text-4xl font-extrabold text-duo-dark tracking-tight">
          Brain<span className="text-duo-green">Quest</span>
        </h1>
        <p className="text-duo-gray-1 font-bold mt-1 text-base">
          Математика — это весело!
        </p>
      </div>

      {/* Card */}
      <div className="duo-card w-full max-w-sm animate-bounce-in">
        {/* Tab switcher */}
        <div className="flex rounded-2xl overflow-hidden border-2 border-duo-border mb-6">
          <button
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-3 font-extrabold text-sm transition-all ${
              mode === 'login'
                ? 'bg-duo-green text-white'
                : 'bg-white text-duo-gray-1 hover:bg-duo-gray-3'
            }`}
          >
            Войти
          </button>
          <button
            onClick={() => { setMode('register'); setError(''); }}
            className={`flex-1 py-3 font-extrabold text-sm transition-all ${
              mode === 'register'
                ? 'bg-duo-green text-white'
                : 'bg-white text-duo-gray-1 hover:bg-duo-gray-3'
            }`}
          >
            Регистрация
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-xs font-extrabold text-duo-gray-1 uppercase tracking-widest mb-1 ml-1">
              Имя пользователя
            </label>
            <input
              type="text"
              className="duo-input"
              placeholder="Введи имя..."
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold text-duo-gray-1 uppercase tracking-widest mb-1 ml-1">
              Пароль
            </label>
            <input
              type="password"
              className="duo-input"
              placeholder="Введи пароль..."
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border-2 border-duo-red rounded-2xl px-4 py-3 mb-4 flex items-center gap-2 animate-bounce-in">
            <span className="text-xl">😬</span>
            <p className="text-duo-red font-bold text-sm">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-primary w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Загрузка...
            </span>
          ) : mode === 'login' ? 'ВОЙТИ' : 'СОЗДАТЬ АККАУНТ'}
        </button>
      </div>

      {/* Mascot row */}
      <div className="mt-8 flex gap-6 opacity-50">
        {['🦉','🐱','🐸'].map((e, i) => (
          <span key={i} className="text-3xl animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}
