from backend.app import create_app
from backend.models import db, User, Movie, Review, Watchlist

app = create_app()
with app.app_context():
    print("Dropping all tables...")
    db.drop_all()

    print("Creating all tables...")
    db.create_all()

    
    user1 = User(username="dan", email="danstakus@gmail.com")
    user2 = User(username="bradley", email="bradleydan@gmail.com")

    db.session.add_all([user1, user2])
    db.session.commit()

    

    movie1 = Movie(title="Inception", genre="Sci-Fi", year=2010, poster="https://m.media-amazon.com/images/I/51oDg9QWQDL._AC_.jpg")
    movie2 = Movie(title="The Dark Knight", genre="Action", year=2008, poster="https://m.media-amazon.com/images/I/51EbJjlQJGL._AC_.jpg")
    movie3 = Movie(title="Interstellar", genre="Sci-Fi", year=2014, poster="https://m.media-amazon.com/images/I/71n58sHkJzL._AC_SY679_.jpg")
    movie4 = Movie(title="Parasite", genre="Thriller", year=2019, poster="https://m.media-amazon.com/images/I/81tC5lA4Q-L._AC_SY679_.jpg")
    movie5 = Movie(title="La La Land", genre="Romance", year=2016, poster="https://m.media-amazon.com/images/I/81A-mvlo+QL._AC_SY679_.jpg")
    movie6 = Movie(title="Avengers: Endgame", genre="Superhero", year=2019, poster="https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg")
    movie7 = Movie(title="Joker", genre="Drama", year=2019, poster="https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg")
    movie8 = Movie(title="Coco", genre="Animation", year=2017, poster="https://m.media-amazon.com/images/I/81v+QZc7VUL._AC_SY679_.jpg")
    movie9 = Movie(title="Get Out", genre="Horror", year=2017, poster="https://m.media-amazon.com/images/I/81kz03t2HPL._AC_SY679_.jpg")
    movie10 = Movie(title="Ford v Ferrari", genre="Biography", year=2019, poster="https://m.media-amazon.com/images/I/81F5Q2FQJGL._AC_SY679_.jpg")

    db.session.add_all([movie1, movie2, movie3, movie4, movie5, movie6, movie7, movie8, movie9, movie10])
    db.session.commit()

    
    review1 = Review(user_id=user1.id, movie_id=movie1.id, rating=5, comment="Mind-blowing!")
    review2 = Review(user_id=user2.id, movie_id=movie2.id, rating=4, comment="One of the best Batman movies.")
    review3 = Review(user_id=user1.id, movie_id=movie3.id, rating=5, comment="Amazing visuals and story.")

    db.session.add_all([review1, review2, review3])
    db.session.commit()

    
    wl1 = Watchlist(user_id=user1.id, movie_id=movie2.id, priority="High")
    wl2 = Watchlist(user_id=user2.id, movie_id=movie3.id, priority="Medium")

    db.session.add_all([wl1, wl2])
    db.session.commit()

    print(" Database seeded successfully!")
