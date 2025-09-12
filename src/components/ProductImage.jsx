import React, { useRef, useEffect } from "react";

const ProductImage = ({ productImage }) => {
  const containerRef = useRef(null);
  const magnifierRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const magnifier = magnifierRef.current;
    const image = imageRef.current;
    const zoomLevel = 3;

    const handleMouseMove = (e) => {
      magnifier.style.display = "block";

      const imageRect = image.getBoundingClientRect();
      const x = e.clientX - imageRect.left;
      const y = e.clientY - imageRect.top;

      magnifier.style.left = `${x}px`;
      magnifier.style.top = `${y}px`;

      magnifier.style.backgroundImage = `url(${image.src})`;
      magnifier.style.backgroundSize = `${imageRect.width * zoomLevel}px ${
        imageRect.height * zoomLevel
      }px`;
      magnifier.style.backgroundPosition = `${
        -x * zoomLevel + magnifier.offsetWidth / 2
      }px ${-y * zoomLevel + magnifier.offsetHeight / 2}px`;
    };

    const handleMouseLeave = () => {
      magnifier.style.display = "none";
    };

    if (image) {
      image.addEventListener("mousemove", handleMouseMove);
      image.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (image) {
        image.removeEventListener("mousemove", handleMouseMove);
        image.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [productImage]);

  return (
    <div
      ref={containerRef}
      className="relative cursor-zoom-in w-full h-[500px] overflow-hidden max-sm:h-[23rem]"
    >
      <img
        ref={imageRef}
        className="w-full h-full object-cover"
        src={productImage}
        alt="Product"
      />
      <div ref={magnifierRef} className="magnifier absolute hidden"></div>
    </div>
  );
};

export default ProductImage;
