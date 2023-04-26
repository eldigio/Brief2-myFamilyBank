from flask import Flask, request, jsonify, render_template, redirect, session, url_for, abort
from passlib.hash import sha256_crypt
from pymongo import MongoClient

app = Flask(__name__)
app.config["DEBUG"] = True

app.config["SECRET_KEY"] = "PippoPlutoPaperino"

connection_string = "mongodb+srv://eldigio:eldigio69@myfamilybank.59d7nxl.mongodb.net"
client = MongoClient(connection_string)

db = client.myfamilybank
collection = db.myfamilybank


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
    email = request.form["email"]
    passwd = request.form["passwd"]
    hashed_password = sha256_crypt.hash(passwd)
    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    family_name = request.form["family_name"]
    family_role = request.form["family_role"]

    # if family_role == "head":
    #     cursor.execute("SELECT ")

    collection.insert_one(
        {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "passwd": hashed_password,
            "family": {
                "role": family_role, "name": family_name
            }
        }
    )

    return redirect("/login")


@app.get("/login")
def get_login():
    if not session.get("logged_in"):
        return render_template("login.html")
    return redirect("/dashboard")


@app.post("/login")
def post_login():
    form_email = request.form.get("email")
    form_passwd = request.form.get("passwd")

    if form_email == "" or form_passwd == "":
        abort(500)

    user = collection.find_one(
        {"email": {"$eq": form_email}})

    print(user)
    print(sha256_crypt.verify(form_passwd, user["passwd"]))

    if sha256_crypt.verify(form_passwd, user["passwd"]):
        session["logged_in"] = True
        session["firstName"] = user["first_name"]
        session["lastName"] = user["last_name"]
        session["family"] = {
            "role": user["family"]["role"], "name": user["family"]["name"]
        }
        return redirect("/dashboard")

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


# @app.get("/api/users")
# def get_all_users():
#     conn = connect(**config)
#     cursor = conn.cursor(dictionary=True)

#     query = "SELECT * FROM users"

#     cursor.execute(query)
#     users = cursor.fetchall()

#     all_users = dict()

#     for user in users:
#         all_users[f"User {user['id']}"] = {
#             "email": user["email"], "passwd": user["passwd"], "first_name": user["firstName"], "last_name": user["lastName"]
#         }

#     cursor.close()
#     conn.close()

#     return jsonify(all_users)


@app.get("/500")
def error_500():
    return render_template("error/500.html")


@app.errorhandler(500)
def handle_500(e):
    return redirect("/500"), 500


if __name__ == "__main__":
    app.run(debug=True)
