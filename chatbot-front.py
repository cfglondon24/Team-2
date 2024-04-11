from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/send_message', methods=['POST'])
def send_message():
    data = request.json
    message = data['message']
    # Process the message and generate a response
    response = generate_response(message)
    return jsonify({'message': response})

def generate_response(message):
    # Basic logic to generate a response
    # You can replace this with more advanced logic
    if message.lower() == 'hello':
        return 'Hi there!'
    else:
        return "I'm just a simple chatbot. I didn't understand that."

if __name__ == '__main__':
    app.run(debug=True)
