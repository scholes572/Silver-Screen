import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

function MovieList({ onAddToWatchlist }) {
  const [movies, setMovies] = useState([]);
  const [addMessage, setAddMessage] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", genre: "", year: "" });
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  
  useEffect(() => {
  fetch("http://localhost:5000/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  
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
        setAddMessage("Movie added successfully!");
        setTimeout(() => setAddMessage(""), 2500);
      });
  };

  
  const handleEditMovie = (id, updatedData) => {
  fetch(`http://localhost:5000/api/movies/${id}`, {
      method: "PATCH", 
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

  
  const handleDeleteMovie = (id) => {
  fetch(`http://localhost:5000/api/movies/${id}`, { method: "DELETE" })
      .then(() => setMovies(movies.filter((m) => m.id !== id)));
  };

  
  const filteredMovies = movies.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genreFilter ? m.genre === genreFilter : true;
    return matchesSearch && matchesGenre;
  });

  
  const genres = Array.from(new Set(movies.map(m => m.genre))).filter(Boolean);

  return (
    <div style={styles.container}>
      {addMessage && (
        <div style={{color: '#43a047', background: '#e8f5e9', padding: '10px', borderRadius: '8px', marginBottom: '12px', fontWeight: 'bold'}}>
          {addMessage}
        </div>
      )}
      <h2 style={styles.heading}>Movies 🎥</h2>
      <div style={{ display: "flex", gap: "16px", marginBottom: "18px", alignItems: "center", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #6a82fb", fontSize: "1rem", outline: "none", minWidth: "180px" }}
        />
        <select
          value={genreFilter}
          onChange={e => setGenreFilter(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #fc5c7d", fontSize: "1rem", outline: "none", minWidth: "140px", background: "#fff", color: "#fc5c7d", fontWeight: "bold" }}
        >
          <option value="">All Genres</option>
          {genres.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
      <button style={styles.addBtn} onClick={() => setShowAddForm(true)}>
        Add Movie
      </button>
      {showAddForm && (
        <div style={styles.form}>
          <input
            name="title"
            placeholder="Title"a
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <input
            name="genre"
            placeholder="Genre"
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
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            genre={movie.genre}
            year={movie.year}
            poster={movie.poster}
            average_rating={movie.average_rating}
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