import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/tailwind.css";
import App from "./App.jsx";
import "./i18n";
import { TranslationProvider } from "./context/TranslationContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TranslationProvider>
      <App />
    </TranslationProvider>
  </StrictMode>
);
