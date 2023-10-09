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
from werkzeug.utils import secure_filename
import random
from datetime import datetime

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

@app.route("/output/sequence/order", methods=["GET"])
def export_sequence_order():
    df_sequence = pd.read_csv("../frontend/public/videos/sequence_order.csv",index_col=["subject","day"])

    return fl.Response(
       df_sequence.to_csv(),
       mimetype="text/csv",
       headers={"Content-disposition":
       "attachment; filename=sequence_order.csv"})


@app.route("/output/get/users", methods=["GET"])
def get_users():
    listUser = []  
    user_information = list( db.user_information.find())
    for user in user_information:
        user["_id"] = str(user["_id"])
        listUser.append(user["_initialValues"])
    return listUser

@app.route("/output/export/data", methods=["GET"])
def export_data():
    user_information = list( db.user_information.find())
    for user in user_information:
        user["_id"] = str(user["_id"])
        print( user["_id"])
    def normalize_handmade(json):
        key_list = list(json)
        df_csv = pd.DataFrame(columns=key_list)
        #print(key_list)
        for key in key_list:
            print("key : ", key)
            #print(key + " = " + str(type(json[key])))
            if type(json[key]) == type([]):
                df_list = pd.json_normalize(json[key], record_prefix=key).add_prefix(key)
                df_list = df_list.replace('', np.nan).fillna(method='bfill').iloc[[0]]
                print("df list : "  , df_list)
                df_csv = pd.concat([df_csv,df_list])
            else: 
                #print(pd.Series(json[key], index=[key]))
                #df_csv = pd.concat([df_csv, pd.Series(json[key], index=[key])], ignore_index=True)
                print("json key ",json[key])
                df_csv.loc[0,key] = json[key]
                print("df csv : "  , df_csv)
        return df_csv.replace('', np.nan).fillna(method='bfill').iloc[[0]]
    
    df_data = pd.DataFrame()
    for data in user_information:
        print(type(data))
        print(data)
        df_data = pd.concat([df_data,normalize_handmade(data)])
    
    now = datetime.now()
    dt_string = now.strftime("%d_%m_%Y_%H_%M_%S")
    return fl.Response(
       df_data.to_csv(),
       mimetype="text/csv",
       headers={"Content-disposition":
       "attachment; filename=video_fatigue_"+dt_string+".csv"})
    
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
            }
        for (index, video_name) in enumerate(videos_default):
            state["tasks_list"]["task_"+str(index+1)] = {"id": 'task_'+str(index+1), "content" : video_name}
            state["columns"]["column-1"]["taskIds"].append('task_'+str(index+1))
        video_use_id = db.video_use.insert_one(state)
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

@app.route('/configuration/post/video', methods=['POST'])
def upload_video():
    print(fl.request.files)
    sequence_order = [chr(el) for el in random.sample(range(65,69),4)]
    if os.path.exists("../frontend/public/videos/sequence_order.csv"):
        df_sequence = pd.read_csv("../frontend/public/videos/sequence_order.csv",index_col=["subject","day"])
    else:
        columns = ["0 min","15 min","30 min","45 min"]
        index = ["subject","day"]
        df_sequence = pd.DataFrame(columns=columns, index=index)

    if len(fl.request.files) != 4:
	    return "Miss video file"
    else:
        for index, file in enumerate(fl.request.files):
            print(file)
            filename = fl.request.files[file].filename
            print(filename)
            if filename.split(".")[-1] != "mp4":
                return "Wrong file format, only mp4 file accepts"           
            else:
                filename = secure_filename(filename)
                folderName = filename.split(".")[0].split("_")
                folderName = "_".join(folderName[:-1])
                path_to_video_folder = "../frontend/public/videos/DESFAM_F_Sequences/"+folderName
                
                os.makedirs(path_to_video_folder, exist_ok=True)
                filename = "_".join(filename.split('.')[0].split("_")[0:-1])+"_"+sequence_order[index]+"-converted.mp4"
                print('upload_video filename: ' + filename)
                print('upload_video folder: ' + path_to_video_folder)
                print('upload_video path: ' + os.path.join(path_to_video_folder,filename))
                fl.request.files[file].save(os.path.join(path_to_video_folder,filename))
        
        df_sequence.loc[(filename.split("_")[-3],filename.split("_")[-2]),["0 min", "15 min", "30 min", "45 min"]] = sequence_order
        df_sequence.to_csv("../frontend/public/videos/sequence_order.csv")
        video_use = db.video_use.find_one()
        video_use.pop("_id")
        last_index  = len(list(video_use["tasks_list"]))
        videos_default =  os.listdir("/frontend/public/videos/DESFAM_F_Sequences")
        videos_already_in_db = []
        for key in video_use["tasks_list"]:
            videos_already_in_db.append(video_use["tasks_list"][key].get("content"))
            videos_to_add = [video for video in videos_default if video not in videos_already_in_db]
        for (index, video_name) in enumerate(videos_to_add):
                video_use["tasks_list"]["task_"+str(last_index+index+1)] = {"id": 'task_'+str(last_index+index+1), "content" : video_name}
                video_use["columns"]["column-1"]["taskIds"].append('task_'+str(last_index+index+1))
        db.video_use.find_one_and_update({}, {"$set" :video_use})
        return "video upload"
  
