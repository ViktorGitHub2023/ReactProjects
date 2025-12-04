import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UjHirdetes() {
  const [kategoriak, setKategoriak] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    kategoriaId: 0,
    leiras: "",
    hirdetesDatuma: getCurrentDate(),
    tehermentes: false,
    ar: 0,
    kepUrl: "",
  });

  useEffect(() => {
    const fetchKategoriak = async () => {
      try {
        setError(null);
        const res = await fetch("http://localhost:5000/api/kategoriak");
        if (!res.ok) {
          throw new Error(`Hálózati hiba: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setKategoriak(data);
        console.log(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchKategoriak();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // szám típusoknál alakítsuk számmá
    const nextValue =
      type === "checkbox"
        ? checked
        : name === "ar" || name === "kategoriaId"
        ? Number(value)
        : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: nextValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validáció: ne lehessen üres adatokat beküldeni
    if (
      formData.kategoriaId === 0 ||
      formData.leiras.trim() === "" ||
      formData.ar <= 0
    ) {
      alert("Kérjük, töltse ki az összes kötelező mezőt!");
      return;
    }

    try {
      setError(null);

      const res = await fetch("http://localhost:5000/api/ujingatlan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kategoria: formData.kategoriaId,
          leiras: formData.leiras,
          hirdetesDatuma: formData.hirdetesDatuma,
          tehermentes: formData.tehermentes,
          ar: formData.ar,
          kepUrl: formData.kepUrl,
        }),
      });

      if (!res.ok) {
        // ha a backend hibát ad, próbáljuk kiolvasni a hibaüzenetet
        let details = "";
        try {
          const errData = await res.json();
          details =
            typeof errData === "string"
              ? errData
              : JSON.stringify(errData, null, 2);
        } catch {
          // ha nem json, hagyjuk üresen
        }
        throw new Error(
          `Küldési hiba: ${res.status} ${res.statusText}${
            details ? ` | ${details}` : ""
          }`
        );
      }

      // Ha van válasz JSON, és szükséges, itt fel tudod dolgozni:
      // const result = await res.json();

      console.log("Sikeresen elküldve");
      alert("Sikeresen elküldve!");
      navigate("/"); // Navigálás a főoldalra

      // űrlap alaphelyzetbe
      setFormData({
        kategoriaId: 0,
        leiras: "",
        hirdetesDatuma: getCurrentDate(),
        tehermentes: false,
        ar: 0,
        kepUrl: "",
      });
    } catch (err) {
      setError(err);
    }
  };

  // Függvény az aktuális dátum lekéréséhez YYYY-MM-DD formátumban
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <div className="container">
        <h1 className="text-center text-body">Új hirdetés</h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="offset-lg-3 offset-md-2 col-lg-6 col-md-8 col-12">
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Ingatlan kategóriája
                </label>
                <select
                  className="form-select"
                  name="kategoriaId"
                  value={formData.kategoriaId}
                  onChange={handleChange}
                >
                  <option value={0}>Kérem válasszon</option>
                  {kategoriak.length > 0 &&
                    kategoriak.map((kat) => (
                      <option key={kat.id} value={kat.id}>
                        {kat.nev}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Hirdetés dátuma
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="hirdetesDatuma"
                  value={formData.hirdetesDatuma}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Ingatlan leírása
                </label>
                <textarea
                  className="form-control"
                  name="leiras"
                  rows="3"
                  value={formData.leiras}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="tehermentes"
                  checked={formData.tehermentes}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="creditFree">
                  Tehermentes ingatlan
                </label>
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Ingatlan ára
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="ar"
                  value={formData.ar}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="pictureUrl" className="form-label">
                  Fénykép az ingatlanról
                </label>
                <input
                  type="url"
                  className="form-control"
                  name="kepUrl"
                  value={formData.kepUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 text-center">
                <button type="submit" className="btn btn-primary px-5">
                  Küldés
                </button>
              </div>

              {error && (
                <div
                  className="alert alert-danger alert-dismissible"
                  role="alert"
                >
                  <strong>Hiba:</strong> {error.message}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
