import { useEffect, useState } from "react";
import PredefinedQuiz from "./PredefinedQuiz";
import QuizSettings from "./QuizDetails";
const ChooseQuiz = () => {

  const [isActiveCustom, SetCustomActive] = useState(false);
  const [isActivepredefined, SetPredefinedActive] = useState(false);

  const customQuiz = () => {
    SetCustomActive(true);
  }
  const predefinedQuiz = () => {
    SetPredefinedActive(true);
  }

  useEffect(() => {
    const clearLocal = ['questionAndTimer', 'expiredQuestions', 'solutionArray'];
    clearLocal.forEach(item => localStorage.removeItem(item));
  }, [])
  return (
    <>

      <div className="d-flex justify-content-center align-items-center vh-100">
        {
          isActiveCustom ? <QuizSettings /> : isActivepredefined ? <PredefinedQuiz /> : <div>
            <button type="button" className="btn btn-primary me-3 p-4" onClick={customQuiz}>Custom Quiz</button>
            <button type="button" className="btn btn-secondary m-3 p-4" onClick={predefinedQuiz}>Predefined Quiz</button>
          </div>
        }
      </div>
    </>
  )
}

export default ChooseQuiz