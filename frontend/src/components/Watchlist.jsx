import React from "react";

const styles = {
  container: {
    margin: "48px auto",
    maxWidth: "900px",
    padding: "40px 32px",
    background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
    borderRadius: "24px",
    boxShadow: "0 8px 32px rgba(252,92,125,0.12), 0 2px 8px rgba(106,130,251,0.08)",
    textAlign: "center",
    border: "2px solid #fc5c7d"
  },
  heading: {
    color: "#fc5c7d",
    fontWeight: "bold",
    fontSize: "2.2rem",
    marginBottom: "24px",
    letterSpacing: "1px",
    textShadow: "0 2px 8px #fc5c7d22"
  },
  text: {
    color: "#6a82fb",
    fontSize: "1.18rem",
    fontWeight: "500",
    margin: "12px 0",
    padding: "10px 18px",
    background: "#f3f6fd",
    borderRadius: "8px",
    boxShadow: "0 1px 4px #6a82fb22"
  }
};

function Watchlist({ watchlist }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Watchlist</h2>
      {watchlist && watchlist.length > 0 ? (
        watchlist.map((movie, idx) => (
          <div key={idx} style={styles.text}>
            <strong>{movie.title}</strong> ({movie.year}) - {movie.genre}
          </div>
        ))
      ) : (
        <p style={styles.text}>Movies you want to watch will appear here.</p>
      )}
    </div>
  );
}

export default Watchlist;