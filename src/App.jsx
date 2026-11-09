import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ExpertisePage from "./pages/ExpertisePage.jsx";
import ApproachPage from "./pages/ApproachPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import SignatureAnimation1 from "./pages/SignatureAnimation1.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./styles.css";
import React from "react";
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="expertise" element={<ExpertisePage />} />
        <Route path="approach" element={<ApproachPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="signatureAnimation" element={<SignatureAnimation1 />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
