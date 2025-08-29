import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect,useRef,useState } from 'react'
import { db } from '../services/firebase-config';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import axios from 'axios';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from '../components/SortableContext';

const AdminBody = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [priceInOthers,setPriceInOthers] = useState()
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [highlights, setHighlights] = useState('');
    const [variants, setVariants] = useState('');
    const [images, setImages] = useState([]);
    const inputToEmpty = useRef(null);

    const [products, setProducts] = useState([])

    const productCollection = collection(db,'products');

    const getProducts = async () => {
        try {
          const data = await getDocs(productCollection);
          const filteredProducts = data.docs.map((doc) => ({id:doc.id,...doc.data()}))
          console.log('products : ',filteredProducts);
          setProducts(filteredProducts);
        } catch (err) {
          console.error(err);
        }
      }

    const addNewProcuts = async () => {
        try {
            console.log('new product adding request is done')
            const data = new FormData();
            const uploadPromises = images.map(async (image) => {
                data.append("file", image);
                data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
                data.append("folder", "products");

                const res = await axios.post("https://api.cloudinary.com/v1_1/"+import.meta.env.VITE_CLOUDINARY_NAME+"/image/upload",data);
                return res.data.secure_url;
            })

            const urls = await Promise.all(uploadPromises);
            const highlightsArr = highlights.split(',')
            await addDoc(productCollection, {
                name : name,
                brand : brand,
                category : category,
                description : description,
                highlights : highlightsArr,
                price : price,
                priceInOthers : priceInOthers,
                variants : variants,
                images : urls
            })

            setFieldEmpty()

        } catch (err) {
            console.error(err);
        }
    }   

    useEffect(() => {
        getProducts()
    },[])

    function setFieldEmpty () {
        setName('')
        setBrand('')
        setCategory('')
        setPrice()
        setPriceInOthers()
        setDescription('')
        setVariants('')
        setImages([])
        setHighlights('')
        inputToEmpty.current.value = '';
    }

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
        const oldIndex = images.findIndex((url) => url.lastModified+url.size === active.id);
        const newIndex = images.findIndex((url) => url.lastModified+url.size === over.id);
        setImages(arrayMove(images, oldIndex, newIndex));
        console.log('changed order of images : ',images)
        }
    };

  return (
    <div className='w-full bg-[#1e1e1e] font-[poppins]'>
        <section className='w-full fixed bg-[#1f1f1f] shadow-md z-50'>
            <Header />
        </section>
        <section className='w-[70%] mx-auto text-[#bababa] py-14'>
            <div className='pt-22'>
                <h1 className='text-2xl font-bold py-10'>Add New Product</h1>
                <div className='grid grid-flow-row grid-cols-2 gap-4 py-14 px-16 rounded-lg text-[#bababa] bg-[#1a1a1a]'>
                    
                    <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="text" placeholder='Name...' value={name} onChange={(e) => setName(e.target.value)} />
                    <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="text" placeholder='Brand...' value={brand} onChange={(e) => setBrand(e.target.value)} />
                    <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="number" placeholder='Price...' value={price} onChange={(e) => setPrice(e.target.value)} />
                    <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="number" placeholder='Price In Other Stores...' value={priceInOthers} onChange={(e) => setPriceInOthers(e.target.value)} />
                    <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="text" placeholder='Category...' value={category} onChange={(e) => setCategory(e.target.value)} />
                    <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="file" multiple placeholder='Image...' ref={inputToEmpty} onChange={(e) => setImages([...e.target.files])} />
                    <textarea id="multiline_text" name="message" rows="5" placeholder='Variants...' className='p-3 bg-[#343434] rounded-lg' value={variants} onChange={(e) => setVariants(e.target.value)} cols="40" ></textarea>
                    <textarea id="multiline_text" name="message" rows="5" placeholder='Description...' className='p-3 bg-[#343434] rounded-lg' value={description} onChange={(e) => setDescription(e.target.value)} cols="40" ></textarea>
                    <textarea id="multiline_text" name="message" rows="3" placeholder='Highlights(alert !! use comas to split)...' className='p-3 bg-[#343434] rounded-lg' value={highlights} onChange={(e) => setHighlights(e.target.value)} cols="40" ></textarea>
                    <button className='m-auto bg-gradient-to-br from-[#bfa14a] via-[#7f7124] to-[#bfa14a] hover:from-[#b79532] hover:via-[#766715] hover:to-[#b38e21] text-[16px] font-medium px-6 py-3 rounded-lg [-webkit-background-clip: text] [-webkit-text-fill-color: transparent]'
                    onClick={() => addNewProcuts()} >Submit</button> 
                </div>
                    {images.length > 0 && 

                        <div className='preview-container'>
                            <h1 className='text-2xl font-bold pt-10 pb-4'>Preview <span className='font-medium text-xl'>({images.length})</span></h1>
                           <div className="flex items-center ">
                                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} >
                                    <SortableContext items={images} strategy={verticalListSortingStrategy}>
                                    <div className="flex flex-wrap gap-2">
                                        {images.map((url) => (
                                        <SortableItem key={url.lastModified+url.size} id={url.lastModified+url.size} url={URL.createObjectURL(url)} />
                                        ))}
                                    </div>
                                    </SortableContext>
                                </DndContext>
                            </div>
                        </div>
                    }
            </div>
        </section>
        <hr className='text-[#6a6a6a]' />
        <section className='w-[70%] min-h-[40vh] mx-auto'>
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
                            products.map((product,index) => (
                                <tr key={index}>
                        <td className='p-2'>{product.name}</td>
                        <td className='p-2'>{product.price} ₹</td>
                        <td className='p-2'>{product.brand}</td>
                        <td className='p-2'>{product.category}</td>
                        <td className='p-2'>{product.description}</td>
                        <td className='p-2'>{product.variants}</td>
                        <td className='py-2'>
                            <div>
                            <img className='w-[250px] py-2 object-cover rounded-xl' src={product.images[0]} alt="" />
                            </div>
                        </td>
                        <td className='p-2'>
                            <div className='flex'>
                            <button className='bg-[#276367] m-1 py-1 px-2 font-medium rounded-md'>Update</button>
                            <button className='bg-[#673727] m-1 py-1 font-medium px-2 rounded-md'>delete</button>
                            </div>
                        </td>
                        </tr>
                            ))
                        }
                    </tbody>
                    </table> }
                    { products.length == 0 &&  <h1>Products is empty</h1>}
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