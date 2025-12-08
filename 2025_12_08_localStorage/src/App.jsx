import { use, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import ThemeToggle from "./ThemeToggle";

function App() {
  // false - light, true - dark
  const [isDark, setIsDark] = useLocalStorage("prefers-dark", false);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <>
      <div className="app">
        <header className="header">
          <h1>React – Dark/Light téma mentéssel (localStorage)</h1>
          <ThemeToggle isDark={isDark} onChange={setIsDark} />
        </header>

        <main className="content">
          <p>
            Válts témát a checkbox-szal! A beállításod elmentésre kerül a{" "}
            <code>localStorage</code>-ba, így újratöltéskor is megmarad.
          </p>

          <section className="card">
            <h2>Példa kártya</h2>
            <p>
              Ez a kártya a CSS változók alapján alkalmazkodik a jelenlegi
              témához. Próbáld ki a váltást!
            </p>
            <button className="btn">Gomb</button>
          </section>
        </main>

        <footer className="footer">
          <small>Oktató: Oktató neve — Békéscsaba</small>
        </footer>
      </div>
    </>
  );
}

export default App;
