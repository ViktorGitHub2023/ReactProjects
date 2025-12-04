import { useEffect, useState } from "react";

export default function AdminPatch() {
  const [kinalat, setKinalat] = useState([]);
  const [kategoriak, setKategoriak] = useState([]);
  const [szerkesztes, setSzerkesztes] = useState(null);
  const [eredeti, setEredeti] = useState(null); // az eredeti értékek

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resIngatlan = await fetch("http://localhost:5000/api/ingatlan");
        const dataIngatlan = await resIngatlan.json();
        setKinalat(dataIngatlan);

        const resKategoriak = await fetch("http://localhost:5000/api/kategoriak");
        const dataKategoriak = await resKategoriak.json();
        setKategoriak(dataKategoriak);
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
    // mély másolat, hogy legyen egy stabil "eredeti" snapshotunk
    const deepCopy = JSON.parse(JSON.stringify(ingatlan));
    setSzerkesztes(deepCopy);
    setEredeti(deepCopy);
  };

  // egységesítsük a típusokat a pontos összehasonlításhoz
  const normalizeValue = (key, value) => {
    switch (key) {
      case "kategoria":
      case "ar":
      case "tehermentes":
        return value === "" || value === null || value === undefined
          ? value
          : Number(value);
      case "hirdetesDatuma":
        // dátum string marad (YYYY-MM-DD)
        return value;
      case "leiras":
      case "kepUrl":
      default:
        return value;
    }
  };

  // csak a megváltozott kulcsok kerüljenek a PATCH payloadba
  const buildPatchPayload = (orig, edited) => {
    const modSzab = ["kategoria", "leiras", "hirdetesDatuma", "tehermentes", "ar", "kepUrl"];
    const patch = {};
    modSzab.forEach((key) => {
      const o = normalizeValue(key, orig[key]);
      const e = normalizeValue(key, edited[key]);
      if (e !== o) {
        patch[key] = e;
      }
    });
    return patch;
  };

  const handleSzerkesztesSubmit = async (event) => {
    event.preventDefault();
    if (!szerkesztes || !eredeti) return;

    const patchData = buildPatchPayload(eredeti, szerkesztes);

    if (Object.keys(patchData).length === 0) {
      alert("Nincs változás, nincs mit menteni.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/ingatlan/${szerkesztes.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patchData),
      });

      if (!response.ok) {
        throw new Error("Hiba a frissítésnél: " + response.status);
      }

      // helyi állapot frissítése – csak a változott mezők
      setKinalat((prev) =>
        prev.map((i) => {
          if (i.id !== szerkesztes.id) return i;

          const updated = { ...i, ...patchData };

          // ha kategoria ID változott, frissítsük a kategoriaNev-et is
          if (patchData.kategoria !== undefined) {
            const ujKat = kategoriak.find((kat) => kat.id === Number(patchData.kategoria));
            if (ujKat) {
              updated.kategoriaNev = ujKat.nev;
            }
          }

          return updated;
        })
      );

      setSzerkesztes(null);
      setEredeti(null);
    } catch (error) {
      console.error("Hiba történt a frissítésnél:", error);
      alert("Váratlan hiba történt a frissítésnél.");
    }
  };

  return (
    <>
      <h1 className="text-center text-body">Ajánlataink</h1>
      <div className="container" style={{ boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)" }}>
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
                <td className="align-middle text-center">{ingatlan.kategoriaNev}</td>
                <td className="align-middle text-center">{ingatlan.leiras}</td>
                <td className="align-middle text-center">{ingatlan.hirdetesDatuma}</td>
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
                    onError={(e) => {
                      e.target.src = "alap.png";
                    }}
                  />
                </td>
                <td className="align-middle text-center">
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => torolIngatlan(ingatlan.id)}
                  >
                    Törlés
                  </button>
                  <button className="btn btn-warning" onClick={() => szerkesztIngatlan(ingatlan)}>
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
              onChange={(e) =>
                setSzerkesztes({ ...szerkesztes, kategoria: Number(e.target.value) })
              }
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
              onChange={(e) =>
                setSzerkesztes({ ...szerkesztes, hirdetesDatuma: e.target.value })
              }
            />

            <label>Tehermentes:</label>
            <select
              className="form-control"
              value={szerkesztes.tehermentes}
              onChange={(e) =>
                setSzerkesztes({ ...szerkesztes, tehermentes: Number(e.target.value) })
              }
            >
              <option value={1}>Igen</option>
              <option value={0}>Nem</option>
            </select>

            <label>Ár:</label>
            <input
              type="number"
              className="form-control"
              value={szerkesztes.ar}
              onChange={(e) => setSzerkesztes({ ...szerkesztes, ar: Number(e.target.value) })}
            />

            <label>Kép URL:</label>
            <input
              type="text"
              className="form-control"
              value={szerkesztes.kepUrl}
              onChange={(e) => setSzerkesztes({ ...szerkesztes, kepUrl: e.target.value })}
            />

            <button type="submit" className="btn btn-primary mt-3">
              Mentés (PATCH)
            </button>
            <button
              type="button"
              className="btn btn-secondary mt-3 mx-2"
              onClick={() => {
                setSzerkesztes(null);
                setEredeti(null);
              }}
            >
              Mégse
            </button>
          </form>
        </div>
      )}
    </>
  );
}
