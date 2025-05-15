from backend import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from typing import List

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    roles = db.Column(db.JSON, default=['user'])  # Armazena roles como array JSON
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean, default=True)

    # Relacionamentos
    projects = db.relationship('Project', backref='owner', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def has_role(self, role: str) -> bool:
        return role in self.roles

    def add_role(self, role: str):
        if role not in self.roles:
            self.roles.append(role)

    def remove_role(self, role: str):
        if role in self.roles:
            self.roles.remove(role)

    def __repr__(self):
        return f'<User {self.username}>'


class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    start_date = db.Column(db.DateTime, default=datetime.utcnow)
    end_date = db.Column(db.DateTime)
    status = db.Column(db.String(20), default='pending')  # pending, in_progress, completed
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Métodos utilitários
    def update_status(self, new_status: str):
        allowed_statuses = ['pending', 'in_progress', 'completed']
        if new_status in allowed_statuses:
            self.status = new_status

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'status': self.status,
            'owner_id': self.user_id
        }