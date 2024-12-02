import "./HomePage.css"

function HomePage (){
    return(
        <div className="home-page">
            <div className="category-title">
                <h2>Categories</h2>
                <text>Pick one to simplify your search</text>
            </div>
            <div className="category-list">
               <div className="category">
                    <div className="category-image"></div>
                    <div className="category-desc"></div>
               </div>
               <div className="category">


               </div>
               <div className="category"></div>
               <div className="see-more"></div>
            </div>
        
        </div>
    );
}

export default HomePage;