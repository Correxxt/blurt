import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { LibraryPage } from "./pages/LibraryPage";
import { CollaboratePage } from "./pages/CollaboratePage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { SessionPage } from "./pages/SessionPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "library", Component: LibraryPage },
      { path: "collaborate", Component: CollaboratePage },
      { path: "notifications", Component: NotificationsPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
  {
    path: "/session",
    Component: SessionPage,
  },
]);