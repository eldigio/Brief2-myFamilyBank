from flask import Flask, request, jsonify, render_template, redirect, session, flash, abort
from passlib.hash import sha256_crypt
from pymongo import MongoClient

app = Flask(__name__)
app.config["DEBUG"] = True

app.config["SECRET_KEY"] = "PippoPlutoPaperino"

connection_string = "mongodb+srv://eldigio:eldigio69@myfamilybank.59d7nxl.mongodb.net/test"
client = MongoClient(connection_string)

db = client.myfamilybank


@app.get("/")
def index():
    if session.get("logged_in"):
        return redirect("/dashboard")
    return render_template("index.jinja-html")


@app.get("/sign-up")
def get_sign_up():
    if not session.get("logged_in"):
        return render_template("sign-up.jinja-html")
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

    db.users.insert_one(
        {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "passwd": hashed_password,
            "family": {
                "role": family_role, "name": family_name
            },
            "amounts": []
        }
    )

    return redirect("/login")


@app.get("/login")
def get_login():
    if not session.get("logged_in"):
        return render_template("login.jinja-html")
    return redirect("/dashboard")


@app.post("/login")
def post_login():
    form_email = request.form.get("email")
    form_passwd = request.form.get("passwd")

    if form_email == "" or form_passwd == "":
        abort(500)

    if form_email == "Admin" and form_passwd == "admin":
        session["logged_in"] = True
        session["user"] = "Admin"
        return redirect("/admin")

    user = db.users.find_one({"email": {"$eq": form_email}})

    if sha256_crypt.verify(form_passwd, user["passwd"]):
        session["logged_in"] = True
        session["firstName"] = user["first_name"]
        session["lastName"] = user["last_name"]
        session["email"] = user["email"]
        session["family"] = {
            "role": user["family"]["role"], "name": user["family"]["name"]
        }
        return redirect("/dashboard")

    flash("Invalid password", "err")
    return redirect("/login")


@app.get("/logout")
def logout():
    session.clear()
    return redirect("/")


@app.get("/dashboard")
def dashboard():
    if session.get("logged_in"):
        return render_template("dashboard.jinja-html")
    return redirect("/login")


@app.get("/profile")
def get_profile():
    global session
    if session.get("logged_in"):
        return render_template("dashboard-profile.jinja-html")
    return redirect("/login")


@app.post("/profile")
def post_profile():
    form = {
        "first_name": request.form["firstName"],
        "last_name": request.form["lastName"],
        "email": request.form["email"],
        "familyName": request.form["familyName"],
        "familyRole": request.form["familyRole"],
    }

    db.users.update_one(
        {
            "first_name": session["firstName"],
            "last_name": session["lastName"],
            "email": session["email"],
            "family.name": session["family"]["name"],
            "family.role": session["family"]["role"]
        },
        {"$set": {
            "first_name": form["first_name"],
            "last_name": form["last_name"],
            "email": form["email"],
            "family.role": form["familyRole"]
        }}
    )

    session["firstName"] = form["first_name"]
    session["lastName"] = form["last_name"]
    session["email"] = form["email"]
    session["family"]["name"] = form["familyName"]
    session["family"]["role"] = form["familyRole"]

    return redirect("/profile")


@app.get("/profile/family")
def get_profile_family():
    if session.get("logged_in"):
        return render_template("dashboard-profile-family.jinja-html")
    return redirect("/login")


@app.get("/profile/expense")
def get_expense():
    if session.get("logged_in"):
        return render_template("dashboard-expense.jinja-html")
    return redirect("/login")


@app.post("/profile/expense")
def post_expense():
    amount = request.form["amount"]
    date = request.form["date"]
    email = request.form["sessionEmail"]
    family_name = request.form["sessionFamilyName"]
    family_role = request.form["sessionFamilyRole"]
    first_name = request.form["sessionFirstName"]
    last_name = request.form["sessionLastName"]

    db.users.update_one(
        {"first_name": first_name, "last_name": last_name, "email": email},
        {"$push": {"amounts": {"amount": amount, "date": date}}}
    )

    return redirect("/dashboard")

@app.get("/profile/family/<string:familyName>")
def get_family_by_name(familyName):
    users = {}
    results = db.users.find({"family.name": familyName})
    for i, user in enumerate(results):
        users.update({
            f"{i}": {
                "first_name": user["first_name"],
                "last_name": user["last_name"],
                "email": user["email"],
                "family_role": user["family"]["role"],
                "family_name": user["family"]["name"],
                "amount": user["amounts"],
            }
        })
    return jsonify(users)

@app.post("/profile/delete")
def delete_profile():
    db.users.delete_one({
        "first_name": request.form["firstName"],
        "last_name": request.form["lastName"],
        "email": request.form["email"],
        "family.role": request.form["familyRole"],
        "family.name": request.form["familyName"],
    })
    
    return redirect("/logout")

@app.get("/admin")
def get_admin():
    if session.get("logged_in") and session.get("user") == "Admin":
        return render_template("admin-dashboard.jinja-html")
    return redirect("/")

@app.get("/api/all-users")
def get_all_users():
    users = {}
    result = db.users.find({}, {"email": 1})
    for i, user in  enumerate(result):
        users.update({
            f"{i}": {
                "email": user["email"],
            }
        })
    
    return jsonify(users)

@app.get("/500")
def error_500():
    return render_template("error/500.html")


@app.errorhandler(500)
def handle_500(e):
    return redirect("/500"), 500


if __name__ == "__main__":
    app.run(debug=True)
