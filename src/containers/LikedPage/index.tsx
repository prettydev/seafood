import React, { lazy } from "react";
import { Helmet } from "react-helmet";
const LikedPageContent = lazy(() =>
  import("../../components/LikedPageContent/index")
);

//Create an account from email
export default function LikedPage() {
  return (
    <div>
      <Helmet>
        <title>Manage Profile</title>
      </Helmet>
      <LikedPageContent />
    </div>
  );
}
