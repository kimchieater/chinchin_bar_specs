'use client'

import { supabase } from "@/utils/supabaseClient"
import { useEffect, useRef, useState } from "react"
import QuizSection from "./quizSection";
import StartQuizSection from "./startQuizSection";


export default function Quiz(){

  // variables
  const [name, setName] = useState(null);
  const [nameIn, setNameIn] = useState(false);
  const [nameVis, setNameVis]= useState("visible");
  const [count, setCount] = useState(0);

  const [countVis, setCountVis] = useState("hidden");

 
  const [timer, setTimer] = useState(30);
  const [timerHidden, setTimerHidden] = useState(true);
  const [timerVis, setTimerVis] = useState("hidden");
  const [btnClicked, setBtnClicked] = useState(false);

  const intervalIdRef = useRef(null);
  //functions

  function incrementCount(){
    setCount(prev => prev + 1);
  }

  function chooseName(e){
    setName(e.target.value)
  }

  function startQuiz(){
    timerStart();
  }

  const submitScore = async()=>{
    try{
      const {data, error} = await supabase
      .from('quiz')
      .insert([
        {name: name, count: count}
      ]);

      if (error) throw error;

      console.log('submitted', data)
    } catch (error){
      console.error('Error', error)
    }
  }



  function timerStart(){

    if (intervalIdRef.current) return;

    setTimerHidden(false);
    setTimerVis("visible");
    setBtnClicked(true);
    setNameVis("hidden");
    setTimer(2);

    intervalIdRef.current = setInterval(()=>{
      setTimer((prevTimer) =>{
        if (prevTimer <= 0){
          clearInterval(intervalIdRef);
          intervalIdRef.current = null;
          setTimerVis("hidden"); 
          setCountVis("visible");
          submitScore();
          return 0;
        }
        return prevTimer - 1;
      })
    }, 1000);

    return () => {

    }
  }


  return(
    <div className="quiz">

      <div className="quiz-input">
        <div className="quiz-name-input" style={{visibility:nameVis}}>
          <input type="text" onChange={chooseName} placeholder="Write Your Name"></input>
          <button onClick={startQuiz}>Start Quiz</button>
          <h2 style={{visibility:countVis}}>{name}, You have Scored {count} points</h2>
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
            btnClicked === false ? <StartQuizSection /> : <QuizSection name={name} count={count} setCount={setCount} incrementCount={incrementCount}/>
          }
        </div>
      </div>
    </div>
  )
}