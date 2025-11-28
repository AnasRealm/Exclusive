import { DefaultLayout } from "../../../sheard/default-layout";
import WishlistPage from "../pages/wishlist-page";

export const wishlistRoutes = [
  {
    path: "/wishlist",
    element: (
      <DefaultLayout>
        <WishlistPage />
      </DefaultLayout>
    ),
  },
];