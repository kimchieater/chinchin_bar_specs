'use client'

import { supabase } from "@/utils/supabaseClient"
import { useEffect, useState } from "react"
import QuizSection from "./quizSection";
import StartQuizSection from "./startQuizSection";


export default function Quiz(){

  // variables
  const [name, setName] = useState(null);
  const [nameIn, setNameIn] = useState(false);
  const [nameVis, setNameVis]= useState("visible");
  


  const [timer, setTimer] = useState(30);
  const [timerHidden, setTimerHidden] = useState(true);
  const [timerVis, setTimerVis] = useState("hidden");
  const [btnClicked, setBtnClicked] = useState(false);



  //functions

  function chooseName(e){
    setName(e.target.value)
  }

  function startQuiz(){
    timerStart();
  }

  function timerStart(){
    setTimerHidden(false);
    setTimerVis("visible");
    setBtnClicked(true);
    setNameVis("hidden");
    setTimer(30);

    const intervalId = setInterval(()=>{
      setTimer((prevTimer) =>{
        if (prevTimer <= 0){
          clearInterval(intervalId);
          setTimerVis("hidden"); 

        }
        return prevTimer - 1;
      })
    }, 1000);

    return () => clearInterval(intervalId);
  }


  return(
    <div className="quiz">

      <div className="quiz-input">
        <div className="quiz-name-input" style={{visibility:nameVis}}>
          <input type="text" onChange={chooseName} placeholder="Write Your Name"></input>
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      </div>

      <div className="quiz-timer">
          <div className="quiz-timer"
          style={{ visibility: timerVis }}>
                <h2>{timer}</h2>
          </div>
      </div>

      <div className="quiz-bg">
        <div className="leaderboard">
          <h2>Leaderboard</h2>
        </div>
        <div className="quiz-section">
          {
            btnClicked === false ? <StartQuizSection /> : <QuizSection/>
          }
        </div>
      </div>
    </div>
  )
}