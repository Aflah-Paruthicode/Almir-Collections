import Body from "./pages/Body";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminBody from "./pages/AdminBody";
import IsLogout from './services/IsLogout';
import IsLogin from "./services/IsLogin";
import ViewProduct from "./pages/ViewProduct";
import ProductCategory from "./pages/ProductCategory";


function App() {

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
