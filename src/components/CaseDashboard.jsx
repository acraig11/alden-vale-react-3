import React, { useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

const statuses = [
  "Under review", "Active", "Waiting on you",
  "Waiting on another party", "On hold", "Closed",
];

async function requestCases(signal, update) {
  const endpoint = import.meta.env.VITE_CASES_API_URL;
  if (!endpoint) throw new Error("Case tracking has not been configured for this build.");
  const { tokens } = await fetchAuthSession();
  if (!tokens?.idToken) throw new Error("Please sign in again.");
  const response = await fetch(endpoint, {
    signal,
    method: update ? "PATCH" : "GET",
    headers: {
      Authorization: `Bearer ${tokens.idToken}`,
      ...(update && { "Content-Type": "application/json" }),
    },
    body: update ? JSON.stringify(update) : undefined,
  });
  if (!response.ok) throw new Error(update ? "Could not save this case." : "Could not load cases.");
  return response.json();
}

function CaseCard({ item, staff }) {
  const [status, setStatus] = useState(item.status || statuses[0]);
  const [nextStep, setNextStep] = useState(item.nextStep || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function save(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const saved = await requestCases(undefined, {
        clientId: item.clientId, caseId: item.caseId, status, nextStep,
      });
      setNextStep(saved.nextStep);
      setMessage("Case updated.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <article>
      <h3>{item.title || item.caseId}</h3>
      {staff ? (
        <form onSubmit={save}>
          <fieldset disabled={saving}>
            <label>
              Case status
              <select value={status} onChange={(event) => setStatus(event.target.value)}>
                {statuses.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label>
              Next step
              <textarea value={nextStep} maxLength={500} onChange={(event) => setNextStep(event.target.value)} />
            </label>
            <button className="button" type="submit">{saving ? "Saving…" : "Save changes"}</button>
          </fieldset>
          {message && <p role="status">{message}</p>}
        </form>
      ) : (
        <>
          <p><strong>Case status</strong> {item.status || "Under review"}</p>
          <p><strong>Next step</strong> {item.nextStep || "No next step posted yet."}</p>
        </>
      )}
    </article>
  );
}

export default function CaseDashboard({ signOut }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    requestCases(controller.signal).then(setData).catch((failure) => {
      if (!controller.signal.aborted) setError(failure.message);
    });
    return () => controller.abort();
  }, []);

  return (
    <>
      <h2>{data?.staff ? "Cases" : "Your cases"}</h2>
      {error && <p role="alert">{error}</p>}
      {!data && !error && <p role="status">Loading cases…</p>}
      {data?.cases.length === 0 && <p>No cases to display.</p>}
      {data?.cases.map((item) => (
        <CaseCard key={JSON.stringify([item.clientId, item.caseId])} item={item} staff={data.staff} />
      ))}
      <button className="button" type="button" onClick={signOut}>Sign out</button>
    </>
  );
}
