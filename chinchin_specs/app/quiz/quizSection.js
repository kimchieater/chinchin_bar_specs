'use client'

import { supabase } from "@/utils/supabaseClient"
import { useEffect, useState } from "react"


export default function QuizSection({cocktails, randomNum, chooseRandomNum, usedRandomNum}){

  


  return(
    <div className="quizSection">
      <h3>{cocktails[randomNum].cocktail_name}</h3>
          <div className="quiz-section-options">
          <p>1. awdawdawdawd</p>
          <p>2 aawawdawd</p>
          <p>3 awd </p>
          <p>4 awdad </p>
          </div>
    </div>
  )
}