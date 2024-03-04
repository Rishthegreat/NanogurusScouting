from flask import Flask, render_template, request, redirect, url_for
from tinydb import TinyDB #library for database that is stored in a single json file

app = Flask(__name__)

@app.route('/scoutingapi') #will need multiple different routes in the api for different things
def index():
    return "hello"
# copy over most of this code to the pythonanywhere server's app.py file when ready to deploy and then host the frontend with vercel for free

if __name__ == '__main__':
    app.run(debug=True)
