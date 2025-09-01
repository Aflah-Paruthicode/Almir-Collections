import useGetSingleProduct from "../services/useGetSingleProduct"


const useHandleUpdate = async (productId,setProduct) => {
    let data = await useGetSingleProduct(productId,setProduct)
}

export default useHandleUpdate