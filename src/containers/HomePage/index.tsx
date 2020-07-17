import React, { lazy, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import * as _ from "lodash";
import { useSelector } from "react-redux";
import { settings } from "cluster";
import { LoadingWrapper } from "../../components/LoadingWrapper";
import callApi from "../../apiHandler";

const HorizontalAd = lazy(() =>
  import("../../components/AdBlock/HorizontalAd")
);
const RecomendedRecipes = lazy(() =>
  import("../../components/RecomendedRecipes")
);
const TrendingRow = lazy(() => import("../../components/TrendingRow"));
const Carousel = lazy(() => import("../../components/Carousel"));
const Banner = lazy(() => import("../../components/Banner"));

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([] as any);
  const state = useSelector((state: any) => state);

  useEffect(() => {
    const { home, settings, species } = state;

    if (!home.isLoading && !settings.isLoading && !species.isLoading) {
      setTimeout(() => setIsLoading(false), 300);

      callApi("/recipes/random/8").then((response) => {
        setRecipes(response);
      });
    }
  }, [state]);

  return (
    <div>
      <Helmet>
        <title>Seafood At Home</title>
      </Helmet>
      <LoadingWrapper isLoading={isLoading}>
        <Banner />
        <Carousel />
        <TrendingRow />
        <HorizontalAd />
        <RecomendedRecipes
          title="MORE DELICIOUS RECIPES"
          recipeCount={16}
          propRecipes={recipes}
        />
      </LoadingWrapper>
    </div>
  );
}

export default HomePage;
