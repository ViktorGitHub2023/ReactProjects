import { useEffect, useState } from "react";

function JaratMod() {
  const cim = "Trolibusz járatok";
  const [jaratok, setJaratok] = useState([]);
  const [szerkesztettJarat, setSzerkesztettJarat] = useState(null);
  const [form, setForm] = useState({ jaratSzam: "", jaratTipus: "", elsoAjtos: "" });

  useEffect(() => {
    frissitJaratok();
  }, []);

  const frissitJaratok = () => {
    fetch("http://localhost:8000/jaratok")
      .then((res) => res.json())
      .then((data) => setJaratok(data))
      .catch((error) => console.error("Hiba történt:", error));
  };

  const handleEditClick = (jarat) => {
    setSzerkesztettJarat(jarat.id);
    setForm({ jaratSzam: jarat.jaratSzam, jaratTipus: jarat.jaratTipus, elsoAjtos: jarat.elsoAjtos });
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    fetch(`http://localhost:8000/jarat/${szerkesztettJarat}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        setSzerkesztettJarat(null);
        frissitJaratok();
      })
      .catch((error) => console.error("Hiba történt:", error));
  };

  return (
    <>
      <div>
        <h1>{cim}</h1>
      </div>
      <div className="flex flex-wrap">
        {jaratok.map((jarat) => (
          <div key={jarat.id} className="card w-96 bg-red-900 shadow-xl m-5">
            <div className="card-body">
              {szerkesztettJarat === jarat.id ? (
                <>
                  <input
                    type="text"
                    name="jaratSzam"
                    value={form.jaratSzam}
                    onChange={handleInputChange}
                    className="input input-bordered mb-2"
                  />
                  <select name="jaratTipus" value={form.jaratTipus} onChange={handleInputChange} className="select select-bordered mb-2">
                    <option value="T">Troli</option>
                    <option value="M">Metro</option>
                  </select>
                  <select name="elsoAjtos" value={form.elsoAjtos} onChange={handleInputChange} className="select select-bordered mb-2">
                    <option value="1">Igen</option>
                    <option value="0">Nem</option>
                  </select>
                  <button onClick={handleSave} className="btn btn-success">Mentés</button>
                </>
              ) : (
                <>
                  <h2 className="card-title">{jarat.jaratSzam}</h2>
                  <p>Járat típusa: {jarat.jaratTipus === "T" ? "Troli" : "Metro"}</p>
                  <p>Elsőajtós felszállás: {jarat.elsoAjtos === "0" ? "Nem" : "Igen"}</p>
                  <button onClick={() => handleEditClick(jarat)} className="btn btn-warning">Szerkesztés</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default JaratMod;
