import React from "react";

function ReviewList({ reviews }) {
  return (
    <div style={styles.container}>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to add one!</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} style={styles.review}>
            <strong>{review.author}</strong>
            <p>{review.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: { marginTop: "20px" },
  review: { background: "#f9f9f9", padding: "10px", marginBottom: "10px", borderRadius: "5px" },
};

export default ReviewList;