import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./components/common/createTheme";
import ScrollToTop from "./components/common/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));



root.render(
  <BrowserRouter>
    <ScrollToTop/>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
