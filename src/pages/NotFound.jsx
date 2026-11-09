import React from "react";
import illustration from "../../dist/assets/school-404-page.png";
import "./NotFound.css";

function BookIcon() {
  return (
    <svg viewBox="0 0 56 44" fill="none" aria-hidden="true">
      <path
        d="M28 12C20 7 10 7 3 9v28c9-2 17-1 25 4 8-5 16-6 25-4V9c-7-2-17-2-25 3Zm0 0v29M8 31c6-1 11 0 16 2m8 0c5-2 10-3 16-2"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M28 2v4m-9-3 3 4m15-4-3 4"
        stroke="#e9a434"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A standalone 404 page. Set URLs to match your application's routes. */
export default function NotFound({
  schoolName = "School District",
  homeUrl = "/",
  schoolsUrl = "/schools",
  contactUrl = "/contact",
  searchUrl = "/search",
  searchParameter = "q",
}) {
  return (
    <div className="school-not-found">
      <main id="nf-main" className="nf-main">
        <div
          className="nf-art"
          role="img"
          aria-label="404 made from stacked schoolbooks, with a student peeking around the books."
        >
          <img src={illustration} alt="" aria-hidden="true" />
        </div>
        <h1>Looks like this page is missing .</h1>
        <p>Let’s get you back on track.</p>
        <div className="nf-actions">
          <a className="nf-home" href={homeUrl}>
            Back to homepage
          </a>
          
        </div>
      </main>
    </div>
  );
}
