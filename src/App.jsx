import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Portfolio from "./pages/Portfolio";
import "./styles/global.css";
import Footer from "./components/Footer"; // Import Footer

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>   
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <main className="main-content"> {/* Ensures content fills available space */}
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/portfolio" element={isAuthenticated ? <Portfolio /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </main>
      <Footer /> {/* Stays at bottom */}
    </Router>
  );
};

export default App;
