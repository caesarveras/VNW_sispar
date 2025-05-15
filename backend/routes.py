from flask import Blueprint, request, jsonify
from backend import db
from backend.models import User, Project
from backend.utils.validators import validate_request, USER_CREATION_SCHEMA
from backend.utils.decorators import admin_required, json_required, handle_errors
from werkzeug.security import generate_password_hash
from datetime import datetime

main_bp = Blueprint('main', __name__)

# Rotas de Usuário
@main_bp.route('/api/users', methods=['POST'])
@json_required
@validate_request(USER_CREATION_SCHEMA)
@handle_errors
def create_user():
    data = request.get_json()
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already exists'}), 409
        
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 409

    new_user = User(
        username=data['username'],
        email=data['email'],
        is_admin=data.get('is_admin', False)
    )
    new_user.set_password(data['password'])
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        'id': new_user.id,
        'username': new_user.username,
        'email': new_user.email
    }), 201


@main_bp.route('/api/users/<int:user_id>', methods=['GET'])
@handle_errors
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'is_admin': user.is_admin,
        'created_at': user.created_at.isoformat()
    })


# Rotas de Projeto
@main_bp.route('/api/projects', methods=['POST'])
@json_required
@handle_errors
def create_project():
    data = request.get_json()
    
    required_fields = ['name', 'user_id']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    user = User.query.get(data['user_id'])
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    new_project = Project(
        name=data['name'],
        description=data.get('description', ''),
        user_id=data['user_id']
    )
    
    db.session.add(new_project)
    db.session.commit()
    
    return jsonify(new_project.to_dict()), 201


@main_bp.route('/api/projects/<int:project_id>', methods=['GET'])
@handle_errors
def get_project(project_id):
    project = Project.query.get_or_404(project_id)
    return jsonify(project.to_dict())


# Rotas Admin
@main_bp.route('/api/admin/users', methods=['GET'])
@admin_required
@handle_errors
def get_all_users():
    users = User