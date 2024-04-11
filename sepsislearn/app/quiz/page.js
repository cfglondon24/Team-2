'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Quiz () {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentUserScore, setCurrentUserScore] = useState(0);
  const [rightAnswer, setRightAnswer] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const handleAnswer = (userAnswer) => {
    // Process the user's answer here (e.g., check if it's correct and update score)
    const correctAnswer = flashcards[currentCardIndex].answer;
    if (userAnswer === correctAnswer) {
      setCurrentUserScore(currentUserScore + 1);
      setRightAnswer(true)
    } else {
      setWrongAnswer(true)
    }

    setCurrentCardIndex(currentCardIndex + 1);
  };

  const restart = () => {
    setCurrentCardIndex(0);
    setCurrentUserScore(0);
    const old = flashcards;
    setFlashcards(shuffle(old));
  };

  const shuffle = (array) => { 
    return array.sort(() => Math.random() - 0.5); 
  };

  const right_phrases = [
    "Well done! You nailed it!",
    "Great job! Keep up the good work!",
    "Congratulations! You got it right!",
    "Fantastic! You're on a roll!",
    "Brilliant! You're a superstar!",
    "Excellent! You're crushing it!",
    "Superb! You're unstoppable!",
    "Awesome! Keep up the amazing work!",
    "Amazing! You're on the right track!",
    "Way to go! You're acing it!"
  ]

  const wrong_phrases = [
      "That's okay! Mistakes help us learn.",
      "Don't worry! Keep trying your best!",
      "No problem! Keep up the effort!",
      "It's alright! You'll get it next time!",
      "Keep going! You're doing great!",
      "Keep trying! You're getting better!",
      "Almost there! Keep pushing!",
      "You're improving! Keep it up!",
      "Don't give up! You're doing fine!",
      "Keep your chin up! You're doing well!"
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/quiz');
        setFlashcards(shuffle(response.data.flashcards));
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <h1 className="text-4xl font-bold leading-10 tracking-tight text-gray-900 text-center pt-16">Sepsis Quiz</h1>
    <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900 text-center pt-8">{currentUserScore} / {flashcards.length}</h2>
    <p className="text-md leading-10 tracking-tight text-gray-500 text-center pt-1 pb-2">{flashcards.length - currentCardIndex} remaining</p>
    
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto mt-16">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 border-gray-300 border-2">
        {flashcards.length == 0 && (
          <div>Loading...</div>
        )}
        {(flashcards.length > 0 && currentCardIndex < flashcards.length && !rightAnswer && !wrongAnswer) && (
              <div key={flashcards[currentCardIndex].id}>
                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{flashcards[currentCardIndex].question}</h3>
                
                {/* Buttons for True/False answers */}
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button onClick={() => handleAnswer(0)} type="button" className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2">False</button>
                  <button onClick={() => handleAnswer(1)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-600 sm:col-start-1 sm:mt-0">True</button>
                </div>
              </div>
            )
          }
          {flashcards.length > 0 && currentCardIndex <= flashcards.length && wrongAnswer && (
            <div>
              <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{wrong_phrases[Math.floor(Math.random() * 10)]}</h3>
              <p className="mt-2 text-sm text-gray-500">{flashcards[currentCardIndex-1].extra_info}. <u><a href={flashcards[currentCardIndex-1].extra_url} target="_blank">Learn more</a></u></p>
              <button onClick={() => setWrongAnswer(false)} type="button" className="mt-5 inline-flex justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-600">Next</button>
            </div>
            )
          }
          {flashcards.length > 0 && currentCardIndex <= flashcards.length && rightAnswer && (
            <div>
              <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{right_phrases[Math.floor(Math.random() * 10)]}</h3>
              <button onClick={() => setRightAnswer(false)} type="button" className="mt-5 inline-flex justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-600">Next</button>
            </div>
            )
          }
          {flashcards.length > 0 && currentCardIndex == flashcards.length && !rightAnswer && !wrongAnswer && (
            <div>
              <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Quiz complete!</h3>
              <p className="mt-2 text-sm text-gray-500">You scored {currentUserScore} out of {flashcards.length}.</p>
              <button onClick={() => restart()} type="button" className="mt-5 inline-flex justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-600">Restart</button>
            </div>
          )}
        </div>
        </div>
    </div>
    </div>

  )
}
