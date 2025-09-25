import React, { useState, useEffect } from "react";

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ author: "", content: "" });

  // Fetch reviews
  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  // Add Review
  const handleAddReview = () => {
    fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newReview) => {
        setReviews([...reviews, newReview]);
        setShowAddForm(false);
        setFormData({ author: "", content: "" });
      });
  };

  // Edit Review
  const handleEditReview = (id, updatedData) => {
    fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((updatedReview) => {
        setReviews((reviews) =>
          reviews.map((r) => (r.id === id ? updatedReview : r))
        );
      })
      .catch((err) => console.error("Error editing review:", err));
  };

  // Delete Review
  const handleDeleteReview = (id) => {
    fetch(`http://localhost:5000/api/reviews/${id}`, { method: "DELETE" })
      .then(() => setReviews(reviews.filter((r) => r.id !== id)));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Reviews 💬</h2>
      <button style={styles.addBtn} onClick={() => setShowAddForm(true)}>
        Add Review
      </button>
      {showAddForm && (
        <div style={styles.form}>
          <input
            name="author"
            placeholder="Your Name"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
            style={styles.input}
          />
          <textarea
            name="content"
            placeholder="Write your review..."
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            style={styles.textarea}
          />
          <div style={styles.formActions}>
            <button style={styles.saveBtn} onClick={handleAddReview}>
              Save
            </button>
            <button
              style={styles.cancelBtn}
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div style={styles.grid}>
        {reviews.length === 0 ? (
          <div style={styles.empty}>
            No reviews yet. Be the first to share your thoughts!
          </div>
        ) : (
          reviews.map((review, idx) => (
            <div key={review.id || idx} style={styles.card}>
              <div style={styles.avatar}>
                {review.author ? review.author.charAt(0).toUpperCase() : "U"}
              </div>
              <div style={styles.author}>{review.author || "Unknown"}</div>
              <div style={styles.content}>{review.content}</div>
              <div style={styles.actions}>
                <button
                  style={styles.editBtn}
                  onClick={() => handleEditReview(review.id, formData)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDeleteReview(review.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: "48px auto",
    maxWidth: "900px",
    padding: "40px 32px",
    background: "linear-gradient(120deg, #fc5c7d 0%, #6a82fb 100%)",
    borderRadius: "24px",
    boxShadow:
      "0 8px 32px rgba(106,130,251,0.12), 0 2px 8px rgba(252,92,125,0.08)",
  },
  heading: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "2rem",
    marginBottom: "32px",
    textAlign: "center",
    letterSpacing: "1px",
    textShadow: "0 2px 8px rgba(34,34,59,0.18)",
  },
  addBtn: {
    background: "#fff",
    color: "#fc5c7d",
    border: "none",
    borderRadius: "6px",
    padding: "10px 18px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "24px",
    boxShadow: "0 2px 8px rgba(252,92,125,0.08)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "24px",
    background: "#fff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 2px 8px rgba(106,130,251,0.08)",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #fc5c7d",
    fontSize: "1rem",
    outline: "none",
    background: "#f8f8f8",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #6a82fb",
    fontSize: "1rem",
    outline: "none",
    background: "#f8f8f8",
    minHeight: "80px",
  },
  formActions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
  },
  saveBtn: {
    background: "#6a82fb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  cancelBtn: {
    background: "#fc5c7d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "32px",
    marginTop: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 2px 8px rgba(106,130,251,0.08)",
    padding: "24px",
    textAlign: "left",
    position: "relative",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#fc5c7d",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "16px",
    right: "16px",
  },
  author: {
    color: "#fc5c7d",
    fontWeight: "bold",
    fontSize: "1.1rem",
    marginBottom: "8px",
  },
  content: {
    color: "#22223b",
    fontSize: "1rem",
    marginBottom: "12px",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "12px",
  },
  editBtn: {
    background: "#6a82fb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "7px 14px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#22223b",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "7px 14px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  empty: {
    color: "#fff",
    fontWeight: "500",
    fontSize: "1.2rem",
    textAlign: "center",
    gridColumn: "1/-1",
    marginTop: "32px",
  },
};

export default ReviewList;
