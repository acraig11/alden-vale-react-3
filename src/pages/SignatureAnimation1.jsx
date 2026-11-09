import React,{ useId } from "react";
import "./SignatureAnimation1.css";

export default function SignatureAnimation1() {
  const titleId = useId();

  const signaturePath = `
    M 115 180
    C 145 130, 155 135, 135 185
    C 120 220, 105 205, 145 185
    C 180 165, 170 200, 185 185
    C 200 160, 195 200, 210 185
    C 225 165, 225 195, 240 180
    C 260 155, 245 205, 270 185
    C 305 150, 310 140, 290 190
    C 280 215, 285 215, 310 185
    C 330 165, 320 200, 340 185
    C 360 165, 350 200, 370 185
    C 385 175, 390 185, 400 180
  `;

  return (
    <svg
      className="signature-animation"
      viewBox="0 0 520 300"
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>
        A pen signing a document
      </title>

      {/* Document */}
      <rect
        x="55"
        y="25"
        width="410"
        height="250"
        rx="8"
        fill="white"
        stroke="#d5d9df"
      />

      {/* Document text */}
      <g stroke="#dfe3e8" strokeWidth="6" strokeLinecap="round">
        <path d="M90 65H310" />
        <path d="M90 90H420" />
        <path d="M90 115H385" />
      </g>

      {/* Signature line */}
      <path d="M95 220H420" stroke="#b7bec8" />

      {/* Handwritten ink */}
      <path
        className="signature-ink"
        d={signaturePath}
        pathLength="1"
        fill="none"
        stroke="#193b65"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Pen tip follows the same path as the ink */}
      <g className="signing-pen">
        <animateMotion
          path={signaturePath}
          dur="5s"
          repeatCount="indefinite"
          calcMode="paced"
        />

        <g transform="rotate(35)">
          {/* Nib ends at the moving point (0, 0) */}
          <path d="M0 0L-6-17H6Z" fill="#c9a45c" />
          <rect
            x="-6"
            y="-100"
            width="12"
            height="83"
            rx="4"
            fill="#202c40"
          />
          <rect
            x="-6"
            y="-36"
            width="12"
            height="5"
            fill="#c9a45c"
          />
          <path
            d="M3-92V-63"
            stroke="#c9a45c"
            strokeWidth="2"
          />
        </g>
      </g>
    </svg>
  );
}