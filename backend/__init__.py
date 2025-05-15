from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    
    # Configurações
    app.config.from_object('backend.config.Config')
    
    # Inicializa extensões
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    
    # Registrar blueprints
    from backend.routes import main_bp
    app.register_blueprint(main_bp)
    
    return app