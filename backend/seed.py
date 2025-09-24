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

    
    movie1 = Movie(title="Inception", genre="Sci-Fi", release_year=2010)
    movie2 = Movie(title="The Dark Knight", genre="Action", release_year=2008)
    movie3 = Movie(title="Interstellar", genre="Sci-Fi", release_year=2014)

    db.session.add_all([movie1, movie2, movie3])
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
