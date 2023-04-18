from flask import Flask, request, jsonify, render_template, redirect, session, url_for, abort
from pyargon2 import hash
from mysql.connector import connect

app = Flask(__name__)
app.config["DEBUG"] = True

app.config["SECRET_KEY"] = "PippoPlutoPaperino"

config = {
    "host": "aws.connect.psdb.cloud",
    "user": "tixuvo7ipyhdg0yz85rq",
    "passwd": "pscale_pw_Dpp3qW4QEcuPRoObRz9MVt0nUNGymfHMYWvTH8IDLMd",
    "database": "myfamilybank",
    "port": "3306"
}


@app.get("/")
def index():
    if session.get("logged_in"):
        return redirect("/dashboard")
    return render_template("index.html")


@app.get("/sign-up")
def get_sign_up():
    if not session.get("logged_in"):
        return render_template("sign-up.html")
    return redirect("/dashboard")


@app.post("/sign-up")
def post_sign_up():
    conn = connect(**config)
    cursor = conn.cursor(dictionary=True)

    email = request.form["email"]
    passwd = request.form["passwd"]
    hashed_passwd = hash(passwd, app.config["SECRET_KEY"])
    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    family_role = request.form["family_role"]
    family_name = request.form["family_name"]

    cursor.execute("SELECT MAX(id) as max_id FROM users")
    max_id = cursor.fetchone()
    if max_id["max_id"] == None:
        max_id["max_id"] = 0
    cursor.execute(
        "ALTER TABLE users AUTO_INCREMENT = {}".format(max_id["max_id"]))

    cursor.execute("INSERT INTO users (email, passwd, firstName, lastName, familyName) VALUES (%s, %s, %s, %s, %s);",
                   (email, hashed_passwd, first_name, last_name, family_name))
    cursor.execute("COMMIT")

    cursor.close()
    conn.close()

    return redirect("/login")


@app.get("/login")
def get_login():
    if not session.get("logged_in"):
        return render_template("login.html")
    return redirect("/dashboard")


@app.post("/login")
def post_login():
    conn = connect(**config)
    cursor = conn.cursor(dictionary=True)

    form_email = request.form.get("email")
    form_passwd = request.form.get("passwd")
    form_hashed_passwd = hash(form_passwd, app.config["SECRET_KEY"])

    if form_email == "" or form_passwd == "":
        abort(500)

    cursor.execute("SELECT * FROM users WHERE email=%s AND passwd=%s",
                   (form_email, form_hashed_passwd))
    user = cursor.fetchone()

    if form_email == user["email"] and form_hashed_passwd == user["passwd"]:
        session["logged_in"] = True
        session["firstName"] = user["firstName"]
        session["lastName"] = user["lastName"]
        session["family"] = {"role": user["familyRole"],
                             "name": user["familyName"]}
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


@app.get("/dashboard/expense")
def dashboard_expense():
    if session.get("logged_in"):
        return render_template("dashboard-expense.html")
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
            "email": user["email"], "passwd": user["passwd"], "first_name": user["firstName"], "last_name": user["lastName"]
        }

    cursor.close()
    conn.close()

    return jsonify(all_users)


@app.get("/500")
def error_500():
    return render_template("error/500.html")


@app.errorhandler(500)
def handle_500(e):
    return redirect("/500"), 500


if __name__ == "__main__":
    app.run(debug=True)
