import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import {cookies} from 'next/headers';
import Button from "./button";

export default async function Dummy(){

  return(
    <>
    <Button></Button>
    </>
  
    
  )
}