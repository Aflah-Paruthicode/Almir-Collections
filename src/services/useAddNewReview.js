import axios from 'axios';
import { addDoc } from 'firebase/firestore';

const useAddNewReview = async (reviewPic,reviewerName,reviewsCollection,setItEmpty) => {
    try {

        console.log('the file is here bud : ',reviewPic[0])

        const uploadPromise = async () => {
            const data = new FormData()
            data.append('file',reviewPic[0])
            data.append('upload_preset',import.meta.env.VITE_CLOUDINARY_REVIEWS_PRESET)
            data.append('folder','reviews')
    
            const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
            data
            );          
            console.log('the data : ',res)
            return res.data.secure_url;
        }
        const url = await uploadPromise()
        await addDoc(reviewsCollection,{
            customerName : reviewerName,
            reviewImage : url
        })
        setItEmpty();
    } catch (err) {
        console.error(err);
    }
}

export default useAddNewReview