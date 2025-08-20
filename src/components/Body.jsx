import { useState } from "react";
import { categories, dummyProducts, ExtraFAQ, FAQ, whyBuyFromUs } from "./utils/constants"
import FaqAccordion from "./faqAccordion";
import Footer from "./Footer";

const Body = () => {
  const [faqToggleIndex,setFaqToggleIndex] = useState(-1);


  return (
    <div className="w-full bg-gradient-to-br from-[#1e1e1e] to-[#1f1f1f] font-[poppins]">
    <section className="w-full h-[100vh] flex items-center justify-center">
        <div className="relative left-10 bg-[#1a1a1a] max-w-80 px-16 py-14 rounded-2xl font-[poppins] text-white z-10">
            <h1 className="text-4xl leading-13 mb-4">Luxury Made Affordable</h1>
            <p className="mb-4">Kerala’s Trusted Seller for Trendy Products</p>
            <button className="bg-gradient-to-br from-[#bfa14a] via-[#7f7124] to-[#bfa14a] text-[16px] px-4 py-2 rounded-lg [-webkit-background-clip: text] [-webkit-text-fill-color: transparent] ">shop now</button>
        </div>
        <div className="">
            <img className="w-[50rem] h-[40rem] object-cover rounded-2xl" src="https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?cs=srgb&dl=pexels-pixabay-277319.jpg&fm=jpg" alt="" />
        </div>
    </section>
    <section className="w-[1050px] mx-auto flex gap-2 justify-center items-center text-center text-white">
      { categories.map((category) => (
          <div className="w-1/4 p-5 bg-[#1a1a1a] rounded-xl m-auto">{category}</div>
      ))}
    </section>
    <section className="w-[1050px] mx-auto py-10">
      
         <h1 className="text-2xl font-medium tracking-wider py-4 text-white">Trending Now</h1>
      <div className="flex justify-center items-center gap-6 flex-wrap">
        {
          dummyProducts.map((product) => (
            <div className="w-[15rem] rounded-2xl bg-[#1a1a1a] text-white text-center">
            <img className="w-full h-[240px] overflow-hidden object-cover object-top rounded-t-2xl" src={product.img} alt="" />
            <div className="p-4">
              <h2 className="my-2 font-extralight">{product.heading}</h2>
              <h3 className="my-2">RS {product.price}/-</h3>
              <p className="my-2 text-[12px] text-gray-300">{product.brand}</p>
            </div>
        </div>
          ))
        }
      </div>
      
    </section>
    <section className="w-[1050px] mx-auto py-10">
      <h1 className="text-2xl font-medium tracking-wider py-4 text-white">Why Buy From Us</h1>
      <div className="flex gap-5 justify-center text-white text-center">
        {
          whyBuyFromUs.map((reason) => (
        <div className="w-1/4">
          <img className="w-28 mx-auto mt-2" src={reason.img} alt="" />
          <h1 className="text-xl m-2">{reason.heading}</h1>
          <p className="text-[#737373]">{reason.des}</p>
        </div>
          ))
        }
      </div>
    </section>
    <section className="w-[1050px] mx-auto py-10">
      
         <h1 className="text-2xl font-medium tracking-wider py-4 text-white"></h1>
      <div className="flex justify-center items-center gap-6 flex-wrap">
        {
          dummyProducts.map((product) => (
            <div className="w-[15rem] rounded-2xl bg-[#1a1a1a] text-white text-center">
            <img className="w-full h-[240px] overflow-hidden object-cover object-top rounded-t-2xl" src={product.img} alt="" />
            <div className="p-4">
              <h2 className="my-2 font-extralight">{product.heading}</h2>
              <h3 className="my-2">RS {product.price}/-</h3>
              <p className="my-2 text-[12px] text-gray-300">{product.brand}</p>
            </div>
        </div>
          ))
        }
      </div>
    </section>
    <section className="w-[1050px] mx-auto py-10">
      <h1 className="text-2xl font-medium tracking-wider py-4 text-white">FAQ</h1>
      <div className="w-full text-white">
        {
            FAQ.map((faq,index) => {
                return (
                    <FaqAccordion key={index}
                    faq={faq} 
                    faqToggle={faqToggleIndex==index ? true : false}
                    setFaqToggle={(num) => {
                        setFaqToggleIndex(num?num:index)
                    }} />
                )
            })
          }
          <h1 className="text-2xl font-medium tracking-wider py-4 ">Extra FAQ for Clothes & Shoes</h1>
          {
            ExtraFAQ.map((faq,index) => {
                return (
                    <FaqAccordion key={index}
                    faq={faq} 
                    faqToggle={faqToggleIndex==index ? true : false}
                    setFaqToggle={(num) => {
                        setFaqToggleIndex(num?num:index)
                    }} />
                )
            })
          }
      </div>
    </section>
    <section>
      <Footer />
    </section>
    </div>
  )
}

export default Body