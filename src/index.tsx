import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NextThemeProvider } from "./context/ThemeProvider.jsx";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <NextThemeProvider>
            <App />
        </NextThemeProvider>
    </React.StrictMode>
);
