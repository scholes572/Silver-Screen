from flask import Blueprint, request, jsonify
from backend.models import db, User, Movie, Review, Watchlist  # fixed import for package
from backend.schemas import (
    user_schema, users_schema,
    movie_schema, movies_schema,
    review_schema, reviews_schema,
    watchlist_schema, watchlists_schema
)  

api_bp = Blueprint("api", __name__)


@api_bp.route("/", methods=["GET"])
def root():
    return jsonify({"message": "Welcome to the Silver Screen API!"}), 200


@api_bp.route("/ping", methods=["GET"])
def ping():
    return jsonify({"message": "pong"}), 200



@api_bp.route("/movies", methods=["GET"])
def get_movies():
    movies = Movie.query.all()
    return movies_schema.jsonify(movies), 200

@api_bp.route("/movies", methods=["POST"])
def add_movie():
    data = request.get_json()
    title = data.get("title")
    genre = data.get("genre")
    year = data.get("year")
    poster = data.get("poster")

    if not title or not genre or not year:
        return jsonify({"error": "All fields are required"}), 400

    new_movie = Movie(title=title, genre=genre, year=year, poster=poster)
    db.session.add(new_movie)
    db.session.commit()
    return movie_schema.jsonify(new_movie), 201

@api_bp.route("/movies/<int:id>", methods=["DELETE"])
def delete_movie(id):
    movie = Movie.query.get(id)
    if not movie:
        return jsonify({"error": "Movie not found"}), 404
    db.session.delete(movie)
    db.session.commit()
    return jsonify({"message": "Movie deleted"}), 200


@api_bp.route("/movies/<int:id>", methods=["PATCH"])
def update_movie(id):
    movie = Movie.query.get(id)
    if not movie:
        return jsonify({"error": "Movie not found"}), 404

    data = request.get_json()
    movie.title = data.get("title", movie.title)
    movie.genre = data.get("genre", movie.genre)
    movie.year = data.get("year", movie.year)
    movie.poster = data.get("poster", movie.poster)

    db.session.commit()
    return movie_schema.jsonify(movie), 200



@api_bp.route("/reviews", methods=["GET"])
def get_reviews():
    reviews = Review.query.all()
    return reviews_schema.jsonify(reviews), 200

@api_bp.route("/reviews", methods=["POST"])
def add_review():
    data = request.get_json()
    user_id = data.get("user_id")
    movie_id = data.get("movie_id")
    rating = data.get("rating")
    text = data.get("text")  

    if not rating or not (1 <= int(rating) <= 5):
        return jsonify({"error": "Rating must be between 1 and 5"}), 400

    new_review = Review(user_id=user_id, movie_id=movie_id, rating=rating, text=text)
    db.session.add(new_review)
    db.session.commit()
    return review_schema.jsonify(new_review), 201

@api_bp.route("/reviews/<int:id>", methods=["PATCH"])
def update_review(id):
    review = Review.query.get(id)
    if not review:
        return jsonify({"error": "Review not found"}), 404

    data = request.get_json()
    review.rating = data.get("rating", review.rating)
    review.text = data.get("text", review.text)

    db.session.commit()
    return review_schema.jsonify(review), 200

@api_bp.route("/reviews/<int:id>", methods=["DELETE"])
def delete_review(id):
    review = Review.query.get(id)
    if not review:
        return jsonify({"error": "Review not found"}), 404
    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Review deleted"}), 200



@api_bp.route("/watchlist", methods=["GET"])
def get_watchlist():
    watchlist = Watchlist.query.all()
    return watchlists_schema.jsonify(watchlist), 200

@api_bp.route("/watchlist", methods=["POST"])
def add_watchlist_item():
    data = request.get_json()
    user_id = data.get("user_id")
    movie_id = data.get("movie_id")

    new_item = Watchlist(user_id=user_id, movie_id=movie_id)
    db.session.add(new_item)
    db.session.commit()
    return watchlist_schema.jsonify(new_item), 201

@api_bp.route("/watchlist/<int:id>", methods=["DELETE"])
def delete_watchlist_item(id):
    item = Watchlist.query.get(id)
    if not item:
        return jsonify({"error": "Watchlist item not found"}), 404
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Watchlist item deleted"}), 200
