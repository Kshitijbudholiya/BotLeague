import os
from datetime import timedelta
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)

app = Flask(__name__)
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

app.config.update(
    SECRET_KEY=os.getenv("SECRET_KEY"),
    SQLALCHEMY_DATABASE_URI=f"sqlite:///{os.path.join(BASE_DIR, 'botleague.db')}",
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
    JWT_SECRET_KEY=os.getenv("JWT_SECRET_KEY"),
    JWT_ACCESS_TOKEN_EXPIRES=timedelta(days=7),
)

CORS(app)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    team_name = db.Column(db.String(100), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    role = db.Column(db.String(30), default="member")
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __init__(self, name, email, team_name=None, city=None, role="member"):
        self.name = name
        self.email = email
        self.team_name = team_name
        self.city = city
        self.role = role

    def set_password(self, pw):
        self.password_hash = bcrypt.generate_password_hash(pw).decode("utf-8")

    def check_password(self, pw):
        return bcrypt.check_password_hash(self.password_hash, pw)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "team_name": self.team_name,
            "city": self.city,
            "role": self.role,
        }


class EcosystemSignup(db.Model):
    __tablename__ = "ecosystem_signups"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    location = db.Column(db.String(100))
    role = db.Column(db.String(30))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __init__(self, name, email, location=None, role="community"):
        self.name = name
        self.email = email
        self.location = location
        self.role = role


def err(msg, code=400):
    return jsonify({"success": False, "message": msg}), code


def ok(data=None, msg="OK", code=200):
    payload = {"success": True, "message": msg}
    if data is not None:
        payload["data"] = data
    return jsonify(payload), code


@app.route("/api/auth/register", methods=["POST"])
def register():
    body = request.get_json(silent=True) or {}

    name = (body.get("name") or "").strip()
    email = (body.get("email") or "").strip().lower()
    password = body.get("password") or ""
    team_name = (body.get("teamName") or "").strip()
    city = (body.get("city") or "").strip()

    if not name or not email or not password:
        return err("Name, email and password are required.")
    if len(password) < 6:
        return err("Password must be at least 6 characters.")
    if User.query.filter_by(email=email).first():
        return err("An account with that email already exists.")

    user = User(name=name, email=email, team_name=team_name or None, city=city or None)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    token = create_access_token(identity=str(user.id))
    return ok({"user": user.to_dict(), "token": token}, "Account created!", 201)


@app.route("/api/auth/login", methods=["POST"])
def login():
    body = request.get_json(silent=True) or {}
    email = (body.get("email") or "").strip().lower()
    password = body.get("password") or ""

    if not email or not password:
        return err("Email and password required.")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return err("Invalid email or password.", 401)

    token = create_access_token(identity=str(user.id))
    return ok({"user": user.to_dict(), "token": token}, "Welcome back!")


@app.route("/api/auth/me", methods=["GET"])
@jwt_required()
def me():
    user = User.query.get(int(get_jwt_identity()))
    if not user:
        return err("User not found.", 404)
    return ok(user.to_dict())


EVENTS = [
    {
        "id": 1,
        "title": "Event in Mumbai",
        "date": "7/11/25",
        "location": "BRC",
        "category": "Junior",
    },
    {
        "id": 2,
        "title": "Event in Delhi",
        "date": "11/11/26",
        "location": "BRC",
        "category": "Pro",
    },
    {
        "id": 3,
        "title": "Event in Chennai",
        "date": "2/03/26",
        "location": "TIDEL",
        "category": "Mini Makers",
    },
    {
        "id": 4,
        "title": "Event in Kolkata",
        "date": "5/05/26",
        "location": "BISWA",
        "category": "Young Engineers",
    },
]


@app.route("/api/events", methods=["GET"])
def get_events():
    return ok(EVENTS)


LEADERBOARD = [
    {"rank": 1, "name": "AlphaBot_X", "pts": "98k", "pct": 100, "city": "Bengaluru"},
    {"rank": 2, "name": "VoltViper", "pts": "87k", "pct": 89, "city": "Mumbai"},
    {"rank": 3, "name": "SteelSurge", "pts": "76k", "pct": 78, "city": "Delhi"},
    {"rank": 4, "name": "CircuitKing", "pts": "65k", "pct": 66, "city": "Chennai"},
    {"rank": 5, "name": "RoboForce", "pts": "54k", "pct": 55, "city": "Hyderabad"},
    {"rank": 6, "name": "NanoNinja", "pts": "43k", "pct": 44, "city": "Pune"},
]


@app.route("/api/leaderboard", methods=["GET"])
def get_leaderboard():
    return ok(LEADERBOARD)


@app.route("/api/ecosystem", methods=["POST"])
def ecosystem_signup():
    body = request.get_json(silent=True) or {}
    name = (body.get("name") or "").strip()
    email = (body.get("email") or "").strip().lower()
    location = (body.get("location") or "").strip()
    role = (body.get("role") or "community").strip()

    if not name or not email:
        return err("Name and email are required.")

    signup = EcosystemSignup(name=name, email=email, location=location, role=role)
    db.session.add(signup)
    db.session.commit()
    return ok(msg="You're registered! We'll be in touch.", code=201)


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
