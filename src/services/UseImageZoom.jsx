import React, { useRef, useEffect, useState } from 'react';


const ProductImage = ({ productImage }) => {
  const containerRef = useRef(null);
  const magnifierRef = useRef(null);
  const imageRef = useRef(null);
  const zoomLevel = 3;
  const magnifierSize = 200;

  const [scale, setScale] = useState(1);
  const initialDistance = useRef(0);

  useEffect(() => {
    const magnifier = magnifierRef.current;
    const image = imageRef.current;

   
    const handleMouseMove = (e) => {
      magnifier.style.display = 'block';
      const imageRect = image.getBoundingClientRect();
      const x = e.clientX - imageRect.left;
      const y = e.clientY - imageRect.top;

      magnifier.style.width = `${magnifierSize}px`;
      magnifier.style.height = `${magnifierSize}px`;
      magnifier.style.left = `${x}px`;
      magnifier.style.top = `${y}px`;
      magnifier.style.backgroundImage = `url(${image.src})`;
      magnifier.style.backgroundSize = `${imageRect.width * zoomLevel}px ${imageRect.height * zoomLevel}px`;
      magnifier.style.backgroundPosition = `${-x * zoomLevel + magnifierSize / 2}px ${-y * zoomLevel + magnifierSize / 2}px`;
    };

    const handleMouseLeave = () => {
      magnifier.style.display = 'none';
    };

    
    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        magnifier.style.display = 'none';
        initialDistance.current = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2) {
        const newDistance = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
        const newScale = newDistance / initialDistance.current;
        setScale(newScale);
      }
    };

    const handleTouchEnd = () => {
      setScale(1); 
    };

    if (image) {
      image.addEventListener('mousemove', handleMouseMove);
      image.addEventListener('mouseleave', handleMouseLeave);
      
      image.addEventListener('touchstart', handleTouchStart);
      image.addEventListener('touchmove', handleTouchMove);
      image.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (image) {
        image.removeEventListener('mousemove', handleMouseMove);
        image.removeEventListener('mouseleave', handleMouseLeave);
        image.removeEventListener('touchstart', handleTouchStart);
        image.removeEventListener('touchmove', handleTouchMove);
        image.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [productImage]);

  return (
    <div ref={containerRef} className="relative cursor-zoom-in w-full h-[500px] overflow-hidden">
      <img
        ref={imageRef}
        className="w-full h-full object-cover"
        src={productImage}
        alt="Product"
        style={{ transform: `scale(${scale})` }}
      />
      
      <div 
        ref={magnifierRef} 
        className="magnifier absolute hidden lg:block"
        style={{ width: `${magnifierSize}px`, height: `${magnifierSize}px` }}
      ></div>
    </div>
  );
};

export default ProductImage;