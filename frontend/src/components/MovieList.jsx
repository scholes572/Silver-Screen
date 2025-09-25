import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

function MovieList({ onAddToWatchlist }) {
  const [movies, setMovies] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", genre: "", year: "" });

  // Fetch movies
  useEffect(() => {
    fetch("http://localhost:5000/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  // Add Movie
  const handleAddMovie = () => {
    fetch("http://localhost:5000/api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newMovie) => {
        setMovies([...movies, newMovie]);
        setShowAddForm(false);
        setFormData({ title: "", genre: "", year: "" });
      });
      console.log(formData)
  };

  // Edit Movie
  const handleEditMovie = (id, updatedData) => {
    fetch(`http://localhost:5000/api/movies/${id}`, {
      method: "PATCH", // or "PUT" if your backend uses PUT
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then(res => res.json())
      .then(updatedMovie => {
        setMovies(movies =>
          movies.map(m => m.id === id ? updatedMovie : m)
        );
      })
      .catch(err => console.error("Error editing movie:", err));
  };

  // Delete Movie
  const handleDeleteMovie = (id) => {
    fetch(`http://localhost:5000/api/movies/${id}`, { method: "DELETE" })
      .then(() => setMovies(movies.filter((m) => m.id !== id)));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Movies 🎥</h2>
      <button style={styles.addBtn} onClick={() => setShowAddForm(true)}>
        Add Movie
      </button>
      {showAddForm && (
        <div style={styles.form}>
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <input
            name="genre"
            placeholder="genre"
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          />
          <input
            name="year"
            placeholder="year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          />
          <button onClick={handleAddMovie}>Save</button>
          <button onClick={() => setShowAddForm(false)}>Cancel</button>
        </div>
      )}
      <div style={styles.grid}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            genre={movie.genre}
            year={movie.year}
            onAddToWatchlist={() => onAddToWatchlist(movie)}
            onEdit={() => {
              setFormData({ title: movie.title, genre: movie.genre, year: movie.year });
              handleEditMovie(movie.id);
            }}
            onDelete={() => handleDeleteMovie(movie.id)}
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
    letterSpacing: "1px",
  },
  addBtn: {
    background: "#6a82fb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 18px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "24px",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "24px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "32px",
    marginTop: "20px",
  },
};

export default MovieList;
