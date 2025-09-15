import axios from "axios";
import { addDoc } from "firebase/firestore";

const useAddNewReview = async (
  reviewPic,
  reviewerName,
  reviewsCollection,
  setItEmpty
) => {
  try {
    const uploadPromise = async () => {
      try {
        const data = new FormData();
        data.append("file", reviewPic[0]);
        data.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_REVIEWS_PRESET
        );
        data.append("folder", "reviews");

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_NAME
          }/image/upload`,
          data
        );
        return res.data.secure_url;
      } catch (err) {
        console.error(err);
      }
    };
    const url = await uploadPromise();
    await addDoc(reviewsCollection, {
      customerName: reviewerName,
      reviewImage: url,
    });
    setItEmpty();
  } catch (err) {
    console.error(err);
  }
};

export default useAddNewReview;
