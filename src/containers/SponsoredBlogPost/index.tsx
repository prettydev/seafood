import React, { lazy } from "react";
// const { Helmet } = lazy(() => import("react-helmet"));
import { Helmet } from "react-helmet";
import LoadingWrapper from "../../components/LoadingWrapper";
const SponsoredRecipeContent = lazy(() =>
  import("../../components/SponsorRecipeContent")
);

function SponsoredRecipe(props) {
  let selectedPost = props.match.params.slug;

  return (
    <div>
      <Helmet>
        <title>Food</title>
      </Helmet>
      <SponsoredRecipeContent selectedPost={selectedPost} />
    </div>
  );
}

export default SponsoredRecipe;
