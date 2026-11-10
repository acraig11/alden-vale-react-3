import { Link, NavLink, useSearchParams } from "react-router-dom";
import React, { useState } from "react";

export default function ExpertisePage() {
  return (
    <div className="wrap">
      <section className="practice" id="practice">
        <div className="eyebrow">Our expertise</div>
        <div className="section-top">
          <h2>
            Life moves forward.
            <br />
            We help you navigate it.
          </h2>
          <p>
            Focused legal support for pivotal decisions, everyday challenges,
            and the opportunities ahead.
          </p>
        </div>
        <div className="practice-grid">
          <Link
            className="practice-card"
            to={"/contact?area=" + encodeURIComponent("Business & Corporate")}
          >
            <div className="card-top">
              <span>01 / BUSINESS</span>
              <span>↗</span>
            </div>
            <h3>Business & Corporate</h3>
            <p>
              From a first venture to the next chapter. Counsel for formation,
              contracts, and business transactions.
            </p>
          </Link>
          <Link
            className="practice-card"
            to={"/contact?area=" + encodeURIComponent("Estate Planning")}
          >
            <div className="card-top">
              <span>02 / LEGACY</span>
              <span>↗</span>
            </div>
            <h3>Estate Planning</h3>
            <p>
              Plan with intention. Wills, trusts, and thoughtful guidance to
              help protect the people who matter.
            </p>
          </Link>
          <Link
            className="practice-card"
            to={"/contact?area=" + encodeURIComponent("Real Estate")}
          >
            <div className="card-top">
              <span>03 / PROPERTY</span>
              <span>↗</span>
            </div>
            <h3>Real Estate</h3>
            <p>
              Practical advice for important investments. Support for property
              purchases, sales, and leases.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
