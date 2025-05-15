from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from backend.models import User

def admin_required(f):
    """Requer que o usuário seja admin"""
    @wraps(f)
    def decorated(*args, **kwargs):
        verify_jwt_in_request()
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.is_admin:
            return jsonify({"error": "Acesso negado: requer privilégios de admin"}), 403
            
        return f(*args, **kwargs)
    return decorated

def json_required(f):
    """Requer que a requisição tenha conteúdo JSON"""
    @wraps(f)
    def decorated(*args, **kwargs):
        if not request.is_json:
            return jsonify({"error": "Content-Type deve ser application/json"}), 415
        return f(*args, **kwargs)
    return decorated

def role_required(role):
    """Requer que o usuário tenha um papel específico"""
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            user = User.query.get(user_id)
            
            if not user or role not in user.roles:
                return jsonify({"error": f"Acesso negado: requer papel de {role}"}), 403
                
            return f(*args, **kwargs)
        return decorated
    return decorator

def cache_control(max_age):
    """Define cabeçalhos Cache-Control"""
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            response = f(*args, **kwargs)
            response.headers['Cache-Control'] = f'public, max-age={max_age}'
            return response
        return decorated
    return decorator

def handle_errors(f):
    """Manipulador genérico de erros"""
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except ValueError as e:
            return jsonify({"error": str(e)}), 400
        except Exception as e:
            return jsonify({"error": "Erro interno do servidor"}), 500
    return decorated