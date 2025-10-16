import { useState } from "react";

export default function UjJarat() {
  const [ujJarat, setUjJarat] = useState({
    id: "",
    jaratSzam: "",
    jaratTipus: "T",
    elsoAjtos: "1",
  });
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUjJarat((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/jarat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ujJarat),
    })
      .then((res) => res.json())
      .then(() =>
      {
        setMessage("Járat sikeresen létrehozva!"),
        setUjJarat({ id: "", jaratSzam: "", jaratTipus: "T", elsoAjtos: "1" })
      }
      )
      .catch((error) => {
        console.error("Hiba történt:", error);
        setMessage("Hiba a járat létrehozásakor!");
      });
  };

  return (
        <div className="w-full p-5 bg-red-100">

 
{message && (
      <>
         <div className="flex-1">
           <label className="text-red-500">{message}</label>
           
         </div>
       </>
     )}

      <h1 className="text-2xl text-center p-2 text-red-800">Új járat</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center p-5">
        <label>Adja meg az Id-t</label>
        <input
          type="text"
          name="id"
          className="input input-bordered m-2"
          value={ujJarat.id}
          onChange={handleInputChange}
        />
        <label>Adja meg a járatszámot:</label>
        <input
          type="text"
          name="jaratSzam"
          className="input input-bordered m-2"
          value={ujJarat.jaratSzam}
          onChange={handleInputChange}
        />
        <label>A járat típusa:</label>
        <select
          name="jaratTipus"
          className="select select-bordered w-60"
          value={ujJarat.jaratTipus}
          onChange={handleInputChange}
        >
          <option value="M">Metró</option>
          <option value="T">Troli</option>
        </select>
        <label>Elsőajtós felszállás:</label>
        <select
          name="elsoAjtos"
          className="select select-bordered w-60"
          value={ujJarat.elsoAjtos}
          onChange={handleInputChange}
        >
          <option value="1">Igen</option>
          <option value="0">Nem</option>
        </select>
        <button type="submit" className="btn btn-secondary my-5">
          Küldés
        </button>
      </form>
    </div>
  );
}
