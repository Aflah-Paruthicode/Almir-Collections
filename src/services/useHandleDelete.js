import { confirmAlert } from "./alerts"
import useDeleteProduct from "./useDeleteDoc";
import useGetProducts from "./useGetProducts";

const useHandleDelete = async (id,productCollection,setProducts) => {
        const confirmed = await confirmAlert();
        if (confirmed) {
            useDeleteProduct(id)
            useGetProducts(productCollection,setProducts)
        } else {
            console.log("User cancelled delete!");
        }
    };

export default useHandleDelete