import React, { lazy } from "react";
import { Helmet } from "react-helmet";
const SignInEmailContent = lazy(() =>
  import("../../components/SignInEmailContent/index")
);

//Create an account from email
export default function LoginToAccountSocial() {
  return (
    <div>
      <Helmet>
        <title>Create Account - Seafood At Home</title>
      </Helmet>
      <SignInEmailContent />
    </div>
  );
}
