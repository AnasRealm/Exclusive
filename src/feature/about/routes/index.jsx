import { lazy } from "react";
import { DefaultLayout } from "../../../sheard/default-layout";

const AboutPage = lazy(() => import("../pages"));

export const aboutRoutes = [
  {
    path: "/about",
    element: (
      <DefaultLayout>
        <AboutPage />
      </DefaultLayout>
    ),
  },
];