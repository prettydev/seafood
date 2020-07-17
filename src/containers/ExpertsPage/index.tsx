import React, { lazy } from "react";
import { Helmet } from "react-helmet";
const ExpertsList = lazy(() => import("../../components/ExpertsList/index"));

function ExpertsPage() {
  return (
    <div>
      <Helmet>
        <title>Experts</title>
      </Helmet>
      <ExpertsList />
    </div>
  );
}

export default ExpertsPage;
