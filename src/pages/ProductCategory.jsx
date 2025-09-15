import { collection, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { db } from "../services/firebase-config";
import useGetProducts from "../services/useGetProducts";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useSearchProducts from "../services/useSearchProducts";
import ProductCardShimmer from "../components/ProductCardShimmer";

const ProductCategory = () => {
  const { categoryName } = useParams();
  const [queryS] = useSearchParams();
  const [products, setProducts] = useState([]);
  const searchData = queryS.get("query");
  const productCollection = collection(db, "products");

  useEffect(() => {
    async function fetchProducts() {
      try {
        if (categoryName == "search") {
          const data = await useSearchProducts(searchData);
          setProducts(data);
        } else {
          let queryToGetCategoryMatch;
          if (categoryName == "allProducts") {
            queryToGetCategoryMatch = "";
          } else {
            queryToGetCategoryMatch = query(
              productCollection,
              where("category", "==", categoryName.toLowerCase())
            );
          }

          const data = await useGetProducts(
            productCollection,
            setProducts,
            queryToGetCategoryMatch
          );
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchProducts();
  }, [searchData]);
  return (
    <div className="w-full bg-gradient-to-br from-[#1e1e1e] to-[#1f1f1f] font-[poppins]">
      <section className="w-full fixed bg-[#1f1f1f] shadow-md z-50">
        <Header />
      </section>
      <section className="w-[1050px] mx-auto py-10 pt-20  min-h-[85vh] max-sm:w-full max-sm:px-5">
        <div>
          <Link
            to={"/"}
            className="mt-20 text-[#bababa] bg-[#141414] border border-[#bababa] py-2 px-4 rounded-xl inline-flex max-sm:mt-10 max-sm:py-1 max-sm:px-2 max-sm:text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#bababa"
            >
              <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
            Back
          </Link>
          <h1 className="text-2xl font-medium tracking-wider py-5 my-3 text-white max-sm:text-xl max-sm:py-3">
            {categoryName == "allProducts"
              ? "All Products"
              : categoryName == "search"
              ? "Search Found !!"
              : "Category Section"}
          </h1>
          {products.length == 0 && (
            <h1 className="text-white max-sm:text-sm p-2">
              {categoryName == "search"
                ? "No products found with the text you entered !"
                : ""}
            </h1>
          )}
        </div>
        {products.length == 0 ? (
          <div className="grid grid-cols-4 gap-6 flex-wrap max-sm:grid-cols-2 max-sm:gap-3">
            <ProductCardShimmer />
            <ProductCardShimmer />
            <ProductCardShimmer />
            <ProductCardShimmer />
            <ProductCardShimmer />
            <ProductCardShimmer />
            <ProductCardShimmer />
            <ProductCardShimmer />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6 flex-wrap max-sm:grid-cols-2 max-sm:gap-3">
            {products.map((product, index) => {
              let trimmedName = false;
              if (product.name.length > 10) {
                if (window.innerWidth < 640) {
                  trimmedName = product.name.slice(0, 10);
                } else {
                  trimmedName = product.name.slice(0, 20);
                }
              }
              return (
                <Link
                  key={index}
                  to={"/viewProduct/" + product.id}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <ProductCard product={product} trimmedName={trimmedName} />
                </Link>
              );
            })}
          </div>
        )}
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default ProductCategory;
