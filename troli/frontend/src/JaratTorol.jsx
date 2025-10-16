import { useEffect, useState } from "react";

function JaratTorol() {
  const cim = "Trolibusz járatok";
  const [jaratok, setJaratok] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchJaratok();
  }, []);

  const fetchJaratok = () => {
    fetch("http://localhost:8000/jaratok")
      .then((res) => res.json())
      .then((data) => setJaratok(data))
      .catch((error) => {
        console.error("Hiba történt:", error)
        setMessage("Hiba a járatok lekérdezésekor!");
      });
      
  };

  const torolJaratot = (id) => {
    fetch(`http://localhost:8000/jarat/${id}`, {  
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setJaratok((prevJaratok) => prevJaratok.filter((jarat) => jarat.id !== id));
        setMessage("Járat sikeresen törölve!");
      })
      .catch((error) => {
        console.error("Hiba történt:", error)
        setMessage("Hiba a járat törlésekor!");
    });
  };

  return (
    <>
      <div>
        <h1>{cim}</h1>
      </div>
        
      {message && (
       <>
          <div className="flex-1">
            <label className="text-red-500">{message}</label>
            
          </div>
        </>
      )}

      <div className="flex flex-wrap">
        {jaratok.map((jarat) => (
          <div key={jarat.id} className="card w-96 bg-red-200 shadow-xl m-5">
            <div className="card-body">
              <h2 className="card-title">{jarat.jaratSzam}</h2>
              <p>Járat típusa: {jarat.jaratTipus === "T" ? "Troli" : "Metro"}</p>
              <p>Elsőajtós felszállás: {jarat.elsoAjtos === "0" ? "Nem" : "Igen"}</p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => torolJaratot(jarat.id)}
              >
                Törlés
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default JaratTorol;
