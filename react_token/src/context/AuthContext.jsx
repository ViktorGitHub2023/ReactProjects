import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(() => {
    try {
      return localStorage.getItem('token') || '';
    } catch (e) {
      return '';
    }
  });

  const setToken = (value) => {
    try {
      if (value) localStorage.setItem('token', value);
      else localStorage.removeItem('token');
    } catch (e) {}
    setTokenState(value);
  };

  const logout = () => setToken('');

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'token') setTokenState(e.newValue || '');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);