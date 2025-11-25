import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Users from './components/Users';

function App() {
  return (
    
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />        
        {/* 404-es oldal */}
        <Route path="*" element={<NotFound />} />        
{/* Dinamikus útvonal */}
        <Route path="/user/:id" element={<Users />} />


      </Routes>
      </BrowserRouter>
    
  );
}

export default App;