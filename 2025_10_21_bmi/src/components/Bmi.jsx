import React, { useState } from 'react';

function BMICalculator() {
  const [magassag, setMagassag] = useState('');
  const [tomeg, setTomeg] = useState('');
  const [bmi, setBmi] = useState(null);
  const [kategoria, setKategoria] = useState('');

  const bmiKalkulator = (e) => {
    e.preventDefault();
    const meter = parseFloat(magassag) / 100;
    const kg = parseFloat(tomeg);

    if (meter > 0 && kg > 0) {
      const bmiErteke = kg / (meter * meter);
      const bmiKerekitve = bmiErteke.toFixed(2);
      setBmi(bmiKerekitve);
      setKategoria(ertekeles(bmiErteke));
    } else {
      setBmi(null);
      setKategoria('');
    }
  };

  const ertekeles = (bmi) => {
    if (bmi < 18.5) return 'Sovány';
    else if (bmi < 25) return 'Normál';
    else if (bmi < 30) return 'Túlsúlyos';
    else if (bmi < 35) return 'Elhízott (I. fokozat)';
    else if (bmi < 40) return 'Elhízott (II. fokozat)';
    else return 'Súlyosan elhízott (III. fokozat)';
  };

  return (
    <div>
      <h2>Testtömegindex kalkulátor</h2>
      <form onSubmit={bmiKalkulator}>
        <div>
          <label>Magasság (cm): </label>
          <input
            type="number"
            value={magassag}
            onChange={(e) => setMagassag(e.target.value)}
          />
        </div>
        <div>
          <label>Tömeg (kg): </label>
          <input
            type="number"
            value={tomeg}
            onChange={(e) => setTomeg(e.target.value)}
          />
        </div>
        <button type="submit">Számítás</button>
      </form>
      {bmi && (
        <div>
          <p>A testtömegindexed: {bmi}</p>
          <p>Értékelés: {kategoria}</p>
        </div>
      )}
    </div>
  );
}

export default BMICalculator;