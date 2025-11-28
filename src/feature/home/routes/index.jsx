import { lazy } from "react";
import { DefaultLayout } from "../../../sheard/default-layout";

const HomePage = lazy(() => import("../pages"));

export const homeRoutes = [
  {
    path: "/", // Ex: my-app.com
    element: (
      <DefaultLayout>
        <HomePage />
      </DefaultLayout>
    ),
  },
];
