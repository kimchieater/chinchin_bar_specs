import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import {cookies} from 'next/headers';
import Button from "./button";

export default async function Dummy(){
  const supabase = createServerComponentClient({ cookies })

  const { data: specs} = await supabase.from("specs").select();
    
  return(
    <>
    <Button></Button>
    </>
  
    
  )
}