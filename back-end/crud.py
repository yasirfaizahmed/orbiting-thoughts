from sqlalchemy.orm import Session
import models
import schemas
import logging
import security
from utils import util
import base64
import os


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def get_articles(db: Session, skip: int = 0, limit: int = 5):   # function to get articles with pagination
  article_entries = db.query(models.Article).offset(skip).limit(limit).all()
  articles = []
  for article_ in [util.model_to_dict(article) for article in article_entries]:
    if os.path.exists(article_.get("cover_image")):
      encoded_cover_image = ""
      with open(article_.get("cover_image"), "rb") as file:
        encoded_cover_image = base64.b64encode(file.read()).decode('utf-8')
    if os.path.exists(article_.get("intermediate_image")):
      encoded_intermediate_image = ""
      with open(article_.get("intermediate_image"), "rb") as file:
        encoded_intermediate_image = base64.b64encode(file.read()).decode('utf-8')

    article_.update({"cover_image": encoded_cover_image})
    article_.update({"intermediate_image": encoded_intermediate_image})
    articles.append(article_)

  return schemas.CrudResponse(response_code=0,
                              response_message="fetched all articles",
                              data={"articles": articles})


def create_article(db: Session, article: schemas.Article, email: str):    # function to create article
  user_entry = db.query(models.User).filter(models.User.email == email).first()
  profile_entry = db.query(models.Profile).filter(models.Profile.user_id == user_entry.id).first()
  if user_entry is None:
    return schemas.CrudResponse(response_code=1,
                                response_message="account does not exist")

  new_article = models.Article(title=article.title,
                               brief=article.brief,
                               content=article.content,
                               cover_image=article.cover_image,
                               intermediate_image=article.intermediate_image,
                               user_id=user_entry.id,
                               profile_id=profile_entry.id)    # create article object
  db.add(new_article)    # add to session
  db.commit()   # commit session
  db.refresh(new_article)    # refresh session to get new aricle ID
  return schemas.CrudResponse(response_code=0,
                              response_message="successfuly created article")


def get_article(db: Session, id: int):
  return db.query(models.Article).filter(models.Article.id == id).one_or_none()


def try_signup(db: Session, signup_details: schemas.SignupDetails) -> schemas.CrudResponse:
  user_exists = db.query(models.User).filter(models.User.email == signup_details.email).first()

  if user_exists:
    return schemas.CrudResponse(response_code=1,
                                response_message="account already exist")

  new_user = models.User(username=signup_details.username,
                         email=signup_details.email,
                         password=security.hash_password(password=signup_details.password))
  db.add(new_user)
  db.commit()

  new_profile = models.Profile(user_id=new_user.id,
                               about="",
                               picture="")
  db.add(new_profile)
  db.commit()

  return schemas.CrudResponse(response_code=0,
                              response_message="successfuly signed-up")


def try_signin(db: Session, signin_details: schemas.SigninDetails) -> schemas.CrudResponse:
  user_entry = db.query(models.User).filter(models.User.email == signin_details.email).first()

  if user_entry is None:
    return schemas.CrudResponse(response_code=1,
                                response_message="signin failed")

  if user_entry:
    if security.verify_password(plain_password=signin_details.password,
                                hashed_password=user_entry.password) is False:
      return schemas.CrudResponse(response_code=1,
                                  response_message="wrong password")

    return schemas.CrudResponse(response_code=0,
                                response_message="successfuly signed-in")


def edit_profile(db: Session, profile_details: schemas.Profile,
                 old_email: str):
  user_entry = db.query(models.User).filter(models.User.email == old_email).first()
  if user_entry is None:
    return schemas.CrudResponse(response_code=1,
                                response_message="account does not exist")
  user_entry.username = profile_details.username
  user_entry.password = security.hash_password(password=profile_details.password)
  db.add(user_entry)
  db.commit()

  profile_entry = db.query(models.Profile).filter(models.Profile.user_id == user_entry.id).first()
  profile_entry.about = profile_details.about
  profile_entry.picture = profile_details.picture
  db.add(profile_entry)
  db.commit()

  profile = util.model_to_dict(profile_entry)
  user = util.model_to_dict(user_entry)

  if os.path.exists(profile_entry.picture):
    with open(profile_entry.picture, "rb") as file:
      encoded_image = base64.b64encode(file.read()).decode('utf-8')
  else:
    encoded_image = ""

  return schemas.CrudResponse(response_code=0,
                              response_message="profile edited successfuly",
                              data={"user": user,
                                    "profile": profile,
                                    "profilePicture": encoded_image})


def get_profile(db: Session, email: str) -> schemas.CrudResponse:
  user_entry = db.query(models.User).filter(models.User.email == email).first()
  if user_entry is None:
    return schemas.CrudResponse(response_code=1,
                                response_message="account does not exist")
  profile_entry = db.query(models.Profile).filter(models.Profile.user_id == user_entry.id).first()

  profile = util.model_to_dict(profile_entry)
  user = util.model_to_dict(user_entry)

  if os.path.exists(profile_entry.picture):
    with open(profile_entry.picture, "rb") as file:
      encoded_image = base64.b64encode(file.read()).decode('utf-8')
  else:
    encoded_image = ""

  return schemas.CrudResponse(response_code=0,
                              response_message="account exists",
                              data={"user": user,
                                    "profile": profile,
                                    "profilePicture": encoded_image})
