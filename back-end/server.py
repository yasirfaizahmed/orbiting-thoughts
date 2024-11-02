from fastapi import FastAPI
from fastapi import Depends, Form, UploadFile, File, HTTPException, status
# from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
import database
import schemas
import crud
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import models
from log_handling.log_handling import logger
from utils.paths import ARTICLE_IMAGES, RESOURCES, PROFILE_PICTURES, ASSETS
from pathlib import Path as pp
import traceback
import security
from fastapi.responses import FileResponse, Response
from fastapi.staticfiles import StaticFiles
from http import HTTPStatus
import os
from typing import List
import json


app = FastAPI()
app.mount("/dist", StaticFiles(directory="dist"), name="dist")
app.mount("/assets", StaticFiles(directory=os.path.join("dist", "assets")), name="assets")
# app.mount("/assets", StaticFiles(directory="assets"), name="assets")
origins = [
    "http://deendunya.xyz",  # Add your frontend URL here
    # "http://localhost:3000"  # Uncomment if testing from localhost
]

# Allow all origins for now, restrict this in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Change this to the specific origin(s) you want to allow
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


# TODO: add features
@app.get("/articles", response_model=schemas.Response)
def get_articles(skip: int = 0,
                 limit: int = 5,
                 db: Session = Depends(database.get_db)):
  logger.info("serving GET request for /articles/ ")
  crud_response: schemas.CrudResponse = crud.get_articles(db=db, skip=skip, limit=limit)
  return schemas.Response(crud_response=crud_response)


# TODO: add features
@app.get("/article", response_model=schemas.Response)
def get_aricle(id: int,
               db: Session = Depends(database.get_db)):
  logger.info("serving GET request for /article/")
  crud_response: schemas.CrudResponse = crud.get_article(db=db, id=id)
  return schemas.Response(crud_response=crud_response)


@app.post("/signup", response_model=schemas.Response)
async def signup(signup_details: schemas.SignupDetails,
                 db: Session = Depends(database.get_db)):
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


@app.post("/signin", response_model=schemas.Response)
async def signin(signin_details: schemas.SigninDetails,
                 db: Session = Depends(database.get_db)):
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


@app.post("/edit-profile", response_model=schemas.Response)
async def edit_profile(username: str = Form(...),
                       password: str = Form(...),
                       about: str = Form(...),
                       picture: UploadFile = File(...),
                       db: Session = Depends(database.get_db),
                       token_payload: schemas.TokenPayload = Depends(security.validate_token)):
  if token_payload.validated is False:
    raise HTTPException(status_code=token_payload.status_code,
                        detail=HTTPStatus(token_payload.status_code).phrase)
  logger.info("serving POST request for /edit-profile/ ")
  try:
    picture_path = f"{PROFILE_PICTURES}/{picture.filename}"
    with open(picture_path, "wb") as f:
      f.write(await picture.read())
  except Exception:
    logger.error(traceback.format_exc())
    raise HTTPException(status_code=500,
                        detail="Internal Server Error")

  profile_details = schemas.Profile(username=username,
                                    password=password,
                                    about=about,
                                    picture=picture_path)

  crud_response: schemas.CrudResponse = crud.edit_profile(db=db, profile_details=profile_details,
                                                          old_email=token_payload.payload.get("sub"))
  if crud_response.response_code == 1:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                        detail=crud_response.response_message)

  response = schemas.Response(crud_response=crud_response)
  return response


@app.get("/get-profile", response_model=schemas.Response)
async def get_profile(db: Session = Depends(database.get_db),
                      token_payload: schemas.TokenPayload = Depends(security.validate_token)):
  if token_payload.validated is False:
    raise HTTPException(status_code=token_payload.status_code,
                        detail=HTTPStatus(token_payload.status_code).phrase)
  logger.info("serving GET request for /get-profile/ ")
  crud_response: schemas.CrudResponse = crud.get_profile(db=db,
                                                         email=token_payload.payload.get("sub"))
  if crud_response.response_code == 1:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                        detail=crud_response.response_message)

  response = schemas.Response(crud_response=crud_response)
  return response


@app.post("/article", response_model=schemas.Response)
async def create_article(title: str = Form(...),
                         brief: str = Form(...),
                         text_content: str = Form(...),   # accepting dict as json str
                         image_list: List[UploadFile] = File(...),
                         db: Session = Depends(database.get_db),
                         token_payload: schemas.TokenPayload = Depends(security.validate_token)):
  if token_payload.validated is False:
    raise HTTPException(status_code=token_payload.status_code,
                        detail=HTTPStatus(token_payload.status_code).phrase)
  logger.info("serving POST request for /articles/ ")
  local_image_list = []
  if not image_list:
    local_image_list.append(f"{ASSETS}/image-not-found.png")
  else:
    try:
      for image in image_list:
        image_path = f"{ARTICLE_IMAGES}/{image.filename}"
        with open(image_path, 'wb') as f:
          f.write(await image.read())
          local_image_list.append(image_path)
    except Exception:
      logger.error(traceback.format_exc())
      raise HTTPException(status_code=500,
                          detail="Internal Server Error")

  text_content_data: dict = json.loads(text_content)

  try:
    new_article = schemas.Article(title=title,
                                  brief=brief,
                                  text_content=text_content_data,
                                  image_list=local_image_list)
    crud_response = crud.create_article(db=db, article=new_article, email=token_payload.payload.get("sub"))
    if crud_response.response_code == 1:
      raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                          detail=crud_response.response_message)
    response = schemas.Response(crud_response=crud_response)
    return response
  except Exception:
    logger.error(traceback.format_exc())
    raise HTTPException(status_code=500,
                        detail="Internal Server Error")


@app.get("/create-article")
async def create(token_payload: schemas.TokenPayload = Depends(security.validate_token)):
  if token_payload.validated is False:
    raise HTTPException(status_code=token_payload.status_code,
                        detail=HTTPStatus(token_payload.status_code).phrase)
  logger.info("serving GET request for /create-article/ ")
  response = schemas.Response(crud_response=None)
  return response


# basic endpoints
# Wildcard route for SPA History API fallback
@app.get("/{full_path:path}")
async def spa_fallback(full_path: str):
  file_path = os.path.join("dist", "index.html")
  if os.path.exists(file_path):
    return FileResponse(file_path)
  else:
    return Response(status_code=404, content="Index file not found")


@app.get("/dunya")
async def dunya():
  return {"message": "home page!"}


@app.get("/deen")
async def deen():
  return {"message": "home page!"}

prepare()


if __name__ == "__main__":
  uvicorn.run("server:app", host="127.0.0.1", port=9000, reload=True, access_log=True)
