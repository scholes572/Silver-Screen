import React, { useState } from "react";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      if (onLogin) {
        onLogin();
      }
    }, 1200);
  };

  return (
    <div style={styles.pageBg}>
      <div style={styles.container}>
        <h2 style={styles.title}>SilverScreen Login</h2>
        {success && (
          <div style={styles.successMsg}>Login successful! Redirecting...</div>
        )}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={styles.input}
            disabled={success}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={styles.input}
            disabled={success}
          />
          <button type="submit" style={styles.button} disabled={success}>
            Login
          </button>
        </form>
        <div style={styles.footer}>
          <span>🎬 Welcome to SilverScreen!</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageBg: {
    minHeight: "100vh",
    background: "linear-gradient(120deg, #ad2b2bff 0%, #22223b 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    maxWidth: "370px",
    width: "100%",
    margin: "auto",
    padding: "32px 24px",
    borderRadius: "16px",
    background: "#fff",
    boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
    textAlign: "center",
    position: "relative"
  },
  title: {
    marginBottom: "18px",
    color: "#ad2b2bff",
    fontWeight: "bold",
    fontSize: "2rem",
    letterSpacing: "1px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ad2b2bff",
    fontSize: "1rem",
    outline: "none",
    transition: "border 0.2s",
    background: "#f8f8f8"
  },
  button: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#ad2b2bff",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.1rem",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(173,43,43,0.08)",
    transition: "background 0.2s"
  },
  successMsg: {
    color: "#2e7d32",
    background: "#e8f5e9",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "12px",
    fontWeight: "bold"
  },
  footer: {
    marginTop: "22px",
    color: "#22223b",
    fontSize: "1rem"
  }
};

export default LoginPage;