'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import Defaultstate from './defaultState';
import GetCocktails from './getCocktails';





export default function Specs(){
  const [cocktails, setCocktails] = useState([]);
  const [passId, setPassId] = useState(0);
  const [search, setSearch] = useState(null);
  const [searchedCocktails, setSerachedCocktails] = useState([]);
  const [searched, setSearched] = useState(false);

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
  },[])

  async function searchCocktails(){
      if (!search){
        console.log("No search term provided")
        return;
      }

      try{
        const {data:foundCocktails, error} = await supabase
        .from('specs')
        .select('*')
        .ilike('cocktail_name', `%${search}%`);
      
      
        if (error) throw error;

        if (foundCocktails) {
          console.log("Cocktails match search:", foundCocktails);
          setSerachedCocktails(foundCocktails);
          
        }
      } 
      
      catch (error){
        console.error("Error", error)
      }
  }


  return(
    <div className="specs">
      <div className="search">
        <input className="search-input" name="search-input" type="text" onChange={(e)=>{
          setSearch(e.target.value);
        }}
        onKeyDown={(e)=>{
          if (e.key === 'Enter'){
            searchCocktails();
          }
        }}></input>
        <button className="search-button" type="submit" 
        onClick={()=>{
          searchCocktails()
        }}
        
        >Search</button>
      </div>
      <div className="cocktail-info">
        <h2>Search Cocktails</h2>
        <div className='specs-cocktail-info-container'>
          <div className='specs-cocktail-info-scroll'>
            {
              cocktails.map((a,i)=>{
                return(
                  <p onClick={()=>{
                    setPassId(i);
                    setSerachedCocktails([]);
                  }}>{a.cocktail_name}</p>
                )                
              })
            }
          </div>
            <div className="cocktail-info-container">
              <div className="cocktail-info-section">
                {
                  cocktails.length === 0 ? <Defaultstate/> : <GetCocktails cocktails={cocktails} passId={passId} searchedCocktails={searchedCocktails}/>
                }                
              </div>
            </div>
          </div>
        
        
      </div>
    </div>
  )
}