import React, { useState } from "react";
import '../assets/style.css';

function Teglalap() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [terulet, setTerulet] = useState(null);
  const [kerulet, setKerulet] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const aOldal = parseFloat(a);
    const bOldal = parseFloat(b);

    {
      /* ha ugyanazokat a neveket használod (a és b), akkor a JavaScript nem tudja, hogy az új a és b változók a useState-ből jönnek, 
    vagy az újonnan létrehozott lokális változók. Ez névütközést okoz, és hibás működéshez vezethet. 
   
  const handleSubmit = (e) => {
     e.preventDefault();

     // Közvetlenül parseFloat-tal számolunk
     const t = parseFloat(a) * parseFloat(b);
     const k = 2 * (parseFloat(a) + parseFloat(b));

     setTerulet(t);
     setKerulet(k);
     };

    */
    }

    if (!isNaN(aOldal) && !isNaN(bOldal) && aOldal > 0 && bOldal > 0) {
      setTerulet(aOldal * bOldal);
      setKerulet(2 * (aOldal + bOldal));
    } else {
      alert("Kérlek, csak pozitív számokat adj meg!");
      setTerulet(null);
      setKerulet(null);
    }
  };

  return (
    <div className="container">
      <h2>Téglalap kalkulátor</h2>
      <form onSubmit={handleSubmit} className="form">
         <div className="form-group">
          <label>
            a oldal:
            <input
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              required
              min="1"
            />
          </label>
        </div>
         <div className="form-group">
          <label>
            b oldal:
            <input
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              required
              min="1"
            />
          </label>
        </div>
        <button type="submit" className="submit-button">Számítás</button>
      </form>
      {/* conditional or logical short-circuit evaluation */}
      {terulet !== null && kerulet !== null && (
        <div className="result">
          <p>Terület: {terulet} </p>
          <p>Kerület: {kerulet} </p>
        </div>
      )}

      {/* ternary operatorral feltétel kezelés 
      {terulet !== null && kerulet !== null ? (
           // IGAZ ág: Ha az adatok megvannak
       <div style={{ marginTop: "20px" }}>
          <p>Terület: {terulet} egység²</p>
          <p>Kerület: {kerulet} egység</p>
       </div> ) :
       (
          // HAMIS ág: Ha hiányzik legalább az egyik adat
        <p>Kérem adja meg a terület és a kerület adatait!</p>
       )}
      */}
    </div>
  );
}

export default Teglalap;
