import { useEffect, useState } from "react";

export default function Kinalat() {
  const [kinalat, setKinalat] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/ingatlan");
        const data = await res.json();
        setKinalat(data);
      } catch (error) {
        console.error("Hiba történt:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-center text-body">Ajánlataink</h1>
      <div
        className="container"
        style={{
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <table class="table table-responsive">
          <thead class="table-success">
            <tr>
              <th className="align-middle text-center">Kategória</th>
              <th className="align-middle text-center">Leírás</th>
              <th className="align-middle text-center">Hírdetés dátuma</th>
              <th className="align-middle text-center">Tehermentes</th>
              <th className="align-middle text-center">Ár</th>
              <th className="align-middle text-center">Fénykép</th>
            </tr>
          </thead>
          <tbody>
            {kinalat.map((ingatlan) => (
              <tr  key={ingatlan.id}>
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
                    ALT="Nincs kép"
                    title={ingatlan.kepUrl}
                    onError={(e) => {
                        e.target.src = "alap.png";;
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
