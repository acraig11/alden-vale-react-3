import { Link, NavLink, useSearchParams } from "react-router-dom";
import React, { useState } from "react";
import logo from "../assets/Galli-Law_Logo.jpeg";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header>
      <Link className="brand" to="/" aria-label="Galli Law Home">
        <img
          className="header-logo"
          src={logo}
          alt="Galli-Law Logo"
        />
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
        <NavLink to="/ourpracticeareas">Our practice areas</NavLink>
        <NavLink to="/ourteam">Our team</NavLink>
        <NavLink to="/approach">Our approach</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <Link className="button" to="/contact">
          Let’s talk <span>↗</span>
        </Link>
      </nav>
    </header>
  );
}
