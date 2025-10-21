import { useState } from "react";
export default function RandomSzam(){
    const [randomSzam,setRandomSzam] = useState(null);
    const generalas = ()=> {
        const szam = Math.floor((Math.random()*100)+1);
        setRandomSzam(szam)
    }

    const ertekeles = (szam)=> {
        return szam >=80 ? 'jeles':
               szam >=60 ? 'jó':
               szam >=40 ? 'közepes':
               szam >=20 ? 'elégséges':
                            'elégtelen'
    }
    return(
        <div>
            <button onClick={generalas} > Start! </button>
            {randomSzam !== null && (
                <div>
                    <p>Generált szám: {randomSzam} </p>
                    <p>Értékelés: {ertekeles(randomSzam)} </p>
                </div>
            )}
        </div>
    )
}