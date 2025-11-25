import React from 'react';
import '../assets/elmelet.css';

function Kezdolap() {
  return (
    <div className="theory-container">
      <h2>Síkidom terület, kerület kalkulátor</h2>
      <div>
        <p>
          Üdvözöljük a Síkidom terület, kerület Kalkulátor alkalmazásban! Ez a projekt különböző síkidomok
          tulajdonságainak számítására és megismerésére szolgál. Ez meg itt a rizsa, ami kitölti a teret.
        </p>

        <h3>A projektben elérhető komponensek:</h3>
        
        <div style={{marginBottom: '20px'}}>
          <h4>Kör</h4>
          <ul>
            <li>Kör kerület és terület kalkulátor</li>
            <li>Elméleti összefoglaló a körről</li>
          </ul>
        </div>

        <div style={{marginBottom: '20px'}}>
          <h4>Téglalap</h4>
          <ul>
            <li>Téglalap kerület és terület kalkulátor</li>
            <li>Elméleti összefoglaló a téglalapról</li>
          </ul>
        </div>

        <h3>Használati útmutató:</h3>
        <ol>
          <li>Válassza ki a kívánt síkidomot (kör vagy téglalap)</li>
          <li>Adja meg a szükséges méreteket (sugár vagy oldalak)</li>
          <li>A kalkulátor gomb megnyomásával azonnal megkapja az eredményeket</li>
          <li>Az elméleti részben további információkat talál az adott síkidomról</li>
        </ol>

        <p style={{marginTop: '20px'}}>
          <strong>Tipp:</strong> Minden számolásnál lehetőség van tizedes törtek megadására is!
        </p>
      </div>
    </div>
  );
}

export default Kezdolap;