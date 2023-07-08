from flask import Flask, jsonify, current_app
from flask.cli import with_appcontext
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import click
import os

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI")
db = SQLAlchemy(app)


class Actor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(100), nullable=False)

    def serialize(self):
        return {"id": self.id, "name": self.name, "image": self.image}


def test():
    print(os.getenv("TMDB_API_KEY"))


# def get_popular_actors():
#     url = "https://api.themoviedb.org/3/person/popular"
#     headers = {"Authorization": "Bearer " + os.getenv("TMDB_API_KEY")}
#     params = {"page": 1}

#     while True:
#         response = requests.get(url, headers=headers, params=params)
#         data = response.json()

#         if not data["results"]:
#             break

#         for actor in data["results"]:
#             new_actor = Actor(id=actor["id"], name=actor["name"], image=actor["profile_path"])
#             db.session.add(new_actor)

#         db.session.commit()

#         params["page"] += 1


@app.route("/actors", methods=["GET"])
def get_actors():
    actors = Actor.query.all()
    return jsonify([actor.serialize() for actor in actors])


@app.cli.command("init-db")
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    db.create_all()
    click.echo("Initialized the database.")


if __name__ == "__main__":
    app.run(debug=True)
