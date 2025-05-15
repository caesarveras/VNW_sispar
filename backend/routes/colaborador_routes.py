from flask import Blueprint, jsonify
from app.models.colaborador import Colaborador
from app.extensions import db

colaborador_bp = Blueprint('colaborador', __name__, url_prefix='/api/colaboradores')

@colaborador_bp.route('/', methods=['GET'])
def listar_colaboradores():
    colaboradores = Colaborador.query.all()
    return jsonify([colab.to_dict() for colab in colaboradores]), 200