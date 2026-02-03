import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { collection } from "firebase/firestore";
import { db } from "../services/firebase-config";
import useGetProducts from "../services/useGetProducts";

import CategoryManager from "./Admin/CategoryManager";
import ReviewManager from "./Admin/ReviewManager";
import ProductManager from "./Admin/ProductManager";

const AdminBody = () => {
  const [products, setProducts] = useState([]);
  const [currentSection, setCurrentSection] = useState(() => localStorage.getItem("currentSection") || "products");
  const productCollection = collection(db, "products");

  useEffect(() => {
    useGetProducts(productCollection, setProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem("currentSection", currentSection);
  }, [currentSection]);

  return (
    <div className="w-full bg-[#1e1e1e] font-[poppins] min-h-screen">
      <section className="w-full fixed bg-[#1f1f1f] shadow-md z-50">
        <Header isAdmin={true} />
      </section>

      <section className="w-[70%] mx-auto pt-32 max-sm:w-full max-sm:px-5">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {["addNewProduct", "products", "categories", "reviews", "banners"].map((id) => (
            <button
              key={id}
              className={`p-5 bg-[#141414] border rounded-xl text-[#bababa] text-sm capitalize ${
                currentSection === id ? "border-[#bbac0c] border-2" : "border-[#bababa]"
              }`}
              onClick={() => setCurrentSection(id)}
            >
              {id.replace(/([A-Z])/g, " $1")}
            </button>
          ))}
        </div>
      </section>

      <div className="pb-20">
        {(currentSection === "addNewProduct" || currentSection === "products") && (
          <ProductManager section={currentSection} products={products} setProducts={setProducts} />
        )}

        {currentSection === "categories" && <CategoryManager products={products} />}
        {currentSection === "reviews" && <ReviewManager />}

        {currentSection === "banners" && <div className="text-center text-[#bababa] mt-20">Banner Management Coming Soon</div>}
      </div>

      <Footer />
    </div>
  );
};

export default AdminBody;
