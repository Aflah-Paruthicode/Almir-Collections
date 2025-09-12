import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/zoom";

const MobileProductZoom = ({ images, mainSwiperRef, setActiveImage }) => {

  return (
    <div className="w-full h-[250px] max-sm:h-[350px] overflow-hidden">
      <Swiper
        onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
        onActiveIndexChange={(swiper) => setActiveImage(swiper.activeIndex)}
        spaceBetween={40}
        pagination={{ clickable: true }}
        zoom={{ maxRatio: 3 }}
        modules={[Zoom]}
        className="w-full h-full rounded-lg"
      >
        {images.map((img, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center bg-[#1a1a1a]"
          >
            <div className="swiper-zoom-container w-full h-full flex items-center justify-center">
              <img
                src={img}
                alt={`product-${index}`}
                className="max-h-full max-w-full object-contain object-center scale-[140%]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MobileProductZoom;
