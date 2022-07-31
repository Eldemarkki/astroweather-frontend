import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ApplicationSetup } from "./components/ApplicationSetup";

const root = document.getElementById("root") || document.createElement("div");

createRoot(root).render(<React.StrictMode>
  <ApplicationSetup />
</React.StrictMode>);
