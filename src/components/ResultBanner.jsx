export default function ResultBanner({ result, explanation, onNext, loading }) {
  if (!result) return null;

  const isCorrect = result === 'correct';

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 animate-slide-up ${
        isCorrect ? 'bg-green-50 border-t-4 border-duo-green' : 'bg-red-50 border-t-4 border-duo-red'
      }`}
    >
      <div className="max-w-2xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className="text-3xl shrink-0">{isCorrect ? '🎉' : '💔'}</span>
          <div className="min-w-0">
            <p className={`font-extrabold text-base mb-1 ${isCorrect ? 'text-duo-green' : 'text-duo-red'}`}>
              {isCorrect ? 'Отлично! Правильно!' : 'Неверно! Попробуй ещё!'}
            </p>
            {explanation && (
              <p className="text-duo-dark text-sm font-semibold leading-snug">
                💡 {explanation}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={onNext}
          disabled={loading}
          className={`shrink-0 font-extrabold rounded-2xl px-6 py-3 text-white transition-all active:translate-y-1 ${
            isCorrect
              ? 'bg-duo-green active:shadow-none'
              : 'bg-duo-red active:shadow-none'
          }`}
          style={{ boxShadow: isCorrect ? '0 4px 0 #46a302' : '0 4px 0 #CC0000' }}
        >
          {loading ? '...' : 'ДАЛЬШЕ →'}
        </button>
      </div>
    </div>
  );
}
