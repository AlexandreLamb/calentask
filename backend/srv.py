import os
from flask.json import jsonify
import numpy as np
from flask import Flask
import pandas as pd
import flask as fl
import datetime
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from bson import json_util
import json

PATH_TO_SAVE = "data/"
PATH_T0_CSV = ""

#app = Flask(__name__, static_folder='build/', static_url_path='/', )
app = Flask(__name__ )


MONGO_URI = "mongodb://"+os.environ["MONGODB_USERNAME"]+":"+os.environ["MONGODB_PASSWORD"]+"@"+os.environ["MONGODB_HOST"]+":"+os.environ["MONGODB_PORT"]+"/"+os.environ["MONGODB_DB"]+"?authSource=admin"
print(MONGO_URI)

app.config["MONGO_URI"] = MONGO_URI

mongo_client = PyMongo(app)
db = mongo_client.db

CORS(app)

@app.route('/')
def index():
    if os.environ['FLASK_ENV'] == "production":
        return app.send_static_file('index.html')
    else:
        return None

@app.route("/output/subject/information/", methods=["POST"])
def put_personal_information():
    data = check_form(fl.request.get_json())
    response = fl.Response()
    print(data)
    if data is None:
        response.status_code=204
        return response
    else:
        _id = db.user_information.insert_one(data).inserted_id
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
        db.user_information.find_one_and_update({"_id" :ObjectId(data.pop("_id"))},{"$push":data})
        response.status_code=200  
        return response
    

@app.route("/output/subject/rate/", methods=["POST"])
def put_personal_rate():
    print(fl.request.get_json())
    response = fl.Response()
    data = check_form(fl.request.get_json())
    if data is None:
        response.status_code=400  
        return  response
    else:
        db.user_information.find_one_and_update({"_id" :ObjectId(data.pop("_id"))},{"$push":data})
        response.status_code=200
        return response
    

def check_form(data):
    if data is not None:
        for element in data.values():
            if type(element) == type(None):
                return None
            if element == "":   
                return None
    else:
        return None
    return data

def generate_dataset():
    df = pd.DataFrame(columns=["date","video",""])
    
@app.route("/output/export/data", methods=["GET"])
def export_data():
    user_information = list( db.user_information.find())
    for user in user_information:
        user["_id"] = str(user["_id"])
    return fl.jsonify(user_information)
    
       
@app.route("/configuration/create/video", methods=["GET"])
def list_video():
    if list(db.video_use.find({})) != [] :
        video_use = db.video_use.find_one()
        video_use["_id"] = str(video_use["_id"])
        print(video_use)
        
        return fl.jsonify(video_use)
    else :
        videos_default =  os.listdir("/frontend/public/videos/DESFAM_F_Sequences")
        state = {
                "tasks_list": {},
                "columns": {
                    'column-1': {
                      "id": 'column-1',
                      "title": 'Video disponible',
                      "taskIds": [],
                    },
                    'column-2': {
                      "id": 'column-2',
                      "title": 'Video de la session',
                      "taskIds": [],
                    },
                  },
                  "columnOrder": ['column-1', 'column-2'],
                  "pathToExportData": ""
            
            };
        for (index, video_name) in enumerate(videos_default):
            state["tasks_list"]["task_"+str(index+1)] = {"id": 'task_'+str(index+1), "content" : video_name}
            state["columns"]["column-1"]["taskIds"].append('task_'+str(index+1))
        video_use_id = db.video_use.insert(state)
        state["_id"] = str(video_use_id)
    return fl.jsonify(state)
    
@app.route("/configuration/udpate/video", methods=["POST"])
def update_video():
    response = fl.Response()
    data = check_form(fl.request.get_json())
    video_use = data["video_use"]
    if data is None:
        response.status_code=400  
        return  response
    else:
        db.video_use.find_one_and_update({"_id" : ObjectId(video_use.pop("_id"))},{"$set":video_use})
        response.status_code=200
    
        return response
   
@app.route("/configuration/get/video/list", methods=["GET"])
def get_video_list():
    video_use = db.video_use.find_one()
    tasksIds = video_use["columns"]["column-2"]["taskIds"]
    video_to_play = []
    for id in tasksIds :
        video_to_play.append(video_use["tasks_list"][id]["content"])
    print(video_to_play)
    return fl.jsonify(video_to_play)