import { useParams } from "react-router-dom"
import { doc, getDoc  } from 'firebase/firestore';
import { db } from "../services/firebase-config";
import Header from "../components/Header";
import { productData } from "../components/utils/constants";
import Footer from "../components/Footer";
import ProductDetails from "../components/ProductDetails";

const ViewProduct = () => {
    const {productId} = useParams()
    // console.log(productId)
    // async function useGetProduct () {
    //     const docRef = doc(db, "products",String(productId));
    //     const docSnap = await getDoc(docRef);
    //     return {id:docSnap.id,...docSnap.data()}
    // }
    // const product = useGetProduct(productId)
    // console.log('ethiii',product)

  return (
    <div className="w-full bg-gradient-to-br from-[#1e1e1e] to-[#1f1f1f] font-[poppins]">
        <section className="w-full fixed bg-[#1f1f1f] shadow-md z-50">
            <Header />
        </section>
        <section className="w-full min-h-[100vh] flex pt-28 justify-center">
            <ProductDetails productData={productData} />
        </section>
        <section>
            
        </section>
        <section>
            <Footer />
        </section>
    </div>
  )
}


export default ViewProduct