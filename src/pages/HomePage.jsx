import { Link, NavLink, useSearchParams } from "react-router-dom";
import React, { useState } from "react";
import SignatureAnimation from "./SignatureAnimation1.jsx";
import SignatureAnimation1 from "./SignatureAnimation1.jsx";
export default function HomePage() {
  return (
    <>
    <div className="signatureContainer">
     <div style={{width:"100px",maxWidth:"100%"}}> <SignatureAnimation1 /> </div>
     <div className="eyebrow">Perspective. Precision. Partnership.</div>
     </div>
      <div className="wrap">
        <section className="hero">
          <div className="hero-copy">
            
            <h1>
              Clear counsel.
              <br />
              Confident
              <br />
              <em>next steps.</em>
            </h1>
            <p>
              Legal matters are personal. Your counsel should be, too.
              Thoughtful guidance for your business, your family, and what comes
              next.
            </p>
            <Link className="button" to="/contact">
              Start a conversation <span>↗</span>
            </Link>
            <div className="hero-note">
              <span>◇</span> A considered approach. A committed partner.
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85"
              alt="Looking upward at the clean lines of modern city architecture"
            />
            <div className="image-caption">A STRONGER PERSPECTIVE.</div>
          </div>
        </section>
        <div className="principles">
          <span>
            <b>◇</b> Counsel built around you
          </span>
          <span>
            <b>↗</b> Clarity at every step
          </span>
          <span>
            <b>⌘</b> Business-minded thinking
          </span>
          <span>
            <b>○</b> Relationships that matter
          </span>
        </div>
      </div>
    </>
  );
}
