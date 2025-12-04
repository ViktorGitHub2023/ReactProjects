import { BrowserRouter, Route, Routes, Link, Outlet } from "react-router-dom";
import Kinalat from "./Kinalat2";
import UjHirdetes from "./UjHirdetes";
import Admin from "./Admin";
import AdminPatch from "./AdminPatch";

export default function Main() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Fő útvonal, ami a Layout komponenst rendereli */}
                <Route path="/" element={<Layout />}>
                    {/* Index route, ami alapértelmezettként a Container div-et jeleníti meg */}
                    <Route index element={<Fooldal />} />
                    <Route path="/offers" element={<Kinalat />} />
                    <Route path="/newad" element={<UjHirdetes />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/adminpatch" element={<AdminPatch />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

// Layout komponens, ami a közös elemeket (pl. a menüt) tartalmazza
function Layout() {
    return (
        <div>
            
            {/* Az aktuális komponens (Kinalat vagy UjHirdetes) ide kerül */}
            <Outlet />
        </div>
    );
}

// Komponens a Container div tartalmához
function Fooldal() {
    return (
        <div className="container">
                <div className="start w-100">
                    <h1 className="text-center pt-2 pt-lg-4">Á.L.B. Ingatlanügynöség</h1>
                    <div className="row">
                        <div className="col-12 col-sm-6 text-center">
                            <Link className="btn btn-primary" to="/offers">Nézze meg kínálatunkat!</Link>
                        </div>
                        <div className="col-12 col-sm-6 text-center">
                            <Link className="btn btn-primary" to="/newad">Hirdessen nálunk!</Link>
                            <Link className="btn btn-primary" to="/admin">Adminisztráció</Link>
                            <Link className="btn btn-primary" to="/adminpatch">Adminisztráció II.</Link>
                        </div>
                    </div>
                </div>
            </div>
    );
}