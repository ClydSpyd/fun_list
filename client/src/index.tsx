import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import { AuthContextProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import App from "./App";
const queryClient = new QueryClient() 


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AuthContextProvider>
);
