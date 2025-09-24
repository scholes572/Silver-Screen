import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/movies")  // Flask endpoint
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Error fetching movies:", err));
  }, []);

  return (
    <div>
      <h2>Movie List 🎥</h2>
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  }
};

export default MovieList;