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
                            items-center 
                            justify-center 
                            bg-gray-100 
                            rounded-lg 
                            m-2">
                        info
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