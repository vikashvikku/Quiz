import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  // Initisalising the state
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  //   Adding New Questions
  const handleAddQuestion = () => {
    const questionToAdd = {
      question: newQuestion,
      options: newOptions,
      answer: correctAnswer,
    };
    onAddQuestion(questionToAdd);
    // Clear the form fields
    setNewQuestion("");
    setNewOptions(["", "", "", ""]);
    setCorrectAnswer("");
  };

  return (
    <div className="question-form">
      <div className="add-question">Add New Question</div>
      <div className="write-question">
        <input
          className="question-input"
          type="text"
          placeholder="Question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
      </div>
      <div className="content">
        {/* mapping the options */}

        {newOptions.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => {
              const updatedOptions = [...newOptions]; // Using the spread operator to update the state
              updatedOptions[index] = e.target.value;
              setNewOptions(updatedOptions);
            }}
          />
        ))}
        <select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        >
          {newOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          className="add-question-btn"
          onClick={() => {
            handleAddQuestion();
          }}
        >
          Add Question
        </button>
      </div>
    </div>
  );
}

export default QuestionForm;

//
//
//
