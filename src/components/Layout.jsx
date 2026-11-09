import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const titles = {
      "/": "Counsel with clarity",
      "/expertise": "Our Expertise",
      "/approach": "Our Approach",
      "/contact": "Contact",
      "/signatureAnimation": "Signature Animation",
    };

    document.title = `${titles[pathname] || "Page not found"} | Alden & Vale`;
  }, [pathname]);

  return null;
}

export default function Layout() {
  return (
    <>
      <RouteEffects />

      <div className="wrap">
        <Header />
      </div>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
