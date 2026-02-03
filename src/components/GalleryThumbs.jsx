export default function GalleryThumbs({ images, goToSlide, activeImage }) {
  return (
    <div className="sticky top-28 flex flex-col gap-1 max-sm:flex-row max-sm:w-full max-sm:overflow-x-scroll">
      {images.map((img, index) => {
        return (
          <img
            key={index}
            src={img}
            alt={`thumb-${index}`}
            className={`w-16 h-16 overflow-hidden object-cover border p-1 border-[#5c5c5c] rounded-lg ${
              activeImage == index ? "border-2 border-[#bfa14a]" : ""
            } max-sm:flex-shrink-0`}
            onClick={() => goToSlide(index)}
          />   
        );
      })}
    </div>
  );
}
