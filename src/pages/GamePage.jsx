import { useState, useEffect, useRef, useCallback } from "react";
import { api } from "../utils/api";
import Navbar from "../components/Navbar";
import LevelSelector from "../components/LevelSelector";
import QuestionCard from "../components/QuestionCard";
import ResultBanner from "../components/ResultBanner";
import Confetti from "../components/Confetti";

const STORAGE_KEYS = {
  score: "bq_score",
  streak: "bq_streak",
  level: "bq_level",
};

function loadInt(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? parseInt(v, 10) : fallback;
  } catch {
    return fallback;
  }
}

export default function GamePage() {
  const [level, setLevel] = useState(() => loadInt(STORAGE_KEYS.level, 1));
  const [score, setScore] = useState(() => loadInt(STORAGE_KEYS.score, 0));
  const [streak, setStreak] = useState(() => loadInt(STORAGE_KEYS.streak, 0));

  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null); // null | 'correct' | 'wrong'
  const [explanation, setExplanation] = useState("");

  const [qLoading, setQLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const inputRef = useRef(null);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.score, score);
  }, [score]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.streak, streak);
  }, [streak]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.level, level);
  }, [level]);

  const loadQuestion = useCallback(async (lvl, excludeId = null) => {
    setQLoading(true);
    setError("");
    setResult(null);
    setAnswer("");
    setQuestion(null);
    try {
      const q = await api.getRandomQuestion(lvl, excludeId);
      if (!q || !q.id)
        throw new Error(
          "Задача не найдена. Убедись что в БД есть вопросы для этого уровня.",
        );
      setQuestion(q);
      setTimeout(() => inputRef.current?.focus(), 100);
    } catch (e) {
      setError(e.message);
    } finally {
      setQLoading(false);
    }
  }, []);

  // Load on mount and level change
  useEffect(() => {
    loadQuestion(level);
  }, [level, loadQuestion]);

  const handleLevelChange = (l) => {
    if (l === level) return;
    setLevel(l);
    setResult(null);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleCheck = async () => {
    if (result) return; // already answered

    const trimmed = answer.trim();
    if (!trimmed) {
      setError("Введи число!");
      triggerShake();
      return;
    }
    if (!/^-?\d+(\.\d+)?$/.test(trimmed)) {
      setError("Напиши ответ числом");
      triggerShake();
      return;
    }
    if (!question) return;

    setError("");
    setCheckLoading(true);

    try {
      const { correct } = await api.checkAnswer(question.id, trimmed);
      if (correct) {
        setResult("correct");
        setScore((s) => s + 1);
        setStreak((s) => s + 1);
        setConfetti(true);
        setTimeout(() => setConfetti(false), 1300);
        setExplanation(question.explanation);
      } else {
        setResult("wrong");
        setStreak(0);
        setExplanation(
          question.explanation || `Правильный ответ: ${question.answer}`,
        );
        triggerShake();
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setCheckLoading(false);
    }
  };

  const handleNext = () => {
    loadQuestion(level, question?.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !result && !checkLoading) {
      handleCheck();
    }
  };

  // Empty state when backend has no questions
  const isNoQuestion = !qLoading && !question && !error;

  return (
    <div className="min-h-screen bg-duo-gray-3 flex flex-col">
      <Navbar score={score} streak={streak} />

      <main
        className="flex-1 max-w-2xl mx-auto w-full px-4 py-6"
        style={{ paddingBottom: result ? "120px" : "24px" }}
      >
        {/* Level selector */}
        <LevelSelector selected={level} onSelect={handleLevelChange} />

        {/* Loading skeleton */}
        {qLoading && (
          <div className="duo-card mb-4 animate-pulse">
            <div className="h-5 bg-duo-gray-2 rounded-full w-24 mb-4" />
            <div className="h-8 bg-duo-gray-2 rounded-full w-3/4 mx-auto mb-2" />
            <div className="h-8 bg-duo-gray-2 rounded-full w-1/2 mx-auto" />
          </div>
        )}

        {/* Error getting question */}
        {error && !question && (
          <div className="duo-card mb-4 text-center py-8 animate-bounce-in">
            <span className="text-5xl mb-3 block">😕</span>
            <p className="font-extrabold text-duo-dark text-lg mb-1">Упс!</p>
            <p className="text-duo-gray-1 font-bold text-sm mb-4">{error}</p>
            <button
              onClick={() => loadQuestion(level)}
              className="btn-primary px-8 py-3 text-sm"
            >
              Попробовать снова
            </button>
          </div>
        )}

        {/* Question */}
        {question && (
          <>
            <QuestionCard question={question} level={level} shake={shake} />

            {/* Input area */}
            <div className="duo-card animate-slide-up">
              <label className="block text-xs font-extrabold text-duo-gray-1 uppercase tracking-widest mb-2 ml-1">
                Твой ответ
              </label>

              <div className="flex gap-3 mb-3">
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="decimal"
                  className={`duo-input flex-1 ${
                    error && answer ? "border-duo-red focus:border-duo-red" : ""
                  } ${result === "correct" ? "border-duo-green" : ""}`}
                  placeholder="Введи число..."
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    setError("");
                  }}
                  onKeyDown={handleKeyDown}
                  disabled={!!result || checkLoading}
                  autoComplete="off"
                />
              </div>

              {/* Validation error */}
              {error && question && (
                <div className="flex items-center gap-2 mb-3 text-duo-red">
                  <span>⚠️</span>
                  <p className="font-bold text-sm">{error}</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3">
                {!result ? (
                  <>
                    <button
                      onClick={handleCheck}
                      disabled={checkLoading || !answer.trim()}
                      className="btn-primary flex-1 py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {checkLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
                          Проверяю...
                        </span>
                      ) : (
                        "ПРОВЕРИТЬ ✓"
                      )}
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={checkLoading}
                      className="btn-ghost px-4 py-4 text-sm"
                    >
                      Пропустить
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={checkLoading}
                    className="btn-primary flex-1 py-4 text-base"
                  >
                    СЛЕДУЮЩАЯ ЗАДАЧА →
                  </button>
                )}
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-4 flex gap-3 justify-center">
              <div className="flex items-center gap-1.5 bg-white rounded-2xl border-2 border-duo-border px-4 py-2 shadow-sm">
                <span className="text-base">⭐</span>
                <span className="font-extrabold text-duo-green text-sm">
                  {score} очков
                </span>
              </div>
              {streak >= 2 && (
                <div className="flex items-center gap-1.5 bg-orange-50 rounded-2xl border-2 border-orange-200 px-4 py-2 animate-bounce-in">
                  <span className="text-base">🔥</span>
                  <span className="font-extrabold text-duo-orange text-sm">
                    {streak} подряд!
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Result bottom sheet */}
      <ResultBanner
        result={result}
        explanation={explanation}
        onNext={handleNext}
        loading={qLoading}
      />

      {/* Confetti */}
      <Confetti active={confetti} />
    </div>
  );
}