@app.route("/fix/bug/upload", methods=["GET"])
def fix_bug():
    backup_file = db.video_use.find_one()
    backup_file.pop("_id")
    db["backup"].insert_one(backup_file)
    x =  db.video_use.delete_many({})

    print(x.deleted_count, " documents deleted.")       
    return fl.jsonify(list(backup_file))

@app.route("/connection/wifi", methods=["POST"])
def connection():
    response = fl.Response()
    request = fl.request.get_json()
    server_name = request.get("wifi_name")
    password = request.get("password")
    
    try:            
        print("nmcli d wifi connect {} password {}".format(server_name,password))
        os.system("nmcli d wifi connect {} password {}".format(server_name,password))
    except:
        raise
    else:
        return True

    return ""

@app.route("/configuration/toggle/student", methods=["GET"])
def toggleStudentMode():
    col_name="settings"
    if col_name in db.list_collection_names():
        if db.settings.find_one({}) != None:
            studentModeObj = db.settings.find_one({})
            res = db.settings.find_one_and_update({"_id" : studentModeObj.get("_id")}, {"$set" : {"studentMode" : not studentModeObj.get("studentMode")}})
            studentMode = db.settings.find_one({})["studentMode"]
        else : 
            res = db.settings.insert_one({"studentMode": False})
            studentMode = db.settings.find_one({})["studentMode"]
        

    else:
        res = db.settings.insert_one({"studentMode": False})
        studentMode = db.settings.find_one({})["studentMode"]
        
    return fl.jsonify(studentMode)


@app.route("/configuration/get/student", methods=["GET"])
def getStudentMode():
    col_name="settings"
    if col_name in db.list_collection_names():
        if db.settings.find_one({}) != None:
            studentMode = db.settings.find_one({})["studentMode"]
        else:
            studentMode = False
    else:   
        studentMode = False
    return fl.jsonify(studentMode)


@app.route("/configuration/get/indicators", methods=["GET"])
def getIndicators():
    col_name="settings"

    if col_name in db.list_collection_names():
        # check if indicators exist
        if db.settings.find_one({"indicators" : {"$exists" : True}}) != None:
            if db.settings.find_one({})["indicators"] != []:
                indicators = db.settings.find_one({})["indicators"]
            else:   
                indicators = [{ "id": 1, "value": "Yeux plus ou moins ouverts"},{ "id": 2,"value": "Muscles du visage plus ou moins relâchés"},{ "id": 3, "value": "Tête plus ou moins baissée"}, { "id": 4, "value": "Clignement des yeux"}, { "id": 5, "value": "Bouche plus ou moins ouverte"}, { "id": 6, "value": "Front plus ou moins plissé/ridé"}];
                db.settings.find_one_and_update({},{"$set":{"indicators": indicators}})
                indicators = db.settings.find_one({})["indicators"]
        else: 
            indicators = [{ "id": 1, "value": "Yeux plus ou moins ouverts"},{ "id": 2,"value": "Muscles du visage plus ou moins relâchés"},{ "id": 3, "value": "Tête plus ou moins baissée"}, { "id": 4, "value": "Clignement des yeux"}, { "id": 5, "value": "Bouche plus ou moins ouverte"}, { "id": 6, "value": "Front plus ou moins plissé/ridé"}];
            db.settings.find_one_and_update({},{"$set":{"indicators": indicators}})
            indicators = db.settings.find_one({})["indicators"]
    else:
        indicators = []
    return fl.jsonify(indicators)
    
@app.route("/configuration/add/indicators", methods=["POST"])
def addIndicators():
    response = fl.Response()
    data = fl.request.get_json()
    if data is None:
        response.status_code=400  
        return  response
    else:
        db.settings.find_one_and_update({},{"$push":{"indicators":data["newIndicators"]}})
        response.status_code=200
        indicators = db.settings.find_one({})["indicators"]
        return fl.jsonify(indicators)
    
@app.route("/configuration/delete/indicators", methods=["POST"])
def deleteIndicators():
    response = fl.Response()
    data = fl.request.get_json()
    if data is None:
        response.status_code=400  
        return  response
    else:
        update_data = []
        id_update = 1
        data = data["deleteIndicators"]  
        for indicator in data["indicators"]:
            if int(indicator["id"]) != int(data["id_to_delete"]):
                update_data.append({"id": id_update,"value":indicator["value"]})
                id_update += 1
        db.settings.find_one_and_update({},{"$set":{"indicators":update_data}})
        response.status_code=200
        return fl.jsonify(update_data)
