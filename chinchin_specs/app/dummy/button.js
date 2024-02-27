'use client';
import {useState} from 'react';
export default function Button(){
  const searchUp =  () =>{
    console.log(search)
  }


  const typeCocktail = (key) => {
    setSearch(key.target.value);
    console.log(search);
  }
  let [search, setSearch] = useState(null);

  return(
    <>    
    <input type="text" onChange={typeCocktail}></input>
    <button onClick={searchUp}>Click Me</button>
    </>

  )
}