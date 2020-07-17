import React from "react";
import { Helmet } from "react-helmet";
import SponsorsList from "../../components/SponsorsList";

function SponsorsPage(props) {
  return (
    <div>
      <Helmet>
        <title>Sponsors</title>
      </Helmet>
      <SponsorsList />
    </div>
  );
}

export default SponsorsPage;
