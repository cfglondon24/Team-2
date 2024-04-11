'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function ChatBot() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [userCategory, setUserCategory] = useState('Child');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page
        try {
            // Send the message to the chatbot API and store the response
            const apiResponse = await axios.post('http://127.0.0.1:3000/api/chatbot', { message, user_category: userCategory });
            setResponse(apiResponse.data.reply);
        } catch (error) {
            console.error('Error fetching chatbot response:', error);
        }
    };

    return (
        <div>
        <h1 className="text-4xl font-bold leading-10 tracking-tight text-gray-900 text-center pt-16">Sepsis Chatbot</h1> 
        <div className="mt-16 max-w-md mx-auto p-6 rounded-lg shadow-md bg-white border-gray-300 border-2">
            <form onSubmit={handleSubmit} className="relative">
            <div>
            <label htmlFor="userCategory" className="block text-sm font-medium leading-6 text-gray-900">I am a...</label>
            <select id="userCategory" name="userCategory" className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-orange-600 sm:text-sm sm:leading-6" value={userCategory} onChange={(e) => setUserCategory(e.target.value)}>
                <option>Parent</option>
                <option>Child</option>
            </select>
            </div>
                <div className="overflow-hidden rounded-lg border border-gray-300 mt-4">
                    
                    <label htmlFor="question" className="sr-only">Question</label>
                    <input
                        type="text"
                        name="question"
                        id="question"
                        className="block w-full border-0 p-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-1"
                        placeholder="Enter your question"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <button type="submit" className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600">Submit</button>
                </div>
            </form>
            {response && (
                <div className="mt-4 p-4 rounded-md bg-blue-50 text-blue-800">
                    <p className="text-sm">{response}</p>
                </div>
            )}
        </div>
        </div>
    );
}
