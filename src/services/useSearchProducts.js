import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from './firebase-config'

const useSearchProducts = async (searchText) => {
    const productsRef = collection(db,'products');
    const querySnap = await getDocs(productsRef);
    const results = querySnap.docs
    .map(doc => ({ id: doc.id, ...doc.data() })).filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()))
    return results
};

export default useSearchProducts;