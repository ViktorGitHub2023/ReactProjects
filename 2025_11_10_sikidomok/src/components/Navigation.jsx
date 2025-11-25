import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/elmelet.css';

function Navigation() {
  return (
    <nav style={{ 
      maxWidth: '1200px',
      width: '1200px',
      margin: '20px auto',
      padding: '15px',
      backgroundColor: '#fff8f0',
      border: '2px solid #f0c040',
      borderRadius: '10px'
    }}>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: '20px'
      }}>
        <li>
          <Link to="/" style={{
            color: '#d17b00',
            textDecoration: 'none',
            fontSize: '16px'
          }}>Kezdőlap</Link>
        </li>
        <li>
          <Link to="/kor" style={{
            color: '#0077cc',
            textDecoration: 'none',
            fontSize: '18px'
          }}>Kör kalkulátor</Link>
        </li>
        <li>
          <Link to="/kor-elmelet" style={{
            color: '#0077cc',
            textDecoration: 'none',
            fontSize: '18px'
          }}>Kör</Link>
        </li>
        <li>
          <Link to="/teglalap" style={{
            color: '#0077cc',
            textDecoration: 'none',
            fontSize: '18px'
          }}>Téglalap kalkulátor</Link>
        </li>
        <li>
          <Link to="/teglalap-elmelet" style={{
            color: '#0077cc',
            textDecoration: 'none',
            fontSize: '18px'
          }}>Téglalap</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;