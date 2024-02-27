'use client';

import {useState} from 'react';

export default function AdminCocktails({cocktails}){

  let [id, setId] = useState(0);
  return(
    <div className="admin-cocktails">
      <div className="admin-side-menu">
        {
          cocktails.map((a,i)=>{
            return(
              <div>
              <p className="admin-cocktail-name" onClick={()=>{
                setId(i);
                console.log(id);
              }}>{a.cocktail_name}</p>
              </div>
            )
          })
        }
      </div>
      <div className="admin-cocktail-info">
        <h3>{cocktails[id].cocktail_name}</h3>
        <h5>{cocktails[id].specs}</h5>
        <form className='change-cocktail'>
        <input type="text" name="cocktail_name" className='admin-cocktail-info-name' placeholder="change the name"></input>
        <input type="text" name="specs" className='admin-cocktail-info-specs' placeholder='change the specs'></input>
        <button type="submit">Change</button>
        </form>

        <form className="add-cocktail" method='POST' action='/api/addSpecs'>
        <label>Add a Cocktail</label>
        <input type="text" name="cocktail_name" className='admin-cocktail-info-name' placeholder="add the name"></input>
        <input type="text" name="specs" className='admin-cocktail-info-specs' placeholder='add the specs'></input>
        <button type="submit">Add</button>
        </form>
        
      </div>
    </div>
  )
}