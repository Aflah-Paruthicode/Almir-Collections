import React from "react";

const ProductCardShimmer = () => {
  return (
    <div className="w-[15rem] h-[20rem] rounded-b-lg rounded-t-3xl bg-[#232323] text-white text-center max-sm:w-full">
      <div className="w-full h-[10rem] overflow-hidden object-cover object-center bg-[#1d1d1d] rounded-t-3xl brightness-[85%] max-sm:h-[170px] max-sm:rounded-t-xl" />
      <div className="p-4">
        <h2 className="my-2 p-5 font-extralight max-sm:p-4 max-sm:text-sm bg-[#1d1d1d] rounded-lg"></h2>
        <h3 className="my-2 p-3 bg-[#1d1d1d] max-sm:m-1  max-sm:text-sm rounded-lg"></h3>
        <button
          className="bg-[#1d1d1d]
           text-[14px] px-6 py-3 rounded-md  "
        ></button>
        <p className="p-2 my-2 bg-[#1d1d1d] rounded-lg"></p>
      </div>
    </div>
  );
};

export default ProductCardShimmer;
