import React, { useState, useEffect, useRef, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Home from "~/pages/home";
import Recommendations from "~/pages/recommendations";
import Calculator from "~/pages/calculator";
import Changelog from "~/pages/changelog";
import PrivacyPolicy from "~/pages/privacy";
import FAQ from "~/pages/faq";
import PageNotFound from "~/pages/page-not-found";


const throttle = (func, delay) => {
  let inProgress = false;
  return (...args) => {
    if (inProgress) {
      return;
    }
    inProgress = true;
    setTimeout(() => {
      func(...args);
      inProgress = false;
    }, delay);
  }
};


export const DeviceContext = createContext();


export default function App() {
  let windowWidth = useRef(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1150);

  const throttledChangeHandler = throttle(() => {
    if (
      (windowWidth.current <= 1150 && window.innerWidth > 1150) ||
      (windowWidth.current > 1150 && window.innerWidth <= 1150)
    ) {
      windowWidth.current = window.innerWidth;
      setIsMobile(windowWidth.current <= 1150);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("resize", throttledChangeHandler);
    return () => {
      window.removeEventListener("resize", throttledChangeHandler)
    };
  }, [throttledChangeHandler]);

  const mobileOrDesktop = isMobile ? "mobile" : "desktop";
  return (
    <DeviceContext.Provider value={mobileOrDesktop}>
      <div className={`${styles.pageWrap} ${mobileOrDesktop}`}>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<FAQ />} />
            {/* 404 */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

      </div>
    </DeviceContext.Provider>
  );
}
