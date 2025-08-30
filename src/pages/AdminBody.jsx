import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect,useRef,useState } from 'react'
import { db } from '../services/firebase-config';
import { collection } from 'firebase/firestore';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from '../components/SortableContext';
import ProductsTable from '../components/ProductsTable';
import AddNewProductForm from '../components/AddNewProductForm';
import useHandleDragEnd from '../services/useHandleDragEnd';
import useGetProducts from '../services/useGetProducts';
import useAddNewProduct from '../services/useAddNewProduct';

const AdminBody = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [priceInOthers,setPriceInOthers] = useState('')
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [highlights, setHighlights] = useState('');
    const [variants, setVariants] = useState('');
    const [images, setImages] = useState([]);
    const inputToEmpty = useRef(null);
    const [loadProducts, setLoadProducts] = useState(false)

    const [products, setProducts] = useState([])

    const productCollection = collection(db,'products');
    const productInfo = {
        name,price,brand,
        priceInOthers,category,
        description,highlights,
        variants,images
    }

    useEffect(() => {
        useGetProducts(productCollection,setProducts)
    },[loadProducts])

    function setFieldEmpty () {
        setName('')
        setBrand('')
        setCategory('')
        setPrice('')
        setPriceInOthers('')
        setDescription('')
        setVariants('')
        setImages([])
        setHighlights('')
        inputToEmpty.current.value = '';
        setLoadProducts(!loadProducts)
    }

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event) => { useHandleDragEnd(event,images,setImages) };

  return (
    <div className='w-full bg-[#1e1e1e] font-[poppins]'>
        <section className='w-full fixed bg-[#1f1f1f] shadow-md z-50'>
            <Header />
        </section>
        <section className='w-[70%] mx-auto text-[#bababa] py-14'>
            <div className='pt-22'>
                <h1 className='text-2xl font-bold py-10'>Add New Product</h1>
                <AddNewProductForm name={name} setName={setName} brand={brand} setBrand={setBrand}
                  price={price} setPrice={setPrice} priceInOthers={priceInOthers} setPriceInOthers={setPriceInOthers}
                  category={category} setCategory={setCategory} inputToEmpty={inputToEmpty} setImages={setImages}
                  description={description} setDescription={setDescription} variants={variants} setVariants={setVariants}
                  highlights={highlights} setHighlights={setHighlights}
                  addNewProduct={() => useAddNewProduct(productInfo,productCollection,setFieldEmpty)}  />
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
            <ProductsTable products={products} />
        </section>
        <section className='relative bottom-0'>
            <Footer />
        </section>
    </div>
  )
}

export default AdminBody