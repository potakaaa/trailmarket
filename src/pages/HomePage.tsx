import "./HomePage.css";
import NavBar from "./navbar/NavBar";
import HomePageCategories from "./HomePage/HomePageCategories";
import TopNavBar from "./navbar/TopNavBar";

const HomePage = () => {
  const CategoryArray = [
    {
      CategoryName: "Bags",
      CategoryDesc: "Carry your stuff that matter the most.",
      CategoryStartPrice: 900,
      CategoryImage:
        "https://cdn.thewirecutter.com/wp-content/media/2022/09/backpacks-2048px.jpg?auto=webp&quality=75&crop=1.91:1&width=1200",
    },
    {
      CategoryName: "Clothes",
      CategoryDesc: "Match the aesthetic of what your heart desires.",
      CategoryStartPrice: 150,
      CategoryImage:
        "https://solink.com/wp-content/uploads/2023/11/how-to-sell-retail-clothing.jpg",
    },
    {
      CategoryName: "Gadgets",
      CategoryDesc: "Be tech-y before classes start.",
      CategoryStartPrice: 150,
      CategoryImage:
        "https://cdn.prod.website-files.com/653d19cfb904e4d4a5e5d7da/6612754285b5798ac6bb9a5d_Gadgets-MQ.jpg",
    },
  ];

  return (
    <div className="HomePage w-full flex flex-col items-center">
      <NavBar obj={CategoryArray} />
      <div className="HomePage h-screen flex flex-col items-center">
        <TopNavBar />
        <NavBar obj={CategoryArray} />
        <hr />
        <div className="HomePageCategories w-full">
          <div
            className="CategoriesHeader bg-gradient-to-r from-[#282667] to-slate-900 p-7 mx-4 rounded-2xl"
          >
            <h1 className="CategoriesTitle text-4xl text-white text-center font-medium">
              CATEGORIES
            </h1>
            <p className="CategoriesDesc text-sm text-white text-center font-normal">
              Pick one to simplify your search
            </p>
          </div>
          <div className="CategoriesBody sm:grid-cols-1 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CategoryArray.map((category, index) => (
              <HomePageCategories
                key={index}
                name={category.CategoryName}
                desc={category.CategoryDesc}
                price={category.CategoryStartPrice}
                image={category.CategoryImage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
