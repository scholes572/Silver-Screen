import React from "react";

const styles = {
  container: {
    margin: "48px auto",
    maxWidth: "900px",
    padding: "40px 32px",
    background: "rgba(255,255,255,0.96)",
    borderRadius: "24px",
    boxShadow: "0 8px 32px rgba(252,92,125,0.12), 0 2px 8px rgba(106,130,251,0.08)",
    textAlign: "center"
  },
  heading: {
    color: "#fc5c7d",
    fontWeight: "bold",
    fontSize: "2rem",
    marginBottom: "24px",
    letterSpacing: "1px"
  },
  text: {
    color: "#6a82fb",
    fontSize: "1.15rem",
    fontWeight: "500"
  }
};

function Watchlist() {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Watchlist</h2>
      <p style={styles.text}>Movies you want to watch will appear here.</p>
    </div>
  );
}

export default Watchlist;