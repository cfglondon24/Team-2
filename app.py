from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/api", methods=["GET"])
def api():
    # Return list of flashcards
    flashcards_list = []
    return jsonify(flashcards_list)
