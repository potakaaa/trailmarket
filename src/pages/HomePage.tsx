import "./HomePage.css";
import NavBar from "./navbar/NavBar";
import HomePageCategories from "./HomePage/HomePageCategories";
import TopNavBar from "./navbar/TopNavBar";
import { CategoryArray } from "./context/Globals";

const HomePage = () => {
  return (
    <div className="HomePage size-full flex flex-col justify-center items-center">
      <TopNavBar />
      <NavBar obj={CategoryArray} />
      <div className="size-full px-3">
        <div className="HomePageCategories w-full">
          <div className="CategoriesHeader bg-gradient-to-r from-[#282667] to-slate-900 p-4 sm:p-7 mx-4 rounded-2xl">
            <h1 className="CategoriesTitle text-2xl sm:text-4xl text-white text-center font-medium">
              CATEGORIES
            </h1>
            <p className="CategoriesDesc text-[9px] sm:text-sm text-white text-center font-normal">
              Pick one to simplify your search
            </p>
          </div>
          <div className="CategoriesBody sm:grid-cols-1 grid md:grid-cols-2 lg:grid-cols-4 gap">
            {CategoryArray.map((category, index) => {
              if (index === 0) {
                return;
              } else {
                return (
                  <HomePageCategories
                    key={index}
                    name={category.CategoryName}
                    desc={category.CategoryDesc}
                    price={category.CategoryStartPrice}
                    image={category.CategoryImage}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
