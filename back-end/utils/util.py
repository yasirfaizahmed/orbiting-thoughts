from typing import Dict
from fastapi import Request, HTTPException


def model_to_dict(model_instance) -> Dict:
  return {column.name: getattr(model_instance, column.name) for column in model_instance.__table__.columns}


def get_email(request: Request):
  email = request.headers.get('email', None)
  if email is None:
    raise HTTPException(status_code=400, detail="X-User-Email header missing")
  return email
