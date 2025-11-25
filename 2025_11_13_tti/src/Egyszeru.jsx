import React, { useState } from "react";
import bodyCorrect from "./assets/body_correct.gif";
import bodyFat from "./assets/body_fat.gif";
import bodyThin from "./assets/body_thin.gif";

const kepValasztas = (testkep) => {
  if (testkep === "body_correct.gif") return bodyCorrect;
  if (testkep === "body_fat.gif") return bodyFat;
  if (testkep === "body_thin.gif") return bodyThin;
  return null;
};

function TtiSzamolo() {
  // Állapot az űrlap mezőkhöz
  const [testsuly, setTestsuly] = useState("");
  const [magassag, setMagassag] = useState("");

  // Állapot az eredményhez
  const [eredmeny, setEredmeny] = useState(null);

  // Állapot a hibákhoz
  const [hiba, setHiba] = useState("");

  // Űrlap küldése
  const kuldes = async () => {
    // Ellenőrzés: számok legyenek
    if (isNaN(testsuly) || isNaN(magassag)) {
      setHiba("Kérlek, csak számokat adj meg!");
      return;
    }

    setHiba(""); // Hibák törlése

    const url = `https://informatikaora.hu/webprog/tti.php?kg=${testsuly}&cm=${magassag}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Hiba történt: ${response.status}`);
      }

      const kapottAdatok = await response.json();
      setEredmeny(kapottAdatok);
    } catch (error) {
      setHiba(`Hiba történt: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Testtömeg Index Számoló</h1>

      {/* Űrlap */}
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Testsúly (kg):
          <input
            type="text"
            value={testsuly}
            onChange={(e) => setTestsuly(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Magasság (cm):
          <input
            type="text"
            value={magassag}
            onChange={(e) => setMagassag(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="button" onClick={kuldes}>
          Számol
        </button>
      </form>

      {/* Hibák megjelenítése */}
      {hiba && <p style={{ color: "red" }}>{hiba}</p>}

      {/* Eredmény megjelenítése */}
      {eredmeny && (
        <div>
          <h2>Eredmény:</h2>
          <p>
            Testkép:{" "}
            <img
              src={kepValasztas(eredmeny.testkep)}
              alt="Testkép"
              style={{ width: "100px" }}
            />
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
