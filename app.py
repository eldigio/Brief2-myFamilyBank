from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

app = Flask(__name__)
app.config["DEBUG"] = True

app.config["JWT_SECRET_KEY"] = "pluto"
jwt = JWTManager(app)

db = SQLAlchemy()
app.config["SECRET_KEY"] = "pippo"
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql+pymysql://root:ElDiGio2003!?@localhost/MyFamilyBank'
db.init_app(app)


@app.get("/")
def index():
    return render_template("index.html")


@app.get("/login")
def get_login():
    return render_template("login.html")


@app.post("/login")
def post_login():

    access = dict()
    access_token = "acccesstoken"

    access["access_token"] = access_token

    return jsonify(access)


@app.get("/api/all-users")
def get_all_users():
    users = User.query.all()

    all_users = dict()

    for user in users:
        all_users[f"user {user.id}"] = {
            "email": user.email, "password": user.passwd, "first_name": user.first_name, "last_name": user.last_name}

    return jsonify(all_users)

# Models


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(32))
    passwd = db.Column(db.String(255))
    first_name = db.Column(db.String(32))
    last_name = db.Column(db.String(32))

    def __init__(self, email, passwd, first_name, last_name):
        self.email = email
        self.passwd = passwd
        self.first_name = first_name
        self.last_name = last_name


if __name__ == "__main__":
    app.run(debug=True)
