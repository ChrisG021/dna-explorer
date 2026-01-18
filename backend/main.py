import json
import os
from fastapi import FastAPI, Request, Body,status
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from dotenv import dotenv_values
import requests
import resend

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3001","http://localhost:3000"],
    allow_methods = ["*"],
    allow_headers = ["*"]
)
BASE_URL= "https://api.deezer.com"

# @app.get("/api/{path:path}")
@app.api_route("/api/deezer/{path:path}", methods=["GET"])
def proxy_deezer(path:str,req:Request):
    """
        Proxy universal para todas as rotas do deezer
    """
    DEEZER_URL = f"{BASE_URL}/{path}"
    params = dict(req.query_params)

    response = requests.get(DEEZER_URL,params=params)
    
    return response.json()

#its working
config = dotenv_values(".env")
client = genai.Client(api_key=config.get('API_KEY'))
resend.api_key = config.get('RESEND_API_KEY')


#CHECK
@app.post("/api/email")
def report(req:Request,data:dict = Body(...)):
    
    def gerar_lista_musicas(musics):
      items = ""
      for music in musics:
          items += f"""
          <li style="margin-bottom:8px;">
              <strong>{music['name_music']}</strong> — {music['artist']}
          </li>
          """
      return items
    #array de {id,name,artist}
    musics = data.get("musics")
    li_musics = gerar_lista_musicas(musics)

    musics_text = json.dumps(musics)
    
    ai_response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[{
            "parts": [
                {
                    "text": f"""
                        Tarefa:
                        Com base no array de músicas abaixo, escreva em até 5 linhas sobre meu gosto musical e no Final quero uma palavra que defina o gosto do usuário,essa palavra deve seguir esse template (<div style="font-weight: bold;">DNA MUSICAL <span style="font-weight: 500; background-color: #fff; color: #000; padding: 2px; border-radius: 5px;">...</span></div>) .Gere apenas um texto sem tags ou algum caractere extra

                        Array de músicas:
                        {musics_text}
                        """
                }
            ]
        }],
        config={
            "temperature":0.4,
        }
    )
     # vou trocar por um mock para n ficar gastando tokens {ai_response.candidates[0].content.parts[0].text}
    email_template = f"""
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>DNA Musical</title>
      </head>

      <body style="margin:0; padding:0; background-color:#000;">
        <div
          style="
            background-color:#000;
            color:#fff;
            font-family:Arial, Helvetica, sans-serif;
            margin:40px auto;
            border-radius:20px;
            max-width:600px;
            padding:20px;
          "
        >
          <h1
            style="
              text-align:center;
              font-size:24px;
              margin:32px 0 40px;
              text-transform:uppercase;
            "
          >
            Seu <strong>DNA</strong> musical
          </h1>

          <p style="text-align:left; line-height:1.5;">
            {ai_response.candidates[0].content.parts[0].text}
          </p>
          
          <h3 style="margin-top:30px;">🎵 Suas músicas</h3>
          <ul style="padding-left:20px; line-height:1.6;">
            {li_musics}
          </ul>

          <!-- BOTÃO -->
          <div style="text-align:center; margin:40px 0;">
            <a
              href="https://dna-explorer-theta.vercel.app/"
              target="_blank"
              style="
                display:inline-block;
                font-size:14px;
                font-weight:600;
                border-radius:10px;
                padding:12px 24px;
                background-color:#ffffff;
                color:#000000;
                text-decoration:none;
              "
            >
              Voltar ao app
            </a>
          </div>

          <div
            style="
              width:100%;
            "
          >
            <div>
              Prazer,<br />
              Christophe Guerra  
              <span style="font-weight:800; margin-left:20px;  color:#ffffff20;">
                &lt;CG/&gt;
              </span>
            </div>

          </div>
        </div>
      </body>
    </html>
    """
    r = resend.Emails.send({
        "from":"onborarding@resend.dev",
        "to":"christophegabriel30@gmail.com",
        "subject": "Seu Relatório Musical",
        "html":email_template,
    })
    response = {
        "status":status.HTTP_200_OK,
        "musics":musics,
        "id_email":r
    }
    print(response)
    return response


