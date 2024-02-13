

export default function Specs(){
  return(
    <div className="specs">
      <div className="search">
        <input className="search-input" name="search-input" type="text"></input>
        <button className="search-button">Search</button>
      </div>
      <div className="cocktail-info">
        <h2>Search Cocktails</h2>
          <div className="cocktail-info-container">
            <img src="/cocktail-img.png"></img>
            <div className="cocktail-info-section">
              <h3>Old Fashioned</h3>
              <p>Cocktail specs</p>
              <p>Cocktail origin</p>
            </div>
          </div>
        
      </div>
    </div>
  )
}