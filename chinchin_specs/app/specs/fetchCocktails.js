      const fetchCocktails = async() =>{
      const {data, error} = await supabase
      .from('specs')
      .select('*')

      if (data) {
        setCocktails(data)
      }

      if (error){
        console.log("error", error);
      }
    }

    export default fetchCocktails