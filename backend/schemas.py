from flask_marshmallow import Marshmallow  # type: ignore
from backend.models import User, Movie, Review, Watchlist  


ma = Marshmallow()




class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_fk = True
        load_instance = True


class MovieSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Movie
        include_fk = True
        load_instance = True


class ReviewSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Review
        include_fk = True
        load_instance = True


class WatchlistSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Watchlist
        include_fk = True
        load_instance = True



user_schema = UserSchema()
movie_schema = MovieSchema()
review_schema = ReviewSchema()
watchlist_schema = WatchlistSchema()

# Multiple object schemas
users_schema = UserSchema(many=True)
movies_schema = MovieSchema(many=True)
reviews_schema = ReviewSchema(many=True)
watchlists_schema = WatchlistSchema(many=True)
