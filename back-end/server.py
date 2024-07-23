from fastapi import FastAPI
from fastapi import Depends
# from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
import database
import schemas
import crud
from typing import List
import uvicorn
import models
import logging

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def get_db():   # dependency to get a db session
  db = database.SessionLocal()    # create a new session
  try:
    yield db    # yield session
  finally:
    db.close()    # close the session regardless of outcome


# Create database tables
try:
    models.Base.metadata.create_all(bind=database.engine)
    logger.info("Database tables created successfully.")
except Exception as e:
    logger.error(f"Error creating database tables: {e}")


@app.post("/articles/", response_model=schemas.Article)
def create_article(article: schemas.Article,
                   db: Session = Depends(get_db)):
  return crud.create_article(db=db, article=article)


@app.get("/articles/", response_model=List[schemas.Article])
def get_articles(skip: int = 0,
                 limit: int = 5,
                 db: Session = Depends(get_db)):
  articles = crud.get_articles(db=db, skip=skip, limit=limit)
  return articles


@app.get("/")
async def root():
  return {"message": "home page!"}


# @app.get("/deen")
# async def deen_page():
#   # with  open("deen.html") as f:
#     # return f.read()
#   return {"message": "deen page"}


# @app.get("/dunya")
# async def dunya_page():
#   # with  open("static/dunya.html") as f:
#     # return f.read()
#   return {"message": "dunya page"}


if __name__ == "__main__":
  uvicorn.run("server:app", host="127.0.0.1", port=9000, reload=True)
