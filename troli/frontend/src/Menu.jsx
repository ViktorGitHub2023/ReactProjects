import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UjJarat from "./UjJarat";
import Jaratok from './Jaratok';
import Main from './Kezdolap';
import JaratTorol from "./JaratTorol";
import JaratMod from "./JaratMod";
function Menu() {
  return (
    <>
    <BrowserRouter>
     {/* Navigációs sáv */}  

    <div className="navbar bg-red-200">
      <div className="navbar-start">
       
        <Link className="btn btn-ghost normal-case text-xl text-red-800" to="/kezdolap">Kezdőlap</Link>
        
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-red-800">
          <li>
           
            <Link to="/jaratok">Járatok</Link>
          </li>
          <li>
          <Link to="/ujjarat">Új járat</Link>
          </li>
          <li>
          <Link to="/jarattorol">Törlés</Link>
          </li>
          <li>
          <Link to="/jaratmod">Szerkesztés</Link>
          </li>
        </ul>
      </div>
    </div>
     {/* Oldalak */}         
     <Routes>
            <Route path="/ujjarat" element={<UjJarat />} />
            <Route path="/jaratok" element={<Jaratok />} />
            <Route path="/kezdolap" element={<Main />} />
            <Route path="/jarattorol" element={<JaratTorol />} /> 
            <Route path="/jaratmod" element={<JaratMod />} /> 
            
            <Route path="*" element={<Main />} />
          </Routes>
    </BrowserRouter>
    </>
  );
}
export default Menu;
