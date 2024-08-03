from typing import Dict
from fastapi import Request, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from security import bearer
import database
from sqlalchemy.orm import Session
import models


def model_to_dict(model_instance) -> Dict:
  return {column.name: getattr(model_instance, column.name) for column in model_instance.__table__.columns}


def get_token(credentials: HTTPAuthorizationCredentials = Depends(bearer)):
  return credentials.credentials


def get_email(request: Request):
  email = request.headers.get('email', None)
  if email is None:
    raise HTTPException(status_code=400, detail="X-User-Email header missing")
  return email


def get_current_user(token: str = Depends(get_token), email: str = Depends(get_email)):
  user = validate_token(token)