from pydantic import BaseModel, EmailStr
from typing import Literal, Dict


class ArticleBase(BaseModel):   # Base schema for article data
  title: str
  brief: str
  content: str
  cover_image: str
  intermediate_image: str


class Article(ArticleBase):   # article schema
  # id: int

  class Config:
    from_attributes = True   # enables ORM mode for sqlalchmy modles


class SignupDetails(BaseModel):
  username: str
  email: EmailStr
  password: str


class SigninDetails(BaseModel):
  email: EmailStr
  password: str


class CrudResponse(BaseModel):
  response_code: Literal[0, 1]
  response_message: Literal["account already exist",
                            "account does not exist",
                            "account exists",
                            "successfuly signed-up",
                            "successfuly signed-in",
                            "signin failed",
                            "profile edited successfuly",
                            "wrong password",
                            "successfuly created article",
                            "fetched all articles",
                            "fetched article"]
  data: dict = {}


class Response(BaseModel):
  crud_response: CrudResponse | None
  token: str = ""


class Profile(BaseModel):
  username: str
  password: str
  about: str
  picture: str


class ClientSession(BaseModel):
  email: EmailStr
  token: str


class TokenPayload(BaseModel):
  validated: bool
  payload: Dict[str, str | int] | None
  status_code: int = 200
