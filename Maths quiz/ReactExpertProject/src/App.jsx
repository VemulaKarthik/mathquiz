import './App.css'
import QuizSettings from './Components/QuizDetails'
import MathQuiz from './Components/MathQuiz'
import ChooseQuiz from './Components/ChooseQuiz'
import Result from './Components/Result'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Quiz from './Components/Quiz'
import PredefinedQuiz from './Components/PredefinedQuiz'
function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChooseQuiz />} />
          <Route path="/quizsettings" element={<QuizSettings />} />
          <Route path="/mathquiz" element={<MathQuiz />} />
          <Route path="/result" element={<Result/>} />
          <Route path="/predefinedquiz" element={<Quiz/>} />
          <Route path="/finalresult" element={<PredefinedQuiz/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
