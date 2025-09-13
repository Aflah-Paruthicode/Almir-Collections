import { useState } from "react";
import useHandleUpdate from "../services/useHandleUpdate";
import AddNewProductForm from "./AddNewProductForm";
import useGetSingleProduct from "../services/useGetSingleProduct";
import { confirmAlert } from "../services/alerts";
import { collection, doc } from "firebase/firestore";
import { db } from "../services/firebase-config";
import useUrlsToFiles from "../services/useUrlsToFiles";
import useHandleDelete from "../services/useHandleDelete";

const ProductsTable = (props) => {
  let {
    products,
    setProducts,
    name,
    setName,
    productInfo,
    brand,
    setBrand,
    price,
    setPrice,
    priceInOthers,
    setPriceInOthers,
    category,
    setCategory,
    inputToEmpty,
    timerAlert,
    images,
    setImages,
    description,
    setDescription,
    highlights,
    setHighlights,
    variants,
    setVariants,
    isTrending,
    setIsTrending,
    setFieldEmpty,
  } = props;

  const [editPanel, setEditPanel] = useState(false);
  const [product, setProduct] = useState();
  const productCollection = collection(db, "products");

  async function fetchProduct(id) {
    let data = await useGetSingleProduct(id);
    setProduct(data);
    if (data) {
      const imgFiles = await useUrlsToFiles(data.images);
      setName(data.name);
      setBrand(data.brand);
      setPrice(data.price);
      setPriceInOthers(data.priceInOthers);
      setCategory(data.category);
      setDescription(data.description);
      setVariants(data.variants);
      setIsTrending(data.isTrending);
      setImages(imgFiles);
      setHighlights(data.highlights.join());
      timerAlert(900, "Please Wait!", "just wait a momment <b></b>.");
      setEditPanel(true);
    }
  }

  function clearProduct() {
    setEditPanel(false);
  }

  async function handleUpdate() {
    let isOkay = confirmAlert();
    if (isOkay) {
      const docRef = doc(db, "products", String(product.id));
      await useHandleUpdate(productInfo, docRef, setFieldEmpty, timerAlert);
      clearProduct();
    }
  }

  return (
    <div className="flex flex-col left-0 justify-center pt-10 pb-20 text-[#bababa]">
      {editPanel && product && (
        <section className="fixed top-20 left-52 w-[80%] h-[100vh]  z-[999] max-sm:left-10 max-sm:top-10 max-sm:py-16 max-sm:overflow-y-scroll">
          <AddNewProductForm
            name={name}
            setName={setName}
            isTrending={isTrending}
            setIsTrending={setIsTrending}
            brand={brand}
            setBrand={setBrand}
            price={price}
            setPrice={setPrice}
            priceInOthers={priceInOthers}
            setPriceInOthers={setPriceInOthers}
            category={category}
            setCategory={setCategory}
            inputToEmpty={inputToEmpty}
            images={images}
            setImages={setImages}
            description={description}
            setDescription={setDescription}
            variants={variants}
            setVariants={setVariants}
            highlights={highlights}
            setHighlights={setHighlights}
            setFieldEmpty={setFieldEmpty}
            action={() => handleUpdate()}
            Update={clearProduct}
          />
        </section>
      )}
      <section>
        <div className="w-[70%] mx-auto max-sm:w-full max-sm:px-5">
          <h1 className="text-2xl font-bold pt-20 pb-10 max-sm:text-xl max-sm:font-medium max-sm:py-5">Products ({products.length})</h1>
          <div className="p-10 rounded-lg bg-[#1a1a1a]  overflow-y-scroll max-h-[40rem] max-sm:p-1">
            {products.length > 0 && (
              <table className="table-fixed">
                <thead>
                  <tr className="bg-[#151515]">
                    <th className="">Name</th>
                    <th className="">Price</th>
                    <th className="max-sm:hidden">Brand</th>
                    <th className="max-sm:hidden">Category</th>
                    <th className="max-sm:hidden">description</th>
                    <th className="max-sm:hidden">variants</th>
                    <th>{window.innerWidth < 640 ? 'trend' : 'isTrending'}</th>
                    <th>Img</th>
                    <th>Control</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => {
                    let trimmedDes = false;
                    let trimmedName = false;
                    if (product.description.length > 40)
                      trimmedDes = product.description.slice(0, 40);
                    
                      if (window.innerWidth < 640) {
                        trimmedName = product.name.slice(0, 7);
                      } else {
                        trimmedName = product.name.slice(0, 30);
                      }
                    
                    return (
                      <tr key={index}>
                        <td className="p-2 max-sm:text-sm">
                          {trimmedName ? trimmedName + "..." : product.name}
                        </td>
                        <td className="px-4 w-20 max-sm:w-auto max-sm:text-sm">{window.innerWidth < 640  ? product.price : `${product.price} ₹`}</td>
                        <td className="p-2 max-sm:hidden">{product.brand}</td>
                        <td className="p-2 max-sm:hidden">{product.category}</td>
                        <td className="p-2 max-sm:hidden">
                          {trimmedDes
                            ? trimmedDes + "..."
                            : product.description}
                        </td>
                        <td className="p-2 max-sm:hidden">{product.variants}</td>
                        <td className="p-2">
                          {product.isTrending ? (
                            <p className="py-1 px-2 text-[12px] bg-gradient-to-br transition-colors from-[#4abfb7] via-[#1c6c6f] to-[#4ab7bf] hover:from-[#32b3b7] hover:via-[#10595e] hover:to-[#21b3b3]
                             inline rounded-2xl max-sm:px-1 max-sm:text-[10px]">
                              YES
                            </p>
                          ) : (
                            <p className="py-1 px-2 text-[12px] bg-gradient-to-br transition-colors from-[#bf4a4a] via-[#7f2424] to-[#bf4a4a] hover:from-[#b73232] hover:via-[#761515] hover:to-[#b32121]
                             inline rounded-2xl max-sm:px-1 max-sm:text-[10px]">
                              NOP
                            </p>
                          )}
                        </td>
                        <td className="py-2">
                          <div className="p-2">
                            <img
                              className="w-[150px] h-[100px] object-cover rounded-lg max-sm:w-[50px] max-sm:h-[50px]"
                              src={product.images[0]}
                              alt=""
                            />
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex max-sm:flex-col">
                            <button
                              onClick={() => fetchProduct(product.id)}
                              className="bg-gradient-to-br transition-colors from-[#4abfb7] via-[#1c6c6f] to-[#4ab7bf] hover:from-[#32b3b7] hover:via-[#10595e] hover:to-[#21b3b3]
                               m-1 py-1 px-2 font-medium cursor-pointer rounded-md max-sm:px-1 max-sm:text-sm"
                            >
                              update
                            </button>
                            <button
                              className="bg-gradient-to-br transition-colors from-[#bf4a4a] via-[#7f2424] to-[#bf4a4a] hover:from-[#b73232] hover:via-[#761515] hover:to-[#b32121]
                               m-1 py-1 font-medium px-2 rounded-md max-sm:px-1 max-sm:text-sm"
                              onClick={() => {
                                let isOkay = confirmAlert();
                                if (isOkay) {
                                  useHandleDelete(
                                    product.id,
                                    productCollection,
                                    setProducts
                                  );
                                }
                              }}
                            >
                              delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {products.length == 0 && <h1>Products is empty</h1>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsTable;
