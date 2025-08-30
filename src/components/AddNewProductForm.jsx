
const AddNewProductForm = (props) => {
  
    const {
        name,setName,
        brand,setBrand,
        price,setPrice,
        priceInOthers,setPriceInOthers,
        category,setCategory,
        inputToEmpty,setImages,
        variants,setVariants,
        description,setDescription,
        highlights,setHighlights,addNewProduct } = props
  return (
    <div className='grid grid-flow-row grid-cols-2 gap-4 py-14 px-16 rounded-lg text-[#bababa] bg-[#1a1a1a]'>     
        <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="text" placeholder='Name...' value={name} onChange={(e) => setName(e.target.value)} />
        <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="text" placeholder='Brand...' value={brand} onChange={(e) => setBrand(e.target.value)} />
        <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="number" placeholder='Price...' value={price} onChange={(e) => setPrice(e.target.value)} />
        <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="number" placeholder='Price In Other Stores...' value={priceInOthers} onChange={(e) => setPriceInOthers(e.target.value)} />
        <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="text" placeholder='Category...' value={category} onChange={(e) => setCategory(e.target.value)} />
        <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="file" multiple placeholder='Image...' ref={inputToEmpty} onChange={(e) => setImages([...e.target.files])} />
        <textarea id="multiline_text" name="message" rows="5" placeholder='Variants(alert !! use comas to split)...' className='p-3 bg-[#343434] rounded-lg' value={variants} onChange={(e) => setVariants(e.target.value)} cols="40" ></textarea>
        <textarea id="multiline_text" name="message" rows="5" placeholder='Description...' className='p-3 bg-[#343434] rounded-lg' value={description} onChange={(e) => setDescription(e.target.value)} cols="40" ></textarea>
        <textarea id="multiline_text" name="message" rows="3" placeholder='Highlights(alert !! use comas to split)...' className='p-3 bg-[#343434] rounded-lg' value={highlights} onChange={(e) => setHighlights(e.target.value)} cols="40" ></textarea>
        <button className='m-auto bg-gradient-to-br from-[#bfa14a] via-[#7f7124] to-[#bfa14a] hover:from-[#b79532] hover:via-[#766715] hover:to-[#b38e21] text-[16px] font-medium px-6 py-3 rounded-lg [-webkit-background-clip: text] [-webkit-text-fill-color: transparent]'
        onClick={addNewProduct} >Submit</button> 
    </div>
  )
}

export default AddNewProductForm