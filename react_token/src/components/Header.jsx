import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { token, setToken, logout } = useAuth();
  const [inputValue, setInputValue] = useState('');

  const handleSave = () => {
    if (!inputValue.trim()) return;
    setToken(inputValue.trim());
    setInputValue('');
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/oldal1">Oldal 1</Link>
        <Link to="/oldal2">Oldal 2</Link>
        {token && <button className="logout-btn" onClick={logout}>Kilépés</button>}
      </nav>

      {!token && (
        <div className="token-controls">
          <input
            type="text"
            placeholder="Token megadása..."
            className="token-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="save-btn"
            onClick={handleSave}
            disabled={!inputValue.trim()}
          >
            Mentés
          </button>
        </div>
      )}
    </header>
  );
}

