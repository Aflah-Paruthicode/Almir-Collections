
const ProductsTable = ({products}) => {
  return (
    <div className='flex flex-col py-10 justify-center text-[#bababa]'>
                <h1 className='text-2xl font-bold pb-10'>Products</h1>
            <div className='border p-10 rounded-lg'>
                { products.length > 0 && <table className="table-fixed">
                    <thead>
                        <tr>
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
                            <div>
                            <img className='w-[150px] h-[100px] object-cover rounded-lg' src={product.images[0]} alt="" />
                            </div>
                        </td>
                        <td className='p-2'>
                            <div className='flex'>
                            <button className='bg-[#276367] m-1 py-1 px-2 font-medium rounded-md'>Update</button>
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
  )
}

export default ProductsTable