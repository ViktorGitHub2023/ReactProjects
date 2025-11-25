import React from 'react'
import '../assets/styles.css'

export default function List({ items }) {
  return (
    <div className="velemeny-list">
      <h2>Adatbázis tartalma</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>nem</th>
            <th>kedvencek</th>
            <th>szint</th>
            <th>evek</th>
          </tr>
        </thead>
        <tbody>
          {items.map(it => (
            <tr key={it.id}>
              <td>{it.id}</td>
              <td>{it.nem}</td>
              <td>{it.kedvencek}</td>
              <td>{it.szint}</td>
              <td>{it.evek}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
