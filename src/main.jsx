import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CatalogProvider } from "./context/CatalogContext.jsx";
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/components.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CatalogProvider><CartProvider><App /></CartProvider></CatalogProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
