import { lazy } from "react";
import { DefaultLayout } from "../../../sheard/default-layout";

const ProductsPage = lazy(() => import("../pages"));
import { ProductDetails } from "../pages/product-details";

const ProductDetailsPage = ProductDetails;

export const productsRoutes = [
  {
    path: "/products",
    element: (
      <DefaultLayout>
        <ProductsPage />
      </DefaultLayout>
    ),
  },
  {
    path: "/products/:id",
    element: (
      <DefaultLayout>
        <ProductDetailsPage />
      </DefaultLayout>
    ),
  },
];