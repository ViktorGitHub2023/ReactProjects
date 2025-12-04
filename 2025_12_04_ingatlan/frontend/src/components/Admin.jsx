import { useEffect, useState } from "react";

export default function Admin() {
  const [kinalat, setKinalat] = useState([]);
  const [kategoriak, setKategoriak] = useState([]);
  const [szerkesztes, setSzerkesztes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ingatlanValasz = await fetch("http://localhost:5000/api/ingatlan");
        const ingatlanAdatok = await ingatlanValasz.json();
        setKinalat(ingatlanAdatok);

        const kategoriakValasz = await fetch("http://localhost:5000/api/kategoriak");
        const kategoriakAdat = await kategoriakValasz.json();
        setKategoriak(kategoriakAdat);
      } catch (error) {
        console.error("Hiba történt:", error);
      }
    };

    fetchData();
  }, []);

  const torolIngatlan = async (id) => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt az ingatlant?")) return;

    try {
      await fetch(`http://localhost:5000/api/ingatlan/${id}`, { method: "DELETE" });
      setKinalat(kinalat.filter((ingatlan) => ingatlan.id !== id));
    } catch (error) {
      console.error("Hiba történt a törlésnél:", error);
    }
  };

  const szerkesztIngatlan = (ingatlan) => {
    setSzerkesztes(ingatlan);
  };

  const handleSzerkesztesSubmit = async (event) => {
    event.preventDefault();

    try {
      await fetch(`http://localhost:5000/api/ingatlan/${szerkesztes.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(szerkesztes),
      });

      setKinalat(kinalat.map((i) => (i.id === szerkesztes.id ? szerkesztes : i)));
      setSzerkesztes(null);
    } catch (error) {
      console.error("Hiba történt a frissítésnél:", error);
    }
  };

  return (
    <>
      <h1 className="text-center text-body">Ajánlataink</h1>
      <div
        className="container"
        style={{ boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)" }}
      >
        <table className="table table-responsive">
          <thead className="table-success">
            <tr>
              <th className="align-middle text-center">Kategória</th>
              <th className="align-middle text-center">Leírás</th>
              <th className="align-middle text-center">Hirdetés dátuma</th>
              <th className="align-middle text-center">Tehermentes</th>
              <th className="align-middle text-center">Ár</th>
              <th className="align-middle text-center">Fénykép</th>
              <th className="align-middle text-center">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {kinalat.map((ingatlan) => (
              <tr key={ingatlan.id}>
                <td className="align-middle text-center">
                  {ingatlan.kategoriaNev}
                </td>
                <td className="align-middle text-center">{ingatlan.leiras}</td>
                <td className="align-middle text-center">
                  {ingatlan.hirdetesDatuma}
                </td>
                <td className="align-middle text-center">
  {Number(ingatlan.tehermentes) === 0 ? (
    <span style={{ color: "red" }}>Nem</span>
  ) : (
    <span style={{ color: "green" }}>Igen</span>
  )}
</td>
                <td className="align-middle text-center">{ingatlan.ar}</td>
                <td className="align-middle text-center">
                  <img
                    style={{ maxHeight: "250px" }}
                    src={ingatlan.kepUrl}
                    alt="Nincs kép"
                    title={ingatlan.kepUrl}
                    onError={(e) => { e.target.src = "alap.png"; }}
                  />
                </td>
                <td className="align-middle text-center">
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => torolIngatlan(ingatlan.id)}
                  >
                    Törlés
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => szerkesztIngatlan(ingatlan)}
                  >
                    Szerkesztés
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {szerkesztes && (
        <div className="container mt-4">
          <h2>Ingatlan szerkesztése</h2>
          <form onSubmit={handleSzerkesztesSubmit}>
            <label>Kategória:</label>
            <select
              className="form-control"
              value={szerkesztes.kategoria}
              onChange={(e) => setSzerkesztes({ ...szerkesztes, kategoria: e.target.value })}
            >
              {kategoriak.map((kat) => (
                <option key={kat.id} value={kat.id}>
                  {kat.nev}
                </option>
              ))}
            </select>

            <label>Leírás:</label>
            <input
              type="text"
              className="form-control"
              value={szerkesztes.leiras}
              onChange={(e) => setSzerkesztes({ ...szerkesztes, leiras: e.target.value })}
            />

            <label>Hirdetés dátuma:</label>
            <input
              type="date"
              className="form-control"
              value={szerkesztes.hirdetesDatuma}
              onChange={(e) => setSzerkesztes({ ...szerkesztes, hirdetesDatuma: e.target.value })}
            />

            <label>Tehermentes:</label>
            <select
              className="form-control"
              value={szerkesztes.tehermentes}
              onChange={(e) => setSzerkesztes({ ...szerkesztes, tehermentes: e.target.value })}
            >
              <option value="1">Igen</option>
              <option value="0">Nem</option>
            </select>

            <label>Ár:</label>
            <input
              type="number"
              className="form-control"
              value={szerkesztes.ar}
              onChange={(e) => setSzerkesztes({ ...szerkesztes, ar: e.target.value })}
            />

            <label>Kép URL:</label>
            <input
              type="text"
              className="form-control"
              value={szerkesztes.kepUrl}
              onChange={(e) => setSzerkesztes({ ...szerkesztes, kepUrl: e.target.value })}
            />

            <button type="submit" className="btn btn-primary mt-3">Mentés</button>
            <button
              type="button"
              className="btn btn-secondary mt-3 mx-2"
              onClick={() => setSzerkesztes(null)}
            >
              Mégse
            </button>
          </form>
        </div>
      )}
    </>
  );
}
