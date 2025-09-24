import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import Watchlist from "./components/Watchlist";
import LoginPage from "./components/LoginPage";

const homeStyles = {
  margin: "40px auto",
  maxWidth: "400px",
  padding: "32px",
  background: "#fff",
  borderRadius: "16px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
  textAlign: "center",
  color: "#ad2b2bff",
  fontWeight: "bold",
  fontSize: "1.5rem"
};

const Home = () => (
  <div style={homeStyles}>
    Welcome to SilverScreen 🎬
  </div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;