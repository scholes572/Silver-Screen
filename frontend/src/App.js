import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import Watchlist from "./components/Watchlist";
import LoginPage from "./components/LoginPage";
import ReviewList from "./components/ReviewList";


// Updated background: vibrant blue-purple gradient
const pageBg = {
  minHeight: "100vh",
  background: "linear-gradient(120deg, #6a82fb 0%, #fc5c7d 100%)",
  padding: "0",
  margin: "0"
};

const homeStyles = {
  margin: "48px auto",
  maxWidth: "500px",
  padding: "48px 32px",
  background: "rgba(255,255,255,0.96)",
  borderRadius: "24px",
  boxShadow: "0 8px 32px rgba(106,130,251,0.12), 0 2px 8px rgba(252,92,125,0.08)",
  textAlign: "center",
  color: "#6a82fb",
  fontWeight: "bold",
  fontSize: "2.1rem",
  letterSpacing: "1px",
  position: "relative"
};

const accentCircle = {
  position: "absolute",
  top: "-36px",
  left: "-36px",
  width: "72px",
  height: "72px",
  background: "radial-gradient(circle, #fc5c7d 70%, #fff 100%)",
  borderRadius: "50%",
  opacity: 0.18,
  zIndex: 0
};

const accentCircle2 = {
  position: "absolute",
  bottom: "-28px",
  right: "-28px",
  width: "56px",
  height: "56px",
  background: "radial-gradient(circle, #6a82fb 70%, #fff 100%)",
  borderRadius: "50%",
  opacity: 0.13,
  zIndex: 0
};

const taglineStyles = {
  color: "#22223b",
  fontWeight: "500",
  fontSize: "1.2rem",
  marginTop: "18px",
  marginBottom: "10px",
  letterSpacing: "0.5px"
};

const emojiStyles = {
  fontSize: "2.5rem",
  marginTop: "18px"
};

const Home = () => (
  <div style={pageBg}>
    <div style={{ position: "relative" }}>
      <div style={accentCircle}></div>
      <div style={accentCircle2}></div>
      <div style={homeStyles}>
        <div style={emojiStyles}>🎬🍿</div>
        Welcome to <span style={{ color: "#fc5c7d" }}>SilverScreen</span>
        <div style={taglineStyles}>
          Discover, track, and enjoy your favorite movies in style!
        </div>
        <div style={{ marginTop: "28px", fontSize: "1.1rem", color: "#6a82fb", fontWeight: "500" }}>
          Start exploring now!
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Router>
      <div style={pageBg}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/reviews" element={<ReviewList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;