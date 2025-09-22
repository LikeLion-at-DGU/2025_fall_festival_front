import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Router from "./routes/Router";
import Layout from "./components/Layout";
import { TranslationProvider } from "./context/TranslationContext";

function AppContent() {
  const location = useLocation();
  const isComingSoon = location.pathname === "/comingsoon"; // ComingSoon 여부 체크

  return (
    <TranslationProvider>
      {isComingSoon ? (
        // ComingSoon 페이지일 때는 Layout 없이 Router만
        <Router />
      ) : (
        // 그 외 페이지는 Layout 적용
        <Layout>
          <Router />
        </Layout>
      )}
    </TranslationProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
