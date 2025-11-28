import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { BlankLayout } from "../sheard/blank-layout";
import { homeRoutes } from "../feature/home/routes";
import { authRoutes } from "../feature/auth/routes";
import { aboutRoutes } from "../feature/about/routes";
import { contactRoutes } from "../feature/contact/routes";
import { productsRoutes } from "../feature/products/routes";
import { cartRoutes } from "../feature/cart/routes";
import { checkoutRoutes } from "../feature/checkout/routes";
import { wishlistRoutes } from "../feature/wishlist/routes";
import { ScrollToTop } from "../shared/components/scroll-to-top";
import { lazy } from "react";

const NotFoundPage = lazy(() => import("../sheard/pages/not-found-page"));

const routes = [
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Outlet />
      </>
    ),
    children: [
      ...homeRoutes,
      ...authRoutes,
      ...aboutRoutes,
      ...contactRoutes,
      ...productsRoutes,
      ...cartRoutes,
      ...checkoutRoutes,
      ...wishlistRoutes,
      {
        path: "*",
        element: (
          <BlankLayout>
            <NotFoundPage />
          </BlankLayout>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export function AppRouterProvider() {
  return <RouterProvider router={router} />;
}
