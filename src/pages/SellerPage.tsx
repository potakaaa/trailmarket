import React from 'react';

const kanye = "https://media.gq.com/photos/5ad93798ceb93861adb912d8/16:9/w_2672,h_1503,c_limit/kanye-west-0814-GQ-FEKW01.01.jpg";



const SellerPage = () => {
    return (
        <div className="app-wrapper flex flex-col items-center justify-center min-h-screen overflow-y-auto border-dashed border">
            <div className="seller-page flex flex-col flex-1 h-full w-full rounded-xl overflow-hidden">
                <div className="top-seller-page border flex flex-[5] border-dashed flex-col rounded-xl">
                    <div className='flex flex-1 bg-zinc-900 rounded-tr-xl rounded-tl-xl p-6 flex-col'>
                        <div className='nameandpic flex flex-row'>
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-black">
                                <img className='object-cover h-full w-full' src={kanye}></img>
                            </div>
                            <div className='flex flex-col ml-4'>
                                <p className='text-white font-normal text-sm'>Seller Dashboard</p>
                                <h1 className='text-white text-2xl'>KanyeWest</h1>
                            </div>
                        </div>

                        <div className='details mt-6 flex flex-col'>
                            <form className="flex flex-col space-y-4">
                                <div className="flex flex-row items-center">
                                    <label className="text-white font-normal w-32">Name</label>
                                    <input id="name" className="flex-1 rounded-xl bg-zinc-900 border border-white text-white p-1" type="text" />
                                </div>
                                <div className="flex flex-row items-center">
                                    <label className="text-white font-normal w-32">Contact No</label>
                                    <input id="contact" className="flex-1 rounded-xl bg-zinc-900 border border-white text-white p-1" type="text" />
                                </div>
                                <div className="flex flex-row items-center">
                                    <label className="text-white font-normal w-32">Email Address</label>
                                    <input id="email" className="flex-1 rounded-xl bg-zinc-900 border border-white text-white p-1" type="email" />
                                </div>


                            </form>

                            <div className="Payment-options flex flex-row items-center align-start border border-dashed border-green-500 flex-1 w-full">
                                <div className='w-32 flex align-top border border-dashed border-orange-600 h-full'>
                                    <label className="text-white font-normal">Payment Options</label>
                                </div>
                                <div className='flex flex-col space-y-4 w-fu'>
                                    <div className='flex flex-row '>
                                        <div className='flex-[1] flex rounded-xl bg-zinc-900 border border-white text-white  '></div>
                                        <input id="PaymentOption1" className="flex-[1] rounded-xl bg-zinc-900 border border-white text-white  " />
                                    </div>
                                    <input id="PaymentOption2" className="flex-1 rounded-xl bg-zinc-900 border border-white text-white p-1 flex " />
                                    <input id="PaymentOption3" className="flex-1 rounded-xl bg-zinc-900 border border-white text-white p-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-1 bg-gradient-to-t from-[#26245f] to-[#18181b] rounded-bl-xl rounded-br-xl flex-col pt-24 p-7 space-y-6'>
                        
                        <h2 className='text-white font-normal text-xs'>Quick stats</h2>
                        <div>
                            <h1 className='text-white text-3xl'>PHP 100000</h1>
                            <h2 className='text-white font-normal text-xs'>Total Sales</h2>
                        </div>

                        <div className='flex flex-row space-x-9'>
                            <div className='flex flex-col'>
                                <h1 className='text-white text-3xl'>245</h1>
                                <h2 className='text-white font-normal text-xs'>Total Orders</h2>
                            </div>

                            <div className='flex flex-col'>
                                <h1 className='text-white text-3xl'>245</h1>
                                <h2 className='text-white font-normal text-xs'>On Delivery</h2>
                            </div>

                            <div className='flex flex-col'>
                                <h1 className='text-white text-3xl'>245</h1>
                                <h2 className='text-white font-normal text-xs'>Products</h2>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="bot-seller-page flex flex-[2] border-dashed border-2 border-green-700 flex-col rounded-xl">
                    <div className='products container flex flex-1 p-3 flex-col space-y-3'>
                        <div className='flex flex-[5] rounded-xl overflow-hidden aspect-square'>
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
    );
};

export default SellerPage;
