from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)
BASE_URL= "https://api.deezer.com"

# @app.get("/api/{path:path}")
@app.api_route("/api/{path:path}", methods=["GET"])
def proxy_deezer(path:str,req:Request):
    """
        Proxy universal para todas as rotas do deezer
    """
    DEEZER_URL = f"{BASE_URL}/{path}"
    #capta todos os parametros e passa dps para o params como um dict
    params = dict(req.query_params)

    response = requests.get(DEEZER_URL,params=params)
    
    return response.json()