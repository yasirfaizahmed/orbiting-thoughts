from typing import Dict


def model_to_dict(model_instance) -> Dict:
  return {column.name: getattr(model_instance, column.name) for column in model_instance.__table__.columns}
