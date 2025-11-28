import { lazy } from "react";
import { DefaultLayout } from "../../../sheard/default-layout";

const ContactPage = lazy(() => import("../pages"));

export const contactRoutes = [
  {
    path: "/contact",
    element: (
      <DefaultLayout>
        <ContactPage />
      </DefaultLayout>
    ),
  },
];