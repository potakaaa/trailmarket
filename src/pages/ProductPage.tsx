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
                            Product Name
                        </div>
                        <div className="product-price  
                                flex-[1] 
                                items-center 
                                justify-center 
                                bg-gray-100 
                                rounded-lg 
                                m-2">
                            $123.45
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
                            flex-col
                            items-start 
                            justify-start
                            bg-gray-100 
                            rounded-lg 
                            m-2">
                        <h1 className="mx-2.5 mt-1.5">Product Information</h1>
                        <p className="text-xs font-normal mx-2.5 ">Product Details</p>
                    </div>
                    <div className="product-reviews  
                            flex-[5] 
                            flex-auto 
                            items-start 
                            justify-start 
                            bg-gray-100 
                            rounded-lg 
                            m-2">
                        <div className='flex flex-[1] flex-col'>
                            <h1 className="mx-2.5 mt-1.5">Costumer Reviews</h1>
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
                        <div className="review-preview
                            flex 
                            flex-[1]
                            flex-col
                            items-start 
                            justify-start
                            bg-gray-100 
                            rounded-lg 
                            border
                            m-2">
                                <h1>test</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductPage;