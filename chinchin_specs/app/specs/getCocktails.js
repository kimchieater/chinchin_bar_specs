
export default function GetCocktails({cocktails, passId, searchedCocktails}){
  
  const content = searchedCocktails.length === 0 
  ? (
    <>
    <h3>{cocktails[passId].cocktail_name}</h3>
      <p>{cocktails[passId].specs}</p>
      <p>{cocktails[passId].garnish}</p>
      </>
  ) : (
  <>
  <h3>{searchedCocktails[0].cocktail_name}</h3>
  <p>{searchedCocktails[0].specs}</p>
  <p>{searchedCocktails[0].garnish}</p>
  </>
  )
  
  return(
    <div className="GetCocktails">
      {/* <h3>{cocktails[passId].cocktail_name}</h3>
      <p>{cocktails[passId].specs}</p>
      <p>{cocktails[passId].garnish}</p> */
      }

      {
        <p>{content}</p>
      }
    </div>
  )
}