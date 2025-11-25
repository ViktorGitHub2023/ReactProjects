import React, { useState } from 'react';
import '../assets/elmelet.css';

function Kor() {
  const [r, setR] = useState('');
  const [t, setT] = useState(null);
  const [k, setK] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const radius = parseFloat(r);
    if (!isNaN(radius) && radius > 0) {
      const terulet = Math.PI * radius * radius;
      const kerulet = 2 * Math.PI * radius;
      setT(terulet.toFixed(2));
      setK(kerulet.toFixed(2));
    } else {
      setT(null);
      setK(null);
      alert('Kérlek adj meg egy pozitív számot!');
    }
  };

  return (
    <div className="theory-container">
      <h2>Kör terület, kerület számítás</h2>
      <div>
        <form onSubmit={handleSubmit}>
        <label>
          Kör sugara (cm):
          <input
            type="number"
            value={r}
            onChange={(e) => setR(e.target.value)}
            step="any"
            min="0"
            required
          />
        </label>
        <button type="submit">Kalkulátor</button>
      </form>

      {t && k && (
        <div className="results">
          <p><strong>Terület:</strong> {t} cm²</p>
          <p><strong>Kerület:</strong> {k} cm</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default Kor;