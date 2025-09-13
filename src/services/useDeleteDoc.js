import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase-config";

const useDeleteProduct = async (id) => {
  try {
    const productDocRef = doc(db, "products", id);
    await deleteDoc(productDocRef);
  } catch (err) {
    console.error(err);
  }
};

export default useDeleteProduct;
