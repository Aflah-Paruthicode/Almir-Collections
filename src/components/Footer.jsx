import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-[20rem] mt-16 text-white flex flex-col items-center justify-center bg-black max-sm:px-5">
      <div className="flex gap-3 mb-2">
        <img className="w-5 h-5 cursor-pointer" src="/whatsapp.png" alt="" />
        <img className="w-5 h-5 cursor-pointer" src="/instagram.png" alt="" />
      </div>
      <p className="text-[#bababa8b] pb-2 max-sm:mb-5 max-sm:text-center">
        We are not affiliated with the brands displayed. Our products are
        inspired by popular designs and are meant for personal use only.
      </p>
      <p className="text-[#bababa8b] max-sm:text-center">
        Product images are provided by suppliers/manufacturers. All trademarks
        and copyrights belong to their respective owners
      </p>
    </div>
  );
};

export default Footer;
