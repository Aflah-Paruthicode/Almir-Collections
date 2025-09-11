import ImagePreviews from "./ImagePreviews";

const AddNewProductForm = (props) => {
  const {
    name,
    setName,
    brand,
    setBrand,
    price,
    setPrice,
    priceInOthers,
    setPriceInOthers,
    category,
    setCategory,
    inputToEmpty,
    images,
    setImages,
    variants,
    setVariants,
    isTrending,
    setIsTrending,
    description,
    setDescription,
    highlights,
    setHighlights,
    setFieldEmpty,
    action,
  } = props;

  const handleFileChange = (e) => {
  const newFiles = Array.from(e.target.files);

  setImages((prev) => {
    const existingKeys = new Set(prev.map(f => f.lastModified + "-" + f.size));

    const filtered = newFiles.filter(
      (file) => !existingKeys.has(file.lastModified + "-" + file.size)
    );

    return [...prev, ...filtered];
  });
};

  return (
    <div>
      <div className="grid grid-flow-row grid-cols-2 gap-4 py-14 px-16 rounded-lg text-[#bababa] bg-[#1a1a1a] max-sm:grid-cols-1 max-sm:gap-3 max-sm:p-5">
        <input
          className="w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg max-sm:h-10 max-sm:text-sm"
          type="text"
          placeholder="Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg max-sm:h-10 max-sm:text-sm"
          type="text"
          placeholder="Brand..."
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          className="w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg max-sm:h-10 max-sm:text-sm"
          type="number"
          placeholder="Price..."
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg max-sm:h-10 max-sm:text-sm"
          type="number"
          placeholder="Price In Other Stores..."
          value={priceInOthers}
          onChange={(e) => setPriceInOthers(e.target.value)}
        />
        <select
          className="w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg max-sm:h-10 max-sm:text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value={category ? category : "Choose ..."}>
            {category ? category : "Choose ..."}
          </option>
          <option value="Watches">Watches</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Gadgets">Gadgets</option>
          <option value="Clothing">Clothing</option>
          <option value="Sheos">Sheos</option>
          <option value="Books">Books</option>
        </select>
        <div className="relative">
          <input
            className="w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg max-sm:h-10 max-sm:text-sm"
            type="file"
            multiple
            placeholder="Image..."
            ref={inputToEmpty}
            onChange={handleFileChange}
          />
          <p className="text-red-400 text-[10px] absolute bottom-[0.5px] left-1">
            Don't choose same pics(careful with DND)
          </p>
        </div>
        <textarea
          id="multiline_text"
          name="message"
          rows="5"
          placeholder="Variants(alert !! use comas to split)..."
          className="p-3 bg-[#343434] rounded-lg max-sm:h-16 max-sm:text-sm"
          value={variants}
          onChange={(e) => setVariants(e.target.value)}
          cols="40"
        ></textarea>
        <textarea
          id="multiline_text"
          name="message"
          rows="5"
          placeholder="Description..."
          className="p-3 bg-[#343434] rounded-lg max-sm:h-16 max-sm:text-sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          cols="40"
        ></textarea>
        <textarea
          id="multiline_text"
          name="message"
          rows="3"
          placeholder="Highlights(alert !! use comas to split)..."
          className="p-3 bg-[#343434] rounded-lg max-sm:h-16 max-sm:text-sm"
          value={highlights}
          onChange={(e) => setHighlights(e.target.value)}
          cols="40"
        ></textarea>
        <label className="flex items-center cursor-pointer m-auto max-sm:my-3">
          <span className="mr-3 text-sm font-medium text-gray-400">
            Is Trending
          </span>
          <div className="relative">
            <input
              type="checkbox"
              checked={isTrending}
              onChange={() => setIsTrending(!isTrending)}
              className="peer hidden"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 relative transition-colors"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transform transition-transform peer-checked:translate-x-5 "></div>
          </div>
        </label>
        <div className="flex gap-4 justify-center">
          <button
            className="my-auto bg-gradient-to-br transition-colors from-[#bfa14a] via-[#7f7124] to-[#bfa14a] hover:from-[#b79532] hover:via-[#766715] hover:to-[#b38e21]
             text-[16px] font-medium px-6 py-3 rounded-lg [-webkit-background-clip: text] [-webkit-text-fill-color: transparent] max-sm:px-3 max-sm:py-1 max-sm:text-sm max-sm:my-2"
            onClick={action}
          >
            {props?.Update ? "Update" : "Submit"}
          </button>
          {props?.Update && (
            <button
              className="my-auto bg-gradient-to-br transition-colors from-[#bf4a4a] via-[#7f2424] to-[#bf4a4a] hover:from-[#b73232] hover:via-[#761515] hover:to-[#b32121] 
              text-[16px] font-medium px-6 py-3 rounded-lg [-webkit-background-clip: text] [-webkit-text-fill-color: transparent] max-sm:px-3 max-sm:py-1 max-sm:text-sm max-sm:my-2"
              onClick={() => {
                props?.Update();
                setFieldEmpty();
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      {images && <ImagePreviews images={images} setImages={setImages} />}
    </div>
  );
};

export default AddNewProductForm;
