import os
import sys
import signal
from datetime import datetime
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import create_engine, text
from flask import Flask, jsonify, flash, request, redirect, url_for, session, jsonify, Response
from flask_cors import CORS, cross_origin
import json
from config import Config
from flask_sqlalchemy import SQLAlchemy
import subprocess
import hashlib
from flask_migrate import Migrate
import shutil
import redis 
import threading
import time
import pytz
from loguru import logger
from concurrent.futures import ThreadPoolExecutor
from dotenv import load_dotenv
import traceback
from sqlalchemy.event import listen


load_dotenv()

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

DEFAULT_TIME_LIMIT = os.getenv('DEFAULT_TIME_LIMIT')
DEFAULT_FILTER_SIZE = os.getenv('DEFAULT_FILTER_SIZE')
DEFAULT_DEPTH_LIMIT = os.getenv('DEFAULT_DEPTH_LIMIT')
REDIS_HOST = os.getenv('REDIS_HOST')
REDIS_PORT = os.getenv('REDIS_PORT')

""" Set up Flask application """
app = Flask(__name__)
CORS(app)
CORS(app, origins=['http://127.0.0.1:3000/','http://localhost:3000','http://192.168.122.136:3000'])
app.config.from_object(Config)

""" Set up SQLAlchemy database """
db = SQLAlchemy(app)


@app.route('/get_users_sorted_by_points', methods=['GET'])
def get_users_sorted_by_points():
    cursor = mysql.connection.cursor(dictionary=True)
    cursor.execute("SELECT username, profile_pic, total_points FROM user_tasks ORDER BY total_points DESC")
    users = cursor.fetchall()
    cursor.close()

    return jsonify({"users": users}), 200

@app.route('/check_username_validity', methods=['GET'])
def check_username_validity():
    # try:
    print("AWFWAEF")