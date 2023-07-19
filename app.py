"""
Project: CertRepo
Author: Adam T Spera

Description: 
This file is the primary module for teh CertRepo platform.
It is responsible for handing default get and data get requests.

Key dependencies: Flask, json

To run this application, execute the script directly from Python. Flask is configured to run in debug mode by default.
"""

# Import necessary modules
from flask import Flask, render_template
import json

# Initialize the Flask app
app = Flask(__name__)


# Default route serving the homepage
@app.route('/')
def default():
    return render_template('index.html')


# Route for handling sending current data
@app.route('/data', methods=['GET'])
def post_data():

    # INCREMENT VISIT COUNTER

    # PULL DATA FROM DATASTORE

    # Return the data as json in the response
    return {'response': 'data'}, 200


# Run the Flask application if the script is executed directly
if __name__ == '__main__':
    app.run(debug=True)
