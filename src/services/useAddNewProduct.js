import axios from 'axios';
import { addDoc } from 'firebase/firestore';

const useAddNewProduct = async (productInfo,productCollection) => {
        try {
            console.log('new product adding request is done')
            const data = new FormData();
            const uploadPromises = productInfo.images.map(async (image) => {
                data.append("file", image);
                data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
                data.append("folder", "products");

                const res = await axios.post("https://api.cloudinary.com/v1_1/"+import.meta.env.VITE_CLOUDINARY_NAME+"/image/upload",data);
                return res.data.secure_url;
            })

            const urls = await Promise.all(uploadPromises);
            const highlightsArr = productInfo.highlights.split(',')
            await addDoc(productCollection, {
                name : productInfo.name,
                brand : productInfo.brand.toString().toUpperCase(),
                category : productInfo.category,
                description : productInfo.description,
                highlights : highlightsArr,
                price : productInfo.price,
                priceInOthers : productInfo.priceInOthers,
                variants : productInfo.variants,
                images : urls
            })

        } catch (err) {
            console.error(err);
        }
    
}

export default useAddNewProduct