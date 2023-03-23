from flask import Flask, render_template, request
import sqlite3


def get_db_connection():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn


app = Flask(__name__)


@app.route("/")
def index():
    conn = get_db_connection()
    users = conn.execute("select * from users").fetchall()
    conn.close()
    return render_template("index.html.jinja", users=users)


@app.get("/signup")
def signup_get():
    return render_template("signup.html.jinja")


@app.post("/signup")
def signup_post():
    with app.test_request_context("/signup", method="POST"):
        return "Pippo"


@app.get("/signin")
def signin():
    return render_template("signin.html.jinja")
