from flask_marshmallow import Marshmallow  # type: ignore
from backend.models import User, Movie, Review, Watchlist  # fixed import for package

# Initialize Marshmallow (will be hooked to app inside app.py)
ma = Marshmallow()


# ----------------------
# Schema Class Definitions
# ----------------------

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_fk = True
        load_instance = True


class MovieSchema(ma.SQLAlchemyAutoSchema):
    average_rating = ma.Method("get_average_rating")
    class Meta:
        model = Movie
        include_fk = True
        load_instance = True

    def get_average_rating(self, obj):
        return obj.average_rating


class ReviewSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Review
        include_fk = True
        load_instance = True
    created_at = ma.auto_field()


class WatchlistSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Watchlist
        include_fk = True
        load_instance = True


# ----------------------
# Schema Instances
# ----------------------

# Single object schemas
user_schema = UserSchema()
movie_schema = MovieSchema()
review_schema = ReviewSchema()
watchlist_schema = WatchlistSchema()

# Multiple object schemas
users_schema = UserSchema(many=True)
movies_schema = MovieSchema(many=True)
reviews_schema = ReviewSchema(many=True)
watchlists_schema = WatchlistSchema(many=True)
