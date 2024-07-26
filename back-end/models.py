from sqlalchemy import Column, String, Integer
# from sqlalchemy.dialects.sqlite import BLOB
from database import Base


class Article(Base):    # Article class inheriting from Base, which creates a table
  __tablename__ = "articles"    # Name of the table in database

  id = Column(Integer, primary_key=True, index=True)    # index column
  title = Column(String)    # title column
  content = Column(String)    # text content
  image = Column(String)    # file path


class User(Base):
  __tablename__ = "users"

  id = Column(Integer, primary_key=True, index=True)
  username = Column(String)
  email = Column(String)
  password = Column(String)
