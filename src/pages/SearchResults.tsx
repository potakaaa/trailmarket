import React, { useState } from 'react'
import TopNavBar from './navbar/TopNavBar';
import NavBar from './navbar/NavBar';
const kanye = "https://media.gq.com/photos/5ad93798ceb93861adb912d8/16:9/w_2672,h_1503,c_limit/kanye-west-0814-GQ-FEKW01.01.jpg";

const categories = ["Bags", "Accessories", "Clothes", "Gadgets"]
interface DropdownProps {
    options: string[];
    onSelect: (value: string) => void;
    children: React.ReactNode;
}


const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button
                className="md:hidden px-6 py-1 bg-white border-2 border-black rounded-3xl"
                onClick={toggleDropdown}
            >
                {children}
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded z-50">
                    {options.map((option, index) => (
                        <a
                            key={index}
                            href="#"
                            onClick={() => onSelect(option)}
                            className="block px-4 py-2 hover:bg-gray-100"
                        >
                            {option}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};


const SearchResults = () => {
    const handleSelect = (value: string) => {
        console.log("Selected:", value);
    };


    return (
        <div className='flex flex-col'>
            <TopNavBar/>
            <NavBar/>
            <div className="app-wrapper flex flex-col items-center justify-start min-h-screen w-full overflow-y-visible px-3">
                <div className='search-wrapper flex flex-col h-full w-full space-y-6 md:flex-row'>
                    <div className='filter-sort flex flex-[1] bg-gray-50 h-full drop-shadow-xl rounded-xl p-8 z-10'>
                        <Dropdown onSelect={handleSelect} options={categories}>Tags</Dropdown>
                        <Dropdown onSelect={handleSelect} options={["High to Low", "Low to High"]}>Price</Dropdown>
                        <Dropdown onSelect={handleSelect} options={["Latest to Oldest", "Oldest to Latest"]}>Date</Dropdown>
                    </div>
                    <div className='search-results flex flex-[3] bg-gray-50 drop-shadow-xl rounded-xl p-8 flex-col space-y-3'>
                        <h1>Search Results for "ITEM"</h1>
                        <div className=' result-container w-full flex items-center justify-center md:grid md:grid-cols-3 md:gap-4'>
                            <div className='PRODUCT-CONTAINER w-56 space-y-3 flex flex-col'>
                                <div className='flex flex-row align-middle space-x-2'>
                                    <div className="w-4 h-4 rounded-full overflow-hidden border border-black">
                                        <img className='object-cover h-full w-full' src={kanye}></img>
                                    </div>
                                    <p className='text-xs align-middle'>WORK ON PADDING WORK ON PADDING</p>
                                </div>
            
                                <div className='flex flex-[5] rounded-xl overflow-hidden aspect-square '>
                                    <img src={kanye} className='object-cover'></img>
                                </div>
                                <div className='flex flex-[2] bg-zinc-900 rounded-xl p-4 flex-col'>
                                <h2 className='text-white text-xl'>4 Orders pending</h2>
                                <h2 className='text-white font-normal text-sm'>Lorem Ipsum</h2>
                            </div>
                            </div>
            
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default SearchResults