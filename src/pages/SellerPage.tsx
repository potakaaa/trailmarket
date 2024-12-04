import React from 'react';

const SellerPage = () => {
    return (
        <div
            className="app-wrapper flex flex-col items-center justify-center min-h-screen overflow-scroll border-dashed"
        >
            <div
                className="seller-page flex flex-col flex-1 h-full w-full rounded-xl overflow-hidden"
            >
                <div
                    className="top-seller-page border flex flex-1 border-dashed flex-col rounded-xl"
                >
                    <div className='flex flex-1 bg-zinc-900 rounded-tr-xl rounded-tl-xl'> 
                        <p>test</p>
                    </div>
                    <div  className='flex flex-1 bg-gradient-to-t from-[#26245f] to-[#18181b] rounded-bl-xl rounded-br-xl'> 
                        
                        <p>Another section</p>
                    </div>
                </div>
                <div
                    className="flex flex-1 border-dashed border-2 border-black flex-col rounded-xl"
                >
                    <div className='[products container flex flex-1 border-dashed border-black h-full p-3'>
                        <div className='bg-black'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerPage;
