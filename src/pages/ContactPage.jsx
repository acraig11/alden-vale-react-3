import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const CONTACT_EMAIL = "alan_craig@msn.com";

const VALID_AREAS = [
  "Business & Corporate",
  "Estate Planning",
  "Real Estate",
  "Something else",
];

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const requestedArea = searchParams.get("area") || "";

  const [area, setArea] = useState(
    VALID_AREAS.includes(requestedArea) ? requestedArea : "",
  );
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (sending) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const phone = String(data.get("phone") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    const practiceArea = String(data.get("area") ?? "");
    const introduction = String(data.get("message") ?? "").trim();

    setSending(true);
    setStatus("");

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          subject: `Contact inquiry: ${practiceArea}`,
          message: [
            `Name: ${name}`,
            `Email: ${email}`,
             `Phone: ${phone || "Not provided"}`,
            `Practice area: ${practiceArea}`,
            "",
            introduction,
          ].join("\n"),
          from_name: name,
          reply_to: email,
          to_email: CONTACT_EMAIL,
          cc_email: "",
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        },
      );

      if (result.status !== 200) {
        throw new Error(
          `EmailJS failed. Status: ${result.status}, Text: ${result.text}`,
        );
      }

      setStatus("Your inquiry has been sent!");
    } catch (error) {
      console.error("Email failed:", error);
      setStatus("Couldn't send your inquiry. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="wrap">
      <section className="contact" id="contact">
        <div>
          <div className="eyebrow">Let’s start with a conversation</div>

          <h2>
            What’s your
            <br />
            next chapter?
          </h2>

          <p>
            Tell us a little about what brings you here. Let’s explore how
            thoughtful counsel could help.
          </p>

          <p
            style={{
              fontSize: "11px",
              borderLeft: "2px solid var(--gold)",
              paddingLeft: "15px",
            }}
          >
            Website concept · Firm name, practice areas, and copy are
            illustrative.
          </p>
        </div>

        <form id="inquiry" onSubmit={handleSubmit} aria-busy={sending}>
          <div className="form-grid">
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                required
                placeholder="Full name"
              />
            </label>

            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </label>
            <label>
              Phone number
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Your phone number"
              />
            </label>
            <label className="full">
              How can we help?
              <select
                name="area"
                id="area"
                value={area}
                onChange={(event) => setArea(event.target.value)}
                required
              >
                <option value="">Select a practice area</option>

                {VALID_AREAS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="full">
              A brief introduction
              <textarea
                name="message"
                placeholder="Please avoid confidential or sensitive details."
                required
              />
            </label>

            <div className="full">
              <button className="button" type="submit" disabled={sending}>
                {sending ? "Sending..." : "Send inquiry"}{" "}
                <span aria-hidden="true">↗</span>
              </button>

              <small>
                Please avoid confidential or sensitive details. A consultation
                request does not establish an attorney-client relationship.
              </small>

              <div id="result" role="status" aria-atomic="true">
                {status && <p>{status}</p>}
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
