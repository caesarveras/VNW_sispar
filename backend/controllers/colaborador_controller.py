from flask import request, jsonify
from backend import app, db
from backend.models.colaborador_model import Colaborador

@app.route('/colaboradores', methods=['POST'])
def cadastrar_colaborador():
    data = request.get_json()
    novo_colaborador = Colaborador(
        nome=data['nome'],
        email=data['email'],
        senha=data['senha'],
        cargo=data['cargo'],
        salario=data['salario']
    )
    db.session.add(novo_colaborador)
    db.session.commit()
    return jsonify({"message": "Colaborador cadastrado com sucesso!"}), 201

@app.route('/colaboradores', methods=['GET'])
def listar_colaboradores():
    colaboradores = Colaborador.query.all()
    return jsonify([colaborador.nome for colaborador in colaboradores])
