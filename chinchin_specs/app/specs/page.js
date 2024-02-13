

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
              <p>60ml VODKA 30ml HENESSEY 30ml CHAMBORD 60ml SUGAR SYRUP</p>
              <p>Some say that the drink actually originated in Louisville, Kentucky in 1880 at a private social club called The Pendennis Club. The recipe is linked to bartender and bourbon distillery, James E. Pepper.</p>
            </div>
          </div>
        
      </div>
    </div>
  )
}