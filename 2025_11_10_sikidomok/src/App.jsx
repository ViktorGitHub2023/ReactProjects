import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation'
import Kezdolap from './components/Kezdolap'
import Kor from './components/Kor'
import Elmelet from './components/KorElmelet'
import Teglalap from './components/Teglalap'
import TeglalapElmelet from './components/TeglalapElmelet'

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Kezdolap />} />
          <Route path="/kor" element={<Kor />} />
          <Route path="/kor-elmelet" element={<Elmelet />} />
          <Route path="/teglalap" element={<Teglalap />} />
          <Route path="/teglalap-elmelet" element={<TeglalapElmelet />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
