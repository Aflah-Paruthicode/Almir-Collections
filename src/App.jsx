import Body from "./pages/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminBody from "./pages/AdminBody";
import IsLogout from "./services/IsLogout";
import IsLogin from "./services/IsLogin";
import ViewProduct from "./pages/ViewProduct";
import ProductCategory from "./pages/ProductCategory";
import ForgotPass from "./pages/ForgotPass";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      errorElement : <ErrorPage />
    },
    {
      path: "/category/:categoryName",
      element: <ProductCategory />,
      errorElement : <ErrorPage />
    },
    {
      path: "/viewProduct/:productId",
      element: <ViewProduct />,
      errorElement : <ErrorPage />
    },
    {
      path: "/adminLogin",
      element: (
        <IsLogin>
          <AdminLogin />
        </IsLogin>
      ),
      errorElement : <ErrorPage />
    },
    {
      path: "/admin",
      element: (
        <IsLogout>
          <AdminBody />
        </IsLogout>
      ),
      errorElement : <ErrorPage />
    },
    {
      path: "/adminLogin/forgotPass",
      element: <ForgotPass />,
      errorElement : <ErrorPage />
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
