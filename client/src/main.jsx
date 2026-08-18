import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { store } from "./redux/store";
import { AuthProvider } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import "./styles/index.scss";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { CookieBanner } from "./components/CookieBanner/CookieBanner";
import { CookieSettingsModal } from "./components/CookieSettingsModal/CookieSettingsModal";
import { CookieSettingsProvider } from "./context/CookieSettingsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <CookieSettingsProvider>
          <BrowserRouter>
            <ScrollToTop />
            <App />
            <CookieBanner />
            <CookieSettingsModal />
            <Toaster position="top-center" />
          </BrowserRouter>
        </CookieSettingsProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
);
