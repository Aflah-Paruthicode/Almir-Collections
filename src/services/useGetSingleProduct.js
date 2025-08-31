import { db } from "./firebase-config";
import { getDoc, doc } from "firebase/firestore";


const useGetSingleProduct = async (productId,setProduct) => {
        const docRef = doc(db, "products", String(productId));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setProduct({ id: docSnap.id, ...docSnap.data() })
        } else {
            return null;
        }
    }

export default useGetSingleProduct;