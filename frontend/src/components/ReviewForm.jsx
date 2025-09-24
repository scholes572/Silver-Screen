import React, { useState } from "react";

function ReviewForm({ onAddReview }) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!author || !content) return;

    const newReview = {
      id: Date.now(), // temporary unique ID
      author,
      content,
    };

    onAddReview(newReview);

    // reset form
    setAuthor("");
    setContent("");
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Your name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        style={styles.input}
      />
      <textarea
        placeholder="Write your review..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={styles.textarea}
      />
      <button type="submit" style={styles.button}>
        Submit Review
      </button>
    </form>
  );
}

const styles = {
  form: { display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" },
  input: { padding: "8px", borderRadius: "5px", border: "1px solid #ccc" },
  textarea: { padding: "8px", borderRadius: "5px", border: "1px solid #ccc", minHeight: "80px" },
  button: { padding: "10px", background: "#222", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
};

export default ReviewForm;