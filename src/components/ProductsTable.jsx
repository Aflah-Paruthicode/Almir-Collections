import { useEffect, useState } from "react"
import useHandleUpdate from "../services/useHandleUpdate"
import AddNewProductForm from "./AddNewProductForm"
import useGetSingleProduct from "../services/useGetSingleProduct"
import { deleteAlert, timerAlert } from "../services/alerts"
import useDeleteProduct from "../services/useDeleteDoc"
import useGetProducts from "../services/useGetProducts"
import { collection } from "firebase/firestore"
import { db } from "../services/firebase-config"


const ProductsTable = (props) => {
    let { products,setProducts,name,setName,
          brand,setBrand,price,setPrice,
          priceInOthers,setPriceInOthers,
          category,setCategory,inputToEmpty,
          setImages,description,setDescription,
          highlights,setHighlights,variants,setVariants,action } = props;

    const [editPanel,setEditPanel] = useState(false);
    const [product,setProduct] = useState()
    const productCollection = collection(db,'products');

    async function fetchProduct (id) {
        let data = await useGetSingleProduct(id)
        setProduct(data)
        if(data) {
            setName(data.name)
            setBrand(data.brand)
            setPrice(data.price)
            setPriceInOthers(data.priceInOthers)
            setCategory(data.category)
            setDescription(data.description)
            setVariants(data.variants)
            setHighlights(data.highlights)
            timerAlert(900,'Please Wait!','just wait a momment <b></b>.') 
            setEditPanel(true)
        }
    }

    function clearProduct () {
        setEditPanel(false)
    }

    console.log('iis the product here ???', product)

    const handleDelete = async (id) => {
        const confirmed = await deleteAlert();
        if (confirmed) {
            useDeleteProduct(id)
            useGetProducts(productCollection,setProducts)
        } else {
            console.log("User cancelled delete!");
        }
    };

    return (
    <div className='flex flex-col left-0 justify-center text-[#bababa]'>
            {  editPanel && product && <section className='fixed top-50 left-52 w-[80%] h-[100vh]  z-[999] '>
                <AddNewProductForm name={name} setName={setName} brand={brand} setBrand={setBrand}
                    price={price} setPrice={setPrice} priceInOthers={priceInOthers} setPriceInOthers={setPriceInOthers}
                    category={category} setCategory={setCategory} inputToEmpty={inputToEmpty} setImages={setImages}
                    description={description} setDescription={setDescription} variants={variants} setVariants={setVariants}
                    highlights={highlights} setHighlights={setHighlights}
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
                            <button onClick={() => fetchProduct(product.id) } className='bg-[#276367] m-1 py-1 px-2 font-medium cursor-pointer rounded-md'>Update</button>
                            <button className='bg-[#673727] m-1 py-1 font-medium px-2 rounded-md'
                             onClick={() => {
                                let isOkay = deleteAlert()
                                console.log('the alert : ',isOkay) 
                                if(isOkay) {
                                    handleDelete(product.id)
                                }
                             }} >delete</button>
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