import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Home from './Home';

const PredefinedQuiz = () => {
    const navigate = useNavigate();
    const [result,setResult] = useState('');


    console.log(result);
    const handleClick =()=>{
        navigate('/predefinedquiz');
    }   

    useEffect(()=>{
      // Implements the localstoreage logic for fethcing result 
      const localStorageScore = JSON.parse(localStorage.getItem('quizScore')) || [];
      setResult(localStorageScore);
      // console.log(localStorageScore);
    },[]);
  return (
      <>
        <div className="container vh-100 d-flex align-items-center justify-content-center">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-12"> 
              <div className="text-center mb-4"> 
                <button type="button" className="btn btn-primary" onClick={handleClick}>Start Quiz</button>
      
              </div>
              <h2 className="text-center">Result:</h2> 
              <p className="text-center">List of tests with score and time</p>
              <div className="score">
                {result && result.map((item, index) => (
                  <div key={index} className="mb-2">
                    <strong>{index + 1}) Previous Test Score:</strong> {item.score}, 
                    <strong>Time:</strong> {new Date(item.finishTime).toLocaleString('en-US')}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default PredefinedQuiz