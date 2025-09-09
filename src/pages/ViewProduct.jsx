import { Link, useParams } from "react-router-dom";
import { collection, limit, query, where } from "firebase/firestore";
import { db } from "../services/firebase-config";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductDetails from "../components/ProductDetails";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import useGetSingleProduct from "../services/useGetSingleProduct";
import useGetProducts from "../services/useGetProducts";

const ViewProduct = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();

  const productCollection = collection(db, "products");
  useEffect(() => {
    async function fetchProduct() {
      let data = await useGetSingleProduct(productId);
      setProduct(data);
      if (data) {
        const queryToGetFour = query(
          productCollection,
          where("category", "==", data.category),
          limit(4)
        );
        useGetProducts(productCollection, setProducts, queryToGetFour);
      }
    }
    fetchProduct();
  }, [productId]);

  console.log("single one is here ", product);
  return (
    <div className="w-full bg-gradient-to-br from-[#1e1e1e] to-[#1f1f1f] font-[poppins]">
      <section className="w-full fixed bg-[#1f1f1f] shadow-md z-50">
        <Header />
      </section>
      <section className="w-full min-h-[100vh] flex pt-28 justify-center">
        {product && <ProductDetails productData={product} />}
      </section>
      <section className="w-full max-sm:px-5">
        <div className="w-[1050px] mx-auto max-sm:w-full">
          <hr className="mt-10 text-[#bababa]" />
          <div className="grid grid-cols-4 items-center gap-6 flex-wrap mt-10 max-sm:grid-cols-2 max-sm:gap-3">
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
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default ViewProduct;
