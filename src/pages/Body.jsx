import { useEffect, useRef, useState } from "react";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../services/firebase-config";
import { ExtraFAQ, FAQ, whyBuyFromUs } from "../utils/constants";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ProductCardShimmer from "../components/ProductCardShimmer";
import FaqAccordion from "../components/FaqAccordion";
import Hero from "../components/Hero";
import MeetFounder from "../components/MeetFounder";

// Hooks
import useGetProducts from "../services/useGetProducts";
import useGetReviews from "../services/useGetReviews";
import useGetCategories from "../services/useGetCategories";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Body = () => {
  const [faqToggleIndex, setFaqToggleIndex] = useState(-1);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    useGetProducts(collection(db, "products"), setProducts, query(collection(db, "products"), orderBy("name"), limit(20)));
    useGetProducts(collection(db, "products"), setTrendingProducts, query(collection(db, "products"), where("isTrending", "==", true)));
    useGetReviews(collection(db, "reviews"), setReviews);
    useGetCategories(collection(db, "categories"), setCategories);
  }, []);

  return (
    <div className="w-full bg-[#1e1e1e] font-[poppins]">
      <Header />
      
      <Hero />

      {/* Categories Grid */}
      <section className="w-[1050px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 text-white">
        {categories.map((doc, i) => (
          <Link key={i} style={{ order: doc.orderBy }} to={`/category/${doc.category}`} className="p-5 bg-[#141414] border border-[#bababa] rounded-xl text-center">
            {doc.category}
          </Link>
        ))}
      </section>

      {/* Trending Section */}
      <section className="w-[1050px] mx-auto py-10 max-sm:w-full max-sm:px-5">
        <h1 className="text-white text-2xl mb-8">Trending Now</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.length === 0 ? <ProductCardShimmer /> : 
            trendingProducts.map((p, i) => <ProductCard key={i} product={p} />)
          }
        </div>
      </section>

      {/* Why Buy From Us */}
      <section className="w-[1050px] mx-auto py-10 text-white">
         <h1 className="text-2xl text-center mb-10">Why Buy From Us</h1>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {whyBuyFromUs.map((reason, i) => (
              <div key={i} className="text-center">
                <img src={reason.img} className="w-16 mx-auto mb-4" alt="" />
                <h3 className="text-[#bababa]">{reason.heading}</h3>
              </div>
            ))}
         </div>
      </section>

      <MeetFounder />

      {/* FAQ Section */}
      <section className="w-[1050px] mx-auto py-10 text-white max-sm:px-5">
        <h1 className="text-2xl mb-5">FAQ</h1>
        {[...FAQ, ...ExtraFAQ].map((faq, i) => (
          <FaqAccordion 
            key={i} 
            faq={faq} 
            faqToggle={faqToggleIndex === i} 
            setFaqToggle={() => setFaqToggleIndex(i)} 
          />
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default Body;