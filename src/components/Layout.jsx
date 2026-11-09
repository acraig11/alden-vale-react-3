import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Capacitor, registerPlugin } from "@capacitor/core";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const hasNativeTabs = Capacitor.getPlatform() === "ios" && Capacitor.isPluginAvailable("NativeTabs");
const NativeTabs = registerPlugin("NativeTabs");

function RouteEffects() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasNativeTabs) return;

    function selectTab(event) {
      if (event.detail !== pathname) navigate(event.detail);
    }

    window.addEventListener("alden-vale-tab", selectTab);
    NativeTabs.setRoute({ path: pathname }).catch(console.error);
    return () => window.removeEventListener("alden-vale-tab", selectTab);
  }, [navigate, pathname]);

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

      {!hasNativeTabs && (
        <div className="wrap">
          <Header />
        </div>
      )}

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
