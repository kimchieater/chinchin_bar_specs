'use client'

import { supabase } from "@/utils/supabaseClient"
import next from "next"
import { useEffect, useState } from "react"


export default function QuizSection({name, count, incrementCount, setCount}){

  const [cocktails, setCocktails] = useState([]);
  const [currentQuestion, setCurrentQuestions] = useState(0);
  const [selections, setSelections] = useState([]);

  

  
  const [rightWrong, setRightWrong] = useState([null]);
  useEffect(()=>{
    //the Fisher-Yates shuffle algo
    
    async function fetchCocktails(){
      try {
        const {data:specs, error} = await supabase
      .from('specs')
      .select('*')

      if (specs){
        const shuffled = sortSelection(specs);
        setCocktails(shuffled);
        const count = 4;
        const randomQs = randomQuestions(shuffled, count, currentQuestion)
        sortSelection(randomQs);
        setSelections(randomQs);

      }
      } catch (error){
        console.log(error)
      }
    }

      fetchCocktails();
  },[])


  function randomQuestions(cocktails, count, currentQuestion){
    let randomQs = [cocktails[currentQuestion].specs];
    let pickRandomNum = new Set([currentQuestion]);

    while (pickRandomNum.size < count  + 1) {
      let randomInt = Math.floor(Math.random() * cocktails.length);
      pickRandomNum.add(randomInt);
  }

  pickRandomNum = [...pickRandomNum].filter(index => index !== currentQuestion);

  pickRandomNum.slice(0, count - 1).forEach(index =>{
    randomQs.push(cocktails[index].specs);
  })

  return randomQs;
  }


  function sortSelection(array){
      for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        
        // Swap elements at indices i and j
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function correctAnswer(){

      setRightWrong("green");
      incrementCount();

      setTimeout(()=>{
        setCurrentQuestions(prev => {
          const nextQustionIndex = (prev + 1) % cocktails.length
          updatedSelectionsForQuestion(nextQustionIndex);
          return nextQustionIndex;
        });

        setRightWrong(null);
      },200)
      console.log(count);
    }

    function updatedSelectionsForQuestion(nextQuestionIndex){
      const randomQs = randomQuestions(cocktails, 4, nextQuestionIndex);
      const sortedRandomQs = sortSelection(randomQs);
      setSelections(sortedRandomQs);
    }

    function incorrectAnswer(){
      const timeOut = setTimeout(()=>{
        setRightWrong("red");

        setTimeout(()=>{
          setRightWrong(null);
        },200)
      },200)
    }

    function checkAnswer(a){
      
      if (a === cocktails[currentQuestion].specs){
        correctAnswer();

      } else {
        incorrectAnswer();
      }
    }
  return(
    <div className="quizSection">
      {
        cocktails.length === 0 ? <p>Loading</p> : (
          <div className="quizSection-bg" >
          <h3 style={{background:rightWrong, transition:"all, .5s"}}>{cocktails[currentQuestion].cocktail_name}</h3>
          <div className="quiz-section-options">
          {
            selections.map((a,i)=>{
              return(
                <p key={i} onClick={()=>{
                  checkAnswer(a);
                }}>{a}</p>
              )
            })
          }
          </div>

          <button>Click me</button>
          </div>
        )
      }
    </div>
  )
}