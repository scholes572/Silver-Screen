import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/movies") 
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Error fetching movies:", err));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Movies 🎥</h2>
      <div style={styles.grid}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            poster={movie.poster}
            rating={movie.rating}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: "48px auto",
    maxWidth: "900px",
    padding: "40px 32px",
    background: "rgba(255,255,255,0.96)",
    borderRadius: "24px",
    boxShadow: "0 8px 32px rgba(106,130,251,0.12), 0 2px 8px rgba(252,92,125,0.08)",
  },
  heading: {
    color: "#6a82fb",
    fontWeight: "bold",
    fontSize: "2rem",
    marginBottom: "32px",
    textAlign: "center",
    letterSpacing: "1px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "32px",
    marginTop: "20px"
  }
};

export default MovieList;