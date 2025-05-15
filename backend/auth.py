from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from backend import app

jwt = JWTManager(app)

def configure_auth(app):
    jwt.init_app(app)
    
    @app.route('/api/login', methods=['POST'])
    def login():
        auth_data = request.get_json()
        user = User.query.filter_by(username=auth_data['username']).first()
        
        if not user or not user.check_password(auth_data['password']):
            return jsonify({'error': 'Credenciais inválidas'}), 401
            
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'access_token': access_token,
            'user_id': user.id
        }), 200