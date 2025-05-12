from flask import request, jsonify
from backend import app, db
from backend.models.reembolso_model import Reembolso

@app.route('/reembolsos', methods=['POST'])
def solicitar_reembolso():
    data = request.get_json()
    novo_reembolso = Reembolso(
        nome_colaborador=data['nome_colaborador'],
        empresa=data['empresa'],
        numero_prestacao=data['numero_prestacao'],
        tipo_reembolso=data['tipo_reembolso'],
        centro_custo=data['centro_custo'],
        ordem_interna=data['ordem_interna'],
        divisao=data['divisao'],
        pep=data['pep'],
        moeda=data['moeda'],
        distancia_km=data['distancia_km'],
        valor_km=data['valor_km'],
        valor_faturado=data['valor_faturado'],
        despesa=data['despesa'],
        colaborador_id=data['colaborador_id'],
        status=data['status']
    )
    db.session.add(novo_reembolso)
    db.session.commit()
    return jsonify({"message": "Reembolso solicitado com sucesso!"}), 201

@app.route('/reembolsos/<int:id>', methods=['GET'])
def visualizar_reembolso(id):
    reembolso = Reembolso.query.get_or_404(id)
    return jsonify({
        "nome_colaborador": reembolso.nome_colaborador,
        "empresa": reembolso.empresa,
        "numero_prestacao": reembolso.numero_prestacao,
        "status": reembolso.status
    })
