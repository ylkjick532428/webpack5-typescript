import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const container: HTMLElement | null = document.getElementById("app");

if (container) {
  // Create a root.
  const root = createRoot(container);

  // During an update, there is no need to pass the container again
  root.render(<App />);
}
