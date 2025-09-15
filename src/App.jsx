import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
const Body = lazy(() => import('./pages/Body'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const AdminBody = lazy(() => import('./pages/AdminBody'))
const IsLogout = lazy(() => import('./services/IsLogout'))
const IsLogin = lazy(() => import('./services/IsLogin'))
const ViewProduct = lazy(() => import('./pages/ViewProduct'))
const ProductCategory = lazy(() => import('./pages/ProductCategory'))
const ForgotPass = lazy(() => import('./pages/ForgotPass'))
const ErrorPage = lazy(() => import('./pages/ErrorPage'))


function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Suspense fallback={<h1>Loading</h1>}><Body /></Suspense>,
      errorElement: <Suspense fallback={<h1>Loading</h1>}><ErrorPage /></Suspense>,
    },
    {
      path: "/category/:categoryName",
      element: <Suspense fallback={<h1>Loading</h1>}><ProductCategory /></Suspense>,
      errorElement: <Suspense fallback={<h1>Loading</h1>}><ErrorPage /></Suspense>,
    },
    {
      path: "/viewProduct/:productId",
      element: <Suspense fallback={<h1>Loading</h1>}><ViewProduct /></Suspense>,
      errorElement: <Suspense fallback={<h1>Loading</h1>}><ErrorPage /></Suspense>,
    },
    {
      path: "/adminLogin",
      element: (
        <Suspense fallback={<h1>Loading</h1>}>
          <IsLogin>
          <AdminLogin />
        </IsLogin>
        </Suspense>
      ),
      errorElement: <Suspense fallback={<h1>Loading</h1>}><ErrorPage /></Suspense>,
    },
    {
      path: "/admin",
      element: (
        <Suspense fallback={<h1>Loading</h1>}>
          <IsLogout>
          <AdminBody />
        </IsLogout>
        </Suspense>
      ),
      errorElement: <Suspense fallback={<h1>Loading</h1>}><ErrorPage /></Suspense>,
    },
    {
      path: "/adminLogin/forgotPass",
      element: <Suspense fallback={<h1>Loading</h1>}><ForgotPass /></Suspense>,
      errorElement: <Suspense fallback={<h1>Loading</h1>}><ErrorPage /></Suspense>,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
