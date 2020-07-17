import React, { lazy, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import callApi from "../../apiHandler";
import * as _ from "lodash";
import { LoadingWrapper } from "../../components/LoadingWrapper";
import { Suspense } from "react";
// import Ingredients from "../../components/Recipe/Ingredients";
// import Directions from "../../components/Recipe/Directions";
// import RecipeHeader from "../../components/Recipe/RecipeHeader";
// import RecomendedRecipes from "../../components/RecomendedRecipes";
// import HorizontalAd from "../../components/AdBlock/HorizontalAd";
// import ReviewSection from "../../components/Recipe/ReviewSection";

const RecomendedRecipes = lazy(() =>
  import("../../components/RecomendedRecipes")
);
const HorizontalAd = lazy(() =>
  import("../../components/AdBlock/HorizontalAd")
);
const RecipeHeader = lazy(() => import("../../components/Recipe/RecipeHeader"));
const Ingredients = lazy(() => import("../../components/Recipe/Ingredients"));
const Directions = lazy(() => import("../../components/Recipe/Directions"));
const ReviewSection = lazy(() =>
  import("../../components/Recipe/ReviewSection")
);

export default function RecipeDetailPage(props) {
  const [recipe, setRecipe] = useState({} as any);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([] as any);
  const [relatedRecipes, setRelatedRecipes] = useState([] as any);

  useEffect(() => {
    checkIfChanged();
  }, []);

  const checkIfChanged = async () => {
    window.scrollTo(0, 0);

    const slug = props.match.params.slug;

    if (slug !== recipe.slug && !_.isNil(slug)) {
      const recipe = await callApi(`/recipe/${slug}`);

      const reviews = await callApi(`/recipe-ratings?recipe.slug_eq=${slug}`);

      if (recipe.species.length > 0) {
        const response = await callApi(
          `/recipes?species.name_eq=${recipe.species[0]?.name}&slug_ne=${recipe.slug}`
        );
        setRelatedRecipes(response);
      }

      setReviews(reviews);
      setRecipe(recipe);
      setIsLoading(false);
    }
  };

  const { title, ingredients, directions, content } = recipe;

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <LoadingWrapper isLoading={isLoading}>
        <RecipeHeader {...recipe} />
        {ingredients && <Ingredients ingredients={ingredients} />}
        {directions && (
          <Directions directions={directions} note={content} whiteBackground />
        )}
        {relatedRecipes.length > 0 && (
          <RecomendedRecipes
            propRecipes={relatedRecipes}
            title="RECIPES YOU MAY LIKE"
            recipeCount={4}
          />
        )}
        <HorizontalAd />
        <ReviewSection reviews={reviews} recipe={recipe} />
      </LoadingWrapper>
    </div>
  );
}
