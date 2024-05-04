import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import UserProvider from "./context/UserProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <UserProvider>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </UserProvider>
);
