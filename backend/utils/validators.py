import re
from functools import wraps
from flask import request, jsonify
from datetime import datetime

def validate_email(email):
    """Valida o formato de um email"""
    regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    return re.match(regex, email)

def validate_password(password):
    """Valida a força da senha (mínimo 8 caracteres, 1 número, 1 maiúscula)"""
    if len(password) < 8:
        return False
    if not re.search("[0-9]", password):
        return False
    if not re.search("[A-Z]", password):
        return False
    return True

def validate_date(date_str, format='%Y-%m-%d'):
    """Valida se uma string é uma data válida"""
    try:
        datetime.strptime(date_str, format)
        return True
    except ValueError:
        return False

def validate_request(schema):
    """Decorador para validar o corpo da requisição contra um schema"""
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            data = request.get_json()
            errors = {}
            
            for field, validator in schema.items():
                if field not in data:
                    errors[field] = "Campo obrigatório"
                    continue
                    
                if not validator(data[field]):
                    errors[field] = f"Valor inválido para {field}"
            
            if errors:
                return jsonify({"errors": errors}), 400
                
            return f(*args, **kwargs)
        return wrapper
    return decorator

# Schemas de exemplo para validação
USER_CREATION_SCHEMA = {
    'username': lambda x: isinstance(x, str) and len(x) >= 3,
    'email': validate_email,
    'password': validate_password,
    'birth_date': lambda x: validate_date(x)
}