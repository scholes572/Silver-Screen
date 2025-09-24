from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()



class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)

    
    reviews = db.relationship("Review", back_populates="user", cascade="all, delete-orphan")
    watchlist = db.relationship("Watchlist", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User {self.username}>"


class Movie(db.Model):
    __tablename__ = "movies"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    genre = db.Column(db.String(50))
    year = db.Column(db.Integer)

    # Relationships
    reviews = db.relationship("Review", back_populates="movie", cascade="all, delete-orphan")
    watchlisted_by = db.relationship("Watchlist", back_populates="movie", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Movie {self.title}>"


# ----------------------
# Review Model
# ----------------------
class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)  # 1–5
    text = db.Column(db.Text, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey("movies.id"), nullable=False)

    # Relationship
    user = db.relationship("User", back_populates="reviews")
    movie = db.relationship("Movie", back_populates="reviews")

    def __repr__(self):
        return f"<Review {self.rating} stars>"



class Watchlist(db.Model):
    __tablename__ = "watchlist"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey("movies.id"), nullable=False)

    user = db.relationship("User", back_populates="watchlist")
    movie = db.relationship("Movie", back_populates="watchlisted_by")

    def __repr__(self):
        return f"<Watchlist User {self.user_id} Movie {self.movie_id}>"
