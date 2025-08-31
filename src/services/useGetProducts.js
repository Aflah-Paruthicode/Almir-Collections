import { getDocs, limit, query } from "firebase/firestore";

const useGetProducts = async (productCollection,setProducts,q) => {
        try {
          let data 
          if(q) {
            const queryToGetFour = query(productCollection, limit(4));
            data = await getDocs(queryToGetFour);
          } else {
            data = await getDocs(productCollection);
          }
              const filteredProducts = data.docs.map((doc) => ({id:doc.id,...doc.data()}))
              console.log('products : ',filteredProducts);
              setProducts(filteredProducts);
            } catch (err) {
              console.error(err);
            }
          }

export default useGetProducts