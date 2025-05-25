import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { App } from "./components/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
