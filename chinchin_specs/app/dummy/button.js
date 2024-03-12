'use client';


import { supabase } from '@/utils/supabaseClient';
import {useState, useEffect} from 'react';
export default function Button(){
  const [fetchError, setFetchError] = useState(null);
  const [cocktails, setCocktails] = useState(null);

  useEffect(()=>{

    const fetchCocktails = async()=>{
      const { data, error } = await supabase
      .from('specs')
      .select()

      if (error) {
      setFetchError('Could not fetch the cocktails')
      setCocktails(null);
      console.log(error)
    }
    if (data){
      setCocktails(data)
      setFetchError(null);
    }
    }

    fetchCocktails();
  }, [])


  return(
    <>
    {fetchError && (<p>{fetchError}</p>)}
    {cocktails  && (
      <div className='cocktails'>
        {
          cocktails.map(cocktail =>
            
            (<p>{cocktail.cocktail_name}</p>)
            
          )
        }
      </div>

    )}
    <input type="text" name="cocktail_name" ></input>
    <button>Search</button>
    </>
  )
}