from sqlalchemy import Column, String, Integer, ForeignKey, JSON
# from sqlalchemy.dialects.sqlite import BLOB
from database import Base
from sqlalchemy.orm import relationship


class Article(Base):    # Article class inheriting from Base, which creates a table
  __tablename__ = "articles"    # Name of the table in database

  id = Column(Integer, primary_key=True, index=True)    # index column
  title = Column(String)    # title column
  brief = Column(String)
  content = Column(JSON)    # text content
  images = Column(JSON)
  profile_id = Column(Integer, ForeignKey("profiles.id"))
  user_id = Column(Integer, ForeignKey("users.id"))

  # Establish a one-to-one relationship with the Profile model
  profile = relationship("Profile", back_populates="articles")

  # Establish a one-to-one relationship with the User model
  author = relationship("User", back_populates="articles")


class User(Base):
  __tablename__ = "users"

  id = Column(Integer, primary_key=True, index=True)
  username = Column(String, unique=True)
  email = Column(String, unique=True)
  password = Column(String)

  # Establish a one-to-one relationship with the Profile model
  profile = relationship("Profile", back_populates="user", uselist=False)

  # Establish a one-to-one relationship with the Article model
  articles = relationship("Article", back_populates="author")


class Profile(Base):
  __tablename__ = "profiles"

  id = Column(Integer, primary_key=True, index=True)
  user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
  about = Column(String)
  picture = Column(String)

  # Establish a one-to-one relationship with the User model
  user = relationship("User", back_populates="profile")

  # Establish a one-to-one relationship with the Article model
  articles = relationship("Article", back_populates="profile")
