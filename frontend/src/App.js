import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import Watchlist from "./components/Watchlist";
import ReviewList from "./components/ReviewList";

const Home = () => <h2>Welcome to SilverScreen 🎬</h2>;

function App() {
  return (
    <Router>
      <div>
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