import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const timerCount = 5;

const MathQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [time, setTime] = useState(timerCount);
  const [solution, setSolution] = useState(' ');
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

  // const handleNext = () => {
  //   const newSolutionArray = [...solutionArray];
  //   setSolution(solutionArray[currentQuestion+1] || '');
  //   console.log(solutionArray);
  //   // console.log(currentQuestion);
  //   newSolutionArray[currentQuestion] = solution;
  //   console.log(newSolutionArray);
  //   setSolutionArray(newSolutionArray);

  //   if (currentQuestion === questionList.length - 1) {
  //     moveToResult(solutionArray);
  //   } else {
  //     setCurrentQuestion(currentQuestion + 1);
  //     ///here i have to set the remaininig timer//
  //     setTime(timerCount);
  //     ////////////////////////////////////////////
  //     localStorage.setItem('questionAndTimer', JSON.stringify({ currentQuestion: currentQuestion + 1, time: timerCount }));
  //   }
  // };
  const setAnswers = () =>{
    const updatedSolutions = [...solutionArray];
    // console.log('before answer ',updatedSolutions[currentQuestion]);
    // console.log('solution ', solution);
    setSolution(solutionArray[currentQuestion]);
    updatedSolutions[currentQuestion] = solutionArray[currentQuestion] ? solutionArray[currentQuestion] : solution;
    // console.log('after answer ',updatedSolutions[currentQuestion]);
    console.log('current ',currentQuestion);
    setSolutionArray(updatedSolutions);
    // console.log("updated solution ", updatedSolutions)
    // console.log('here',updatedSolutions[currentQuestion]);
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
    console.log('current question in prev ', currentQuestion)
    setCurrentQuestion(currentQuestion);
    const newSolutionArray = [...solutionArray];
    if (currentQuestion > 0) {
      setTime(timerCount)
      newSolutionArray[currentQuestion] = solution  ? solution : solutionArray[currentQuestion];
      setSolutionArray(newSolutionArray);
      setCurrentQuestion(currentQuestion - 1);
      setSolution(solutionArray[currentQuestion - 1]);
    }
    answerFieldRef.current.focus();
    console.log('current question in prev ', currentQuestion)

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
                    ref = {answerFieldRef}
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    // disabled={
                    //   (JSON.parse(localStorage.getItem('expiredQuestions')) || []).some(
                    //     (q) => q.questionNumber === currentQuestion
                    //   )
                    // }
                  />
                )}
              </div>

              <div className="timer mb-2"> Time left: {currentQuestion !== null ? (time > 0 ? time : 0) : 0} </div>

            </div>

            <div className='buttons'>
              
            <input type="button" className="btn btn-secondary me-2" onClick={handlePrevious} value="Previous" disabled={currentQuestion === 0} />
              {/* <input type="button" className="btn btn-secondary me-2" onClick={handlePrevious} value="Previous" /> */}
              <input type="button" className="btn btn-primary me-2" onClick={handleNext} value={currentQuestion === questionList.length - 1 ? "Submit" : "Next"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MathQuiz;
