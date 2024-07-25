from sqlalchemy.orm import Session
import models
import schemas
import logging


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def get_articles(db: Session, skip: int = 0, limit: int = 5):   # function to get articles with pagination
  return db.query(models.Article).offset(skip).limit(limit).all()


def create_article(db: Session, article: schemas.Article):    # function to create article
  try:
    db_article = models.Article(title=article.title,
                                content=article.content,
                                image=article.image)    # create article object
    db.add(db_article)    # add to session
    db.commit()   # commit session
    db.refresh(db_article)    # refresh session to get new aricle ID
    return db_article   # return new article
  except Exception as e:
    logger.error(f"Error creating article: {e}")
    db.rollback()  # Rollback in case of error
    raise


def get_article(db: Session, id: int):
  return db.query(models.Article).filter(models.Article.id == id).one_or_none()
