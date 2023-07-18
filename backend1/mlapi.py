from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import pandas as pd
import io
import pickle
import joblib
from pydantic import BaseModel
from pymongo import MongoClient
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import uvicorn
import warnings
from dotenv import load_dotenv
import os
warnings.filterwarnings("ignore")

app = FastAPI()
load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Atlas connection details
mongodb_url = os.getenv("MONGODB_URL")
client = MongoClient(mongodb_url)
db = client["mydatabase"]
users_collection = db["users"]

# User model
class User(BaseModel):
    username: str
    password: str

# User registration endpoint
@app.post("/register")
def register(user: User):
    existing_user = users_collection.find_one({"username": user.username})
    if existing_user:
        return {"message": False}
    else:
        users_collection.insert_one(user.dict())
        return {"message": True}

# User login endpoint
@app.post("/login")
def login(user: User):
    existing_user = users_collection.find_one({"username": user.username})
    if existing_user and existing_user["password"] == user.password:
        return {"username": user.username, "message": True}
    else:
        return {"message": False}


main_model = pickle.load(open('./Models/RandomForestmodel', 'rb'))
botmodel = pickle.load(open('./Models/bot_model.pkl', 'rb'))
ddos_model = pickle.load(open('./Models/ddos_model.pkl', 'rb'))
ddoshulk_model = pickle.load(open('./Models/ddoshulk_model.pkl', 'rb'))
dos_goldeneye_model = pickle.load(open('./Models/dos_goldeneye_model.pkl', 'rb'))
dos_slowhttptest_model = pickle.load(open('./Models/dos_slowhttptest_model.pkl', 'rb'))
dos_slowloris_model = pickle.load(open('./Models/dos_slowloris_model.pkl', 'rb'))
ftppatator_model = pickle.load(open('./Models/FTP- PATATOR_model.pkl', 'rb'))
infiltration_model = pickle.load(open('./Models/infiltration_model.pkl', 'rb'))
ssh_patator_model = pickle.load(open('./Models/ssh_patator_model.pkl', 'rb'))
webattack_bruteforce_model = pickle.load(open('./Models/webattack_bruteforce_model.pkl', 'rb'))
webattack_sqlinjection_model = pickle.load(open('./Models/webattack_sqlinjection_model.pkl', 'rb'))
known_attack_models = {
    botmodel: "bot",
    ddos_model: "ddos",
    ddoshulk_model: "ddoshulk",
    dos_goldeneye_model: "ddosgoldeneye",
    dos_slowhttptest_model: "dosslowhttptest",
    dos_slowloris_model: "dosslowloris",
    ftppatator_model: "ftppatator",
    infiltration_model: "infiltration",
    ssh_patator_model: "sshpatator",
    webattack_bruteforce_model: "webattackbruteforce",
    webattack_sqlinjection_model: "webattacksqlinjection"
}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...), username: str = Form(...)):
    df = pd.read_csv(file.file, index_col=False, dtype='unicode')

    df.dropna(inplace=True)
    df = df[~df.isin([np.nan, np.inf, -np.inf]).any(axis=1)]

    ###CICIDS2017-------------------------------------------
    #colsfromindex = [' Subflow Bwd Bytes',' ECE Flag Count',' Fwd URG Flags',' Active Max','Init_Win_bytes_forward',' act_data_pkt_fwd',' Bwd Header Length',' min_seg_size_forward',' Fwd Header Length', ' Label']
    #df.drop(colsfromindex, axis=1, inplace=True)

    print("processing")
    # Replace infinite and large values with NaN
    df = df.apply(pd.to_numeric, errors='coerce')
    df.replace([np.inf, -np.inf], np.nan, inplace=True)
    df.fillna(0, inplace=True)  # Replace NaN with 0

    print("predicting")
    df = df.values
    prediction = main_model.predict(df)
    prediction = (prediction > 0.5).astype(int)
    prediction = list(prediction)

    count_0, count_1 = prediction.count(0), prediction.count(1)

    if count_1 == 0:  # BENIGN
        return {
            "Prediction": "Not Malicious",
            "nonmal": count_0,
            "mali": count_1,
            "attack": "NA"
        }
    else:  # MALICIOUS
        attack = ""
        foundornot = False
        no_of_records = len(df)

        l = []

        for model in known_attack_models:
            whichpred = model.predict(df)
            inliers = list(whichpred).count(1)
            l.append(inliers)

        for i in known_attack_models:
            whichpred = i.predict(df)
            inliers = list(whichpred).count(1)
            if inliers > (no_of_records // 2):
                attack = known_attack_models[i]
                break
        if attack == "":
            attack = "zeroday"

        send_email(username, attack)
        print(attack)
        return {
            "Prediction": "malicious",
            "nonmal": count_0,
            "mali": count_1,
            "attack": attack
        }


def send_email(email, attack):
    # Email configuration
    sender_email = "detectivezeroday@gmail.com"
    sender_password = "axcubsjrnhrnfuab"

    subject = f"Urgent Security Alert: {attack} Attack Detected"
    message = f"""Subject: {subject}

Dear {email},

We regret to inform you that upon conducting a thorough analysis of your network logs, we have discovered some alarming findings. It appears that your network has been targeted and attacked by a malicious entity utilizing the {attack} method.

This type of attack can have severe consequences, ranging from data breaches to system malfunctions. To safeguard your network and protect your sensitive information, we strongly recommend taking immediate action.

We understand that this situation is concerning, but taking proactive measures is crucial for protecting your network from further harm.

Please do not hesitate to reach out if you require any assistance or guidance during this process. Our team is here to support you in any way we can.

Stay vigilant,

Team G70,
Detective Zero-day."""

    try:
        # Connect to SMTP server
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.ehlo()
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, email, message)
        server.quit()

        print("Email sent successfully!")
    except Exception as e:
        print(f"Failed to send email. Error: {str(e)}")
