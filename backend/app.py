
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from backend.models import db
from backend.schemas import ma


migrate = Migrate()


def create_app():
    app = Flask(__name__)

    
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///silverscreen.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    CORS(app)  

    
    from backend.routes import api_bp
    app.register_blueprint(api_bp, url_prefix="/api")

    
    @app.route("/")
    def root():
        return {"message": "Welcome to the Silver Screen API!"}, 200

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)