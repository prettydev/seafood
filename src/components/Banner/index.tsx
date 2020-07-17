import React, { useState, useEffect, Suspense } from "react";
import * as _ from "lodash";
import IndividualRecipeHorizontal from "../RecomendedRecipes/IndividualRecipeHorizontal";
import HeartIcon from "../Common/HeartIcon";
import { useSelector } from "react-redux";
import { hostName } from "../../environment";
import StarRating from "../Common/StarRating";
import { withRouter } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import callApi from "../../apiHandler";
import renderHTML from "react-render-html";

function Banner() {
  const [latest, setLatest] = useState([] as any);
  const [featuredRecipe, setFeaturedRecipe] = useState({} as any);
  const [home, setHome] = useState({} as any);

  const callHome = async () => {
    const response = await callApi("/home-page");
    setHome(response);
  };

  const grabLatest = async () => {
    const response = await callApi("/recipes?_limit=2&_sort=created_at:DESC");
    setLatest(response);
  };

  const grabFeaturedRecipe = async (slug) => {
    const response = await callApi(`/recipe/${slug}`);
    setFeaturedRecipe(response);
  };

  useEffect(() => {
    if (_.isEmpty(home)) {
      callHome();
    }
    if (home.content && _.isEmpty(featuredRecipe)) {
      grabLatest();
      grabFeaturedRecipe(home.content?.featuredRecipe?.slug);
    }
  }, [home]);

  return (
    <>
      <section className="banner-sec">
        <div className="container-md container-fluid">
          <div className="row">
            <div className="col-lg-7 col-md-12">
              <div className="banner-left">
                {featuredRecipe?.images && (
                  <img
                    src={featuredRecipe?.images[0].url}
                    alt=""
                    className="recipe-image ifakelink"
                    onClick={()=>window.location.href=`/recipe/${featuredRecipe?.slug}`}
                  />
                )}
                {featuredRecipe?.id && (
                  <HeartIcon
                    recipeId={featuredRecipe.id}
                    enabled={featuredRecipe.liked}
                  />
                )}
                <div className="text-box">
                  <div className="text-box-left">
                    <div className="title">
                      <h3>{featuredRecipe?.title}</h3>
                    </div>
                    <div className="banner-content">
                      {featuredRecipe.blurb &&
                      <p>{featuredRecipe.blurb}</p>
                      }
                    </div>
                  </div>
                  <div className="text-box-right">
                    <StarRating
                        value={featuredRecipe?.ratingsAverage}
                        recipeId={featuredRecipe?.id}
                        center={true}
                        editing
                        showCount={false}
                    />
                    <a href={`/recipe/${featuredRecipe?.slug}`} className="stretched-link">
                      CLICK FOR RECIPE
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-12">
              <div className="banner-right">
                <h3>LATEST RECIPES</h3>
                {latest.length > 0 &&
                  latest.map((recipe) => (
                    <IndividualRecipeHorizontal
                      key={recipe.slug + recipe.id}
                      title={recipe.title}
                      blurb={recipe.blurb}
                      id={recipe.slug + recipe.id}
                      starValue={recipe.ratingsAverage}
                      link={`/recipe/${recipe.slug}`}
                      imageLink={recipe.images[0]?.url}
                      rawContent={recipe.content}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default withRouter(Banner);
