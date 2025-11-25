import React, { useState } from 'react'
import '../assets/styles.css'

const kedvencekTomb = ['html', 'css', 'js', 'mysql']
const szintTomb = ['junior', 'medior', 'senior']

export default function Form({ onSaved }) {
  const [nem, setNem] = useState('férfi')
  const [kedvencek, setKedvencek] = useState([])
  const [szint, setSzint] = useState([])
  const [evek, setEvek] = useState(0)
  const [loading, setLoading] = useState(false)

  const kedvencekChange = (e) => {
    const options = Array.from(e.target.selectedOptions).map(o => o.value)
    setKedvencek(options)
  }

  const szintChange = (e) => {
    const value = e.target.value
    if (e.target.checked) setSzint(prev => Array.from(new Set([...prev, value])))
    else setSzint(prev => prev.filter(x => x !== value))
  }

  const submit = async (ev) => {
    ev.preventDefault()
    setLoading(true)
    try {
      await fetch('http://localhost:4000/api/velemenyek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nem, kedvencek, szint, evek })
      })
      setKedvencek([])
      setSzint([])
      setEvek(0)
      setNem('férfi')
      if (onSaved) onSaved()
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  return (
    <form className="velemeny-form" onSubmit={submit}>
      <label>Nem:</label>
      <div className="controls radio-group">
        <label><input type="radio" name="nem" value="férfi" checked={nem === 'férfi'} onChange={() => setNem('férfi')} /> Férfi</label>
        <label><input type="radio" name="nem" value="nő" checked={nem === 'nő'} onChange={() => setNem('nő')} /> Nő</label>
      </div>

      <label>Kedvencek (több is választható):</label>
      <div className="controls">
        <select multiple value={kedvencek} onChange={kedvencekChange}>
          {kedvencekTomb.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>

      <label>Szint (checkbox):</label>
      <div className="controls checkbox-group">
        {szintTomb.map(l => (
          <label key={l}><input type="checkbox" value={l} checked={szint.includes(l)} onChange={szintChange} /> {l}</label>
        ))}
      </div>

      <label>Évek: {evek}</label>
      <div className="controls">
        <input type="range" min="0" max="40" value={evek} onChange={(e) => setEvek(Number(e.target.value))} />
      </div>

      <div className="form-actions">
        <button type="submit" disabled={loading}>{loading ? 'Mentés...' : 'Mentés'}</button>
      </div>
    </form>
  )
}
