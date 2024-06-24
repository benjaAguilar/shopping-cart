import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import ErrorPage from "./ErrorPage";
import ProductCategory from "./ProductCategory";
import ProductDetail from "./ProductDetail";

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
    ],
  },
]);

export default router;
