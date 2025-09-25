import React, { useState } from "react";

function MovieCard({ id, title, genre, year, onEdit, onDelete, onAddToWatchlist, poster }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    title,
    genre,
    year,
  });

  const handleEditMovie = () => {
    if (onEdit) {
      onEdit(id, formData);
    }
    setShowEditForm(false);
  };

  return (
    <>
      {showEditForm && (
        <div style={styles.form}>
          <input
            name="title"
            placeholder="Title"
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
            placeholder="Year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          />
          <button onClick={handleEditMovie}>Save</button>
          <button onClick={() => setShowEditForm(false)}>Cancel</button>
        </div>
      )}
      <div style={styles.card}>
        {poster && (
          <img src={poster} alt={title + " poster"} style={{width: '120px', height: '180px', objectFit: 'cover', borderRadius: '12px', marginBottom: '10px', boxShadow: '0 2px 8px #6a82fb22'}} />
        )}
        <h3>{title}</h3>
        <p>{genre}</p>
        <p>{year}</p>
        <div style={styles.actions}>
          <button onClick={() => setShowEditForm(true)}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
        <button onClick={onAddToWatchlist} style={styles.addBtn}>
          Add to Watchlist
        </button>
      </div>
    </>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "16px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "12px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "16px",
    background: "#f8f8f8",
    padding: "16px",
    borderRadius: "8px",
  },
  addBtn: {
    marginTop: "12px",
    padding: "8px 16px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default MovieCard;