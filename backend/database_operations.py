from app import db
from backend.models import User

def reset_database():
    """Cuidado! Isso apaga todos os dados"""
    db.drop_all()
    db.create_all()
    print("Banco de dados reiniciado")

def list_users():
    users = User.query.all()
    for user in users:
        print(user)