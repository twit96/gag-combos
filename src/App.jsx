import React, { useEffect } from "react";
import { useLocation, BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "~/pages/home";
import Recommendations from "~/pages/recommendations";
import Calculator from "~/pages/calculator";
import Changelog from "~/pages/changelog";
import PrivacyPolicy from "~/pages/privacy";
import FAQ from "~/pages/faq";
import TestComboPermutations from "~/pages/testing/combo-permutations";
import PageNotFound from "~/pages/page-not-found";


function ScrollTopOnPageChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


export default function App() {
  return (
    <BrowserRouter>
      <ScrollTopOnPageChange />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/faq" element={<FAQ />} />
        {/* Hidden Testing */}
        <Route path="/testing/combo-permutations" element={<TestComboPermutations />} />
        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
