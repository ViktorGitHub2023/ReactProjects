import React, { useState } from "react";
import "./Tti.css";
import bodyCorrect from "./assets/body_correct.gif";
import bodyFat from "./assets/body_fat.gif";
import bodyThin from "./assets/body_thin.gif";

function TtiSzamolo() {
  const [urlapAdatok, urlapAdatokBeallit] = useState({
    testsuly: "",
    magassag: "",
  });
  const [eredmeny, setEredmeny] = useState(null);
  const [hiba, setHiba] = useState("");

  const inputValtozas = (e) => {
    // OnChange eserményre fut le, frissül az állapot, az e az maga az űrlap mező
    const { name, value } = e.target;
    urlapAdatokBeallit((prev) => ({ ...prev, [name]: value })); // Mindig az utolsó állapot értékét másolja az objektumba
  }; // Ezután csak az aktuálisan módosított mezőt ([name]: value) írja felül az új értékkel.
  // A visszaadott objektum ({ ...prev, [name]: value }) lesz az új állapot. Így csak az adott mező értéke változik, miközben a többi mező értéke érintetlen marad.
  // Az első mezőbe (testsuly) beírja: 70
  // Az esemény így néz ki: e.target.name = "testsuly", e.target.value = "70"

  const handleSubmit = async (e) => {
    e.preventDefault(); // megakadályozza, hogy a böngésző újratöltse az oldalt

    const { testsuly, magassag } = urlapAdatok;

    // Hibakezelés
    if (testsuly <= 0 || magassag <= 0) {
      setHiba("Az értékeknek pozitívnak kell lenniük!");
      return;
    }

    setHiba(""); // Hibák törlése

    const url = `https://informatikaora.hu/webprog/tti.php?kg=${testsuly}&cm=${magassag}`;

    try {
      const valasz = await fetch(url);
      if (!valasz.ok) throw new Error(`Hiba történt: ${valasz.status}`);

      const data = await valasz.json();
      setEredmeny(data);
    } catch (error) {
      setHiba(`Hiba történt: ${error.message}`);
    }
  };

  const getKepForTestkep = (testkep) => {
    switch (testkep) {
      case "body_correct.gif":
        return bodyCorrect;
      case "body_fat.gif":
        return bodyFat;
      case "body_thin.gif":
        return bodyThin;
      default:
        return null; // Ha nem található kép
    }
  };

  const inputMezo = (label, name, value) => (
    <div className="form-group">
      <label>
        {label}
        <input
          type="number"
          name={name}
          value={value}
          onChange={inputValtozas}
          required
          min="1"
          max="200"
        />
      </label>
    </div>
  );

  return (
    <div className="container">
      <h1>Testtömeg index kalkulátor</h1>
      <form onSubmit={handleSubmit}>
        {inputMezo("Testsúly (kg):", "testsuly", urlapAdatok.testsuly)}
        {inputMezo("Magasság (cm):", "magassag", urlapAdatok.magassag)}
        <button type="submit">Számol</button>
      </form>

      {hiba && <p className="error">{hiba}</p>}

      {eredmeny && (
        <div className="result">
          <h2>Eredmény:</h2>
          <p>
            Testkép:{" "}
            {eredmeny.testkep && (
              <img src={getKepForTestkep(eredmeny.testkep)} alt="Testkép" />
            )}
          </p>
          <p>Magasság: {eredmeny.cm} cm</p>
          <p>Súly: {eredmeny.kg} kg</p>
          <p>Testtömeg index: {eredmeny.tti}</p>
          <p>Testalkat minősítése: {eredmeny.minosites}</p>
          <p>Többlet: {eredmeny.tobblet}</p>
        </div>
      )}
    </div>
  );
}

export default TtiSzamolo;
