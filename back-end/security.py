from fastapi.security import OAuth2PasswordBearer
# from fastapi.security import OAuth2PasswordRequestForm
from passlib.context import CryptContext
from typing import Optional
from datetime import timedelta
from jose import jwt, JWTError, ExpiredSignatureError
from datetime import datetime
import os
from fastapi.security import HTTPBearer
# from fastapi import HTTPException
import schemas
from fastapi import Depends, status
from fastapi.security import HTTPAuthorizationCredentials


SECRET_KEY = os.environ.get("KEY", "someHardPassword#@GGWP@1357")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 6    # 3hrs


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
bearer = HTTPBearer()


def hash_password(password: str) -> str:
  return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
  try:
    return pwd_context.verify(plain_password, hashed_password)
  except Exception:
    return False


def get_token(credentials: HTTPAuthorizationCredentials = Depends(bearer)):
  return credentials.credentials


def create_access_token(email: str, expires_delta: Optional[timedelta] = None) -> str:
  if expires_delta:
    expires_on = datetime.utcnow() + expires_delta
  else:
    expires_on = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
  payload = {"sub": email,
             "exp": expires_on}

  token: str = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
  return token


def validate_token(token: str = Depends(get_token)) -> schemas.TokenPayload:
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
  except ExpiredSignatureError:
    # raise HTTPException(status_code=401, detail="Token has expired")
    return schemas.TokenPayload(validated=False, payload=None, status_code=status.HTTP_401_UNAUTHORIZED)
  except JWTError:
    # raise HTTPException(status_code=401,
    #                     details="could not validate credentials")
    return schemas.TokenPayload(validated=False, payload=None, status_code=status.HTTP_403_FORBIDDEN)
  return schemas.TokenPayload(validated=True, payload=payload)


if __name__ == "__main__":
  token = create_access_token(email="dummy@gmail.com")
  payload = validate_token(token)
  print(payload)
