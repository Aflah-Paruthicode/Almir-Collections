import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../services/firebase-config"

const useDeleteProduct = async (id) => {
    try {
        const productDoc = doc(db,'products',id);
        await deleteDoc(productDoc)
    } catch (err) {
        console.error(err);
    }

    }

export default useDeleteProduct