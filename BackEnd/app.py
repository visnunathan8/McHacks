from flask import Flask, redirect, jsonify, request, session
import csv
import datetime
from flask_cors import CORS, cross_origin
import os
from twilio.rest import Client
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
import requests
from googleapiclient.discovery import build
import os
from flask_mysql_connector import MySQL

app = Flask(__name__)
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root@123'
app.config['MYSQL_HOST'] = 'localhost'  # Update with your MySQL host
app.config['MYSQL_DATABASE'] = 'db'
mysql = MySQL(app)

# Generate a random secret key with 24 bytes
secret_key = os.urandom(24)
print(secret_key)

app = Flask(__name__)
app.config['SECRET_KEY'] = secret_key

CORS(app)
CORS(app, origins=['http://127.0.0.1:4200/','http://localhost:4200','http://192.168.122.136:4200'])



SCOPES = [
    "https://www.googleapis.com/auth/fitness.activity.read",
    "https://www.googleapis.com/auth/fitness.blood_glucose.read",
    "https://www.googleapis.com/auth/fitness.blood_pressure.read",
    "https://www.googleapis.com/auth/fitness.heart_rate.read",
    "https://www.googleapis.com/auth/fitness.body.read",
    "https://www.googleapis.com/auth/fitness.body.read",
    "https://www.googleapis.com/auth/fitness.sleep.read",
    "https://www.googleapis.com/auth/fitness.body.read",
    "https://www.googleapis.com/auth/fitness.reproductive_health.read",
    "https://www.googleapis.com/auth/userinfo.profile",
]

CLIENT_SECRETS_FILE = "creds.json"
REDIRECT_URI = "http://localhost:4200/main"


@app.route('/get_users_sorted_by_points', methods=['GET'])
def get_users_sorted_by_points():
    cursor = mysql.connection.cursor(dictionary=True)
    cursor.execute("SELECT username, total_points FROM user_tasks ORDER BY total_points DESC")
    users = cursor.fetchall()
    cursor.close()

    return jsonify({"users": users}), 200

@app.route('/open_html_file', methods=['POST'])
def open_html_file():
    data = request.get_json()
    task = data.get('task')

    # Assuming 'user123' as the username for the example, replace it with your actual username
    username = data.get('username')

    # Check the specific task and update the corresponding column
    if task == 'task1':
        column_to_update = 'task1'
    elif task == 'task2':
        column_to_update = 'task2'
    elif task == 'task3':
        column_to_update = 'task3'
    elif task == 'task4':
        column_to_update = 'task4'
    else:
        return jsonify({"error": f"Invalid task: {task}"}), 400

    # Update the database based on the specified conditions
    cursor = mysql.connection.cursor()
    cursor.execute(f"UPDATE user_tasks SET {column_to_update} = 1, current_points = current_points + 10, total_points = total_points + 10 WHERE username = %s", (username,))
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": f"{task} marked and points incremented successfully"}), 200



@app.route('/get_user_points/<username>', methods=['GET'])
def get_user_points(username):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT current_points, total_points FROM user_tasks WHERE username = %s", (username,))
    result = cursor.fetchone()
    cursor.close()

    if result:
        today_points = result[0]
        total_points = result[1]
        return jsonify({"todayPoints": today_points, "totalPoints": total_points}), 200
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/add_user_task', methods=['POST'])
def add_user_task():
    data = request.get_json()
    username = data['username']
    task1 = data['task1']
    task2 = data['task2']
    task3 = data['task3']
    task4 = data['task4']
    current_points = data['current_points']
    total_points = data['total_points']

    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO user_tasks (username, task1, task2, task3, task4, current_points, total_points) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                   (username, task1, task2, task3, task4, current_points, total_points))
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": "User task added successfully"}), 201


@app.route('/get_user_tasks/<username>', methods=['GET'])
def get_user_tasks(username):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM user_tasks WHERE username = %s", (username,))
    result = cursor.fetchone()
    cursor.close()

    if result:
        user_tasks = {
            "username": result[1],
            "task1": result[2],
            "task2": result[3],
            "task3": result[4],
            "task4": result[5],
            "current_points": result[6],
            "total_points": result[7]
        }
        return jsonify(user_tasks), 200
    else:
        return jsonify({"message": "User not found"}), 404


