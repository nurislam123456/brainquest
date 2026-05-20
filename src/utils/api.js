const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const getHeaders = () => {
  const token = localStorage.getItem('bq_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // AUTH
  async register(username, password) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Ошибка регистрации');
    return data;
  },

  async login(username, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Ошибка входа');
    return data; // { token }
  },

  async getMe() {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: getHeaders(),
    });
    if (!res.ok) return null;
    return res.json();
  },

  // QUESTIONS
async getRandomQuestion(difficulty) {
  const levelMap = {
    1: 'easy',
    2: 'easy',
    3: 'medium',
    4: 'hard',
    5: 'hard',
  };
  const level = levelMap[difficulty] || 'easy';
  const res = await fetch(`${BASE_URL}/questions/random?difficulty=${level}`, {
  });
  
  const text = await res.text(); // читаем как текст
  if (!text) throw new Error('Сервер вернул пустой ответ. Добавь вопросы в базу данных.');
  
  const data = JSON.parse(text);
  if (!res.ok) throw new Error(data.message || 'Не удалось получить задачу');
  return data;
},

async checkAnswer(questionId, answer) {
  const res = await fetch(`${BASE_URL}/questions/check`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ questionId, answer }),
  });
  
  const text = await res.text();
  if (!text) throw new Error('Пустой ответ от сервера');
  
  const data = JSON.parse(text);
  if (!res.ok) throw new Error(data.message || 'Ошибка проверки');
  return data;
},
};
