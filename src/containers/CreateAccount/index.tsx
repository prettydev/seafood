import React, { lazy } from "react";
import { Helmet } from "react-helmet";
const SignUpEmailContent = lazy(() =>
  import("../../components/SignUpEmailContent/index")
);

//Create an account from email
export default function CreateAccount() {
  return (
    <div>
      <Helmet>
        <title>Create Account - Seafood At Home</title>
      </Helmet>
      <SignUpEmailContent />
    </div>
  );
}
