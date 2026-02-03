const Hero = () => (
  <section className="w-full h-[95vh] flex items-center pt-20 justify-center max-sm:relative max-sm:h-[98vh]">
    <div className="relative left-10 bg-[#1a1a1a] max-w-80 px-16 py-14 rounded-2xl font-[poppins] border text-white z-10 max-sm:left-4 max-sm:bottom-4 max-sm:absolute max-sm:py-10 max-sm:px-12 max-sm:w-[17rem] max-sm:bg-[#1a1a1ad6]">
      <h1 className="text-4xl leading-13 mb-4 max-sm:text-3xl max-sm:leading-10">Luxury Made Affordable</h1>
      <p className="mb-4">Kerala’s Trusted Seller for Trendy Products</p>
      <button 
        onClick={() => window.scrollTo({ top: 900, behavior: "smooth" })}
        className="bg-gradient-to-br from-[#bfa14a] via-[#7f7124] to-[#bfa14a] text-[16px] px-4 py-2 rounded-lg text-amber-500"
      >
        shop now
      </button>
    </div>
    <div className="max-sm:absolute max-sm:top-28 max-sm:px-4">
      <img
        className="w-[50rem] h-[40rem] object-cover rounded-2xl shadow-lg shadow-black max-sm:w-full max-sm:h-[30rem]"
        src="https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?cs=srgb&dl=pexels-pixabay-277319.jpg&fm=jpg"
        alt="Hero Watch"
      />
    </div>
  </section>
);
export default Hero;