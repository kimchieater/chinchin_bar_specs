import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res){
  if (req.method === 'POST'){
    const {searchQuery} = req.body

    const supabase = createClient('https://lvbvudmtzmkgxyrgrarn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2YnZ1ZG10em1rZ3h5cmdyYXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5OTY2MzEsImV4cCI6MjAyNDU3MjYzMX0.ia19vrN46SH-le-9e4qZOhRBDBLJqGp4eusu9iDCq7c');

    const {data, error} = await supabase.from('specs').select('*').ilike('cocktail_name', '%${searchQuery}%');
  }
}