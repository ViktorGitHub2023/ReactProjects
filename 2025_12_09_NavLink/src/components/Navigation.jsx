import { NavLink, useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <nav className="navigation">
        <div className="nav-links">
            <NavLink
             to="/dashboard"
             className={({ isActive})=> 
             isActive ? "nav-link active" : "nav-link"
             }>
                Irányítópult
            </NavLink>

            <button onClick={handleLogout} className="btn btn-secondary">
                Kijelentjezés
            </button>
        </div>
    </nav>
  )
}