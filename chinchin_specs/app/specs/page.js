'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import GetCocktails from './getCocktails';
import fetchCocktails from './fetchCocktails';



export default function Specs(){
  const [cocktails, setCocktails] = useState([{id:0, cocktail_name:"", specs:"", garnish:"",}]);
  const [passId, SetPassId] = useState(0);
  useEffect(()=>{
    fetchCocktails();
  },[cocktails])

  console.log(cocktails)


  return(
    <div className="specs">
      <div className="search">
        <input className="search-input" name="search-input" type="text"></input>
        <button className="search-button">Search</button>
      </div>
      <div className="cocktail-info">
        <h2>Search Cocktails</h2>
        <div className='specs-cocktail-info-container'>
          <div className='specs-cocktail-info-scroll'>
            {
              cocktails.map((a,i)=>{
                return(
                  <p>{a.cocktail_name}</p>
                )                
              })
            }
          </div>
            <div className="cocktail-info-container">
              <div className="cocktail-info-section">
                {<GetCocktails cocktails={cocktails} passId={passId}></GetCocktails>}
              </div>
            </div>
          </div>
        
        
      </div>
    </div>
  )
}