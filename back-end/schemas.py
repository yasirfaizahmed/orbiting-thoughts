from pydantic import BaseModel
from typing import Literal


class ArticleBase(BaseModel):   # Base schema for article data
  title: str
  content: str
  image: str


class Article(ArticleBase):   # article schema
  # id: int

  class Config:
    from_attributes = True   # enables ORM mode for sqlalchmy modles


class SignupDetails(BaseModel):
  username: str
  email: str
  password: str


class SigninDetails(BaseModel):
  email: str
  password: str


class AuthResponse(BaseModel):
  response_code: Literal[0, 1]
  response_message: Literal["account already exists",
                            "account added"]
  token: str
