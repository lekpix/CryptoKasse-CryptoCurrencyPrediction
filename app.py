from flask import Flask, json, jsonify, render_template, request
import pandas as pd
from sqlalchemy import create_engine, func
import requests
import numpy as np
import time
import os
# from flask_sqlalchemy import SQLAlchemy
# from models import create_classes
import datetime




#################################################
# Flask Setup
#################################################
app = Flask(__name__)




#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
   
   
    return render_template("index.html")
 
 
#################################################
# Routes to render html files
#################################################
@app.route("/about")
def render_about():
    return render_template('about.html')

@app.route("/bitcoin")
def render_bitcoin():
    return render_template('bitcoin.html')
  
@app.route("/ETH")
def render_ETH():
    return render_template('ETH.html')
  
@app.route("/comparison")
def render_comparison():
    return render_template('comparison.html')


if __name__ == "__main__":
    app.run(debug=True)
