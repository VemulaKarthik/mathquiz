import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizSettings = ({}) => {
  const [numQuestions, setNumQuestions] = useState('');
  const [operator, setOperator] = useState('');
  const [value, setValue] = useState('');
  
  const navigate = useNavigate();

  const questionOptions = [5, 10, 15, 20, 40, 50, 1000];
  const operatorOptions = ['+', '-', '*', '/', 'All'];
  const valueOptions = Array.from({ length: 10 }, (_, i) => (i + 1) * 2);


  function generateMathQuestions(numQuestions,arithmeticOperator,value) {
    const operators = ['+', '-', '*', '/'];
    const questionList = [];
    let operator = arithmeticOperator;

    for (let i = 0; i < numQuestions; i++) {
        const num1 = Math.floor(Math.random() * value) + 1; 
        const num2 = Math.floor(Math.random() * value) + 1; 
        if(arithmeticOperator === 'All'){
             operator = operators[Math.floor(Math.random() * operators.length)];
        }
        let question;
        let solution;

        if (operator === '+') {
            question = `${num1} + ${num2}`;
            solution = num1 + num2;
            
        } else if (operator === '-') {
            question = `${num1} - ${num2}`;
            solution = num1 - num2;

        } else if (operator === '*') {
            question = `${num1} * ${num2}`;
            solution = num1 * num2;

        } else if (operator === '/') {
            question = `${num1} / ${num2}`; // 
            solution = Math.floor(num1 / num2);
        }

        questionList.push({
            question: question,
            solution: solution ,
        });
    }
    return questionList;
}



const onSaveSettings = () => {
    if(numQuestions == '' || operator == '' || value == ''){
        alert("Please select all the fields");
        return;
    }
    const questionList =  generateMathQuestions(numQuestions,operator,value); 
    navigate('/mathquiz', {
      state: {
        questionList: questionList,
      }
    });
  };
  return (
    <>
     <div className="container mt-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="numQuestions" className="form-label">Select number of questions:</label>
            <select id="numQuestions" className="form-select" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)}>
              <option value="">Select...</option>
              {questionOptions.map((ele) => <option key={ele} value={ele}>{ele}</option>)}
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="mathOperator" className="form-label">Select math operator:</label>
            <select id="mathOperator" className="form-select" value={operator} onChange={(e) => setOperator(e.target.value)}>
              <option value="">Select...</option>
              {operatorOptions.map((op) => <option key={op} value={op}>{op}</option>)}
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="value" className="form-label">Select value to be less:</label>
            <select id="value" className="form-select" value={value} onChange={(e) => setValue(e.target.value)}>
              <option value="">Select...</option>
              {valueOptions.map((val) => <option key={val} value={val}>{val}</option>)}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <button className="btn btn-primary" onClick={onSaveSettings}>
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizSettings;
