import { deleteDoc, doc } from "firebase/firestore";
import { confirmAlert } from "./alerts";
import useGetProducts from "./useGetProducts";

const useDeleteDoc = async (id,Collection,setProducts) => {
  try {
    const confirmed = await confirmAlert();
    if (confirmed) {
      const productDocRef = doc(Collection, id);
      await deleteDoc(productDocRef);
      setProducts ? useGetProducts(Collection, setProducts) : null;
    } else {
      console.log("User cancelled delete!");
    }
  } catch (err) {
    console.error(err);
  }
};

export default useDeleteDoc;
