import React, { useEffect, useState } from "react";
import IndividualRecipe from "./IndividualRecipe";
import { useSelector } from "react-redux";
import { hostName } from "../../environment";
import { withRouter } from "react-router-dom";
import callApi from "../../apiHandler";
import renderHTML from "react-render-html";

function RecommendedRecipes({ propRecipes = [], history, title }: any) {
  const [displayRecipes, setDisplayRecipes] = useState([] as any);

  useEffect(() => {
    renderRecipes();
  }, [propRecipes]);

  const renderRecipes = () => {
    let recipeNodes: JSX.Element[] = [];

    for (let i = 0; i < propRecipes.length; i++) {
      recipeNodes.push(renderRecipe(propRecipes[i], i));
    }

    setDisplayRecipes(recipeNodes);
  };

  const renderRecipe = (value, index) => {
    const id = `recpipeIndex_${index}`;
    return (
      <IndividualRecipe
        key={id}
        title={value.title}
        id={value.id}
        starCount={value.ratingsAverage}
        imageLink={value.images[0]?.url || ""}
        isLiked={value.liked}
        blurb={value.blurb}
        routeAction={() => history.push(`/recipe/${value.slug}`)}
        objLink={`/recipe/${value.slug}`}
        rawContent={value.content}
      />
    );
  };

  return (
    <>
      <section className="delicious-recipes-sec">
        <div className="container-md container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="heading">
                <h2>{title}</h2>
              </div>
              <div className="delicious-recipes-inner">
                <div className="row">{displayRecipes}</div>
                {displayRecipes.length === 0 &&
                  history.location.pathname === "/search-results" && (
                    <div className="container-md container-fluid text-center p-5">
                      There are no results for this search.
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default withRouter(RecommendedRecipes);
