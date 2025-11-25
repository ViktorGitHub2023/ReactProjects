import React, { useState } from "react";

function UrlapAdatok() {
  // Állapot az űrlaphoz
  const [adatok, setAdatok] = useState({
    marka: "",
    uzemanyag: "",
    extrak: [],
    teljesitmeny: 100,
    megjegyzes: "",
  });

  // Radio és select mezők frissítése
  const kezeldValtozast = (e) => {
    const { name, value } = e.target;
    setAdatok((prev) => ({ ...prev, [name]: value }));
  };

  // Checkbox frissítése (több érték)
  const kezeldCheckbox = (e) => {
    const { value, checked } = e.target;
    setAdatok((prev) => {
      const extrak = checked
        ? [...prev.extrak, value]
        : prev.extrak.filter((item) => item !== value);
      return { ...prev, extrak };
    });
  };

  // Range slider frissítése
  const kezeldRange = (e) => {
    setAdatok((prev) => ({ ...prev, teljesitmeny: parseInt(e.target.value) }));
  };

  // Textarea frissítése
  const kezeldTextarea = (e) => {
    setAdatok((prev) => ({ ...prev, megjegyzes: e.target.value }));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Gépjármű tulajdonságai</h1>

      
      <form>
        
        <div>
          <label>
            Válassz márkát:
            <select name="marka" value={adatok.marka} onChange={kezeldValtozast}>
              <option value="">-- Válassz --</option>
              <option value="Audi">Audi</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Toyota">Toyota</option>
            </select>
          </label>
        </div>

        
        <div>
          <p>Üzemanyag típusa:</p>
          <label>
            <input
              type="radio"
              name="uzemanyag"
              value="Benzin"
              checked={adatok.uzemanyag === "Benzin"}
              onChange={kezeldValtozast}
            />
            Benzin
          </label>
          <label>
            <input
              type="radio"
              name="uzemanyag"
              value="Dízel"
              checked={adatok.uzemanyag === "Dízel"}
              onChange={kezeldValtozast}
            />
            Dízel
          </label>
          <label>
            <input
              type="radio"
              name="uzemanyag"
              value="Elektromos"
              checked={adatok.uzemanyag === "Elektromos"}
              onChange={kezeldValtozast}
            />
            Elektromos
          </label>
        </div>

        
        <div>
          <p>Extrák:</p>
          <label>
            <input
              type="checkbox"
              name="extrak"
              value="Klíma"
              checked={adatok.extrak.includes("Klíma")}
              onChange={kezeldCheckbox}
            />
            Klíma
          </label>
          <label>
            <input
              type="checkbox"
              name="extrak"
              value="Navigáció"
              checked={adatok.extrak.includes("Navigáció")}
              onChange={kezeldCheckbox}
            />
            Navigáció
          </label>
          <label>
            <input
              type="checkbox"
              name="extrak"
              value="Bőrülés"
              checked={adatok.extrak.includes("Bőrülés")}
              onChange={kezeldCheckbox}
            />
            Bőrülés
          </label>
        </div>

        
        <div>
          <label>
            Teljesítmény (LE): {adatok.teljesitmeny}
            <input
              type="range"
              min="50"
              max="500"
              value={adatok.teljesitmeny}
              onChange={kezeldRange}
            />
          </label>
        </div>

        
        <div>
          <label>
            Megjegyzés:
            <textarea
              value={adatok.megjegyzes}
              onChange={kezeldTextarea}
              rows="4"
              cols="40"
            />
          </label>
        </div>
      </form>

      
      <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
        <h2>Megadott adatok:</h2>
        <p><strong>Márka:</strong> {adatok.marka}</p>
        <p><strong>Üzemanyag:</strong> {adatok.uzemanyag}</p>
        <p><strong>Extrák:</strong> {adatok.extrak.join(", ") || "Nincs"}</p>
        <p><strong>Teljesítmény:</strong> {adatok.teljesitmeny} LE</p>
        <p><strong>Megjegyzés:</strong> {adatok.megjegyzes}</p>
      </div>
    </div>
  );
}

export default UrlapAdatok;