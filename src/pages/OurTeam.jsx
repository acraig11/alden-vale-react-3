import React from "react";
import Tony from "../assets/Anthony_Gali.png";
import "./OurTeam.css";
function OurTeam() {
  return (
    <>
      <div className="TonyWrap">
        <div>
          <img src={Tony} alt="Tony Gali" />
        </div>
        <div className="TonyInfo">
          <h3>Anthony C. Galli, Esq.</h3>
          <h4>Principal Attorney</h4>
       
       
        <p className="TonyBio">
          Anthony Galli is the founding and principal attorney of Galli Law,
          PLLC. Born and raised in Central New York, he has lived and worked in
          South Florida and New York City, experience that shapes his practical,
          business-minded approach to complex disputes. After graduating from
          Chittenango High School, he earned a B.A. from Florida International
          University and a J.D., with honors, from Hofstra University School of
          Law. Anthony is admitted to practice in New York and in the U.S.
          District Courts for the Northern District of New York and Southern
          District of New York. Anthony litigates complex matters through
          mediation, arbitration, and trial in both State and Federal Court. He
          represents plaintiffs and defendants in high-stakes business disputes,
          construction project claims, securities litigation, and other
          commercial matters, with a focus on efficient strategy and
          results-driven advocacy. Anthony is a proud father of two daughters
          and twin sons. He is a member of the American Bar Association, the New
          York State Bar Association, and the National Association of
          Professional Process Servers. He is also a member of the Liverpool
          Elks Lodge #2348, where he volunteers as Lodge Attorney. In his very
          limited free time, he enjoys a good cigar and the warm weather of
          Florida.
        </p>
      </div>
    </div>
     
  </>
  );
}

export default OurTeam;
