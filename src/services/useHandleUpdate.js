import axios from "axios";
import { updateDoc } from "firebase/firestore";
import { warningAlert } from "./alerts";

const useHandleUpdate = async (productInfo, productDoc, setFieldEmpty, timerAlert) => {
  const { name, brand, category, description, highlights, price, priceInOthers, variants, images, isTrending } = productInfo;
  try { 
    if ([name, brand, category, description, highlights, price, priceInOthers, variants].every((field) => field.trim() !== "") && images.length > 0) {
      timerAlert(2500, "Product is Updating!", "Will be updated in <b></b>.");
      
      const uploadPromises = productInfo.images.map(async (image) => {
        try {
          const data = new FormData();
          data.append("file", image);
          data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
          data.append("folder", "products");
          const res = await axios.post("https://api.cloudinary.com/v1_1/" + import.meta.env.VITE_CLOUDINARY_NAME + "/image/upload", data);
          return res.data.secure_url;
        } catch (err) {
          console.error(err);
        }
      });

      const urls = await Promise.all(uploadPromises);
      const highlightsArr = productInfo.highlights.split(",");
      await updateDoc(productDoc, {
        name,
        nameLowerCase: productInfo.name.toLowerCase(),
        brand: productInfo.brand.toUpperCase(),
        category: productInfo.category.toLowerCase(),
        description,
        highlights: highlightsArr,
        isTrending,
        price,
        priceInOthers,
        variants,
        images: urls,
      });

      setFieldEmpty();
    } else {
      warningAlert();
    }
  } catch (err) {
    console.error(err);
  }
};

export default useHandleUpdate;
