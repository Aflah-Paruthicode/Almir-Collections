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
import useAddCategory from "../services/useAddCategory";
import useGetCategories from "../services/useGetCategories";
import useDeleteDoc from "../services/useDeleteDoc";

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
  const [currentSection, setCurrentSection] = useState(() => {
    let value = localStorage.getItem("currentSection") ?? null;
    return value ? value : "";
  });
  const [newCategory, setNewCategory] = useState("");
  const [newOrderBy, setNewOrderBy] = useState(1);
  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);

  const productCollection = collection(db, "products");
  const reviewCollection = collection(db, "reviews");
  const categoriesCollection = collection(db, "categories");

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

  useEffect(() => {
    useGetCategories(categoriesCollection, setCategories);
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("currentSection", currentSection);
  }, [currentSection]);

  async function handleGetReviews() {
    try {
      if (reviewPic && reviewerName.trim() !== "") {
        await useAddNewReview(reviewPic, reviewerName, reviewCollection);
        setReviewPic("");
        setRviewerName("");
        reviewToEmpty.current.value = "";
        useGetReviews(reviewCollection, setReviews);
      } else {
        warningAlert();
      }
    } catch (err) {
      console.error(err);
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

  function handleCategory() {
    useAddCategory(newCategory, newOrderBy);
    setNewCategory("");
    setNewOrderBy(1);
  }

  return (
    <div className="w-full bg-[#1e1e1e] font-[poppins] inset-0">
      <section className="w-full fixed bg-[#1f1f1f] shadow-md z-50">
        <Header isAdmin={true} />
      </section>
      <section className="w-[70%] mx-auto pt-22  max-sm:w-full max-sm:px-5">
        <div className="pt-20 grid grid-cols-3 max-sm:max-sm:grid-cols-1 max-sm:w-full">
          <button
            className={`p-5 m-2 bg-[#141414] hover:bg-[#242424] border border-[#bababa] ${
              currentSection == "addNewProduct"
                ? "border-2 border-[#bbac0c]"
                : ""
            } text-[#bababa] rounded-xl max-sm:p-3 max-sm:text-sm`}
            onClick={() => setCurrentSection("addNewProduct")}
          >
            Add New Product
          </button>
          <button
            className={`p-5 m-2 bg-[#141414] hover:bg-[#242424] border border-[#bababa] ${
              currentSection == "products" ? "border-2 border-[#bbac0c]" : ""
            } text-[#bababa] rounded-xl max-sm:p-3 max-sm:text-sm`}
            onClick={() => setCurrentSection("products")}
          >
            Handle Products
          </button>
          <button
            className={`p-5 m-2 bg-[#141414] hover:bg-[#242424] border border-[#bababa] ${
              currentSection == "categories" ? "border-2 border-[#bbac0c]" : ""
            } text-[#bababa] rounded-xl max-sm:p-3 max-sm:text-sm`}
            onClick={() => setCurrentSection("categories")}
          >
            Handle Categories
          </button>
          <button
            className={`p-5 m-2 bg-[#141414] hover:bg-[#242424] border border-[#bababa] ${
              currentSection == "reviews" ? "border-2 border-[#bbac0c]" : ""
            } text-[#bababa] rounded-xl max-sm:p-3 max-sm:text-sm`}
            onClick={() => setCurrentSection("reviews")}
          >
            Handle Reviews
          </button>
          <button
            className={`p-5 m-2 bg-[#141414] hover:bg-[#242424] border border-[#bababa] ${
              currentSection == "banners" ? "border-2 border-[#bbac0c]" : ""
            } text-[#bababa] rounded-xl max-sm:p-3 max-sm:text-sm`}
            onClick={() => setCurrentSection("banners")}
          >
            Handle Banners
          </button>
        </div>
      </section>
      {currentSection == "categories" && (
        <section className="w-[70%] text-[#bababa] mx-auto max-sm:w-full max-sm:px-5">
          <h1 className="text-2xl font-bold py-10 max-sm:text-xl max-sm:font-medium max-sm:pb-5 max-sm:pt-10">
            Add New Category
          </h1>
          <div className="grid grid-cols-3 gap-4 my-4 p-6 rounded-2xl bg-[#141414] max-sm:grid-cols-1 max-sm:gap-3 max-sm:w-full">
            <input
              className="w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg max-sm:h-10 max-sm:text-sm"
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category..."
            />
            <select
              className="w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg max-sm:h-10 max-sm:text-sm"
              value={newOrderBy}
              onChange={(e) => setNewOrderBy(e.target.value)}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
            <button
              onClick={handleCategory}
              className="bg-gradient-to-br transition-colors from-[#bfa14a] via-[#7f7124] to-[#bfa14a] hover:from-[#b79532] hover:via-[#766715] hover:to-[#b38e21]
             text-[16px] font-medium px-6 py-3 rounded-lg text-[#bababa] [-webkit-background-clip: text] [-webkit-text-fill-color: transparent] max-sm:h-10 max-sm:text-sm "
              type="submit"
            >
              Add Category
            </button>
          </div>

          <div className="bg-[#141414] text-[#bababa] p-5 rounded-lg w-fit m-auto max-sm:w-full">
            <table className="table-fixed mx-auto">
              <thead>
                <tr className="bg-[#151515]">
                  <th className="p-2">Category ({categories.length})</th>
                  <th className="p-2">Order No</th>
                  <th className="p-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((element, inx) => {
                  const productsInThisCate = products.reduce((acc, el) => {
                    if (el.category == element.category.toLowerCase()) acc++;
                    return acc;
                  }, 0);

                  return (
                    <tr key={inx}>
                      <td className="p-2 max-sm:text-sm">
                        {element.category} ({productsInThisCate})
                      </td>
                      <td className="p-2 max-sm:text-sm">{element.orderBy}</td>
                      <td className="p-2">
                        <div className="flex max-sm:flex-col">
                          <button
                            className="bg-gradient-to-br transition-colors from-[#bf4a4a] via-[#7f2424] to-[#bf4a4a] hover:from-[#b73232] hover:via-[#761515] hover:to-[#b32121]
                               m-1 py-1 font-medium px-2 rounded-md max-sm:px-1 max-sm:text-sm"
                            onClick={() => {
                              useDeleteDoc(
                                element.id,
                                categoriesCollection,
                                false
                              );
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
          </div>
        </section>
      )}
      {currentSection == "addNewProduct" && (
        <section className="w-[70%] mx-auto text-[#bababa] py-14 max-sm:w-full max-sm:px-5 max-sm:py-0">
          <div className="max-sm:pt-10">
            <h1 className="text-2xl font-bold py-10 max-sm:text-xl max-sm:font-medium max-sm:py-5">
              Add New Product
            </h1>
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
      )}
      {currentSection == "products" && (
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
        </section>
      )}
      {currentSection == "reviews" && (
        <section className="w-[70%] mx-auto text-[#bababa] py-14 max-sm:w-full max-sm:px-5 max-sm:py-4">
          <h1 className="text-2xl font-bold py-10 max-sm:text-xl max-sm:font-medium max-sm:pb-2 max-sm:pt-10">
            Reviews ({reviews.length})
          </h1>
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
      )}
      <section className="relative bottom-0">
        <Footer />
      </section>
    </div>
  );
};

export default AdminBody;
