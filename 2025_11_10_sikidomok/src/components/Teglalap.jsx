import React, { useState } from "react";
import '../assets/elmelet.css';

function Teglalap() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [terulet, setTerulet] = useState(null);
  const [kerulet, setKerulet] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sideA = parseFloat(a);
    const sideB = parseFloat(b);

  if (!isNaN(sideA) && !isNaN(sideB) && sideA > 0 && sideB > 0) {
    setTerulet(sideA * sideB);
    setKerulet(2 * (sideA + sideB));
  } else {
    alert("Kérlek, csak pozitív számokat adj meg!");
    setTerulet(null);
    setKerulet(null);
  }
};

  return (
    <div className="theory-container">
      <h2>Téglalap terület, kerület számítás</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
          a oldal (cm):
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            step="any"
            min="0"
            required
          />
        </label>
        <label>
          b oldal (cm):
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            step="any"
            min="0"
            required
          />
        </label>
        <button type="submit">Kalkulátor</button>
      </form>
     

      {terulet !== null && kerulet !== null && (
        <div className="results">
          <p><strong>Terület:</strong> {terulet.toFixed(2)} cm²</p>
          <p><strong>Kerület:</strong> {kerulet.toFixed(2)} cm</p>
        </div>
      )}
      </div>
    </div>
    
  );
}

export default Teglalap;
