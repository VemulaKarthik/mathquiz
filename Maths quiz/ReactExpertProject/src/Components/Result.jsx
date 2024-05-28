    import React from 'react';
    import { useLocation } from 'react-router-dom';
import Home from './Home';

    const Result = () => {
        const location = useLocation();
        const { questionList, solutionArray } = location.state;
        console.log(solutionArray);
        // console.log(questionList);

        return (
            <div className="container my-4">
                <h1 className="mb-3">Results</h1> <Home/>
                <ul className="list-group">
                    {questionList.map((question, index) => {
                        if(solutionArray[index]){
                            var correct = question.solution === Number(solutionArray[index]);  
                        }
                        return (
                            <li key={index} className={`list-group-item ${correct ? 'list-group-item-success' : 'list-group-item-danger'}`}>
                                <strong>Question {index + 1}: </strong> {question.question}
                                <div>
                                    <strong>Solution: </strong>{question.solution}
                                    <strong> | Your Answer: </strong>{solutionArray[index] !== '' ? solutionArray[index] : 'Answer not written'}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    export default Result;
