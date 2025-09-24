import React from "react";

function MovieCard({ title, poster, rating }) {
  return (
    <div style={styles.card}>
      <img src={poster} alt={title} style={styles.poster} />
      <h3>{title}</h3>
      <p>⭐ {rating}</p>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "10px",
    textAlign: "center",
    background: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  poster: {
    width: "100%",
    borderRadius: "8px"
  }
};

export default MovieCard;