import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-[20rem] mt-16 text-white flex flex-col items-center justify-center bg-black max-sm:px-5">
      <div className="flex gap-3 mb-2">
        <img
          onClick={() =>
            window.open(
              "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCJvlqxKRmVZmjNFllKDhLgShJWDgGjvZvsJKrLhZChVcnZdjQhxxXLRdZHzNVZJXdkDsbTg",
              "_blank",
              "noopener,noreferrer"
            )
          }
          className="w-5 h-5 cursor-pointer max-sm:w-4 max-sm:h-4"
          src="/google.png"
          alt=""
        />
        <img
          onClick={() => window.open("https://www.instagram.com/almircollections.com_/", "_blank", "noopener,noreferrer")}
          className="w-5 h-5 cursor-pointer max-sm:w-4 max-sm:h-4"
          src="/instagram.png"
          alt=""
        />
        <img
          onClick={() => {
            const url = `https://wa.me/${import.meta.env.VITE_PHONE}?text=${encodeURIComponent("Hi almir collections's team")}`;
            window.open(url, "_blank", "noopener,noreferrer");
          }}
          className="w-5 h-5 cursor-pointer max-sm:w-4 max-sm:h-4"
          src="/whatsapp.png"
          alt=""
        />
      </div>
      <p className="text-[#bababa8b] pb-2 max-sm:mb-5 max-sm:text-center max-sm:text-sm max-sm:leading-6">
        We are not affiliated with the brands displayed. Our products are inspired by popular designs and are meant for personal use only.
      </p>
      <p className="text-[#bababa8b] max-sm:text-center max-sm:text-sm max-sm:leading-6">
        Product images are provided by suppliers/manufacturers. All trademarks and copyrights belong to their respective owners
      </p>
    </div>
  );
};

export default Footer;
