from sqlalchemy.orm import Session
import models
import schemas
import logging
import security


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


def try_signup(db: Session, signup_details: schemas.SignupDetails) -> schemas.AuthResponse:
  user_exists = db.query(models.User).filter(models.User.email == signup_details.email).first()

  if user_exists:
    return schemas.AuthResponse(response_code=1,
                                response_message="account already exists",
                                token="")

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

  return schemas.AuthResponse(response_code=0,
                              response_message="successfuly signed-up",
                              token="")


def try_signin(db: Session, signin_details: schemas.SigninDetails) -> schemas.AuthResponse:
  user_exists = db.query(models.User).filter(models.User.email == signin_details.email).first()

  # TODO: password matching!

  if user_exists:
    return schemas.AuthResponse(response_code=0,
                                response_message="successfuly signed-in",
                                token="")
  return schemas.AuthResponse(response_code=1,
                              response_message="signin failed",
                              token="")
