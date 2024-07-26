from fastapi.security import OAuth2PasswordBearer
# from fastapi.security import OAuth2PasswordRequestForm
from passlib.context import CryptContext
from typing import Optional
from datetime import timedelta
from jose import jwt
from datetime import datetime


SECRET_KEY = ""
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def hash_password(password: str) -> str:
  return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
  return pwd_context.verify(plain_password, hashed_password)


def create_access_token(username: str, expires_delta: Optional[timedelta] = None) -> str:
  if expires_delta:
    expires_on = datetime.now() + expires_delta
  else:
    expires_on = datetime.now() + timedelta(ACCESS_TOKEN_EXPIRE_MINUTES)
  payload = {"sub": username,
             "exp": expires_on}

  token: str = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
  return token
