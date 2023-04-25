from passlib.hash import sha512_crypt


passwd = "pippo"
hashed_password = sha512_crypt.hash(passwd)

print(hashed_password)

print(sha512_crypt.verify(passwd, hashed_password))
