import React, { useState, useEffect } from "react";
import "./App.css";
import Question from "./components/Question";
import Result from "./components/Result";
import QuestionForm from "./components/QuestionForm";
import quizData from "./quiz-data.json";

function App() {
  // Initialising state
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);
  const [addQuestion, setAddQuestion] = useState(false);

  // using useEffect for rendering control
  useEffect(() => {
    fetch("/quiz-data.json")
      .then((response) => response.json())
      .then((data) => {
        // Shuffle the questions array
        const shuffledQuestions = shuffleArray(data);
        setQuestions(shuffledQuestions);
      });
  }, []);

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  // UPDATING THE QUESTIONS
  useEffect(() => {
    setQuestions(quizData);
  }, []);

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  // Timer
  useEffect(() => {
    const timerId = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        // Time's up, mark the question as answered
        handleAnswerClick(false);
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [timer]);

  // comparing answer
  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    // moving to the next question
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimer(10); // Reset the timer for the next question
    } else {
      setShowScore(true);
    }
  };

  // for restarting the quize
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  };

  // For adding the new Question
  const handleAddNewQuestion = () => {
    setAddQuestion(true);
  };

  return (
    <div className="app">
      <h1>Quiz App</h1>
      {questions.length > 0 ? (
        showScore ? (
          <>
            {/* Accessing the "Result" Component */}

            <Result
              score={score}
              totalQuestions={questions.length}
              onRestart={restartQuiz}
            />
            {/* Accessing the "QuestionForm" Component */}
            <div onClick={handleAddNewQuestion}>
              {addQuestion ? (
                <QuestionForm onAddQuestion={handleAddQuestion} />
              ) : (
                <div className="add-questions">Add New Question</div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Accessing the "Question" Component */}
            <Question
              question={questions[currentQuestion]}
              onAnswerClick={handleAnswerClick}
              timer={timer}
            />
          </>
        )
      ) : (
        <p>Loading questions...</p>
      )}
      <div></div>
    </div>
  );
}

export default App;
