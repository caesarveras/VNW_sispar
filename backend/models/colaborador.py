from datetime import datetime
from backend import db

class Colaborador(db.Model):
    __tablename__ = 'colaboradores'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha = db.Column(db.String(255), nullable=False)
    cargo = db.Column(db.String(50), nullable=False)
    salario = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f"<Colaborador {self.nome}>"
