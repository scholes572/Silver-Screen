import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>SilverScreen</h1>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/movies" style={styles.link}>Movies</Link>
        <Link to="/watchlist" style={styles.link}>Watchlist</Link>
        <Link to="/reviews" style={styles.link}>Reviews</Link>

        
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#222",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  link: {
    margin: "0 10px",
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
  }
};

export default Navbar;