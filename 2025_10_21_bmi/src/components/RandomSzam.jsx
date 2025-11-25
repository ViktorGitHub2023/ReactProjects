import React from 'react';
import { useState } from 'react';

export default function RandomSzam() {
    const [randomSzam, setRandomSzam] = useState(null);
    
    const generalas = () => {
        const szam = Math.floor(Math.random() * 100) + 1; // 1 és 100 közötti véletlenszám
        setRandomSzam(szam);
    }
    const ertekeles = (szam) => {
        return szam >= 80 ? 'Kiváló' :
               szam >= 60 ? 'Jó' :
               szam >= 40 ? 'Közepes' :
               szam >= 20 ? 'Elégséges' :
               'Gyenge';
    }
return (
    <div>
        <h2>Véletlenszám generátor</h2>
        <button onClick={generalas}>Generálj véletlenszámot!</button>
        {randomSzam !== null && (
            <div>
                <p>A generált szám: {randomSzam}</p>
                <p>Értékelés: {ertekeles(randomSzam)}</p>
            </div>
        )}
    </div>
);
}
{/* A 'generalas' függvény fut le, amikor a felhasználó a gombra kattint. 
    Beállítja a létrehozott számot a useState() segítségével. Mivel az állapot megváltozik, 
    a React újrarendereli a komponenst a képernyőn az új értékkel.
    Az 'ertekeles' függvény egy feltételes (ternary) operátor-lánc segítségével megkapja a számot, 
    és visszatér a hozzá tartozó szöveges minősítéssel
    A komponens két fő dolgot jelenít meg: fejlécként a "Véletlenszám generátor" szöveget 
    és egy gombot a véletlenszám generálásához.
    Az eredmény csak akkor jelenik meg, ha már volt szám generálva. Kezdetben a randomSzam értéke null, 
    így a feltétel hamis, és az eredmény nem látszik.

    */}