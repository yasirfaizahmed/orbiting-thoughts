from fastapi import FastAPI
from fastapi.templating import Jinja2Templates

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "home page!"}


@app.get("/deen")
async def deen_page():
    # with  open("deen.html") as f:
        # return f.read()
    return {"message": "deen page"}


@app.get("/dunya")
async def deen_page():
    # with  open("static/dunya.html") as f:
        # return f.read()
    return {"message": "dunya page"}