@app.route('/send_sms/<username>', methods=['GET'])
def sms(username):
    cursor = mysql.connection.cursor()
    client = Client('*******', '******')
    cursor.execute("SELECT * FROM user_tasks WHERE username = %s", (username,))
    result = cursor.fetchone()
    cursor.close()

    if result:
        message = client.messages.create(
            body=f"Hello {result[1]}! Congratulations... You have reached {result[7]} points and have unlocked a coupon!!!!",
            from_='+14312442439',
            to='+15145788948'
        )
    return "Success"


@app.route('/check_username/<username>', methods=['GET'])
def check_username_validity(username):
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT username FROM user_tasks WHERE username = %s", (username,))
        result = cursor.fetchone()
        cursor.close()

        if result:
            return jsonify({"isValid": True}), 200
        else:
            return jsonify({"isValid": False}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# # Initialize Google API client
# def get_google_client():
#     if 'google_client' not in g:
#         g.google_client = create_google_client()
#     return g.google_client

    
# def get_people_service():
#     return build('people', 'v1', credentials=get_google_client())


# # Function to retrieve user profile
# def get_user_profile():
#     people_service = get_people_service()
#     profile = people_service.people().get(
#         resourceName='people/me',
#         personFields='names,photos,emailAddresses'
#     ).execute()

#     displayName = profile['names'][0]['displayName']
#     url = profile['photos'][0]['url']
#     userID = int(profile['resourceName'].replace("people/", ""), 10)

#     return {
#         'displayName': displayName,
#         'profilePhotoUrl': url,
#         'userID': userID
#     }



@app.route("/api/login")
def auth_google():
    flow = InstalledAppFlow.from_client_secrets_file(
        CLIENT_SECRETS_FILE, scopes=SCOPES, redirect_uri=REDIRECT_URI
    )
    authorization_url, state = flow.authorization_url(
        access_type="offline",
        prompt="select_account",
    )
    # profile = get_user_profile()
    print(f"HELLO")
    session["auth_url"] = authorization_url
    # data = fetch_fitness_data()
    # print(data)
    return jsonify({"authUrl": authorization_url})


def create_google_client():
    creds = None
    if not creds or not creds.valid:
        flow = InstalledAppFlow.from_client_secrets_file(
            'creds.json', SCOPES)
        creds = flow.run_local_server(port=0)
    return creds


# Google callback route
@app.route('/api/login/callback')
def google_auth_callback():
    print("HIII")
    code = request.args.get('code')
    google_api_client = create_google_client()
    google_api_client.fetch_token(
        'https://accounts.google.com/o/oauth2/token', code=code
    )

    # session['credentials'] = google_api_client.get_authorized_user_info()
    # profile = get_user_profile()
    # session['userProfile'] = profile

    # # Save user data to Appwrite
    # save_user_data_to_appwrite(profile)
   
    return redirect('http://localhost:4200/main')


@app.route('/fetch-data')
def fetch_fitness_data():
    try:
        # userProfile = session.get('userProfile')

        # userName = userProfile['displayName']
        # profilePhoto = userProfile['profilePhotoUrl']
        # userId = userProfile['userID']
        authorization_url = session.get("auth_url")
        print(f"Before : {authorization_url}")
        seven_days_in_millis = 14 * 24 * 60 * 60 * 1000
        start_time_millis = int((datetime.datetime.now() - datetime.timedelta(days=7)).timestamp()) * 1000
        end_time_millis = int((datetime.datetime.now() + datetime.timedelta(days=1)).timestamp()) * 1000

        # google_api_client = create_google_client()
        fit_service = build('fitness', 'v1', credentials=authorization_url)
        print("STARTING")
        response = fit_service.users().dataset().aggregate(
            userId='me',
            body={
                'aggregateBy': [
                    {'dataTypeName': 'com.google.step_count.delta'},
                    {'dataTypeName': 'com.google.blood_glucose'},
                    {'dataTypeName': 'com.google.blood_pressure'},
                    {'dataTypeName': 'com.google.heart_rate.bpm'},
                    {'dataTypeName': 'com.google.weight'},
                    {'dataTypeName': 'com.google.height'},
                    {'dataTypeName': 'com.google.sleep.segment'},
                    {'dataTypeName': 'com.google.body.fat.percentage'},
                    {'dataTypeName': 'com.google.menstruation'}
                ],
                'bucketByTime': {'durationMillis': 86400000},
                'startTimeMillis': start_time_millis,
                'endTimeMillis': end_time_millis
            }
        ).execute()

        fitnessData = response['bucket']
        formattedData = []
        print("RESPONSE : {response}")
        for data in fitnessData:
            date = datetime.datetime.fromtimestamp(int(data['startTimeMillis']) / 1000).date()
            formattedDate = date.strftime('%a, %d %b %Y')

            formattedEntry = {
                'date': formattedDate,
                'step_count': 0,
                'glucose_level': 0,
                'blood_pressure': [0, 0],
                'heart_rate': 0,
                'weight': 0,
                'height_in_cms': 0,
                'sleep_hours': 0,
                'body_fat_in_percent': 0,
                'menstrual_cycle_start': 0
            }

            for dataset in data['dataset']:
                point = dataset['point']
                if point and len(point) > 0:
                    value = point[0]['value']
                    data_source_id = dataset['dataSourceId']

                    if data_source_id == 'derived:com.google.step_count.delta:com.google.android.gms:aggregated':
                        formattedEntry['step_count'] = value[0]['intVal'] if 'intVal' in value[0] else 0
                    elif data_source_id == 'derived:com.google.blood_glucose.summary:com.google.android.gms:aggregated':
                        glucose_level = 0
                        if value and len(value) > 0:
                            for data in value:
                                if 'fpVal' in data:
                                    glucose_level = data['fpVal'] * 10
                                    break
                        formattedEntry['glucose_level'] = glucose_level
                    elif data_source_id == 'derived:com.google.blood_pressure.summary:com.google.android.gms:aggregated':
                        final_data = [0, 0]
                        if value and len(value) > 0:
                            for data in value:
                                if 'fpVal' in data:
                                    if data['fpVal'] > 100:
                                        final_data[0] = data['fpVal']
                                    elif data['fpVal'] < 100:
                                        final_data[1] = data['fpVal']
                        formattedEntry['blood_pressure'] = final_data
                    elif data_source_id == 'derived:com.google.heart_rate.summary:com.google.android.gms:aggregated':
                        heart_data = 0
                        if value and len(value) > 0:
                            for data in value:
                                if 'fpVal' in data:
                                    heart_data = data['fpVal']
                                    break
                        formattedEntry['heart_rate'] = heart_data
                    elif data_source_id == 'derived:com.google.weight.summary:com.google.android.gms:aggregated':
                        formattedEntry['weight'] = value[0]['fpVal'] if 'fpVal' in value[0] else 0
                    elif data_source_id == 'derived:com.google.height.summary:com.google.android.gms:aggregated':
                        formattedEntry['height_in_cms'] = value[0]['fpVal'] * 100 if 'fpVal' in value[0] else 0
                    elif data_source_id == 'derived:com.google.sleep.segment:com.google.android.gms:merged':
                        formattedEntry['sleep_hours'] = value[0] if 'value' in value[0] else 0
                    elif data_source_id == 'derived:com.google.body.fat.percentage.summary:com.google.android.gms:aggregated':
                        body_fat = 0
                        if value and len(value) > 0:
                            body_fat = value[0]['fpVal'] if 'fpVal' in value[0] else 0
                        formattedEntry['body_fat_in_percent'] = body_fat
                    elif data_source_id == 'derived:com.google.menstruation:com.google.android.gms:aggregated':
                        formattedEntry['menstrual_cycle_start'] = value[0]['intVal'] if 'intVal' in value[0] else 0

            formattedData.append(formattedEntry)

        # Save fitness data to Appwrite
        # save_fitness_data_to_appwrite(formattedData)

        return jsonify({
            # 'userName': userName,
            # 'profilePhoto': profilePhoto,
            # 'userId': userId,
            'formattedData': formattedData
        })

    except Exception as e:
        print("Error fetching fitness data:", str(e))
        return redirect('/error')

if __name__ == '__main__':
    app.run(debug=True)
