import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Router from "./routes/Router";
import Layout from "./components/Layout";
import { TranslationProvider } from "./context/TranslationContext";

function AppContent() {

  return (
    <TranslationProvider>
        <Layout>
          <Router />
        </Layout>
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
