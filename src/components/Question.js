import React from "react";

function Question({ question, onAnswerClick, timer }) {
  return (
    <div className="question">
      <p className="timer">Timer: 00:00:{timer}</p>
      <h2>{question.question}</h2>
      <div className="options">
        {/* mapping the options */}
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerClick(option === question.answer)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
