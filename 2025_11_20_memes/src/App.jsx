import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [memes, setMemes] = useState([]);
  const [randomMeme, setRandomMeme] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  // Memék letöltése
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemes(data.data.memes));
  }, []);

  // Véletlen mém választása
  const getRandomMeme = () => {
    const rand = Math.floor(Math.random() * memes.length);
    setRandomMeme(memes[rand]);
  };

  return (
    <div className="container">
      <h1>Mém generátor</h1>

      <div className="inputs">
        <input
          type="text"
          placeholder="Felső szöveg"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Alsó szöveg"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />

        <button onClick={getRandomMeme}>Véletlen mém</button>
      </div>

      {randomMeme && (
        <div className="meme">
          <img src={randomMeme.url} alt="meme" />

          <h2 className="top">{topText}</h2>
          <h2 className="bottom">{bottomText}</h2>
        </div>
      )}
    </div>
  );
}

export default App;