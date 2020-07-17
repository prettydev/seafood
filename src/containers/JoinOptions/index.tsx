import React, { lazy } from "react";
import { Helmet } from "react-helmet";
const JoinContent = lazy(() => import("../../components/JoinContent/index"));

export default function JoinOptions() {
  return (
    <div>
      <Helmet>
        <title>Join - Seafood At Home</title>
      </Helmet>
      <JoinContent />
    </div>
  );
}
