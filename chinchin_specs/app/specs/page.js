'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

export default function Specs(){
  const [cocktails, setCocktails] = useState([]);

  useEffect(()=>{
    const fetchCocktails = async () => {
      const { data, error } = await supabase
      .from('specs')
      .select('*');

      if (error) {
        console.log("error", error)
      }

      if(data) {
        console.log("succesful")
        setCocktails(data);
      }


    } 
    fetchCocktails();

  },[])


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
                <h3>Old Fashioned</h3>
                <p>60ml VODKA 30ml HENESSEY 30ml CHAMBORD 60ml SUGAR SYRUP</p>
                <p>Orange Twist in rocks glass</p>
              </div>
            </div>
          </div>
        
        
      </div>
    </div>
  )
}