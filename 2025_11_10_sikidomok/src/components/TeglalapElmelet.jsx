import React from 'react';
import '../assets/elmelet.css';

function TeglalapElmelet() {
  return (
    <div className="theory-container">
      <h2>A téglalapról</h2>
      <div>
        <p>
          A téglalap egy négyszög, amelynek mind a négy szöge derékszög (90°). 
          Két-két szemközti oldala párhuzamos és egyenlő hosszúságú.
        </p>
        
        <h3>Fontos tulajdonságok:</h3>
        <ul>
          <li>Minden szöge 90° (derékszög)</li>
          <li>Átlói egyenlő hosszúak és felezik egymást</li>
          <li>Középpontosan szimmetrikus</li>
          <li>Tengelyesen szimmetrikus (4 szimmetriatengely)</li>
        </ul>

        <h3>Képletek:</h3>
        <p><strong>Kerület (K):</strong> K = 2 × (a + b)</p>
        <p><strong>Terület (T):</strong> T = a × b</p>
        <p><strong>Átló (d):</strong> d = √(a² + b²)</p>
        
        <h3>Alkalmazási területek:</h3>
        <ul>
          <li>Építészetben: alaprajzok, falak, ablakok tervezése</li>
          <li>Mindennapi életben: asztalok, képernyők, papírlapok</li>
          <li>Művészetben: keretek, vásznak méretezése</li>
          <li>Területszámításnál: telkek, szobák területének meghatározása</li>
        </ul>
      </div>
    </div>
  );
}

export default TeglalapElmelet;