import { Link, NavLink, useSearchParams } from "react-router-dom";
import React, { useState } from "react";

export default function ApproachPage() {
  return (
    <section className="approach" id="approach">
      <div className="wrap approach-grid">
        <div>
          <div className="eyebrow">The Alden & Vale approach</div>
          <h2>
            Good counsel starts
            <br />
            with listening.
          </h2>
          <p className="approach-intro">
            Behind every legal question is a bigger picture. We take the time to
            understand yours, then build a practical path forward.
          </p>
          <Link className="button outline" to="/contact">
            Get to know us <span>↗</span>
          </Link>
        </div>
        <div className="steps">
          <article>
            <span>01</span>
            <div>
              <h3>Your priorities, first.</h3>
              <p>
                We begin with your goals and concerns. Understanding what
                matters to you shapes everything that follows.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Clarity over complexity.</h3>
              <p>
                Understand your options, the tradeoffs, and the next steps—with
                straightforward communication throughout.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>A thoughtful way forward.</h3>
              <p>
                Practical strategies shaped around your circumstances, with
                attention to the details and the bigger picture.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
