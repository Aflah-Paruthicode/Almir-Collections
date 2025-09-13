import { useEffect, useRef, useState } from "react";
import {
  categories,
  ExtraFAQ,
  FAQ,
  whyBuyFromUs,
} from "../components/utils/constants";
import FaqAccordion from "../components/FaqAccordion";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../services/firebase-config";
import ProductCard from "../components/ProductCard";
import useGetProducts from "../services/useGetProducts";
import founderPic from "../assets/founderPic.png";
import InstaPic from "../assets/instagram.png";
import Whatsapp from "../assets/whatsapp.png";
import Gmail from "../assets/gMail.png";
import useGetReviews from "../services/useGetReviews";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import ProductCardShimmer from "../components/ProductCardShimmer";

const Body = () => {
  const [faqToggleIndex, setFaqToggleIndex] = useState(-1);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const swiperRef = useRef(null);

  const productCollection = collection(db, "products");
  const reviewCollection = collection(db, "reviews");
  const que = query(collection(db, "products"),orderBy("name"),limit(20));
  const trendingQue = query(collection(db,"products"),where('isTrending','==',true))
  
  useEffect(() => {
    useGetProducts(productCollection, setProducts, que);
    useGetProducts(productCollection,setTrendingProducts,trendingQue)
    useGetReviews(reviewCollection, setReviews);
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.start();
    }
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-[#1e1e1e] to-[#1f1f1f] font-[poppins]">
      <section className="w-full fixed bg-[#1f1f1f] shadow-md z-50">
        <Header />
      </section>
      <section className="w-full h-[95vh] flex items-center pt-20 justify-center max-sm:relative max-sm:h-[98vh]">
        <div className="relative left-10 bg-[#1a1a1a] max-w-80 px-16 py-14 rounded-2xl font-[poppins] border text-white z-10 max-sm:left-4 max-sm:bottom-4 max-sm:absolute max-sm:py-10 max-sm:px-12 max-sm:w-[17rem] max-sm:bg-[#1a1a1ad6]">
          <h1 className="text-4xl leading-13 mb-4 max-sm:text-3xl max-sm:leading-10">
            Luxury Made Affordable
          </h1>
          <p className="mb-4">Kerala’s Trusted Seller for Trendy Products</p>
          <button
            onClick={() => {
              window.scrollTo({ top: 900, behavior: "smooth" });
            }}
            className="bg-gradient-to-br transition-colors from-[#bfa14a] via-[#7f7124] to-[#bfa14a] hover:from-[#b79532] hover:via-[#766715] hover:to-[#b38e21] text-[16px] px-4 py-2 rounded-lg [-webkit-background-clip: text] [-webkit-text-fill-color: transparent] "
          >
            shop now
          </button>
        </div>
        <div className="max-sm:absolute max-sm:top-28 max-sm:px-4">
          <img
            className="w-[50rem] h-[40rem] object-cover rounded-2xl shadow-lg shadow-black max-sm:w-full max-sm:h-[30rem] "
            src="https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?cs=srgb&dl=pexels-pixabay-277319.jpg&fm=jpg"
            alt=""
          />
        </div>
      </section>
      <section className="w-[1050px] mx-auto grid grid-cols-5 gap-4  text-center text-white max-sm:w-full max-sm:grid-cols-2 max-sm:px-5 max-sm:pt-3 max-sm:gap-3 max-sm:text-sm">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/category/${category}`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="p-5 bg-[#141414] hover:bg-[#242424] border border-[#bababa] rounded-xl "
          >
            <div className="">{category}</div>
          </Link>
        ))}
      </section>
      <section className="w-[1050px] mx-auto py-10 max-sm:w-full max-sm:px-5">
        <h1 className="text-2xl font-medium tracking-wider py-8 text-white max-sm:text-lg">
          Trending Now
        </h1>
        { products.length == 0 ? 
        <div className="grid grid-cols-4 justify-center items-center gap-6 flex-wrap max-sm:grid-cols-2 max-sm:gap-3">
        <ProductCardShimmer /> <ProductCardShimmer /> <ProductCardShimmer />
        <ProductCardShimmer /> </div> : 
        <div className="grid grid-cols-4 justify-center items-center gap-6 flex-wrap max-sm:grid-cols-2 max-sm:gap-3">
          {trendingProducts
            .filter((product) => product.isTrending)
            .map((product, index) => {
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
        </div>}
      </section>
      <section className="w-[1050px] mx-auto py-10 max-sm:w-full max-sm:px-5">
        <h1 className="text-2xl font-medium tracking-wider py-8 text-white max-sm:text-lg max-sm:text-center max-sm:mb-3">
          Why Buy From Us
        </h1>
        <div className="grid grid-cols-4 gap-5 justify-center text-white text-center max-sm:grid-cols-2">
          {whyBuyFromUs.map((reason, index) => (
            <div key={index} className=" max-sm:w-full">
              <div className="relative">
                <img
                  className="w-25 h-26 object-cover mx-auto max-sm:w-16 max-sm:h-16 "
                  src={reason.img}
                  alt=""
                />
              </div>
              <h1 className="text-xl mt-10 mb-4 text-[#bababa] max-sm:text-base max-sm:mt-5 max-sm:mb-2">
                {reason.heading}
              </h1>
              <p className="text-[#737373] max-sm:text-sm">{reason.des}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="w-[1050px] mx-auto py-10 max-sm:w-full max-sm:px-5">
        <div className="py-8 flex justify-between">
          <h1 className="text-2xl font-medium tracking-wider text-white max-sm:text-lg">
            You Might Like
          </h1>
          <Link
            to={"category/allProducts"}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-md font-medium tracking-wider inline-flex items-center text-[#bababa]"
          >
            More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="15px"
              viewBox="0 -960 960 960"
              width="18px"
              fill="#bababa"
            >
              <path d="m288-96-68-68 316-316-316-316 68-68 384 384L288-96Z" />
            </svg>
          </Link>
        </div>
        { products.length == 0 ? 
        <div className="grid grid-cols-4 justify-center items-center gap-6 flex-wrap max-sm:grid-cols-2 max-sm:gap-3">
          <ProductCardShimmer /> <ProductCardShimmer /> <ProductCardShimmer /> <ProductCardShimmer />
          <ProductCardShimmer /> <ProductCardShimmer /> <ProductCardShimmer /> <ProductCardShimmer />
        </div>:
        <div className="grid grid-cols-4 justify-center items-center gap-6 flex-wrap max-sm:grid-cols-2 max-sm:gap-3">
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
        </div>}
      </section>
      <section className="py-10 max-sm:py-5">
        <div className="w-[1050px] mx-auto max-sm:w-full">
          <h1 className="text-2xl font-medium tracking-wider py-8 text-white max-sm:text-lg max-sm:text-center">
            Customer Reviews
          </h1>
        </div>
        <div className="overflow-hidden">
          <Swiper
            ref={swiperRef}
            spaceBetween={10}
            loop={true}
            autoplay={{
              delay: 0,
            }}
            freeMode={true}
            speed={2000}
            modules={[Autoplay]}
            breakpoints={{
              300: { slidesPerView: 2.7 },
              640: { slidesPerView: 3.8 },
              800: { slidesPerView: 5.7 },
              1024: { slidesPerView: 7.8 },
            }}
          >
            {reviews.map((card, index) => (
              <SwiperSlide key={index}>
                <img
                  className="rounded-lg brightness-[85%] object-cover w-full"
                  src={card.reviewImage}
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section className="w-[1050px] mx-auto  max-sm:w-full max-sm:px-5">
        <div className="grid grid-cols-3 bg-[#141414] rounded-lg my-10 p-10 max-sm:grid-cols-1">
          <div className="text-gray-300 m-auto  col-span-2 max-sm:order-2 max-sm:w-full">
            <h1 className="font-bold tracking-wide text-3xl m-2 text-white max-sm:text-2xl max-sm:font-medium">
              Meet The Founder
            </h1>
            <hr className="w-40 h-1 bg-gray-300 max-sm:" />
            <div>
              <p className="m-2 leading-7 max-sm:m-1 max-sm:text-sm">
                I started Almir Collections to bring people closer to luxury
                without the heavy price tag. What began as my search for
                affordable yet stylish pieces turned into a vision: a website
                where anyone can explore quality products — simple, stylish, and
                trustworthy.
                <br />{" "}
                <Link
                  to={"/category/allProducts"}
                  onClick={() => {
                    window.scrollTo({ top: 50, behavior: "smooth" });
                  }}
                  className="bg-gradient-to-br inline-flex transition-colors from-[#bfa14a] via-[#7f7124] to-[#bfa14a] hover:from-[#b79532] hover:via-[#766715] hover:to-[#b38e21] text-[16px] px-4 py-2 my-2 rounded-lg [-webkit-background-clip: text] [-webkit-text-fill-color: transparent] "
                >
                  shop now
                </Link>
                <br /> <br /> — Muhammed Aflah
                <br />
                Founder, Almir Collections
              </p>
            </div>
          </div>
          <div className="text-center text-white m-auto max-sm:order-1">
            <img
              className="brightness-[85%] w-[12rem] rounded-[50%] object-top object-cover max-sm:w-32"
              src={founderPic}
              alt=""
            />
            <div className="my-4 flex justify-center w-28 m-auto">
              <img
                onClick={() =>
                  window.open(
                    "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCJvlqxKRmVZmjNFllKDhLgShJWDgGjvZvsJKrLhZChVcnZdjQhxxXLRdZHzNVZJXdkDsbTg",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="w-4 m-auto cursor-pointer"
                src={Gmail}
                alt=""
              />
              <img
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/almircollections.com_/",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="w-4 m-auto cursor-pointer"
                src={InstaPic}
                alt=""
              />
              <img
                onClick={() => {
                  const url = `https://wa.me/${
                    import.meta.env.VITE_PHONE
                  }?text=${encodeURIComponent("Hi almir collections's team")}`;
                  window.open(url, "_blank", "noopener,noreferrer");
                }}
                className="w-4 m-auto cursor-pointer"
                src={Whatsapp}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-[1050px] mx-auto py-10 max-sm:w-full max-sm:px-5">
        <h1 className="text-2xl font-medium tracking-wider py-4 text-white max-sm:text-lg max-sm:text-center">
          FAQ
        </h1>
        <div className="w-full text-white">
          {FAQ.map((faq, index) => {
            return (
              <FaqAccordion
                key={index}
                faq={faq}
                faqToggle={faqToggleIndex == index ? true : false}
                setFaqToggle={(num) => {
                  setFaqToggleIndex(num ? num : index);
                }}
              />
            );
          })}
          <h1 className="text-2xl font-medium tracking-wider py-4 max-sm:text-lg max-sm:text-center">
            Extra FAQ for Clothes & Shoes
          </h1>
          {ExtraFAQ.map((faq, index) => {
            return (
              <FaqAccordion
                key={index}
                faq={faq}
                faqToggle={faqToggleIndex == index ? true : false}
                setFaqToggle={(num) => {
                  setFaqToggleIndex(num ? num : index);
                }}
              />
            );
          })}
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Body;
