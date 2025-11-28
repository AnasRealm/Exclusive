import { DefaultLayout } from "../../../sheard/default-layout";
import CheckoutPage from "../pages/checkout-page";

export const checkoutRoutes = [
  {
    path: "/checkout",
    element: (
      <DefaultLayout>
        <CheckoutPage />
      </DefaultLayout>
    ),
  },
];