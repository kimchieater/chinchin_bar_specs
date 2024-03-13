import { supabase } from "@/utils/supabaseClient";
import AdminCocktail from "./adminCocktail";



export default async function Admin(){
  

  return(
    <div className="admin admin-bg">
      <h1>Admin Page</h1>
      <div className="admin-container">
        <AdminCocktail></AdminCocktail>
      </div>
    </div>
  )
}