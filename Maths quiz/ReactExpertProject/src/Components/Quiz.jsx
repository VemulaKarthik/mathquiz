import React, { useState, useEffect } from 'react';
import quizQuestions from '../question.js';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [solutionArray, setSolutionArray] = useState(() => {
    //Fethcing from localstorage if available ::
    //creating an array of null values as the size of questionList.length
    const storedSolutionArray = localStorage.getItem('solutionArray');
    return storedSolutionArray ? JSON.parse(storedSolutionArray) : Array(quizQuestions.length).fill(null);
  });
  const [optionSelected, setOptionSelected] = useState(solutionArray[currentQuestion]);
  
  const navigate = useNavigate();
  const [clockState, setClockState] = useState({
    minute: 1,
    second: 0,
  });
  const [score, setScore] = useState(0);

  const finishQuiz = () => {
    setAnswers();
    const finishTime = new Date();
    const result = {
      score: score,
      finishTime: finishTime
    };
    //putting the score in localstarage . The latests result is at the top of the array .
    const results = JSON.parse(localStorage.getItem('quizScore')) || [];
    results.splice(0,0,result); 
    localStorage.setItem('quizScore', JSON.stringify(results));
  
    alert(`Quiz is Completed. Your score: ${score}`);
    navigate('/finalresult');
    localStorage.removeItem('predefinedQuizTimer');
    localStorage.removeItem('solutionArray');
  };
  

  const timeReducer = () => {
    const { minute, second } = clockState;
    if (minute === 0 && second === 0) {
      finishQuiz();
    } else if (second === 0) {
      setClockState({
        minute: minute - 1,
        second: 59
      });
    } else {
      setClockState(prevState => ({
        ...prevState,
        second: prevState.second - 1
      }));
    }
  };


  const setAnswers = () => {
    const updatedSolutions = [...solutionArray];
    updatedSolutions[currentQuestion] = optionSelected;
    setSolutionArray(updatedSolutions);
    let newScore = 0;
    updatedSolutions.forEach((answer, index) => {
      const correctAnswer = quizQuestions[index].options.find(option => option.isValid)?.value;
      if (answer === correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setOptionSelected(solutionArray[currentQuestion - 1]);
    }
  };

  const handleNext = () => {
    setAnswers();
    setOptionSelected(solutionArray[currentQuestion + 1]);
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz();
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setClockState({ minute: 1, second: 0 });
    setSolutionArray(Array(quizQuestions.length).fill(null));
    setOptionSelected(null);
    setScore(0);
    localStorage.removeItem('solutionArray');
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('predefinedQuizTimer'));
    if (storedData) {
      setCurrentQuestion(storedData.currentQuestion);
      setClockState(storedData.time);
      const storedSolutions = JSON.parse(localStorage.getItem('solutionArray'));
      if (storedSolutions) {
        setSolutionArray(storedSolutions);
        setOptionSelected(storedSolutions[storedData.currentQuestion]);
      }
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(timeReducer, 1000);
    return () => clearInterval(intervalId);
  }, [clockState]);

  useEffect(() => {
    localStorage.setItem('predefinedQuizTimer', JSON.stringify({ currentQuestion, time: clockState }));
    localStorage.setItem('solutionArray', JSON.stringify(solutionArray));
  }, [currentQuestion, clockState, solutionArray]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Quiz App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <button type="button" className="btn btn-danger" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="mb-3">
          <h4>Question: {currentQuestion + 1} / {quizQuestions.length}</h4>
          <h4>Timer: {clockState.minute}:{clockState.second.toString().padStart(2, '0')}</h4>
        </div>
        <div className="mb-4">
          <h2>{quizQuestions[currentQuestion].question}</h2>
          <div>
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <div key={index} className="form-check">
                <input 
                  className="form-check-input"
                  type="radio" 
                  name={`option-${currentQuestion}`}
                  id={`option-${index}`}
                  value={option.value}
                  checked={optionSelected === option.value}
                  onChange={(e) => setOptionSelected(e.target.value)}
                />
                <label className="form-check-label" htmlFor={`option-${index}`}>
                  {option.value}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="btn-group" role="group" aria-label="Quiz Buttons">
          <button type="button" className="btn btn-secondary me-2" onClick={handlePrevious} disabled={currentQuestion === 0}>
            Previous
          </button>
          <button type="button" className="btn btn-primary me-2" onClick={handleNext}>
            {currentQuestion === quizQuestions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
