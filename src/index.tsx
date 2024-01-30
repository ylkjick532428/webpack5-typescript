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
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
    {
      path: "/meeting",
      element: <MeetingApp />,
    },
  ]);

  // During an update, there is no need to pass the container again
  root.render(
    // https://react.dev/reference/react/StrictMode StrictMode will invoke two time mount
    // <React.StrictMode>
    <RouterProvider router={router} />,
    // </React.StrictMode>,
  );
}
