import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import ErrorPage from "./ErrorPage";
import ProductCategory from "./ProductCategory";

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
    ],
  },
]);

export default router;
