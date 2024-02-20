import React, { useState, useEffect } from 'react';

const Quizquestions = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [testScore, setTestScore] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  let testScoreVar = 0;

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/quiz');
      if (response.ok) {
        const questionData = await response.json();
        setQuestions(questionData);
      } else {
        console.error('Failed to fetch questions');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleOptionChange = (questionId, value) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: value,
    }));
  };

const handleTestScore = () => {
    let currentScore = 0;
    questions.forEach((question) => {
        if(selectedOptions[question._id] === question.answer){
            currentScore++
        }
    })
    setTestScore(currentScore);
    testScoreVar = currentScore
}

function handleSubmit(event) {

  fetch("/api/quiz", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        qiuzId: quizCount,
        userId: localStorage.getItem('currentUserId'),
        userName: localStorage.getItem('currentUser'),
        result: testScoreVar,
        percentage: testScoreVar*10,
      })
  })
      .then(response => response.json()) 
      .catch(error => {
          console.log(error);
      })
}


  return (
    <div>
      <h2>Quiz time!</h2>
      <ul>
        {questions.map((question) => (
          <div key={question._id}>
            <h2>{question.question}</h2>
            <ul>
              {question.options.map((option, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={`${question._id}-${index}`}
                    name={question._id}
                    value={option}
                    checked={selectedOptions[question._id] === option}
                    onChange={() => handleOptionChange(question._id, option)}
                  />
                  <label htmlFor={`${question._id}-${index}`}>{option}</label>
                </div>
              ))}
            </ul>
            <p>Selected Option: {selectedOptions[question._id]}</p>
          </div>
        ))}
      </ul>
      <button onClick={() => { handleTestScore(); setQuizCount(quizCount + 1); handleSubmit(); }}>Submit Answers</button>
      {testScore !== null && <p>Your Score: {testScore} out of 10 so in total, {testScore*10} %</p> }    </div>
  );
};

export default Quizquestions;
