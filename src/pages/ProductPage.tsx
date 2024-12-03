import React from 'react'
import "./ProductPage.css"
const ProductPage = () => {
    return (
        <div className="app-wrapper 
                flex 
                items-center 
                justify-center 
                h-screen 
                w-screen">
            <div className="product-container 
                    flex 
                    flex-col 
                    justify-center 
                    items-center 
                    h-[60vh] 
                    w-[60vw] 
                    m-10 
                    bg-white 
                    rounded-lg 
                    shadow-lg">
                <div className="product-top 
                        flex 
                        flex-row 
                        flex-[2] 
                        w-full">
                    <div className="product-display
                            flex-[3] 
                            flex 
                            flex-col 
                            items-center 
                            space-y-2 
                            border 
                            rounded-2xl">
                        <div className="product-picture
                                flex-[3] 
                                justify-center 
                                items-center 
                                border 
                                rounded-2xl 
                                overflow-hidden 
                                w-full">
                            <img
                                className="w-full h-full object-contain"
                                src=""
                                alt="Product"
                            />
                        </div>
                        <div className="gallery grid grid-cols-4 gap-4 p-2 w-full">
                            <div className="bg-gray-100 rounded-lg border aspect-square"></div>
                            <div className="bg-gray-100 rounded-lg border aspect-square"></div>
                            <div className="bg-gray-100 rounded-lg border aspect-square"></div>
                            <div className="bg-gray-100 rounded-lg border aspect-square"></div>
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
                            <h2 className='text-2xl text-gray-100 font-normal mx-4 mt-6'>Item Price</h2>
                            <h1 className='text-4xl text-gray-100 mx-4'>PHP 400</h1>

                            <div className='mx-4 flex-row space-x-2'>
                                <button className="px-3 py-2 text-xs border-2 border-white text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300">Add to Cart</button>
                                <button className="px-3 py-2 text-xs border-2 border-white text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300">Proceed to Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-bottom 
                        flex 
                        flex-[1]
                        flex-row
                        w-full">
                    <div className="product-info  
                            flex-[3] 
                            flex 
                            items-start 
                            justify-start
                            bg-gray-100 
                            rounded-lg 
                            m-2">
                        <h1>Product Information</h1>
                        <p>ksadjks </p>

                    </div>
                    <div className="product-reviews  
                            flex-[5] 
                            flex 
                            items-center 
                            justify-center 
                            bg-gray-100 
                            rounded-lg 
                            m-2">
                        reviews
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductPage;