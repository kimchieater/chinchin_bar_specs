import {supabase} from '@/utils/supabaseClient';


const DummyTwo = async()=>{
  const {data, error} = await supabase
  .from('specs')
  .select()


  if (error){
    console.log(error)
  }
  if (data) {
    console.log(data)
  }
}

export default DummyTwo;