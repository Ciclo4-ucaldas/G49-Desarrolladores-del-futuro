from flask import Flask
import os 
from twilio.rest import Client
from flask import request
import os 
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


app= Flask(__name__)

@app.route("/")
def inicio():
    test =os.environ.get("Test")
    return test

@app.route("/sms")
def sms():
    try:
        # Find your Account SID and Auth Token at twilio.com/console
        # and set the environment variables. See http://twil.io/secure
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)
        contenido = request.args.get("mensaje")
        destino = request.args.get("telefono")
        message = client.messages \
                        .create(
                             body=contenido,
                             from_='+16614662924',
                             to='+57'+ destino
                         )
         
        print(message.sid)
        return "Enviado Correctamente"
    except Exception as e:
        return "error enviando el mensaje"

@app.route("/envio-correo")
def email():
    destino = request.args.get("correo_destino")
    asunto = request.args.get("asunto")
    mensaje = request.args.get("contenido")
    
    message = Mail(
    from_email= 'andressantos1544@gmail.com',
    to_emails=destino,
    subject=asunto,
    html_content=mensaje)
    
    
    try:
        sg = SendGridAPICLIent(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)       
        print(response.headers)
        return "correo electronico enviado"        
    except Exception as e:
        print(e.message)
        return "Error enviado el mensaje"
    
if __name__== '__main__':
    app.run()