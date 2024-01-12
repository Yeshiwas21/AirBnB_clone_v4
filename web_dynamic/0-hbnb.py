#!/usr/bin/python3
"""
Starts a Flask web application that displays a page with data from a HBNB
clone database. The page displays a list of states, their cities, amenities, 
and places sorted alphabetically. 

To run the application, execute this script with Python 3. 
The application will run on http://0.0.0.0:5000/0-hbnb/.

Dependencies:
- Flask
- SQLAlchemy
- A clone database with tables for states, cities, amenities, and places

Usage: 
- Run the script with Python 3: `python3 FILENAME.py`
- Navigate to http://0.0.0.0:5000/0-hbnb/ in a web browser to view the web page
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
    """Closes the database at the end of the request."""
    storage.close()


@app.route('/0-hbnb/', strict_slashes=False)
def hbnb():
    """Returns a rendered template for the HBNB page."""
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)

    return render_template('0-hbnb.html', cache_id=cache_id,
    states=st_ct,
    amenities=amenities,
    places=places)


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
