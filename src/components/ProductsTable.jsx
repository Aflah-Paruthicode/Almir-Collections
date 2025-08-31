import { useEffect, useState } from "react"
import useHandleUpdate from "../services/useHandleUpdate"
import AddNewProductForm from "./AddNewProductForm"
import useGetSingleProduct from "../services/useGetSingleProduct"

const ProductsTable = ({products,setName,setBrand,setPrice,setPriceInOthers,setCategory,inputToEmpty,setImages,setDescription,setHighlights, setVariants,action}) => {
    const [productId, setProductId] = useState()
    const [editPanel,setEditPanel] = useState(false);
    const [product,setProduct] = useState()

    useEffect(() => {
        async function fetchProduct () {
            let data = await useGetSingleProduct(productId,setProduct)
        }
        fetchProduct()
    },[productId])

    function clearProduct () {
        setProduct(undefined)
    }

    console.log('iis the product here ???', product)

    return (
    <div className='flex flex-col left-0 justify-center text-[#bababa]'>
            {  product && <section className='fixed top-50 left-52 w-[80%] h-[100vh]  z-[999] '>
                <AddNewProductForm name={product.name} setName={setName} brand={product.brand} setBrand={setBrand}
                    price={product.price} setPrice={setPrice} priceInOthers={product.priceInOthers} setPriceInOthers={setPriceInOthers}
                    category={product.category} setCategory={setCategory} inputToEmpty={inputToEmpty} setImages={setImages}
                    description={product.description} setDescription={setDescription} variants={product.variants} setVariants={setVariants}
                    highlights={product.highlights} setHighlights={setHighlights}
                    action={() => action} Update={clearProduct} />
            </section> }
            {/* productInfo,productCollection,setFieldEmpty,timerAlert */}
            <div className="w-[70%] mx-auto">
                <h1 className='text-2xl font-bold pt-20 pb-10'>Products</h1>
            <div className='p-10 rounded-lg bg-[#1a1a1a]'>
                { products.length > 0 && <table className="table-fixed">
                    <thead>
                        <tr className="bg-[#151515]">
                        <th>Name</th>
                        <th>Price</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>description</th>
                        <th>variants</th>
                        <th>Img</th>
                        <th>Control</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product,index) => {
                                let trimmedDes = false 
                                let trimmedName = false
                                if(product.description.length > 40) trimmedDes = product.description.slice(0,40)
                                if(product.name.length > 30) trimmedName = product.name.slice(0,30)
                                return (
                                <tr key={index}>
                        <td className='p-2'>{trimmedName ? trimmedName+'...' : product.name}</td>
                        <td className='p-2 w-20'>{product.price} ₹</td>
                        <td className='p-2'>{product.brand}</td>
                        <td className='p-2'>{product.category}</td>
                        <td className='p-2'>{trimmedDes ? trimmedDes+'...' : product.description}</td>
                        <td className='p-2'>{product.variants}</td>
                        <td className='py-2'>
                            <div className="p-2">
                            <img className='w-[150px] h-[100px] object-cover rounded-lg' src={product.images[0]} alt="" />
                            </div>
                        </td>
                        <td className='p-2'>
                            <div className='flex'>
                            <button onClick={() =>  {
                                setProductId(product.id)
                                
                                }} className='bg-[#276367] m-1 py-1 px-2 font-medium cursor-pointer rounded-md'>Update</button>
                            <button className='bg-[#673727] m-1 py-1 font-medium px-2 rounded-md'>delete</button>
                            </div>
                        </td>
                        </tr>
                            )})
                        }
                    </tbody>
                    </table> }
                    { products.length == 0 &&  <h1>Products is empty</h1>}
            </div>
            </div>
        </div>
  ) 
}

export default ProductsTable