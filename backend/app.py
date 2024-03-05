from flask import Flask, render_template, request, redirect, url_for
from scouting import getName
from flask_cors import CORS
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)
@app.route('/scoutingapi') #will need multiple different routes in the api for different things
def index():
    return "hello"
# copy over most of this code to the pythonanywhere server's app.py file when ready to deploy and then host the frontend with vercel for free

@app.route('/scoutingapi/getName', methods=['POST'])
def GetName():
    return {"name": getName(request.json["number"])}

if __name__ == '__main__':
    app.run(debug=True)
