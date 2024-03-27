'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import Defaultstate from './defaultState';
import GetCocktails from './getCocktails';





export default function Specs(){
  const [cocktails, setCocktails] = useState([]);
  const [passId, SetPassId] = useState(0);
  useEffect(()=>{
    async function fetchCocktails(){
    
      try {
        const {data:spec, error} = await supabase
        .from('specs')
        .select('*')

        if (spec){
          setCocktails(spec)
        }
      } catch(error){
        console.log(error)
      }
    }

    fetchCocktails();
  },[cocktails])




  return(
    <div className="specs">
      <div className="search">
        <input className="search-input" name="search-input" type="text" onChange={(e)=>{
          
        }}></input>
        <button className="search-button">Search</button>
      </div>
      <div className="cocktail-info">
        <h2>Search Cocktails</h2>
        <div className='specs-cocktail-info-container'>
          <div className='specs-cocktail-info-scroll'>
            {
              cocktails.map((a,i)=>{
                return(
                  <p onClick={()=>{
                    SetPassId(i)
                  }}>{a.cocktail_name}</p>
                )                
              })
            }
          </div>
            <div className="cocktail-info-container">
              <div className="cocktail-info-section">
                {
                  cocktails.length === 0 ? <Defaultstate/> : <GetCocktails cocktails={cocktails} passId={passId}/>
                }                
              </div>
            </div>
          </div>
        
        
      </div>
    </div>
  )
}