from fastapi import FastAPI
from fastapi import Depends, Form, UploadFile, File, HTTPException
# from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
import database
import schemas
import crud
from typing import List
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import models
from log_handling.log_handling import logger
from utils.paths import R_IMAGES, RESOURCES
from pathlib import Path as pp
import traceback


app = FastAPI()

# Allow all origins for now, restrict this in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to the specific origin(s) you want to allow
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def prepare():
  if pp(RESOURCES).exists() is False:
    pp(RESOURCES).mkdir(parents=True, exist_ok=True)
  if pp(R_IMAGES).exists() is False:
    pp(R_IMAGES).mkdir(parents=True, exist_ok=True)

  # Create database tables
  try:
    models.Base.metadata.create_all(bind=database.engine)
    logger.info("Database tables created successfully.")
  except Exception as e:
    logger.error(f"Error creating database tables: {e}")


def get_db():   # dependency to get a db session
  db = database.SessionLocal()    # create a new session
  try:
    yield db    # yield session
  finally:
    db.close()    # close the session regardless of outcome


@app.post("/articles/", response_model=schemas.Article)
async def create_article(title: str = Form(...),
                         content: str = Form(...),
                         image: UploadFile = File(...),
                         db: Session = Depends(get_db)):
  logger.info("serving POST request for /articles/ ")
  try:
    image_path = f"{R_IMAGES}/{image.filename}"
    with open(image_path, "wb") as f:
      f.write(await image.read())
  except Exception:
    logger.error(traceback.format_exc())
    raise HTTPException(status_code=500,
                        detail="Internal Server Error")

  try:
    new_article = schemas.Article(title=title,
                                  content=content,
                                  image=image_path)
    return crud.create_article(db=db, article=new_article)
  except Exception:
    logger.error(traceback.format_exc())
    raise HTTPException(status_code=500,
                        detail="Internal Server Error")


@app.get("/articles/", response_model=List[schemas.Article])
def get_articles(skip: int = 0,
                 limit: int = 5,
                 db: Session = Depends(get_db)):
  logger.info("serving GET request for /articles/ ")
  articles = crud.get_articles(db=db, skip=skip, limit=limit)
  return articles


@app.get("/article/", response_model=schemas.Article)
def get_aricle(id: int,
               db: Session = Depends(get_db)):
  logger.info("serving GET request for /article/")
  article = crud.get_article(db=db, id=id)
  return article


@app.post("/auth/", response_model=bool)
async def auth(user: schemas.User):
  return True


@app.get("/")
async def root():
  return {"message": "home page!"}


@app.get("/dunya/")
async def dunya():
  return {"message": "home page!"}


@app.get("/deen/")
async def deen():
  return {"message": "home page!"}

prepare()


if __name__ == "__main__":
  uvicorn.run("server:app", host="127.0.0.1", port=9000, reload=True)
