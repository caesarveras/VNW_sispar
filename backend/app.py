from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config
from models import db
from routes.colaborador_routes import colaborador_bp
from routes.reembolso_routes import reembolso_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
db.init_app(app)

# Rotas
app.register_blueprint(colaborador_bp, url_prefix='/colaboradores')
app.register_blueprint(reembolso_bp, url_prefix='/reembolsos')

@app.route('/')
def index():
    return {"msg": "API SISPAR funcionando."}

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run()
