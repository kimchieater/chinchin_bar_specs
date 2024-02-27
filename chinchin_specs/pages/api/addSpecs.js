import { supabase } from "@/utils/supabaseClient"


export default async function handler(req, res){
  
  console.log(req.body)

  try{
    if (req.method == "POST"){
      supabase.from('specs').insert(req.body);
      return res.status(200).json("succesful");
    }
  } catch(error){
    if (error){
      console.log("error", error);
      return res.status(500).json("failed")
    }
  }
}