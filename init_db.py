import sqlite3

connection = sqlite3.connect("database.db")

with open("schema.sql") as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO users (fullName, age, gender) VALUES (?, ?, ?)",
            ("Maria Rossi", 22, "M"))

cur.execute("INSERT INTO users (fullName, age, gender) VALUES (?, ?, ?)",
            ("Maria Rossi", 22, "F"))

connection.commit()
connection.close()
