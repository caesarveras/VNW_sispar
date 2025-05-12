from datetime import datetime
from backend import db

class Reembolso(db.Model):
    __tablename__ = 'reembolsos'

    id = db.Column(db.Integer, primary_key=True)
    nome_colaborador = db.Column(db.String(100), nullable=False)
    empresa = db.Column(db.String(100), nullable=False)
    numero_prestacao = db.Column(db.String(50), nullable=False, unique=True)
    data = db.Column(db.DateTime, default=datetime.utcnow)
    tipo_reembolso = db.Column(db.String(50), nullable=False)
    centro_custo = db.Column(db.String(50), nullable=False)
    ordem_interna = db.Column(db.String(50), nullable=False)
    divisao = db.Column(db.String(50), nullable=False)
    pep = db.Column(db.String(50), nullable=False)
    moeda = db.Column(db.String(10), nullable=False)
    distancia_km = db.Column(db.Float, nullable=False)
    valor_km = db.Column(db.Float, nullable=False)
    valor_faturado = db.Column(db.Float, nullable=False)
    despesa = db.Column(db.Float, nullable=False)
    colaborador_id = db.Column(db.Integer, db.ForeignKey('colaboradores.id'), nullable=False)
    status = db.Column(db.String(50), nullable=False)

    colaborador = db.relationship('Colaborador', backref='reembolsos')

    def __repr__(self):
        return f"<Reembolso {self.numero_prestacao}>"
