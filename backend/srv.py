import os

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

app = Flask(__name__, static_folder='../build/', static_url_path='/', )



MONGO_URI = "mongodb://"+os.environ["MONGODB_USERNAME"]+":"+os.environ["MONGODB_PASSWORD"]+"@"+os.environ["MONGODB_HOST"]+":"+os.environ["MONGODB_PORT"]+"/"+os.environ["MONGODB_DB"]+"?authSource=admin"
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
    print(response)
    if data is None:
        response.status_code=204
        return response
    else:
        _id = db.user_information.insert(data)
        response.status_code=200  
        response.data=str(_id)
        return response
        """
        userInformations = UserInformations(data)
        userInformations.save()
        response.status_code = 200  
        response.data = userInformations.get_id()
        """
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
        db.user_information.find_one_and_update({"_id" :ObjectId(data.pop("_id"))},{"$set":data})
        response.status_code=200  
        return response
    

@app.route("/output/subject/rate/", methods=["POST"])
def put_personal_rate():
    print(fl.request.get_json())
    response = fl.Response()
    data = check_form(fl.request.get_json())
    data["sequence_" + data.pop("_videoLetter")] = data.pop("_rateValue")
    if data is None:
        response.status_code=400
    
        response
    else:
        db.user_information.find_one_and_update({"_id" :ObjectId(data.pop("_id"))},{"$set":data})
        response.status_code=200
        return response
    

def check_form(data):
    print(data)
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
    user_information =  mongo.db.user_information.find({})
    df = pd.DataFrame( list(user_information))
    print(df)
    data_dict = dict()
    for col in df.columns:
        data_dict[col] = str(df[col].values)
    return fl.jsonify(data_dict)
    
@app.route("/test", methods=["GET"])
def test():
    test = Test(test_texte="test")
    test.save()
    return  fl.jsonify(test), 200

@app.route("/testupdate", methods=["GET"])
def testupdate():
    test = Test.objects(id=ObjectId('6196e864a99933fb0808da44'))
    up = {'test_texte2': 'update1'}
    test.update(**up)
    return  fl.jsonify(test), 200

 
@app.route("/testall", methods=["GET"])
def testall():   
    test = Test.objects(id=ObjectId('6196df245ead5ebc0fb36a72'))
    if not test:
        return fl.jsonify({'error': 'data not found'})
    else:
        to_update = {'update': 'update1','a':'b'}
        for key, value in to_update.items():
            setattr(test, key, value)
        test.save()
        return fl.jsonify(test)

"""
if __name__ == "__main__":
    app.run(debug=True, port=5000)"""