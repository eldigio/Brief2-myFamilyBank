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
            "expenses": []
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
    category = request.form["category"]

    db.users.update_one(
        {"first_name": first_name, "last_name": last_name, "email": email},
        {"$push": {"expenses": {"category": category, "amount": amount, "date": date}}}
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
                "expenses": user["expenses"],
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
    if session.get("admin"):
        return render_template("admin-dashboard.jinja-html")
    return redirect("/admin/login")


@app.post("/admin")
def post_admin():
    from bson import ObjectId

    if request.form["amount"] and request.form["category"] and request.form["date"]:
        db.users.update_one({
            "_id": ObjectId(request.form["id"]),
            "expenses.category": request.form["old_category"],
            "expenses.amount": request.form["old_amount"],
            "expenses.date": request.form["old_date"],
        }, {
            "$set": {
                "first_name": request.form["first_name"],
                "last_name": request.form["last_name"],
                "expenses.$.category": request.form["category"],
                "expenses.$.amount": request.form["amount"],
                "expenses.$.date": request.form["date"],
            }
        })
    else:
        db.users.update_one({"_id": ObjectId(request.form["id"])}, {
            "$set": {
                "first_name": request.form["first_name"],
                "last_name": request.form["last_name"],
                "family.role": request.form["family_role"],
                "family.name": request.form["family_name"],
            }
        })

    return redirect("/admin")


@app.post("/admin/delete")
def post_admin_delete():
    from bson import ObjectId
    if request.form["amount"] and request.form["category"] and request.form["date"]:
        db.users.update_one({"_id": ObjectId(request.form["id"])}, {
            "$pull": {
                "expenses": {
                    "amount": request.form["amount"],
                    "category": request.form["category"],
                    "date": request.form["date"],
                }
            }
        })
    else:
        db.users.delete_one({"_id": ObjectId(request.form["id"])})

    return redirect("/admin")


@app.get("/admin/login")
def get_admin_login():
    if session.get("admin"):
        return redirect("/admin")
    return render_template("admin-login.jinja-html")


@app.post("/admin/login")
def post_admin_login():
    session["admin"] = True
    session["user"] = request.form["user"]
    session["passwd"] = request.form["passwd"]

    return redirect("/admin")


@app.get("/admin/logout")
def get_admin_logout():
    session.clear()
    return redirect("/")


@app.get("/api/all-users")
def get_all_users():
    users = {}
    result = db.users.find({}, {"email": 1})
    for i, user in enumerate(result):
        users.update({
            f"{i}": {"email": user["email"]}
        })

    return jsonify(users)


@app.get("/api/admin/all-users")
def get_all_users_admin():
    users = []
    result = db.users.find({})
    for user in result:
        users.append({
            "id": str(user["_id"]),
            "email": user["email"],
            "first_name": user["first_name"],
            "last_name": user["last_name"],
            "family_role": user["family"]["role"],
            "family_name": user["family"]["name"],
            "expenses": user["expenses"]
        })

    return jsonify(users)


@app.get("/api/all-admins")
def get_all_admins():
    admins = []
    result = db.admins.find({}, {"user": 1, "passwd": 1})
    for admin in result:
        admins.append({"user": admin["user"], "passwd": admin["passwd"]})

    return jsonify(admins)


@app.get("/500")
def error_500():
    return render_template("error/500.html")


@app.errorhandler(500)
def handle_500(e):
    return redirect("/500"), 500


if __name__ == "__main__":
    app.run(debug=True)
