import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import SponsoredRecipeContent from "../../components/SponsorRecipeContent";
import { useSelector } from "react-redux";
import RecommendedRecipes from "../../components/RecomendedRecipes";
import callApi from "../../apiHandler";
import IndividualRecipe from "../../components/RecomendedRecipes/IndividualRecipe";

function SearchResults(props) {
  let { searchResults } = useSelector((state: any) => state.recipes);
  return (
    <div>
      <Helmet>
        <title>Search Results</title>
      </Helmet>
      <RecommendedRecipes propRecipes={searchResults} />
    </div>
  );
}

export default SearchResults;
