from flask import Flask
import pandas as pd
import flask as fl
import datetime
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
PATH_TO_SAVE = "data/"
PATH_T0_CSV = ""

app = Flask(__name__, static_folder='../build', static_url_path='/', )
CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/fatigueSurvey"
mongo = PyMongo(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route("/output/subject/information/", methods=["POST"])
def put_personal_information():
    data = check_form(fl.request.get_json())
    response = fl.Response()
    print(response)
    if data is None:
        response.status_code=204
        return response
    else:
        _id = mongo.db.user_information.insert(data)
        response.status_code=200  
        response.data=str(_id)
        return response
    

@app.route("/output/subject/evaluation/", methods=["POST"])
def put_personal_evaluation():
    print(fl.request.get_json())
    data = check_form(fl.request.get_json())
    response = fl.Response()
    print(response)
    if data is None:
        response.status_code=204
        return response
    else:
        mongo.db.user_information.find_one_and_update({"_id" :ObjectId(data.pop("_id"))},{"$set":data})
        response.status_code=200  
        return response
    

@app.route("/output/subject/rate/", methods=["POST"])
def put_personal_rate():
    print(fl.request.get_json())
    data = check_form(fl.request.get_json())
    data["sequence_" + data.pop("_videoLetter")] = data.pop("_rateValue")
    if data is None:
        return ("", 204)
    else:
        mongo.db.user_information.find_one_and_update({"_id" :ObjectId(data.pop("_id"))},{"$set":data})
        
        return ("", 200)
    

def check_form(data):
    for element in data.values():
        if type(element) == type(None):
            return None
        if element == "":   
            return None
    return data

def generate_dataset():
    df = pd.DataFrame(columns=["date","video",""])
    
@app.route("/output/export/data", methods=["GET"])
def export_data():
    user_information =  mongo.db.user_information.find({})
    df = pd.DataFrame( list(user_information))
    print(df)
    data_dict = dict()
    for col in df.columns:
        data_dict[col] = str(df[col].values)
    return fl.jsonify(data_dict)
