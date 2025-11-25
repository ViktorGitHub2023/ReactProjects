import React, { useState } from 'react'
import '../assets/styles.css'

// Kedvencek és szintek listája (statikus tömbök)
const kedvencekTomb = ['html', 'css', 'js', 'mysql']
const szintTomb = ['junior', 'medior', 'senior']

export default function Form({ onSaved }) {
  // Állapotváltozók a form mezőkhöz
  const [nem, setNem] = useState('férfi')        // Nem (radio gomb)
  const [kedvencek, setKedvencek] = useState([]) // Kedvencek (select multiple)
  const [szint, setSzint] = useState([])         // Szint (checkbox)
  const [evek, setEvek] = useState(0)            // Évek (range slider)
  const [loading, setLoading] = useState(false)  // Betöltés állapota (submit gombhoz)

  // Többválasztós select mező kezelése
  const kedvencekChange = (e) => {
    // Kiválasztott opciók értékeinek tömbbé alakítása
    const options = Array.from(e.target.selectedOptions).map(o => o.value)
    setKedvencek(options)
  }

  // Checkbox mezők kezelése
  const szintChange = (e) => {
    const value = e.target.value
    if (e.target.checked) {
      // Ha be van pipálva, hozzáadjuk az értéket (duplikációk elkerülése Set-tel)
      setSzint(prev => Array.from(new Set([...prev, value])))
    } else {
      // Ha nincs bepipálva, eltávolítjuk az értéket
      setSzint(prev => prev.filter(x => x !== value))
    }
  }

  // Form elküldése (POST kérés)
  const submit = async (ev) => {
    ev.preventDefault() // Alapértelmezett submit viselkedés megakadályozása
    setLoading(true)    // Betöltés állapot bekapcsolása
    try {
      // Adatok küldése a backend API-ra
      await fetch('http://localhost:4000/api/velemenyek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nem, kedvencek, szint, evek })
      })
      // Form mezők alaphelyzetbe állítása
      setKedvencek([])
      setSzint([])
      setEvek(0)
      setNem('férfi')
      // Ha van onSaved callback, meghívjuk
      if (onSaved) onSaved()
    } catch (err) {
      console.error(err) // Hibakezelés
    }
    setLoading(false) // Betöltés állapot kikapcsolása
  }

  return (
    <form className="velemeny-form" onSubmit={submit}>
      {/* Nem választása (radio gombok) */}
      <label>Nem:</label>
      <div className="controls radio-group">
        <label>
          <input
            type="radio"
            name="nem"
            value="férfi"
            checked={nem === 'férfi'}
            onChange={() => setNem('férfi')}
          /> Férfi
        </label>
        <label>
          <input
            type="radio"
            name="nem"
            value="nő"
            checked={nem === 'nő'}
            onChange={() => setNem('nő')}
          /> Nő
        </label>
      </div>

      {/* Kedvencek választása (select multiple) */}
      <label>Kedvencek (több is választható):</label>
      <div className="controls">
        <select multiple value={kedvencek} onChange={kedvencekChange}>
          {kedvencekTomb.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Szint választása (checkboxok) */}
      <label>Szint (checkbox):</label>
      <div className="controls checkbox-group">
        {szintTomb.map(l => (
          <label key={l}>
            <input
              type="checkbox"
              value={l}
              checked={szint.includes(l)}
              onChange={szintChange}
            /> {l}
          </label>
        ))}
      </div>

      {/* Évek választása (range slider) */}
      <label>Évek: {evek}</label>
      <div className="controls">
        <input
          type="range"
          min="0"
          max="40"
          value={evek}
          onChange={(e) => setEvek(Number(e.target.value))}
        />
      </div>

      {/* Mentés gomb (loading állapot kezelésével) */}
      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? 'Mentés...' : 'Mentés'}
        </button>
      </div>
    </form>
  )
}
