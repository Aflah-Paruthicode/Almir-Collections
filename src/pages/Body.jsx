import { useState } from "react";
import { categories, dummyProducts, ExtraFAQ, FAQ, whyBuyFromUs } from "../components/utils/constants"
import FaqAccordion from "../components/faqAccordion";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Body = () => {
  const [faqToggleIndex,setFaqToggleIndex] = useState(-1);


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
      { categories.map((category) => (
          <Link to={category} className="w-1/4 p-5 bg-[#1a1a1a] hover:bg-[#242424] border border-[#bababa] rounded-xl m-auto"><div className="">{category}</div></Link>
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
              <button className="bg-gradient-to-br from-[#bfa14a] via-[#7f7124] to-[#bfa14a] hover:from-[#b79532] hover:via-[#766715] hover:to-[#b38e21] text-[14px] px-4 py-1 rounded-md [-webkit-background-clip: text] [-webkit-text-fill-color: transparent] ">Contact now</button>
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
          <h1 className="text-xl mt-10 mb-4 text-[#bababa]">{reason.heading}</h1>
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
              <button className="bg-gradient-to-br from-[#bfa14a] via-[#7f7124] to-[#bfa14a] hover:from-[#b79532] hover:via-[#766715] hover:to-[#b38e21] text-[14px] px-4 py-1 rounded-md [-webkit-background-clip: text] [-webkit-text-fill-color: transparent] ">Contact now</button>
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