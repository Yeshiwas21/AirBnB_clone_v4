#!/usr/bin/python3
"""
This script starts a Flask web application and serves a web page 
with information on available states, cities, and amenities.
Usage: python3 -m web_flask.1-hbnb
Dependencies: models/storage.py, models/state.py, models/city.py, 
models/amenity.py, models/place.py, Flask, uuid
"""
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template
import uuid
app = Flask(__name__)
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True

cache_id = str(uuid.uuid4())

@app.teardown_appcontext
def close_db(error):
    """
    Remove the current SQLAlchemy Session after the application context ends.
    """
    storage.close()


@app.route('/1-hbnb/', strict_slashes=False)
def hbnb():
    """
    Serve a web page with information on available states, cities, and amenities.

    Returns:
    - A rendered HTML template '1-hbnb.html', containing:
        - A list of available states, sorted alphabetically by name, 
            with their associated cities.
        - A list of available amenities, sorted alphabetically by name.
        - A list of available places, sorted alphabetically by name.
    """
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)

    return render_template('1-hbnb.html', cache_id=cache_id,
    states=st_ct,
    amenities=amenities,
    places=places)


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
