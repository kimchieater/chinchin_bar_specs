'use client'

import { supabase } from "@/utils/supabaseClient"
import { useEffect, useState } from "react"
import QuizSection from "./quizSection";
import StartQuizSection from "./startQuizSection";


export default function Quiz(){

  const [name, setName] = useState(null);
  const [nameIn, setNameIn] = useState(false);
  
  const [btnClicked, setBtnClicked] = useState(false);




  function chooseName(e){
    setName(e.target.value)
  }

  function startQuiz(){
    setBtnClicked(true);
  }

  return(
    <div className="quiz">


      <div className="quiz-input">
        <div className="quiz-name-input">
          <input type="text" onChange={chooseName} placeholder="Write Your Name"></input>
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      </div>


      <div className="quiz-bg">
        <div className="leaderboard">
          <h2>Leaderboard</h2>
        </div>
        <div className="quiz-section">
          {
            btnClicked === false ? <StartQuizSection/> : <QuizSection/>
          }
        </div>
      </div>
    </div>
  )
}