from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


DATABASE_URL = "sqlite:///./test.db"    # Specifies the database URL; here, it's a SQLite database file named test.db

engine = create_engine(DATABASE_URL,
                       connect_args={"check_same_thread": False})   # Creates a SQLAlchemy engine
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)   # configures session factory
Base = declarative_base()   # Base class for our models
metadata = MetaData()   # optional metadata obkect for furhter customizations


def get_db():   # dependency to get a db session
  db = SessionLocal()    # create a new session
  try:
    yield db    # yield session
  finally:
    db.close()    # close the session regardless of outcome
