const ProductCard = ({ product, trimmedName }) => {
  return (
    <div className="w-[15rem] rounded-b-lg rounded-t-3xl bg-[#141414] text-white text-center">
      <img
        className="w-full h-[240px] overflow-hidden object-cover object-top rounded-t-3xl brightness-[85%]"
        src={product.images[0]}
        alt=""
      />
      <div className="p-4">
        <h2 className="my-2 font-extralight">
          {trimmedName ? `${trimmedName}...` : product.name}
        </h2>
        <h3 className="my-2">RS {product.price}/-</h3>
        <button
          onClick={() => {
            const message = `I want ${product.name}`;
            const url = `https://wa.me/${
              import.meta.env.VITE_PHONE
            }?text=${encodeURIComponent(message)}`;
            window.open(url, "_blank");
          }}
          className="bg-gradient-to-br transition-colors from-[#bfa14a] via-[#7f7124] to-[#bfa14a] hover:from-[#b79532] hover:via-[#766715] hover:to-[#b38e21] text-[14px] px-4 py-1 rounded-md [-webkit-background-clip: text] [-webkit-text-fill-color: transparent] "
        >
          Contact now
        </button>
        <p className="my-2 text-[12px] text-gray-300">{product.brand}</p>
      </div>
    </div>
  );
};

export default ProductCard;
