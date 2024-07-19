from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "home page!"}


@app.get("/deen")
async def deen_page():
    return {"message": "deen page"}


@app.get("/dunya")
async def deen_page():
    return {"message": "dunya page"}
