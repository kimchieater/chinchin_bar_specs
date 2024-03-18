
export default function GetCocktails({cocktails, passId}){
  
  
  return(
    <div className="GetCocktails">
      <h3>{cocktails[passId].cocktail_name}</h3>
      <p>{cocktails[passId].specs}</p>
      <p>{cocktails[passId].garnish}</p>
    </div>
  )
}