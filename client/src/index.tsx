import { ReactQueryDevtools } from "react-query/devtools";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import { AuthContextProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import App from "./App";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
console.log("index render");
root.render(
  <AuthContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </AuthContextProvider>
);
