'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

export default function Specs(){
  const [specs, setSpecs] = useState([]);

  useEffect(() => {

    const {data, error} = supabase.from('specs').select()

    if (error){
      console.log(error)
    } 
    if (data){
      setSpecs(data)
    }
    
  const channels = supabase.channel('custom-all-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'specs' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()
  }, []);

  console.log(specs)
  
  return(
    <div className="specs">
      <div className="search">
        <input className="search-input" name="search-input" type="text"></input>
        <button className="search-button">Search</button>
      </div>
      <div className="cocktail-info">
        <h2>Search Cocktails</h2>
          <div className="cocktail-info-container">
            <img src="/cocktail-img.png"></img>
            <div className="cocktail-info-section">
              <h3>Old Fashioned</h3>
              <p>60ml VODKA 30ml HENESSEY 30ml CHAMBORD 60ml SUGAR SYRUP</p>
              <p>Some say that the drink actually originated in Louisville, Kentucky in 1880 at a private social club called The Pendennis Club. The recipe is linked to bartender and bourbon distillery, James E. Pepper.</p>
            </div>
          </div>
        
      </div>
    </div>
  )
}