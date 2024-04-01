'use client'

import { supabase } from "@/utils/supabaseClient"
import { useEffect, useState } from "react"


export default function QuizSection({usedRandomNum}){

  const [cocktails, setCocktails] = useState([]);
  const [nextQuestion, setNextQuestion] = useState(0)

  useEffect(()=>{
    //the Fisher-Yates shuffle algo
    
    async function fetchCocktails(){
      try {
        const {data:specs, error} = await supabase
      .from('specs')
      .select('*')

      if (specs){
        sortSelection(specs);
        setCocktails(specs);
      }
      if (error) throw error;
      } catch (error){
        console.log(error)
      }
    }
      fetchCocktails();
  },[])

  function randomQuestions(){
    
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

  return(
    <div className="quizSection">
      {
        cocktails.length === 0 ? <p>Loading</p> : (
          <>
          <h3>{cocktails[nextQuestion].cocktail_name}</h3>
          <div className="quiz-section-options">
          <p>1. awdawdawdawd</p>
          <p>2 aawawdawd</p>
          <p>3 awd </p>
          <p>4 awdad </p>
          </div>
          <button>Click me</button>
          </>
        )
      }
    </div>
  )
}