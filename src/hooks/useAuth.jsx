import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('bq_token');
    if (token) {
      api.getMe()
        .then(u => setUser(u))
        .catch(() => localStorage.removeItem('bq_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const { token } = await api.login(username, password);
    localStorage.setItem('bq_token', token);
    const me = await api.getMe();
    setUser(me);
    return me;
  };

  const register = async (username, password) => {
    await api.register(username, password);
    return login(username, password);
  };

  const logout = () => {
    localStorage.removeItem('bq_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
