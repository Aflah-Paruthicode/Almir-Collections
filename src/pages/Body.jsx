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
import reviewFrame from '../assets/reviewFrame.png'


const Body = () => {
  const [faqToggleIndex,setFaqToggleIndex] = useState(-1);
  const [products, setProducts] = useState([])

  const productCollection = collection(db,'products');
  
  useEffect(() => {
    useGetProducts(productCollection,setProducts,false);
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
          <Link key={index} to={`/category/${category}`} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="w-1/4 p-5 bg-[#1a1a1a] hover:bg-[#242424] border border-[#bababa] rounded-xl m-auto"><div className="">{category}</div></Link>
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
      {/* The animate-[...] syntax is Tailwind's arbitrary value support for animations */}
      <div className="flex whitespace-nowrap animate-[scroll-left_40s_linear_infinite]">
        {reviewPics.map((card, index) => (
          <div key={index} className="flex-shrink-0 w-64 h-[25rem] rounded-lg m-3 flex items-center justify-center">
            {/* Your card content */}
            <img className="w-full h-full rounded-lg brightness-[85%] object-cover" src={card} alt="" />
          </div>
        ))}
        {/* Duplicate the cards for an infinite loop */}
        {reviewPics.map((card, index) => (
          <div key={index + reviewPics.length} className="flex-shrink-0 w-64 h-[25rem] rounded-lg m-3 flex items-center justify-center">
            <img className="w-full h-full rounded-lg brightness-[85%] object-cover" src={card} alt="" />
          </div>
        ))}
      </div>
    </div>
    </section>
    <section className="w-[1050px] mx-auto py-10">
      <div className="flex">
        <div>
          <h1>Meet The Founder</h1>
          <hr />
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quisquam nemo reiciendis ipsam voluptatum obcaecati assumenda dolores. audi deserunt! Magni animi eos error deserunt aut doloremque sequi labore exercitationem earum.
            <button>Shop Now</button>
          </div>
        </div>
        <div>
          <img src='' alt="" />
          <h1>MUHAMMED AFLAH</h1>
          <p>Founder, Web Developer</p>
          <div>email, insta, linkedin</div>
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