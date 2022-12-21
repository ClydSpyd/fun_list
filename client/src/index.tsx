import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextProvider>
);
