import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # PostgreSQL com DBeaver
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://vnw_user:senha_segura@localhost:5432/vnw_sispar')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'uma-chave-super-secreta')
    
    # Configurações do JWT (se for usar autenticação)
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-super-secret')
    JWT_ACCESS_TOKEN_EXPIRES = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 3600))