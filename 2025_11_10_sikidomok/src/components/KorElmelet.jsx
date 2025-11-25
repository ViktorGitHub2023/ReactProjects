import React from 'react';
import '../assets/elmelet.css';

function Elmelet() {
  return (
    <div className="theory-container">
      <h2>A kör mint síkidom</h2>
      <p>
        A <strong>kör</strong> egy olyan síkidom, amelynek minden pontja egy adott ponttól, azaz a <em>középponttól</em> azonos távolságra van.
        Ezt a távolságot <strong>sugárnak</strong> nevezzük.
      </p>

      <h3>Alapfogalmak</h3>
      <ul>
        <li><strong>Sugár (r):</strong> A kör középpontjától a körvonalig mért távolság.</li>
        <li><strong>Átmérő (d):</strong> A kör két pontját összekötő szakasz, amely áthalad a középponton. Képlete: <code>d = 2r</code>.</li>
        <li><strong>Kerület (K):</strong> A körvonal hossza. Képlete: <code>K = 2πr</code>.</li>
        <li><strong>Terület (T):</strong> A kör által határolt síkidom területe. Képlete: <code>T = πr²</code>.</li>
      </ul>

      <h3>Fontos tudnivalók</h3>
      <p>
        A <strong>π (pi)</strong> egy matematikai állandó, amelynek értéke körülbelül <strong>3,1416</strong>. A körrel kapcsolatos számításokban gyakran használjuk.
      </p>

      <h3>Gyakorlati alkalmazások</h3>
      <p>
        A kör területének és kerületének kiszámítása fontos szerepet játszik a mérnöki, építészeti és természettudományos területeken.
      </p>
    </div>
  );
}

export default Elmelet;