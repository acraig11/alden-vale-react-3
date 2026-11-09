import { Link, NavLink, useSearchParams } from "react-router-dom";
import React, { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header>
      <Link className="brand" to="/" aria-label="Alden and Vale home">
        Alden <span style={{ color: "#a18451" }}>&</span> Vale
        <small>Attorneys & counselors</small>
      </Link>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="menu"
        aria-expanded={menuOpen}
        aria-controls="navigation"
      >
        {menuOpen ? "Close" : "Menu"}
      </button>
      <nav
        id="navigation"
        className={menuOpen ? "open" : ""}
        onClick={() => setMenuOpen(false)}
      >
        <NavLink to="/expertise">Our expertise</NavLink>
        <NavLink to="/approach">Our approach</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <Link className="button" to="/contact">
          Let’s talk <span>↗</span>
        </Link>
      </nav>
    </header>
  );
}
