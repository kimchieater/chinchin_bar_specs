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

  const [leaderboardData, setLeaderboardData] = useState([]);

  const [timer, setTimer] = useState(30);
  const [timerHidden, setTimerHidden] = useState(true);
  const [timerVis, setTimerVis] = useState("hidden");
  const [btnClicked, setBtnClicked] = useState(false);

  const [submitClicked, setSubmitClicked] = useState(false);

  const intervalIdRef = useRef(null);
  //functions

  function handleCountChange(newCount){
    setCount(newCount);
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

      setSubmitClicked(true);
      console.log("submitted")
    } catch (error){
      console.error('Error', error)
    }
  }


  function timerStart(){

    if (intervalIdRef.current) return;
    if (name === null){
      alert("Please write your name");
      return
    }

    setTimerHidden(false);
    setTimerVis("visible");
    setBtnClicked(true);
    setNameVis("hidden");
    setTimer(30);

      intervalIdRef.current = setInterval(() => {
    setTimer(prevTimer => {
      if (prevTimer ===0) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null; // Clear the ref
        setTimerVis("hidden");
        setCountVis("visible");
        return 0; // Stop the timer
      }

      return prevTimer - 1;
    });
  }, 1000);
}

// Cleanup on component unmount
useEffect(() => {
  return () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
  };
}, []);

useEffect(()=>{
  async function fetchQuizData(){

    try{
      const {data:quiz, error} = await supabase
    .from('quiz')
    .select('*')
    .order('count', {ascending:false})
    .limit(3);

    if (quiz){
      setLeaderboardData(quiz);
    }
    } catch(error) {
      console.log(error);
    }
    
  }
  fetchQuizData();


},[])

console.log(leaderboardData);

  return(
    <div className="quiz">

      <div className="quiz-input">
        <div className="quiz-name-input" style={{visibility:nameVis}}>
          <input type="text" onChange={chooseName} placeholder="Write Your Name"></input>
          <button onClick={startQuiz}>Start Quiz</button>
          <div style={{visibility:countVis}} className="quiz-end-info">
            <h2>{name}, You have Scored {count} points</h2>
            <button onClick={submitScore} disabled={submitClicked}>Submit</button>
          </div>

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
          {
            leaderboardData.map((a,i)=>{
              return(
                <div>
                  <h3>{a.name}  {a.count}</h3>
                </div>
              )
            }
            )
          }
        </div>
        <div className="quiz-section">
          {
            btnClicked === false ? <StartQuizSection /> : <QuizSection name={name} count={count} setCount={setCount}  submitScore={submitScore} timer={timer} onCountChange={handleCountChange}/>
          }
        </div>
      </div>
    </div>
  )
}