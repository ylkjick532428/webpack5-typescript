import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Root from "./root";
import MeetingApp from "./meeting";

const container: HTMLElement | null = document.getElementById("root");

if (container) {
  // Create a root.
  const root = createRoot(container);
  const tmpRoot = <Root />;

  const router = createBrowserRouter([
    {
      path: "/",
      element: tmpRoot,
    },
    {
      path: "/meeting",
      element: <MeetingApp />,
    },
  ]);

  // During an update, there is no need to pass the container again
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}
