import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const timerCount = 5;

const MathQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [time, setTime] = useState(timerCount);
  const [solution, setSolution] = useState('');
  const [score, setScore] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { questionList } = location.state;
  const answerFieldRef = useRef(null);
  const [solutionArray, setSolutionArray] = useState(() => {
    const storedSolutionArray = localStorage.getItem('solutionArray');
    return storedSolutionArray ? JSON.parse(storedSolutionArray) : Array(questionList.length).fill('');
  });

  useEffect(() => {
    const timeAndQuestion = JSON.parse(localStorage.getItem('questionAndTimer'));
    if (timeAndQuestion) {
      setCurrentQuestion(timeAndQuestion.currentQuestion);
      setTime(timeAndQuestion.time);
    }
    const interval = setInterval(() => {
      if (time <= 0) {
        const expiredQuestion = currentQuestion;
        const expiredQuestions = JSON.parse(localStorage.getItem('expiredQuestions')) || [];
        if (!expiredQuestions.some(q => q.questionNumber === expiredQuestion)) {
          expiredQuestions.push({ questionNumber: expiredQuestion, timeLeft: time });
          localStorage.setItem('expiredQuestions', JSON.stringify(expiredQuestions));
        }
        clearInterval(interval);
        handleNext();
      }
      if (currentQuestion === questionList.length - 1 && time < 0) {
        moveToResult();
      }
      setTime((time) => time - 1);
    }, 1000);

    const storeTimeAndQuestion = () => {
      localStorage.setItem('questionAndTimer', JSON.stringify({ currentQuestion, time }));
    };
    storeTimeAndQuestion();
    return () => {
      clearInterval(interval);
      localStorage.removeItem('questionAndTimer');
    };
  }, [time, currentQuestion, questionList.length]);

  const setAnswers = () =>{
    const updatedSolutions = [...solutionArray];
    setSolution(solutionArray[currentQuestion]);
    updatedSolutions[currentQuestion] = solutionArray[currentQuestion] ? solutionArray[currentQuestion] : solution;
    setSolutionArray(updatedSolutions);
  }

  const handleNext = () => {
    setAnswers();
    if (currentQuestion === questionList.length - 1) {
      moveToResult(solutionArray);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setTime(timerCount);
      localStorage.setItem('questionAndTimer', JSON.stringify({ currentQuestion: currentQuestion + 1, time: timerCount }));
    }
    answerFieldRef.current.focus();
  };

  const handlePrevious = () => {
    setCurrentQuestion((prevCurrentQuestion) => {
      if (prevCurrentQuestion > 0) {
        const newSolutionArray = [...solutionArray];
        newSolutionArray[prevCurrentQuestion] = solution ? solution : solutionArray[prevCurrentQuestion];
        setSolutionArray(newSolutionArray);
        setTime(timerCount);
        setSolution(solutionArray[prevCurrentQuestion - 1]);
        answerFieldRef.current.focus();
        return prevCurrentQuestion - 1;
      }
      return prevCurrentQuestion;
    });
  };

  const moveToResult = (finalSolutionArray) => {
    calculateScore(finalSolutionArray);
    alert("Quiz is Completed");
    navigate('/result', { state: { solutionArray: finalSolutionArray, questionList: questionList, score: score } });
    localStorage.removeItem('questionAndTimer');
    localStorage.removeItem('solutionArray');
    localStorage.removeItem('expiredQuestions');
  };

  const calculateScore = (finalSolutionArray) => {
    let totalScore = 0;
    finalSolutionArray.forEach((userAnswer, index) => {
      if (userAnswer === questionList[index].answer) {
        totalScore += 1;
      }
    });
    setScore(totalScore);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setTime(timerCount);
    setSolution('');
    setScore(0);
    setSolutionArray(Array(questionList.length).fill(''));
    localStorage.removeItem('questionAndTimer');
    localStorage.removeItem('solutionArray');
  };

  useEffect(() => {
    localStorage.setItem('solutionArray', JSON.stringify(solutionArray));
  }, [solutionArray]);

  useEffect(() => {
    const storedSolutionArray = localStorage.getItem('solutionArray');
    if (storedSolutionArray) {
      setSolutionArray(JSON.parse(storedSolutionArray));
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Quiz App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <input type="button" className="btn btn-outline-danger" onClick={handleReset} value="Reset" />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="mb-3">
              <div className='questionNumber'>
                Question: {currentQuestion + 1} / {questionList.length}
              </div>
              <div className='question mb-2'>
                {questionList[currentQuestion].question}
              </div>
              <div className='solution mb-3'>
                {currentQuestion !== null && (
                  <input
                    id={`input_${currentQuestion}`}
                    type="number"
                    className="form-control"
                    ref={answerFieldRef}
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                  />
                )}
              </div>

              <div className="timer mb-2"> Time left: {currentQuestion !== null ? (time > 0 ? time : 0) : 0} </div>
            </div>

            <div className='buttons'>
              <input type="button" className="btn btn-secondary me-2" onClick={handlePrevious} value="Previous" disabled={currentQuestion === 0} />
              <input type="button" className="btn btn-primary me-2" onClick={handleNext} value={currentQuestion === questionList.length - 1 ? "Submit" : "Next"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MathQuiz;