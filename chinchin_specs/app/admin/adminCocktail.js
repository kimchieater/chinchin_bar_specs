'use client';

import { supabase } from '@/utils/supabaseClient';
import {useEffect, useState} from 'react';




export default function AdminCocktails(){
  const [updatedCocktails, setUpdatedCocktails] = useState([{id:0, cocktail_name:"", specs:"", garnish:"",}]);
  const [fetchError, setFetchError] = useState(null);
  const [cocktail_name, setCocktail_name] = useState('');
  const [specs, setSpecs] = useState('');
  const [garnish, setGarnish] = useState('');
  const [formError, setFormError] = useState(null);
    let [id, setId] = useState(0);
  const [deleteId, setDeleteId] = useState(0);
  
  


  useEffect(()=>{
    const fetchCocktails = async() => {
      const {data: cocktail, error} = await supabase.from('specs').select();

      if (error) {
        setFetchError('Could not fetch cocktails')
        setUpdatedCocktails(null);
        console.log(fetchError);
      }

      if (cocktail) {
        setUpdatedCocktails(cocktail)
        setFetchError(null);
      }
    }

    fetchCocktails();
    channels();
  }, [updatedCocktails])



  const channels = ()=> {supabase.channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'specs' },
      (payload) => {
        console.log('Change received!', payload)
      }
    )
    .subscribe()
    }

  const handleDelete = async(cocktailId) =>{
    console.log(cocktailId);

    const {data, error} = await supabase
    .from('specs')
    .delete()
    .eq('id', cocktailId)

    if (error) {
      console.log(error);
    }
    if (data){
      console.log(data);
      fetchCocktails();
    }
    
    }


  const handleSubmit = async(e) =>{

    if (!cocktail_name || !specs || !garnish){
      setFormError("Please fill in all the fields correct");
      return
    }

    const {data, error} = await supabase 
    .from('specs')
    .insert([{cocktail_name, specs, garnish}]);

    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly')
    }
    if (data) {
      console.log(data);
      setFormError(null);
      fetchCocktails();
    }
  }



  return(
    <div className="admin-cocktails">
      <div className="admin-side-menu">
        {
          updatedCocktails.map((a,i)=>{
            return(
              <div className='admin-cocktail-section'>
              <p className="admin-cocktail-name" onClick={()=>{
                setId(i);

              }}>{a.cocktail_name}</p> <i onClick={()=> handleDelete(a.id)}>X</i>
              </div>
            )
          })
        }
      </div>
      <div className="admin-cocktail-info">
        <div className='admin-cocktail-info-section'>
          <h3>{updatedCocktails[id].cocktail_name}</h3>
        <h5>{updatedCocktails[id].specs}</h5>
        <h5>{updatedCocktails[id].garnish}</h5>
        </div>

        <div className='form-container'>
        

        <form className="add-cocktail" onSubmit={handleSubmit}>
        <label htmlFor="cocktail_name">Add Cocktail</label>
        <input type="text" name="cocktail_name" className='admin-cocktail-info-name' value={cocktail_name} onChange={(e)=>setCocktail_name(e.target.value)} placeholder="add the name"></input>
        <label htmlFor="specs">Add specs</label>
        <input type="text" name="specs" className='admin-cocktail-info-specs' placeholder='add the specs' value={specs} onChange={(e)=>setSpecs(e.target.value)}></input>
        <label htmlFor='garnish'>Add garnish</label>
        <input type="text" name="garnish" className="admin-cocktail-info-garnish" placeholder="add the garnish" value={garnish} onChange={(e)=>setGarnish(e.target.value)}></input>
        <button type="submit">Add</button>
        
        {formError && <p className='error'>{formError}</p>}
        </form>
        </div>
      </div>
    </div>
  )
}