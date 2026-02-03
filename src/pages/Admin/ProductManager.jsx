import React, { useState, useRef } from "react";
import { db } from "../../services/firebase-config";
import { collection } from "firebase/firestore";
import ProductsTable from "../../components/ProductsTable";
import AddNewProductForm from "../../components/AddNewProductForm";
import useAddNewProduct from "../../services/useAddNewProduct";
import { timerAlert } from "../../services/alerts";
import ImagePreviews from "../../components/ImagePreviews";

const ProductManager = ({ section, products, setProducts }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [priceInOthers, setPriceInOthers] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [highlights, setHighlights] = useState("");
  const [variants, setVariants] = useState("");
  const [images, setImages] = useState([]);
  const [isTrending, setIsTrending] = useState(false);
  const [loadProducts, setLoadProducts] = useState(false);
  const inputToEmpty = useRef(null);

  const productCollection = collection(db, "products");

  const productInfo = {
    name,
    price,
    brand,
    priceInOthers,
    category,
    description,
    highlights,
    variants,
    images,
    isTrending,
  };

  const setFieldEmpty = () => {
    setName("");
    setBrand("");
    setCategory("");
    setPrice("");
    setPriceInOthers("");
    setDescription("");
    setVariants("");
    setImages([]);
    setHighlights("");
    if (inputToEmpty.current) inputToEmpty.current.value = "";
    setLoadProducts((prev) => !prev);
  };

  return (
    <div className="w-full">
      {section === "addNewProduct" && (
        <section className="w-[70%] mx-auto text-[#bababa] py-14 max-sm:w-full max-sm:px-5 max-sm:py-0">
          <div className="max-sm:pt-10">
            <h1 className="text-2xl font-bold py-10 max-sm:text-xl">Add New Product</h1>
            <AddNewProductForm
              name={name}
              setName={setName}
              brand={brand}
              setBrand={setBrand}
              price={price}
              setPrice={setPrice}
              priceInOthers={priceInOthers}
              setPriceInOthers={setPriceInOthers}
              category={category}
              setCategory={setCategory}
              inputToEmpty={inputToEmpty}
              setImages={setImages}
              description={description}
              setDescription={setDescription}
              variants={variants}
              setVariants={setVariants}
              highlights={highlights}
              setHighlights={setHighlights}
              isTrending={isTrending}
              setIsTrending={setIsTrending}
              action={() => useAddNewProduct(productInfo, productCollection, setFieldEmpty, timerAlert)}
            />
            {images.length > 0 && <ImagePreviews images={images} setImages={setImages} />}
          </div>
        </section>
      )}

      {section === "products" && (
        <section className="min-h-[40vh] mx-auto">
          <ProductsTable
            products={products}
            productInfo={productInfo}
            setProducts={setProducts}
            name={name}
            setName={setName}
            brand={brand}
            setBrand={setBrand}
            price={price}
            setPrice={setPrice}
            description={description}
            setDescription={setDescription}
            isTrending={isTrending}
            setIsTrending={setIsTrending}
            priceInOthers={priceInOthers}
            setPriceInOthers={setPriceInOthers}
            category={category}
            setCategory={setCategory}
            inputToEmpty={inputToEmpty}
            images={images}
            setImages={setImages}
            variants={variants}
            setVariants={setVariants}
            highlights={highlights}
            setHighlights={setHighlights}
            setFieldEmpty={setFieldEmpty}
            timerAlert={timerAlert}
          />
        </section>
      )}
    </div>
  );
};

export default ProductManager;
