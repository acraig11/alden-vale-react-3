import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import OurTeam from "./pages/OurTeam.jsx";
import OurPracticeAreas from "./pages/OurPracticeAreas.jsx";
import ApproachPage from "./pages/ApproachPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import SignatureAnimation1 from "./pages/SignatureAnimation1.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./styles.css";
import React from "react";
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="OurPracticeAreas" element={<OurPracticeAreas />} />
        <Route path="approach" element={<ApproachPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="OurTeam" element={<OurTeam />} />
        <Route path="signatureAnimation" element={<SignatureAnimation1 />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
