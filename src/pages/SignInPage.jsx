import React from "react";
import CaseDashboard from "../components/CaseDashboard.jsx";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { userPoolId, userPoolClientId } from "../authConfig.js";

Amplify.configure({
  Auth: {
    Cognito: { userPoolId, userPoolClientId, loginWith: { email: true } },
  },
});

export default function SignInPage() {
  return (
    <section className="wrap">
      <h1>Sign in</h1>
      <Authenticator loginMechanisms={["email"]}>
        {({ signOut }) => <CaseDashboard signOut={signOut} />}
      </Authenticator>
    </section>
  );
}
