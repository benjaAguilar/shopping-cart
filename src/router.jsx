import { createBrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import ErrorPage from "./components/ErrorPage";
import ProductCategory from "./components/home/ProductCategory";
import ProductDetail from "./components/productDetail/ProductDetail";
import Cart from "./components/cart/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/:categoriesId",
        element: <ProductCategory />,
      },
      {
        path: "/:categoriesId/:productId",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

export default router;
