Dark - light theme beállítása, mentés localStorage-ba

Értéke mentése localStorage-be: 

import { useState, useEffect } from "react";

export default function Egyszeru() {
  //const [tartalom, setTartalom] = useState(100); kezdőértékkel
  const [tartalom, setTartalom] = useState("");

  localStorage.setItem("teszt", JSON.stringify(100));

  //kiolvasás
  useEffect(() => {    
    const ertek = JSON.parse(localStorage.getItem("teszt"));
    console.log(typeof ertek);
    
    if (ertek) {
      setTartalom(ertek);
    }
  }, []);
  return <div>{tartalom}</div>;
}

