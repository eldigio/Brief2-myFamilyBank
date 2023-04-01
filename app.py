from flask import Flask, request, jsonify, render_template, redirect, session, sessions
from werkzeug.security import check_password_hash
from mysql.connector import connect

app = Flask(__name__)
app.config["DEBUG"] = True

app.config["SECRET_KEY"] = "pippo"

config = {
    "host": "containers-us-west-160.railway.app",
    "user": "root",
    "passwd": "wT7iWjGdt4EJyy1yTWIu",
    "database": "railway",
    "port": "8016"
}


@app.get("/")
def index():
    if session.get("logged_in"):
        return redirect("/dashboard")
    return render_template("index.html")


@app.get("/sign-up")
def get_sign_up():
    return render_template("sign-up.html")


@app.get("/login")
def get_login():
    if not session.get("logged_in"):
        return render_template("login.html")
    return redirect("/dashboard")


@app.post("/login")
def post_login():
    conn = connect(**config)
    cursor = conn.cursor(dictionary=True)

    email = request.form.get("email")
    passwd = request.form.get("passwd")

    query = f"SELECT * FROM users WHERE email=%s AND passwd=%s"
    cursor.execute(query, (email, passwd))
    user = cursor.fetchone()

    if request.form["email"] == user["email"] and request.form["passwd"] == user["passwd"]:
        session["logged_in"] = True
        session["full_name"] = {
            "first_name": user["first_name"], "last_name": user["last_name"]
        }
        return redirect("/dashboard")

    cursor.close()
    conn.close()

    return redirect("/login")


@app.get("/logout")
def logout():
    session.pop("logged_in")
    return redirect("/")


@app.get("/dashboard")
def dashboard():
    if session.get("logged_in"):
        return render_template("dashboard.html")
    return redirect("/login")


@app.get("/api/users")
def get_all_users():
    conn = connect(**config)
    cursor = conn.cursor(dictionary=True)

    query = "SELECT * FROM users"

    cursor.execute(query)
    users = cursor.fetchall()

    all_users = dict()

    for user in users:
        all_users[f"User {user['id']}"] = {
            "email": user["email"], "passwd": user["passwd"], "first_name": user["first_name"], "last_name": user["last_name"]
        }

    cursor.close()
    conn.close()

    return jsonify(all_users)


if __name__ == "__main__":
    app.run(debug=True)
