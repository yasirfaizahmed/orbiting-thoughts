from pydantic import BaseModel, EmailStr
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
  email: EmailStr
  password: str


class SigninDetails(BaseModel):
  email: EmailStr
  password: str


<<<<<<< HEAD
class AccountCrudResponse(BaseModel):
=======
<<<<<<< Updated upstream
class AuthResponse(BaseModel):
>>>>>>> 93ac9e5 (Added model to dict util, get_profile ednpoint)
  response_code: Literal[0, 1]
  response_message: Literal["account already exist",
                            "account does not exist",
                            "successfuly signed-up",
                            "successfuly signed-in",
                            "signin failed",
                            "profile edited successfuly"]


class Response(BaseModel):
  account_crud_response: AccountCrudResponse
  token: str
=======
class CrudResponse(BaseModel):
  response_code: Literal[0, 1]
  response_message: Literal["account already exist",
                            "account does not exist",
                            "account exists",
                            "successfuly signed-up",
                            "successfuly signed-in",
                            "signin failed",
                            "profile edited successfuly"]
  data: dict = {}


class Response(BaseModel):
  crud_response: CrudResponse
  token: str = ""
>>>>>>> Stashed changes


class Profile(BaseModel):
  username: str
  email: EmailStr
  password: str
  about: str
  picture: str


class ClientSession(BaseModel):
  email: EmailStr
  token: str
