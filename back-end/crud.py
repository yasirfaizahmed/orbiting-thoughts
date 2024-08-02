from sqlalchemy.orm import Session
import models
import schemas
import logging
import security
from utils import util


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def get_articles(db: Session, skip: int = 0, limit: int = 5):   # function to get articles with pagination
  return db.query(models.Article).offset(skip).limit(limit).all()


def create_article(db: Session, article: schemas.Article):    # function to create article
  try:
    new_article = models.Article(title=article.title,
                                 content=article.content,
                                 image=article.image)    # create article object
    db.add(new_article)    # add to session
    db.commit()   # commit session
    db.refresh(new_article)    # refresh session to get new aricle ID
    return new_article   # return new article
  except Exception as e:
    logger.error(f"Error creating article: {e}")
    db.rollback()  # Rollback in case of error
    raise


def get_article(db: Session, id: int):
  return db.query(models.Article).filter(models.Article.id == id).one_or_none()


def try_signup(db: Session, signup_details: schemas.SignupDetails) -> schemas.CrudResponse:
  user_exists = db.query(models.User).filter(models.User.email == signup_details.email).first()

  if user_exists:
    return schemas.CrudResponse(response_code=1,
                                response_message="account already exists")

  # hash the password before storing it
  hashed_password = security.hash_password(password=signup_details.password)

  new_user = models.User(username=signup_details.username,
                         email=signup_details.email,
                         password=hashed_password)
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
  user_exists = db.query(models.User).filter(models.User.email == signin_details.email).first()

  # TODO: password matching!

  if user_exists:
    return schemas.CrudResponse(response_code=0,
                                response_message="successfuly signed-in")
  return schemas.CrudResponse(response_code=1,
                              response_message="signin failed")


def edit_profile(db: Session, profile_details: schemas.Profile,
                 old_email: str):
  user = db.query(models.User).filter(models.User.email == old_email).first()
  if user is None:
    return schemas.CrudResponse(response_code=1,
                                response_message="account does not exist")
  user.username = profile_details.username
  user.email = profile_details.email
  user.password = profile_details.password

  db.add(user)
  db.commit()

  profile = db.query(models.Profile).filter(models.Profile.user_id == user.id).first()

  profile.about = profile_details.about
  profile.picture = profile_details.picture

  db.add(profile)
  db.commit()

  return schemas.CrudResponse(response_code=0,
                              response_message="profile edited successfuly")


def get_profile(db: Session, client_session: schemas.ClientSession) -> schemas.CrudResponse:
  user = db.query(models.User).filter(models.User.email == client_session.email).first()
  if user is None:
    return schemas.CrudResponse(response_code=1,
                                response_message="account does not exist")
  profile = db.query(models.Profile).filter(models.Profile.user_id == user.id).first()

  return schemas.CrudResponse(response_code=0,
                              response_message="account exists",
                              data={"user": util.model_to_dict(user),
                                    "profile": util.model_to_dict(profile)})
