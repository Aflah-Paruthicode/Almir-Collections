import axios from "axios";
import { updateDoc } from "firebase/firestore";


const useHandleUpdate = async (productInfo,productDoc,setFieldEmpty,timerAlert) => {
        try {
            timerAlert(2500,"Product is Updating!","Will be updated in <b></b>.")
            console.log('update product request is done')
            const uploadPromises = productInfo.images.map(async (image) => {
                const data = new FormData();
                data.append("file", image);
                data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
                data.append("folder", "products");

                const res = await axios.post("https://api.cloudinary.com/v1_1/"+import.meta.env.VITE_CLOUDINARY_NAME+"/image/upload",data);
                return res.data.secure_url;
            })

            const urls = await Promise.all(uploadPromises);
            console.log('ithaan ath : ',productInfo.highlights)
            const highlightsArr = productInfo.highlights.split(',')
            await updateDoc(productDoc, {
                name : productInfo.name,
                nameLowerCase : productInfo.name.toLowerCase(),
                brand : productInfo.brand.toString().toUpperCase(),
                category : productInfo.category,
                description : productInfo.description,
                highlights : highlightsArr,
                price : productInfo.price,
                priceInOthers : productInfo.priceInOthers,
                variants : productInfo.variants,
                images : urls
            })

            setFieldEmpty()

        } catch (err) {
            console.error(err);
        }
    
}

export default useHandleUpdate