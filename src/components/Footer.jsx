import { Link, NavLink, useSearchParams } from "react-router-dom";
import React, { useState } from "react";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <Link className="brand" to="/">
            GALLI <span style={{ color: "#a18451" }}></span> LAW, PLLC
            
          </Link>
          <Link className="text-link" to="/contact">
            Let’s find your way forward <span>&#8599;</span>
          </Link>
        </div>
        <div className="footer-bottom">
         
          <span>© 2026 GALLI LAW, PLLC </span>
         
        </div>
      </div>
    </footer>
  );
}
