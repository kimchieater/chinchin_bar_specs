import { supabase } from "@/utils/supabaseClient";
import AdminCocktail from "./adminCocktail";



export default async function Admin(){
  let { data: cocktailSpecs } = await supabase.from('specs').select();

  let cocktails = cocktailSpecs;


  return(
    <div className="admin admin-bg">
      <h1>Admin Page</h1>
      <div className="admin-container">
        <AdminCocktail cocktails={cocktails}></AdminCocktail>
      </div>
    </div>
  )
}