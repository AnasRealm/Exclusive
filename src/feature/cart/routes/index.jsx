import { DefaultLayout } from "../../../sheard/default-layout";
import CartPage from "../pages/cart-page";

export const cartRoutes = [
  {
    path: "/cart",
    element: (
      <DefaultLayout>
        <CartPage />
      </DefaultLayout>
    ),
  },
];