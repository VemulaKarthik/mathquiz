import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    const backToHome = () => {
        navigate('/');
    }
  return (
    <button className="btn btn-primary m-3 " onClick={backToHome}>Back to Home</button>
  )
}

export default Home