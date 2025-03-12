import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="header">
      <h1>Dynamic Portfolio Generator</h1>
      <div className="header-options">
        <select id="language-selector">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="fr">Bangla</option>
        </select>
        <button onClick={() => document.body.classList.toggle("dark-theme")}>
          Dark/Light Mode
        </button>

        {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
        {isAuthenticated && <button onClick={handleLogout}>Home</button>}
      </div>
    </header>
  );
};

export default Header;
