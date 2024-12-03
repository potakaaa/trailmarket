import React, { useState } from 'react'
import "./ProductPage.css"
const ProductPage = () => {
    const [count, setCount] = useState(0);



    const handlePlus = () => {
        setCount(count + 1);
      };

      const handleMinus = () => {
        if(count != 0){setCount(count - 1)};
      };
   

    return (
        <div className="app-wrapper 
                flex 
                items-center 
                justify-center
                min-h-screen 
                w-screen
                overflow-scroll">
            <div className="product-container 
                    flex 
                    flex-col 
                    justify-center 
                    items-center 
                    h-auto 
                    sm:w-[90vw]
                    md:w-[80vw] 
                    lg:w-[60vw]
                    bg-white 
                    rounded-lg 
                    shadow-lg
                    ">
                <div className="product-top 
                        flex 
                        flex-col
                        md:flex-row
                        flex-[2] 
                        w-full
                        px-1
                        h-auto
                        ">
                    <div className="product-display
                            flex-[3] 
                            flex 
                            flex-col
                            

                            rounded-2xl ">
                        <div className="aspect-square bg-gray-200 rounded-lg ">
                            <img
                                className="h-full w-full object-cover rounded-lg"
                                src="https://media.gq.com/photos/5ad93798ceb93861adb912d8/16:9/w_2672,h_1503,c_limit/kanye-west-0814-GQ-FEKW01.01.jpg"
                                alt="Product"
                            />
                        </div>
                        <div className="gallery grid grid-cols-4 md:grid-cols-2 xl:grid-cols-4 gap-4 p-2 w-full">
                            <div className="bg-gray-100 rounded-lg border aspect-square">
                                <img
                                    className="h-full w-full object-cover rounded-lg"
                                    src="https://media.gq.com/photos/5ad93798ceb93861adb912d8/16:9/w_2672,h_1503,c_limit/kanye-west-0814-GQ-FEKW01.01.jpg"
                                    alt="Product"
                                />
                            </div>
                            <div className="bg-gray-100 rounded-lg border aspect-square">
                                <img
                                    className="h-full w-full object-cover rounded-lg"
                                    src="https://media.gq.com/photos/5ad93798ceb93861adb912d8/16:9/w_2672,h_1503,c_limit/kanye-west-0814-GQ-FEKW01.01.jpg"
                                    alt="Product"
                                />
                            </div>
                            <div className="bg-gray-100 rounded-lg border aspect-square">
                                <img
                                    className="h-full w-full object-cover rounded-lg"
                                    src="https://media.gq.com/photos/5ad93798ceb93861adb912d8/16:9/w_2672,h_1503,c_limit/kanye-west-0814-GQ-FEKW01.01.jpg"
                                    alt="Product"
                                />
                            </div>
                            <div className="bg-gray-100 rounded-lg border aspect-square">
                                <img
                                    className="h-full w-full object-cover rounded-lg"
                                    src="https://media.gq.com/photos/5ad93798ceb93861adb912d8/16:9/w_2672,h_1503,c_limit/kanye-west-0814-GQ-FEKW01.01.jpg"
                                    alt="Product"
                                />
                            </div>
                        </div>

                    </div>
                    <div className="product-details
                            flex-[5] 
                            flex 
                            flex-col">
                        <div className="product-name  
                                flex-[1] 
                                items-center 
                                justify-center 
                                bg-gray-100 
                                rounded-lg 
                                m-2">
                            <h1 className='mx-2.5 mt-1.5 text-4xl'>Product Name</h1>
                            <h2 className='text-sm font-normal mx-2.5 mt-1.5'>description</h2>
                            <div className="flex space-x-1 mx-2.5 mt-1.5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4 text-black"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4 text-black"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4 text-black"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-4 w-4 text-gray-300"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-4 w-4 text-gray-300"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                    />
                                </svg>
                            </div>
                            <h2 className='text-sm font-normal mx-2.5 mt-1.5'>3 reviews</h2>
                        </div>
                        <div className="product-price  
                                flex-[1] 
                                items-center 
                                justify-center 
                                bg-gray-900 
                                rounded-lg 
                                m-2">
                            <h2 className='text-l md:text-2xl text-gray-100 font-normal mx-4 mt-2 md:mt-6'>Item Price</h2>
                            <h1 className='text-2xl md:text-4xl text-gray-100 mx-4'>PHP 400</h1>

                            <div className='mx-4 flex-row space-x-2 pb-2'>
                                <button className="px-3 py-2 text-xs border-2 border-white text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300">Add to Cart</button>
                                <button className="px-3 py-2 text-xs border-2 border-white text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300">Proceed to Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-bottom 
                        flex 
                        flex-[1]
                        flex-col
                        md:flex-row
                        w-full">
                    <div className="product-info  
                            flex-[3] 
                            flex 
                            flex-col
                            items-start 
                            justify-start
                            bg-gray-100 
                            rounded-lg 
                            m-2">
                        <h1 className="mx-2.5 mt-1.5 text-4xl">Product Information</h1>
                        <p className="text-xs font-normal mx-2.5 ">Product Details</p>
                        <div className='flex flex-row space-x-2 m-2'>
                            <h2 className="mx-2.5 mt-5 text-sm">Categories</h2>
                            <button className="px-4 py-2 text-xs border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300">Bags</button>
                            <button className="px-4 py-2 text-xs border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300">Accessories</button>
                        </div>
                        <div className="flex flex-row space-x-2 m-5">
                            <h3 className="mx-2.5 mt-3 text-sm ">Quantity</h3>
                            <button onClick={handleMinus} className="px-4 py-2 text-xs border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300">-</button>
                            <input type="number" className="w-20 text-xs text-center border-2 border-black rounded-full bg-gray " value={count}/>
                            <button onClick={handlePlus}className="px-4 py-2 text-xs border-2 border-black text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300">+</button>
                        </div>
                    </div>
                    <div className="product-reviews  
                            flex-[5] 
                            items-start 
                            justify-start 
                            bg-gray-100 
                            rounded-lg 
                            m-2">
                        <div className='flex flex-[1] flex-col'>
                            <h1 className="mx-2.5 mt-1.5 text-4xl">Costumer Reviews</h1>
                            <div className="flex space-x-1 mx-2.5 mt-1.5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4 text-black"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4 text-black"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4 text-black"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-4 w-4 text-gray-300"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-4 w-4 text-gray-300"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-xs mx-2.5">80% of costumers are satisfied</h2>
                            <h3 className="text-xs mx-2.5">3 reviews</h3>
                        </div>
                        <div className="review-preview w-full max-h-full overflow-y-auto flex flex-col items-start justify-start break-all p-4">
                            <div className='flex-[3] 
                            flex 
                            flex-col
                            items-start 
                            justify-start
                            bg-gray-100 
                            border
                            rounded-lg 
                            m-2"'>
                                <h1>testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductPage;