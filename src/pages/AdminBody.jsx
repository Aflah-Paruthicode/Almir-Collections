import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useRef, useState } from "react";
import { db } from "../services/firebase-config";
import { collection, deleteDoc, doc } from "firebase/firestore";
import ProductsTable from "../components/ProductsTable";
import AddNewProductForm from "../components/AddNewProductForm";
import useGetProducts from "../services/useGetProducts";
import useAddNewProduct from "../services/useAddNewProduct";
import { confirmAlert, timerAlert, warningAlert } from "../services/alerts";
import ImagePreviews from "../components/ImagePreviews";
import useAddNewReview from "../services/useAddNewReview";
import useGetReviews from "../services/useGetReviews";

const AdminBody = () => {
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
  const inputToEmpty = useRef(null);
  const reviewToEmpty = useRef(null);
  const [loadProducts, setLoadProducts] = useState(false);
  const [reviewPic, setReviewPic] = useState();
  const [reviewerName, setRviewerName] = useState("");
  const [reviews, setReviews] = useState([]);

  const [products, setProducts] = useState([]);

  const productCollection = collection(db, "products");
  const reviewCollection = collection(db, "reviews");
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

  async function useHandleReviewDelete(id) {
    try {
      const confirmed = await confirmAlert();
      if (confirmed) {
        const reviewDoc = doc(db, "reviews", id);
        await deleteDoc(reviewDoc);
        useGetReviews(reviewCollection, setReviews);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    useGetProducts(productCollection, setProducts);
    useGetReviews(reviewCollection, setReviews);
  }, [loadProducts]);

  async function handleGetReviews() {
    if (reviewPic && reviewerName.trim() !== "") {
      await useAddNewReview(reviewPic, reviewerName, reviewCollection);
      setReviewPic("");
      setRviewerName("");
      reviewToEmpty.current.value = "";
      useGetReviews(reviewCollection, setReviews);
    } else {
      warningAlert();
    }
  }

  function setFieldEmpty() {
    setName("");
    setBrand("");
    setCategory("");
    setPrice("");
    setPriceInOthers("");
    setDescription("");
    setVariants("");
    setImages([]);
    setHighlights("");
    inputToEmpty.current.value = "";
    setLoadProducts(!loadProducts);
  }

  return (
    <div className="w-full bg-[#1e1e1e] font-[poppins] inset-0">
      <section className="w-full fixed bg-[#1f1f1f] shadow-md z-50">
        <Header isAdmin={true} />
      </section>
      <section className="w-[70%] mx-auto text-[#bababa] py-14 max-sm:w-full max-sm:px-5">
        <div className="pt-22 max-sm:pt-10">
          <h1 className="text-2xl font-bold py-10 max-sm:text-xl max-sm:font-medium max-sm:py-5">Add New Product</h1>
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
            action={() =>
              useAddNewProduct(
                productInfo,
                productCollection,
                setFieldEmpty,
                timerAlert
              )
            }
          />
          {images.length > 0 && (
            <ImagePreviews images={images} setImages={setImages} />
          )}
        </div>
      </section>
      <hr className="text-[#6a6a6a]" />
      <section className=" min-h-[40vh] mx-auto">
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
          isTrending={isTrending}
          setIsTrending={setIsTrending}
          priceInOthers={priceInOthers}
          setPriceInOthers={setPriceInOthers}
          category={category}
          setCategory={setCategory}
          inputToEmpty={inputToEmpty}
          images={images}
          setImages={setImages}
          setDescription={setDescription}
          variants={variants}
          setVariants={setVariants}
          highlights={highlights}
          setHighlights={setHighlights}
          setFieldEmpty={setFieldEmpty}
          timerAlert={timerAlert}
        />
        <hr className="text-[#6a6a6a]" />
      </section>
      <section className="w-[70%] mx-auto text-[#bababa] py-14 max-sm:w-full max-sm:px-5">
        <h1 className="text-2xl font-bold py-10 max-sm:text-xl max-sm:font-medium max-sm:py-5">Reviews</h1>
        <div className="grid grid-cols-3 gap-4 my-4 p-6 rounded-2xl bg-[#141414] max-sm:grid-cols-1 max-sm:gap-3">
          <input
            className="w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg max-sm:h-10 max-sm:text-sm"
            type="file"
            ref={reviewToEmpty}
            onChange={(e) => setReviewPic(e.target.files)}
            placeholder="Image..."
          />
          <input
            className="w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg max-sm:h-10 max-sm:text-sm"
            value={reviewerName}
            type="text"
            onChange={(e) => setRviewerName(e.target.value)}
            placeholder="Image..."
          />
          <button
            onClick={() => handleGetReviews()}
            className="bg-gradient-to-br transition-colors from-[#bfa14a] via-[#7f7124] to-[#bfa14a] hover:from-[#b79532] hover:via-[#766715] hover:to-[#b38e21]
             text-[16px] font-medium px-6 py-3 rounded-lg [-webkit-background-clip: text] [-webkit-text-fill-color: transparent] max-sm:h-10 max-sm:text-sm "
            type="submit"
            placeholder="Image..."
          >
            Add Review
          </button>
        </div>
        <div className="flex gap-2 overflow-x-scroll bg-[#141414] p-10 rounded-2xl w-full max-sm:p-5">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex-shrink-0 w-[15rem] text-center max-sm:w-[10rem]"
            >
              <p>{review.customerName}</p>
              <img
                className="w-full brightness-[85%] rounded-lg"
                src={review.reviewImage}
                alt=""
              />
              <button
                onClick={() => {
                  let isOkay = confirmAlert();
                  if (isOkay) {
                    useHandleReviewDelete(review.id);
                  }
                }}
                className="py-2 px-4 m-2 bg-gradient-to-br rounded-xl transition-colors from-[#bf4a4a] via-[#7f2424] to-[#bf4a4a] hover:from-[#b73232] hover:via-[#761515] hover:to-[#b32121] max-sm:text-sm max-sm:py-2 max-sm:px-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
      <section className="relative bottom-0">
        <Footer />
      </section>
    </div>
  );
};

export default AdminBody;
