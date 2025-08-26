import Header from '../components/Header'
import Footer from '../components/Footer'
import { db } from '../services/firebase-config'
import { collection, addDoc } from 'firebase/firestore'
import { useState } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AdminBody = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [variants, setVariants] = useState('');
    const [images, setImages] = useState([]);

    const productCollection = collection(db,'products')
    const storage = getStorage();

    const addNewProcuts = async () => {
    try {

    const uploadedImageUrls = await Promise.all(
        images.map(async (image) => {
        const storageRef = ref(storage, `products/${Date.now()}-${image.name}`);
        await uploadBytes(storageRef, image);
        return await getDownloadURL(storageRef);
        })
    );

      await addDoc(productCollection, {
        name : name,
        brand : brand,
        category : category,
        description : description,
        price : price,
        variants : variants,
        images : uploadedImageUrls
      })
      setFieldEmpty()
    } catch (err) {
      console.error(err);
    }
  }

  function setFieldEmpty () {
    setName('')
    setBrand('')
    setCategory('')
    setPrice(0)
    setDescription('')
    setVariants('')
  }

  return (
    <div className='w-full bg-[#1e1e1e] font-[poppins]'>
        <section className='w-full fixed bg-[#1f1f1f] shadow-md z-50'>
            <Header />
        </section>
        <section className='w-[70%] mx-auto text-[#bababa] py-14'>
            <div className='pt-22'>
                <h1 className='text-2xl font-bold py-10'>Add New Product</h1>
                <div className='grid grid-flow-col grid-rows-4 gap-4 border py-14 px-16 rounded-lg text-[#bababa]'>
                    <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="text" placeholder='Name...' value={name} onChange={(e) => setName(e.target.value)} />
                    <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="number" placeholder='Price...' value={price} onChange={(e) => setPrice(e.target.value)} />
                    <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="text" placeholder='Brand...' value={brand} onChange={(e) => setBrand(e.target.value)} />
                    <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="text" placeholder='Category...' value={category} onChange={(e) => setCategory(e.target.value)} />
                    <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="text" placeholder='Description...' value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="text" placeholder='Variants...' value={variants} onChange={(e) => setVariants(e.target.value)} />
                    <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="file" multiple placeholder='Image...' onChange={(e) => setImages([...e.target.files])} />
                    <button className='bg-gradient-to-br from-[#bfa14a] via-[#7f7124] to-[#bfa14a] hover:from-[#b79532] hover:via-[#766715] hover:to-[#b38e21] text-[16px] font-medium px-6 py-3 rounded-lg [-webkit-background-clip: text] [-webkit-text-fill-color: transparent]'
                    onClick={() => addNewProcuts()} >Submit</button>
                </div>
            </div>
        </section>
        <hr className='text-[#6a6a6a]' />
        <section className='w-[70%] min-h-[40vh] mx-auto'>
            <div className='flex flex-col py-10 justify-center text-[#bababa]'>
                <h1 className='text-2xl font-bold pb-10'>Products</h1>
            <div className='border p-10 rounded-lg'>
                <table className="table-fixed">
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
                        <tr>
                        <td className='p-2'>Rolex stylish premium watch</td>
                        <td className='p-2'>999 /-</td>
                        <td className='p-2'>Tissot</td>
                        <td className='p-2'>Watch</td>
                        <td className='p-2'>A watch from rolex(replica), perfect one for daily use.</td>
                        <td className='p-2'>1,2,3,4 s,m,l,xl, yellow, blue</td>
                        <td className='p-2'>/img</td>
                        <td className='p-2 flex'>
                            <button className='bg-[#276367] m-1 py-1 px-2 font-medium rounded-md'>Update</button>
                            <button className='bg-[#673727] m-1 py-1 font-medium px-2 rounded-md'>delete</button>
                        </td>
                        </tr>
                        <tr>
                        <td className='p-2'>Rolex stylish premium watch</td>
                        <td className='p-2'>999 /-</td>
                        <td className='p-2'>Tissot</td>
                        <td className='p-2'>Watch</td>
                        <td className='p-2'>A watch from rolex(replica), perfect one for daily use.</td>
                        <td className='p-2'>1,2,3,4 s,m,l,xl, yellow, blue</td>
                        <td className='p-2'>/img</td>
                        <td className='p-2 flex'>
                            <button className='bg-[#276367] m-1 py-1 px-2 font-medium rounded-md'>Update</button>
                            <button className='bg-[#673727] m-1 py-1 font-medium px-2 rounded-md'>delete</button>
                        </td>
                        </tr>
                    </tbody>
                    </table>
            </div>
        </div>
        </section>
        <section className='relative bottom-0'>
            <Footer />
        </section>
    </div>
  )
}

export default AdminBody