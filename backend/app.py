from flask import Flask, render_template, request, redirect, url_for
from scouting import getName, prematchScouting, matchScouting
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

@app.route('/scoutingapi/match', methods=['POST'])
def MatchScouting():
    return {"success": matchScouting(
        number=request.json["number"], 
        match_data = request.json["match_data"]
    )}

@app.route('/scoutingapi/prematch', methods=['POST'])
def PrematchScouting():
    return {"success": prematchScouting(
        number=request.json["number"],
        auto_notes=request.json["auto_notes"],
        auto_preference=request.json["auto_preference"],
        endgame_notes=request.json["endgame_notes"],
        height=request.json["height"],
        teleop_notes=request.json["teleop_notes"]
    )}

if __name__ == '__main__':
    app.run(debug=True)
