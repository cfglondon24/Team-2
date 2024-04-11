import React, { useState } from 'react';
import axios from 'axios';

function ChatApp() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        const response = await axios.post('/api/send_message', { message: input });
        setMessages([...messages, { text: input, sender: 'user' }, { text: response.data.message, sender: 'bot' }]);
        setInput('');
    };

    return (
        <div>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default ChatApp;
