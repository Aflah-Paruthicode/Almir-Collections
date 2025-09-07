import { useEffect, useState } from "react";
import { db } from "./services/firebase-config";
import { getDocs, collection, addDoc } from "firebase/firestore";
import Body from "./pages/Body";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminBody from "./pages/AdminBody";
import IsLogout from './services/IsLogout';
import IsLogin from "./services/IsLogin";
import ViewProduct from "./pages/ViewProduct";
import ProductCategory from "./pages/ProductCategory";


function App() {
  const [products, setProducts] = useState([]);

  let productCollecRef = collection(db,'products');

  const getMovieList = async () => {
    try {
      const data = await getDocs(productCollecRef);
      const filteredProducts = data.docs.map((doc) => ({id:doc.id,...doc.data()}))
      console.log(filteredProducts);
      setProducts(filteredProducts);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getMovieList();
  },[]);


  const appRouter = createBrowserRouter([
    {
      path : '/',
      element : <Body />
    },
    {
      path : '/category/:categoryName',
      element : <ProductCategory />
    },
    {
      path : '/viewProduct/:productId',
      element : <ViewProduct />
    },
    {
      path : '/adminLogin',
      element : <IsLogin>
                  <AdminLogin />
                </IsLogin>
    },
    {
      path : '/admin',
      element :  <IsLogout>
                    <AdminBody />
                 </IsLogout> 
    }
  ])
  
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
