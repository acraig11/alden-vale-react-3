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
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || (update ? "Could not save this case." : "Could not load cases."));
  }
  return result;
}

function CaseDetails({ item }) {
  return (
    <article>
      <h3>{item.title || "Case update"}</h3>
      <dl>
        <dt>First name</dt><dd>{item.firstName || "—"}</dd>
        <dt>Last name</dt><dd>{item.lastName || "—"}</dd>
        <dt>Email</dt><dd>{item.email || "—"}</dd>
        <dt>Phone number</dt><dd>{item.phone || "—"}</dd>
        <dt>Case status</dt><dd>{item.status || "Under review"}</dd>
        <dt>Notes</dt><dd className="case-notes">{item.nextStep || "No notes posted yet."}</dd>
      </dl>
    </article>
  );
}

function CaseEditor({ account, item, onSave }) {
  const [firstName, setFirstName] = useState(item?.firstName ?? account.firstName);
  const [lastName, setLastName] = useState(item?.lastName ?? account.lastName);
  const [phone, setPhone] = useState(item?.phone ?? account.phone);
  const [status, setStatus] = useState(item?.status || statuses[0]);
  const [nextStep, setNextStep] = useState(item?.nextStep || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function save(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const saved = await requestCases(undefined, {
        clientId: account.clientId, caseId: item?.caseId,
        firstName, lastName, phone, status, nextStep,
      });
      setNextStep(saved.nextStep);
      onSave(saved);
      setMessage("Case saved.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save}>
      <fieldset className="form-grid" disabled={saving}>
        <label>First name
          <input value={firstName} maxLength={100} onChange={(event) => setFirstName(event.target.value)} />
        </label>
        <label>Last name
          <input value={lastName} maxLength={100} onChange={(event) => setLastName(event.target.value)} />
        </label>
        <label>Email
          <input type="email" value={account.email} readOnly />
        </label>
        <label>Phone number
          <input type="tel" value={phone} maxLength={40} onChange={(event) => setPhone(event.target.value)} />
        </label>
        <label>Case status
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            {statuses.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>Notes visible to the client
          <textarea value={nextStep} maxLength={500} onChange={(event) => setNextStep(event.target.value)} />
        </label>
        <button className="button" type="submit">{saving ? "Saving…" : "Save case"}</button>
      </fieldset>
      {message && <p role="status">{message}</p>}
    </form>
  );
}

function AdminDashboard({ data, onSave }) {
  const [clientId, setClientId] = useState("");
  const [caseId, setCaseId] = useState("");
  const account = data.accounts.find((user) => user.clientId === clientId);
  const cases = data.cases.filter((item) => item.clientId === clientId);
  const item = cases.find((entry) => entry.caseId === caseId) || cases[0];

  return (
    <>
      <h2>Admin dashboard</h2>
      <label>User account
        <select value={clientId} onChange={(event) => {
          setClientId(event.target.value);
          setCaseId("");
        }}>
          <option value="">Select an account</option>
          {data.accounts.map((user) => <option key={user.clientId} value={user.clientId}>{user.email}</option>)}
        </select>
      </label>
      {cases.length > 1 && (
        <label>Case
          <select value={item.caseId} onChange={(event) => setCaseId(event.target.value)}>
            {cases.map((entry) => <option key={entry.caseId} value={entry.caseId}>{entry.title || entry.caseId}</option>)}
          </select>
        </label>
      )}
      {account && <CaseEditor key={JSON.stringify([clientId, item?.caseId || "primary"])} account={account} item={item} onSave={onSave} />}
    </>
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

  function updateCase(saved) {
    setData((current) => ({
      ...current,
      cases: [...current.cases.filter((item) => item.clientId !== saved.clientId || item.caseId !== saved.caseId), saved],
    }));
  }

  return (
    <section className="case-dashboard">
      {error && <p role="alert">{error}</p>}
      {!data && !error && <p role="status">Loading cases…</p>}
      {data?.admin && <AdminDashboard data={data} onSave={updateCase} />}
      {data && !data.admin && (
        <>
          <h2>Your cases</h2>
          {data.cases.length === 0 && <p>No cases to display.</p>}
          {data.cases.map((item) => <CaseDetails key={item.caseId} item={item} />)}
        </>
      )}
      <button className="button" type="button" onClick={signOut}>Sign out</button>
    </section>
  );
}
