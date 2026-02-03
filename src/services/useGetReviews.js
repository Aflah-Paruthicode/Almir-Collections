import { getDocs } from "firebase/firestore";

const useGetReviews = async (reviewsCollection, setReviews) => {
  try {
    const data = await getDocs(reviewsCollection);
    const filteredReviews = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setReviews(filteredReviews);
  } catch (err) {
    console.error(err);
  }
};

export default useGetReviews;
