import { useEffect, useState } from "react";
import { categories, dummyProducts, ExtraFAQ, FAQ, reviewPics, whyBuyFromUs } from "../components/utils/constants"
import FaqAccordion from "../components/faqAccordion";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { collection } from 'firebase/firestore';
import { db } from '../services/firebase-config';
import ProductCard from "../components/ProductCard";
import useGetProducts from "../services/useGetProducts";
import founderPic from '../assets/founderPic.png';
import InstaPic from '../assets/instagram.png';
import LinkedIn from '../assets/linkedin.png'
import Gmail from '../assets/gMail.png'
import useGetReviews from "../services/useGetReviews";

const Body = () => {
  const [faqToggleIndex,setFaqToggleIndex] = useState(-1);
  const [products, setProducts] = useState([])
  const [reviews,setReviews] = useState([])

  const productCollection = collection(db,'products');
  const reviewCollection = collection(db,'reviews')
  
  useEffect(() => {
    useGetProducts(productCollection,setProducts,false);
    useGetReviews(reviewCollection,setReviews)
  },[])

  return (
    <div className="w-full bg-gradient-to-br from-[#1e1e1e] to-[#1f1f1f] font-[poppins]">
      <section className="w-full fixed bg-[#1f1f1f] shadow-md z-50">
        <Header />
      </section>
    <section className="w-full h-[95vh] flex items-center pt-20 justify-center">
        <div className="relative left-10 bg-[#1a1a1a] max-w-80 px-16 py-14 rounded-2xl font-[poppins] border text-white z-10">
            <h1 className="text-4xl leading-13 mb-4">Luxury Made Affordable</h1>
            <p className="mb-4">Kerala’s Trusted Seller for Trendy Products</p>
            <button className="bg-gradient-to-br from-[#bfa14a] via-[#7f7124] to-[#bfa14a] hover:from-[#b79532] hover:via-[#766715] hover:to-[#b38e21] text-[16px] px-4 py-2 rounded-lg [-webkit-background-clip: text] [-webkit-text-fill-color: transparent] ">shop now</button>
        </div>
        <div className="">
            <img className="w-[50rem] h-[40rem] object-cover rounded-2xl shadow-lg shadow-black" src="https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?cs=srgb&dl=pexels-pixabay-277319.jpg&fm=jpg" alt="" />
        </div>
    </section>
    <section className="w-[1050px] mx-auto flex gap-4 justify-center items-center text-center text-white">
      { categories.map((category,index) => (
          <Link key={index} to={`/category/${category}`} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="w-1/4 p-5 bg-[#141414] hover:bg-[#242424] border border-[#bababa] rounded-xl m-auto"><div className="">{category}</div></Link>
      )) }
    </section>
    <section className="w-[1050px] mx-auto py-10">
         <h1 className="text-2xl font-medium tracking-wider py-8 text-white">Trending Now</h1>
      <div className="flex justify-center items-center gap-6 flex-wrap">
        { products.map((product,index) => {
            let trimmedName = false;
            if(product.name.length > 20) trimmedName = product.name.slice(0,20);
            return (
              <Link key={index} to={'/viewProduct/'+product.id} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <ProductCard product={product} trimmedName={trimmedName} />
            </Link>
          )}) }
      </div>
      
    </section>
    <section className="w-[1050px] mx-auto py-10">
      <h1 className="text-2xl font-medium tracking-wider py-8 text-white">Why Buy From Us</h1>
      <div className="flex gap-5 justify-center text-white text-center">
        { whyBuyFromUs.map((reason, index) => (
        <div key={index} className="w-1/4">
          <img className="w-28 mx-auto mt-2" src={reason.img} alt="" />
          <h1 className="text-xl mt-10 mb-4 text-[#bababa]">{reason.heading}</h1>
          <p className="text-[#737373]">{reason.des}</p>
        </div>
          )) }
      </div>
    </section>
    <section className="w-[1050px] mx-auto py-10">
      
         <h1 className="text-2xl font-medium tracking-wider py-8 text-white">Most Sold Items</h1>
      <div className="flex justify-center items-center gap-6 flex-wrap">
        { products.map((product,index) => {
            let trimmedName = false;
            if(product.name.length > 20) trimmedName = product.name.slice(0,20);
            return (
              <Link key={index} to={'/viewProduct/'+product.id} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <ProductCard product={product} trimmedName={trimmedName} />
            </Link>
          )}) }
      </div>
    </section>
    <section className="py-10">
      <div className="w-[1050px] mx-auto">
      <h1 className="text-2xl font-medium tracking-wider py-8 text-white">Customer Rviews</h1>
      </div>
    <div className="overflow-hidden">
      <div className="flex whitespace-nowrap animate-[scroll-left_40s_linear_infinite]">
        {reviews.map((card, index) => (
          <div key={index} className="flex-shrink-0 w-60 h-[25rem] rounded-lg m-3 flex items-center justify-center">
            <img className="w-full h-full rounded-lg brightness-[85%] object-cover" src={card.reviewImage} alt="" />
          </div>
        ))}
        {reviews.map((card, index) => (
      <div
        key={index + reviews.length}
        className="flex-shrink-0 w-60 h-[25rem] rounded-lg m-3 flex items-center justify-center"
      >
        <img
          className="w-full h-full rounded-lg brightness-[85%] object-cover"
          src={card.reviewImage}
          alt=""
        />
      </div>
    ))}
      </div>
    </div>
    </section>
    <section className="w-[1050px] mx-auto my-10 p-10 rounded-lg bg-[#141414]">
      <div className="flex">
        <div className="text-gray-300 m-auto">
          <h1 className="font-bold tracking-wide text-3xl m-2 text-white">Meet The Founder</h1>
          <hr className="w-40 h-1 bg-gray-300" />
          <div>
          <p className="m-2 leading-7">I started Almir Collections to make luxury more accessible.
            What began as my search for affordable replicas of top brands turned into a vision: a website where anyone can explore quality products — simple, stylish, and trustworthy.
            <br />  <button className="bg-gradient-to-br from-[#bfa14a] via-[#7f7124] to-[#bfa14a] hover:from-[#b79532] hover:via-[#766715] hover:to-[#b38e21] text-[16px] px-4 py-2 my-2 rounded-lg [-webkit-background-clip: text] [-webkit-text-fill-color: transparent] ">shop now</button>

            <br /> <br /> — Muhammed Aflah<br />Founder, Almir Collections</p>
          </div>
        </div>
        <div className="text-center text-white m-auto">
          <img className="brightness-[85%] w-[24rem] rounded-[50%] object-top object-cover" src={founderPic} alt="" />
          <div className="my-4 flex justify-center w-28 m-auto">
            <img className="w-4 m-auto" src={Gmail} alt="" />
            <img className="w-4 m-auto" src={InstaPic} alt="" />
            <img className="w-4 m-auto" src={LinkedIn} alt="" />
          </div>
        </div>
      </div>
    </section>
    <section className="w-[1050px] mx-auto py-10">
      <h1 className="text-2xl font-medium tracking-wider py-4 text-white">FAQ</h1>
      <div className="w-full text-white">
          { FAQ.map((faq,index) => {
                return ( <FaqAccordion key={index}
                    faq={faq} 
                    faqToggle={faqToggleIndex==index ? true : false}
                    setFaqToggle={(num) => { setFaqToggleIndex(num?num:index) }} /> )
            })}
          <h1 className="text-2xl font-medium tracking-wider py-4 ">Extra FAQ for Clothes & Shoes</h1>
          { ExtraFAQ.map((faq,index) => {
                return ( <FaqAccordion key={index}
                    faq={faq} 
                    faqToggle={faqToggleIndex==index ? true : false}
                    setFaqToggle={(num) => { setFaqToggleIndex(num?num:index) }} /> )
            }) }
      </div>
    </section>
    <section>
      <Footer />
    </section>
    </div>
  )
}

export default Body