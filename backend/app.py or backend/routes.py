from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///reviews.db'
db = SQLAlchemy(app)

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(80), nullable=False)
    content = db.Column(db.Text, nullable=False)

@app.route('/api/reviews', methods=['POST'])
def add_review():
    data = request.get_json()
    author = data.get('author')
    content = data.get('content')
    if not author or not content:
        return jsonify({"error": "Missing author or content"}), 400
    review = Review(author=author, content=content)
    db.session.add(review)
    db.session.commit()
    return jsonify({
        "id": review.id,
        "author": review.author,
        "content": review.content
    }), 201