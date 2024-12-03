import React from 'react';

interface HomePageCategoriesProps {
  name: string;
  desc: string;
  price: number;
  image: string;
}

const HomePageCategories: React.FC<HomePageCategoriesProps> = ({ name, desc, price, image }) => {    
    return (
        <div className="CategoriesComponent flex m-4 h-[200px] md:h-[200px] lg:h-[250px]"> {/* Set fixed height */}
            <div className="CategoriesComponentLeft flex-1 p-5 rounded-tl-2xl rounded-bl-2xl bg-[#252525] text-white flex flex-col justify-between gap-10">
              <div className="LeftTopText">
                <h1 className="ComponentName text-2xl">{name}</h1>
                <p className="ComponentDesc text-xs font-medium">{desc}</p>
              </div>
              <div className="LeftButtomText text-right">
                <p className="text-xs font-medium text-right">Starts at</p>
                <h1 className="text-2xl">PHP {price}</h1>
              </div>
            </div>
            <div className="CategoriesComponentRight flex-1 h-full">
              <img src={image} alt={name} className="object-cover w-full h-full rounded-tr-2xl rounded-br-2xl"/>
            </div>
        </div>
    )
}

export default HomePageCategories;
