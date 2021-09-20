from flask import Flask
import pandas as pd
import flask as fl
import datetime
from flask_cors import CORS

PATH_TO_SAVE = "data/"
PATH_T0_CSV = ""
app = Flask(__name__, static_folder='../build', static_url_path='/', )
CORS(app)
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
        df = pd.DataFrame.from_dict([data])
        date_id = str(datetime.datetime.now().strftime("%Y%m%d"))
        PATH_T0_CSV = PATH_TO_SAVE+"Subject_"+str(df["_initialValues"][0])+"_"+str(df["_age"][0])+"_"+str(df["_gender"][0])+"_"+date_id+".csv"
        df.to_csv(PATH_T0_CSV, index=False)
        response.status_code=200  
        response.data=PATH_T0_CSV
        return response
    

@app.route("/output/subject/rate/", methods=["POST"])
def put_personal_rate():
    print(fl.request.get_json())
    data = check_form(fl.request.get_json())
    if data is None:
        return ("", 204)
    else:
        df = pd.DataFrame.from_dict([data])
        df_information = pd.read_csv(df["_pathToCsv"][0])
        df_information["time_reflexions"] = df["_timeReflexions"]
        df_information["sequence_" + df["_videoLetter"][0]] = df["_rateValue"]
        df_information.to_csv(df["_pathToCsv"][0], index=False)
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
    
