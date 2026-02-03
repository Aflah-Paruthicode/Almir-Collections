import { Link } from "react-router-dom";
import founderPic from "../assets/founderPic.png";
import InstaPic from "../assets/instagram.png";
import Whatsapp from "../assets/whatsapp.png";
import Gmail from "../assets/gMail.png";

const MeetFounder = () => (
  <section className="w-[1050px] mx-auto max-sm:w-full max-sm:px-5">
    <div className="grid grid-cols-3 bg-[#141414] rounded-lg my-10 p-10 max-sm:grid-cols-1">
      <div className="text-gray-300 m-auto col-span-2 max-sm:order-2">
        <h1 className="font-bold tracking-wide text-3xl m-2 text-white max-sm:text-2xl">Meet The Founder</h1>
        <hr className="w-40 h-1 bg-gray-300" />
        <p className="m-2 leading-7 max-sm:text-sm">
          I started Almir Collections to bring people closer to luxury without the heavy price tag...
          <br />
          <Link to="/category/allProducts" className="text-amber-500 py-2 inline-block">shop now</Link>
          <br /><br /> — Muhammed Aflah <br /> Founder, Almir Collections
        </p>
      </div>
      <div className="text-center m-auto max-sm:order-1">
        <img className="w-[12rem] rounded-full object-cover max-sm:w-32" src={founderPic} alt="Founder" />
        <div className="my-4 flex justify-center gap-4">
          <img className="w-4 cursor-pointer" src={Gmail} alt="Gmail" onClick={() => window.open("https://mail.google.com/...")} />
          <img className="w-4 cursor-pointer" src={InstaPic} alt="Insta" onClick={() => window.open("https://www.instagram.com/...")} />
          <img className="w-4 cursor-pointer" src={Whatsapp} alt="WA" onClick={() => window.open(`https://wa.me/...`)} />
        </div>
      </div>
    </div>
  </section>
);
export default MeetFounder;