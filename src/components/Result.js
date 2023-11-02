import React from "react";

function Result({ score, totalQuestions, onRestart }) {
  return (
    <div className="result">
      <h2>Quiz Completed</h2>
      <p>
        Your Score: {score} out of {totalQuestions}
      </p>
      <button onClick={onRestart}>Restart Quiz</button>
    </div>
  );
}

export default Result;
