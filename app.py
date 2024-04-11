from flask import Flask, jsonify, request
import sqlite3
from flask_cors import CORS
from utils import generate_text

app = Flask(__name__)
CORS(app)


def get_db_connection():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/api/quiz", methods=["GET"])
def api():
    connection = get_db_connection()
    flashcards_list = connection.execute(
        "SELECT id, question, answer, extra_info FROM flashcards"
    ).fetchall()
    connection.close()

    return jsonify(
        status=200,
        flashcards=[
            {
                "id": flashcard[0],
                "question": flashcard[1],
                "answer": flashcard[2],
                "extra_info": flashcard[3],
            }
            for flashcard in flashcards_list
        ],
    )


@app.route("/api/chatbot", methods=["POST"])
def chatbot():
    user_message = request.json["message"]
    # current_question = request.json["current_question"]

    return jsonify(status=200, reply=generate_text(user_message))


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=3000)
