'use client'

import { supabase } from "@/utils/supabaseClient"
import { useEffect, useState } from "react"


export default function Quiz(){

  const [name, setName] = useState(null);

  function chooseName(e){
    setName(e.target.value)
  
  }


  return(
    <div className="quiz">
      <div className="quiz-bg">
        <div className="quiz-name-input">
          <input type="text" onChange={chooseName}></input>
        </div>
        <div className="leaderboard">
          <h2>Leaderboard</h2>
        </div>
        <div className="quiz-section">
          <h3>QUESTION</h3>
          <div className="quiz-section-options">
          <p>1 awdawdawdadwadawdawdawd </p>
          <p>2 awdawdawdawdawdawdawdawd</p>
          <p>3 awdawdawdawdawdawdawdawda </p>
          <p>4 awdawdawdawdawdawdawdawdaw</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}