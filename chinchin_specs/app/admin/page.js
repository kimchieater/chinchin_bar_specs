import { supabase } from "@/utils/supabaseClient";
import AdminCocktail from "./adminCocktail";


export default async function Admin(){
  let result = await supabase.from('specs').select();
  let cocktails = result.data;
  

  return(
    <div className="admin admin-bg">
      
      <h1>Admin Page</h1>
      <div className="admin-container">
        <AdminCocktail cocktails={cocktails} key={cocktails.id}></AdminCocktail>
      </div>
      

    </div>
  )
}