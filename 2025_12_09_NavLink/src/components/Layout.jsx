import { Outlet } from "react-router-dom";
import Navigation from "./Navigation.jsx";

export default function Layout() {
    return (
        <div className="layout">
            <header> <Navigation /> </header>
            <main className="main-content"><Outlet/></main>
            <footer className="footer"><p>Copyright...</p></footer>
        </div>
    )
}
