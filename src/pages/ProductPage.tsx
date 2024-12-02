import React from 'react'
import "./ProductPage.css"
const ProductPage = () => {
    return (
        <div className="product-container 
    justify-center items-center flex flex-col size-full
  border-black border-2 m-20 rounded-2xl mb-8">

            <div className='product-display justify-center items-center flex flex-row size-full
  border-black border-2 rounded-2xl'>

                <div className='product-picture justify-center items-center flex flex-col size-full
  border-black border-2 rounded-2xl'>

                </div>

                <div className='product-details justify-center items-center flex flex-col size-full
  border-black border-2 rounded-2xl'>
                    <div className='product-name justify-center items-center flex flex-col size-full
  border-black border-2 rounded-2xl'>

                    </div>
                    <div className='product-price justify-center items-center flex flex-col size-full
  border-black border-2 rounded-2xl'>

                    </div>

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