import { useEffect, useState } from "react";


  function Jaratok() {
    const cim ="Trolibusz járatok";
    const [jaratok, setJaratok] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:8000/jaratok")
        .then((res) => res.json())
        .then((data) => setJaratok(data))
        .catch((error) => console.error("Hiba történt:", error));
    }, []);
 
    return (
        <>
        <div><h1>{cim}</h1></div>
      <div className="flex flex-wrap">
        {jaratok.map((jarat) => (
          <div key={jarat.id} className="card w-96 bg-red-900 shadow-xl m-5">
            <div className="card-body">
              <h2 className="card-title">{jarat.jaratSzam}</h2>
              <p>Járat típusa: {jarat.jaratTipus === "T" ? "Troli" : "Metro"}</p>
              <p>Elsőajtós felszállás: {jarat.elsoAjtos === "0" ? "Nem" : "Igen"}</p>
             
            </div>
          </div>
        ))}
      </div></>
    );
  }
  export default Jaratok