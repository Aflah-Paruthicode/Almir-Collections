import React, { useState } from 'react'

const ProductDetails = ({productData}) => {
    let [productImage,setProductImage] = useState(productData.images[0])
  return (
    <div className="flex gap-3 w-[1050px]">
                <div className="w-[50rem]">
                    <div className="sticky top-28">
                    <img className="h-[500px] w-[500px] object-cover" src={productImage} alt="" />
                    <button className="bg-gradient-to-br from-[#bfa14a] via-[#7f7124] to-[#bfa14a] hover:from-[#b79532] hover:via-[#766715] hover:to-[#b38e21] text-[16px] text-[#bababa]
                    px-4 py-3 mt-3 flex justify-center gap-2  w-full [-webkit-background-clip: text] [-webkit-text-fill-color: transparent]">
                        <img className='w-6' src="/whatsapp.png" alt="" />Connect Seller</button>
                    </div>
                </div>
                <div className="w-28">
                    <div className="sticky top-28 flex flex-col gap-1">
                    { productData.images.map((img,index) => (
                            <img key={index} onClick={() => setProductImage(img)} className="w-16 h-16 overflow-hidden object-cover border p-1 border-[#bababa]" src={img} alt="" />
                        )) }
                    </div>
                
                </div>
                <div className="text-[#bababa] px-10 pt-20 pb-5 bg-[#141414] max-w-[500px]">
                    <h1 className="text-3xl mb-3">{productData.name}</h1>
                    <div className="flex gap-3">
                    <h1 className="text-2xl font-semibold mb-3">₹ {productData.price}</h1>
                    <h1 className="text-xl mb-3 text-[#979797]"><del>₹ {productData.priceInOthers}</del></h1>
                    </div>
                    <h2 className=" mb-3">Delivery FREE</h2>
                    <h2 className="font-semibold py-2">Variants : </h2>
                    <div className="flex gap-3 flex-wrap items-center mb-8 pl-3">
                        { productData.variants.split(',').map((variant) => (
                                <p className="py-1 px-2 border rounded-md">{variant}</p>
                            )) }
                    </div>
                    <div className="mb-3">
                        <h2 className="font-semibold py-2">Highlights : </h2>
                        <ul className="list-disc pl-8">
                            { productData.highlights.map((variant) => (    
                                   <li><p className="py-1 ">{variant}</p></li>
                                )) }
                        </ul>
                    </div>
                    <div className="mb-3">
                        <h2 className="font-semibold py-2">Description : </h2>
                        <p className='pl-8' style={{ whiteSpace: "pre-line" }}>{productData.description}</p>
                    </div>
                    <div className="mb-3">
                        <h2 className="font-semibold py-2">Brand : </h2>
                        <p className='pl-8'>{productData.brand}</p>
                    </div>
                    <div className="mb-3">
                        <h2 className="font-semibold py-2">Category : </h2>
                        <p className='pl-8'>{productData.category}</p>
                    </div>
                </div>
            </div>
  )
}

export default ProductDetails