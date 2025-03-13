import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth } from "./firebase/firebase.config.js"; // ✅ Correct import
import { onAuthStateChanged } from "firebase/auth"; // ✅ Import onAuthStateChanged separately

import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Portfolio from "./pages/Portfolio";
import "./styles/global.css";
import Footer from "./components/Footer";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // ✅ Set authentication state based on user
    });
    return () => unsubscribe(); // ✅ Cleanup function to prevent memory leaks
  }, []);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/portfolio" element={isAuthenticated ? <Portfolio /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
