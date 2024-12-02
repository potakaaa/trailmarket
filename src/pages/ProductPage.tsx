import React from 'react'
import "./ProductPage.css"
const ProductPage = () => {
    return (
        <div className="product-container 
                            justify-center 
                            items-center 
                            flex 
                            flex-col 
                            size-full
                            border-black 
                            border-2 
                            m-20 
                            rounded-2xl 
                            mb-8
                            aspect-w-16 aspect-h-9">

            <div className='product-display 
                                justify-center 
                                items-start 
                                flex 
                                flex-col
                                size-full
                                border-black 
                                border-2 
                                rounded-2xl'>

                <div className='product-picture 
                                    justify-center 
                                    items-center 
                                    flex 
                                    flex-col 
                                    size-full
                                    border-black 
                                    border-2 
                                    rounded-2xl
                                    overflow-hidden
                                    w-30 h-64
                                    m-4'>

                    <img className="w-full h-full object-cover" src='https://shop.mango.com/assets/rcs/pics/static/T7/fotos/S/77034451_56_B.jpg?imwidth=2048&imdensity=1&ts=1720625661877'></img>

                </div>
                <div className='flex 
                                flex-row'>
                    <div className="flex space-x-5 overflow-x-auto p-4 bg-white rounded-lg flex-row">
                        <div className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg border">
                        </div>
                        <div className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg border">
                        </div>
                        <div className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg border">
                        </div>
                        <div className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg border">
                        </div>
                    </div>
                </div>



            </div>

            <div className='product-details 
                                justify-center 
                                items-center 
                                flex 
                                flex-col 
                                size-full 
                                border-black 
                                border-2 rounded-2xl'>
                <div className='product-name 
                                    justify-center 
                                    items-center 
                                    flex 
                                    flex-col size-full
                                    border-black 
                                    border-2 rounded-2xl'>

                </div>
                <div className='product-price 
                                    justify-center 
                                    items-center 
                                    flex flex-col 
                                    size-full
                                    border-black border-2 rounded-2xl'>

                </div>

            </div>

            <div className='product-info justify-center items-center flex flex-col size-full 
  border-black border-2 rounded-2xl'>
                <div></div>
                <div></div>
            </div>

        </div>
    )
}

export default ProductPage;