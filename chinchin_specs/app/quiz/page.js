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
  
  const [cocktails, setCocktails] = useState([]);


  const [timer, setTimer] = useState(30);
  const [timerHidden, setTimerHidden] = useState(true);
  const [timerVis, setTimerVis] = useState("hidden");
  const [btnClicked, setBtnClicked] = useState(false);

  const [randomNum, setRandomNum] = useState();
  let usedRandomNum = [];


  //functions

  useEffect(()=>{
    async function fetchCocktails(){
      try{
        const {data:specs, error} = await supabase
        .from('specs')
        .select('*')

        if (specs){
          setCocktails(specs);
        }

        if (error) throw error;

      } catch(error){
        console.log(error)
      }
    }
      fetchCocktails();
  },[]);

  function chooseName(e){
    setName(e.target.value)
  }

  function startQuiz(){
    timerStart();
  }

  function chooseRandomNum(){
    const randomInt = Math.floor(Math.random() * cocktails.length);
    setRandomNum(randomInt);
    usedRandomNum.push(randomInt);
  }

  

  function timerStart(){
    setTimerHidden(false);
    setTimerVis("visible");
    setBtnClicked(true);
    setNameVis("hidden");
    setTimer(30);
    chooseRandomNum();


    const intervalId = setInterval(()=>{
      setTimer((prevTimer) =>{
        if (prevTimer <= 0){
          clearInterval(intervalId);
          setTimerVis("hidden"); 
          usedRandomNum = [];
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
            btnClicked === false ? <StartQuizSection /> : <QuizSection cocktails={cocktails} randomNum={randomNum} chooseRandomNum={chooseRandomNum} usedRandomNum={usedRandomNum}/>
          }
        </div>
      </div>
    </div>
  )
}