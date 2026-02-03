import { db } from "./firebase-config";
import { getDoc, doc } from "firebase/firestore";

const useGetSingleProduct = async (productId) => {
  try {
    const docRef = doc(db, "products", String(productId));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
    else return null;
  } catch (err) {
    console.error(err);
  }
};

export default useGetSingleProduct;
