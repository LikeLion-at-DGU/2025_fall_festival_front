import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./styles/tailwind.css";
import App from "./App.jsx";
import "./i18n";
import { TranslationProvider } from "./context/TranslationContext";

// Query Client 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <App />
      </TranslationProvider>
    </QueryClientProvider>
  </StrictMode>
);
