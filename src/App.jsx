import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Layout from "./components/Layout";
import { TranslationProvider } from "./context/TranslationContext";

function App() {
  return (
    <BrowserRouter>
      <TranslationProvider>
        <Layout>
          <Router />
        </Layout>
      </TranslationProvider>
    </BrowserRouter>
  );
}

export default App;
