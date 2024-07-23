from pydantic import BaseModel


class ArticleBase(BaseModel):   # Base schema for article data
  title: str
  content: str
  image: str


class Article(ArticleBase):   # article schema
  # id: int

  class Config:
    from_attributes = True   # enables ORM mode for sqlalchmy modles
