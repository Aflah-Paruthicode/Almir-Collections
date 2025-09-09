import { getDocs } from "firebase/firestore";

const useGetProducts = async (productCollection, setProducts, q) => {
  try {
    let data;
    if (q) {
      data = await getDocs(q);
    } else {
      data = await getDocs(productCollection);
    }
    const filteredProducts = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("products : ", filteredProducts);
    setProducts(filteredProducts);
  } catch (err) {
    console.error(err);
  }
};

export default useGetProducts;
