from fastapi import FastAPI
from fastapi import Depends, Form, UploadFile, File, HTTPException, status
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
from utils.paths import ARTICLE_IMAGES, RESOURCES, PROFILE_PICTURES
from pathlib import Path as pp
import traceback
import security


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
  if pp(ARTICLE_IMAGES).exists() is False:
    pp(ARTICLE_IMAGES).mkdir(parents=True, exist_ok=True)
  if pp(PROFILE_PICTURES).exists() is False:
    pp(PROFILE_PICTURES).mkdir(parents=True, exist_ok=True)

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


@app.post("/signup/", response_model=schemas.Response)
async def signup(signup_details: schemas.SignupDetails,
                 db: Session = Depends(get_db)):
  logger.info("serving POST request for /signup/ ")
  auth_response: schemas.CrudResponse = crud.try_signup(db=db,
                                                        signup_details=signup_details)
  if auth_response.response_code == 1:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                        detail=auth_response.response_message)

  # create JWT
  token: str = security.create_access_token(email=signup_details.email)
  response = schemas.Response(crud_response=auth_response,
                              token=token)
  return response


@app.post("/signin/", response_model=schemas.Response)
async def signin(signin_details: schemas.SigninDetails,
                 db: Session = Depends(get_db)):
  logger.info("serving POST request for /signin/ ")
  auth_response: schemas.CrudResponse = crud.try_signin(db=db,
                                                        signin_details=signin_details)
  if auth_response.response_code == 1:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                        detail=auth_response.response_message)

  # create JWT
  token: str = security.create_access_token(email=signin_details.email)
  response = schemas.Response(crud_response=auth_response,
                              token=token)
  return response


@app.post("/profile/", response_model=schemas.Response)
async def edit_profile(username: str = Form(...),
                       email: str = Form(...),
                       old_email: str = Form(...),
                       password: str = Form(...),
                       about: str = Form(...),
                       picture: UploadFile = File(...),
                       db: Session = Depends(get_db)):
  logger.info("serving POST request for /profile/ ")
  try:
    picture_path = f"{PROFILE_PICTURES}/{picture.filename}"
    with open(picture_path, "wb") as f:
      f.write(await picture.read())
  except Exception:
    logger.error(traceback.format_exc())
    raise HTTPException(status_code=500,
                        detail="Internal Server Error")

  profile_details = schemas.Profile(username=username,
                                    email=email,
                                    password=password,
                                    about=about,
                                    picture=picture_path)

  crud_response: schemas.CrudResponse = crud.edit_profile(db=db, profile_details=profile_details,
                                                          old_email=old_email)
  if crud_response.response_code == 1:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                        detail=crud_response.response_message)

  response = schemas.Response(crud_response=crud_response)
  return response


@app.get("/profile/", response_model=schemas.Response)
async def get_profile(client_session: schemas.ClientSession,
                      db: Session = Depends(get_db)):
  logger.info("serving GET request for /profile/ ")

  crud_response: schemas.CrudResponse = crud.get_profile(db=db,
                                                         client_session=client_session)
  if crud_response.response_code == 1:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                        detail=crud_response.response_message)

  response = schemas.Response(crud_response=crud_response)
  return response


@app.post("/article/", response_model=schemas.Article)
async def create_article(title: str = Form(...),
                         content: str = Form(...),
                         image: UploadFile = File(...),
                         db: Session = Depends(get_db)):
  logger.info("serving POST request for /articles/ ")
  try:
    image_path = f"{ARTICLE_IMAGES}/{image.filename}"
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


# basic endpoints
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
