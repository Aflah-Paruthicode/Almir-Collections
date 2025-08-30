import { getDocs } from "firebase/firestore";

const useGetProducts = async (productCollection,setProducts) => {
            try {
              const data = await getDocs(productCollection);
              const filteredProducts = data.docs.map((doc) => ({id:doc.id,...doc.data()}))
              console.log('products : ',filteredProducts);
              setProducts(filteredProducts);
            } catch (err) {
              console.error(err);
            }
          }

export default useGetProducts